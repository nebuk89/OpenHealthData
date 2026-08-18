import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { CopilotClient, approveAll, type CustomAgentConfig } from "@github/copilot-sdk";
import matter from "gray-matter";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const providerRoot = path.join(repositoryRoot, "providers");

const agentSpecs = [
  {
    file: ".github/agents/open-health-api-docs.agent.md",
    output: "api-docs.md",
  },
  {
    file: ".github/agents/open-health-open-source.agent.md",
    output: "open-source-projects.md",
  },
  {
    file: ".github/agents/open-health-integrations.agent.md",
    output: "integrations.md",
  },
] as const;

const mainStartMarker = "<!-- OPENHEALTHDATA_MAIN_START -->";
const mainEndMarker = "<!-- OPENHEALTHDATA_MAIN_END -->";
const resourcesStartMarker = "<!-- OPENHEALTHDATA_RESOURCES_START -->";
const resourcesEndMarker = "<!-- OPENHEALTHDATA_RESOURCES_END -->";

interface LoadedAgent {
  config: CustomAgentConfig;
  output: string;
}

interface Provider {
  priority: number;
  name: string;
  slug: string;
}

interface HarnessOptions {
  list: boolean;
  smoke: boolean;
  status: boolean;
  provider?: string;
  outputDirectory?: string;
}

interface AgentResult {
  agent: LoadedAgent;
  content: string;
}

function parseArguments(arguments_: string[]): HarnessOptions {
  const options: HarnessOptions = { list: false, smoke: false, status: false };

  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];

    if (argument === "--list") {
      options.list = true;
      continue;
    }

    if (argument === "--smoke") {
      options.smoke = true;
      continue;
    }

    if (argument === "--status") {
      options.status = true;
      continue;
    }

    if (argument === "--provider" || argument === "--output-dir") {
      const value = arguments_[index + 1];
      if (!value) {
        throw new Error(`${argument} requires a value`);
      }

      if (argument === "--provider") {
        options.provider = value.trim();
      } else {
        options.outputDirectory = value;
      }

      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${argument}`);
  }

  return options;
}

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: frontmatter field "${field}" must be a non-empty string`);
  }

  return value.trim();
}

function optionalStringArray(value: unknown, field: string, file: string): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    throw new Error(`${file}: frontmatter field "${field}" must be a string array`);
  }

  return value;
}

function providerSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function fileExists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function loadAgents(): Promise<LoadedAgent[]> {
  return Promise.all(
    agentSpecs.map(async (spec) => {
      const profilePath = path.join(repositoryRoot, spec.file);
      const source = await readFile(profilePath, "utf8");
      const parsed = matter(source);
      const name = requireString(parsed.data.name, "name", spec.file);
      const description = requireString(parsed.data.description, "description", spec.file);
      const prompt = parsed.content.trim();

      if (!prompt) {
        throw new Error(`${spec.file}: agent instructions cannot be empty`);
      }

      return {
        config: {
          name,
          displayName: name
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" "),
          description,
          tools: optionalStringArray(parsed.data.tools, "tools", spec.file),
          prompt,
          infer: false,
        },
        output: spec.output,
      };
    }),
  );
}

async function loadProviderRoster(): Promise<Provider[]> {
  const source = await readFile(path.join(repositoryRoot, "fitness-data-providers.md"), "utf8");
  const providers = source
    .split("\n")
    .map((line) => {
      const match = line.match(/^\|\s*(\d+)\s*\|\s*\*\*(.+?)\*\*\s*\|/);
      if (!match) {
        return undefined;
      }

      return {
        priority: Number.parseInt(match[1], 10),
        name: match[2],
        slug: providerSlug(match[2]),
      };
    })
    .filter((provider): provider is Provider => Boolean(provider))
    .sort((left, right) => left.priority - right.priority);

  if (providers.length === 0) {
    throw new Error("No providers found in fitness-data-providers.md");
  }

  return providers;
}

function providerMainPath(provider: Provider): string {
  return path.join(providerRoot, provider.slug, "README.md");
}

async function selectProvider(requested: string | undefined, roster: Provider[]): Promise<Provider> {
  if (requested) {
    const normalized = requested.toLowerCase();
    const selected = roster.find(
      (provider) => provider.name.toLowerCase() === normalized || provider.slug === normalized,
    );

    if (!selected) {
      throw new Error(
        `Unknown provider "${requested}". Available providers: ${roster
          .map((provider) => provider.name)
          .join(", ")}`,
      );
    }

    return selected;
  }

  for (const provider of roster) {
    if (!(await fileExists(providerMainPath(provider)))) {
      return provider;
    }
  }

  throw new Error("All providers in fitness-data-providers.md have completed write-ups");
}

function defaultRawOutputDirectory(provider: Provider): string {
  const timestamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
  return path.join(repositoryRoot, "research", "runs", timestamp, provider.slug);
}

function researchPrompt(agentName: string, provider: Provider): string {
  return [
    `Run the ${agentName} workstream for ${provider.name}, priority ${provider.priority} in`,
    "fitness-data-providers.md.",
    "",
    "Independently verify every substantive claim against current sources. Research the full",
    "assigned scope, follow the agent's required output format, and return a self-contained",
    "Markdown report. Include direct, dated links and clearly distinguish confirmed facts from",
    "inferences or evidence gaps. Do not edit repository files because the harness persists your",
    "final response.",
  ].join("\n");
}

async function runAgent(
  client: CopilotClient,
  agent: LoadedAgent,
  allConfigs: CustomAgentConfig[],
  provider: Provider,
  smoke: boolean,
): Promise<AgentResult> {
  const session = await client.createSession({
    model: process.env.COPILOT_MODEL ?? "auto",
    workingDirectory: repositoryRoot,
    customAgents: allConfigs,
    agent: agent.config.name,
    onPermissionRequest: approveAll,
  });

  try {
    const prompt = smoke
      ? `Do not use tools. In one sentence, state your research role for ${provider.name} and confirm readiness.`
      : researchPrompt(agent.config.name, provider);
    const timeout = Number.parseInt(process.env.COPILOT_TIMEOUT_MS ?? "1800000", 10);

    if (!Number.isFinite(timeout) || timeout <= 0) {
      throw new Error("COPILOT_TIMEOUT_MS must be a positive integer");
    }

    const response = await session.sendAndWait({ prompt }, timeout);
    const content = response?.data.content?.trim();

    if (!content) {
      throw new Error(`${agent.config.name} returned no report`);
    }

    return { agent, content };
  } finally {
    await session.disconnect();
  }
}

function extractSection(content: string, start: string, end: string): string {
  const startIndex = content.indexOf(start);
  const endIndex = content.indexOf(end);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(`Synthesis response is missing required marker pair: ${start} ... ${end}`);
  }

  const section = content.slice(startIndex + start.length, endIndex).trim();
  if (!section) {
    throw new Error(`Synthesis response contains an empty section after ${start}`);
  }

  return section;
}

async function synthesizeProvider(
  client: CopilotClient,
  provider: Provider,
  rawReports: Array<{ path: string; displayName: string }>,
): Promise<{ main: string; resources: string }> {
  const synthesizer: CustomAgentConfig = {
    name: "open-health-synthesizer",
    displayName: "Open Health Synthesizer",
    description: "Synthesizes independent provider research into canonical audit documents.",
    tools: [],
    infer: false,
    prompt: [
      "You are the editorial synthesizer for OpenHealthData.",
      "Reconcile the three attached specialist reports without inventing facts.",
      "Prefer primary sources, preserve meaningful disagreements, mark uncertainty, and deduplicate",
      "repeated claims and links. Write concise, durable documentation rather than a transcript.",
    ].join(" "),
  };
  const session = await client.createSession({
    model: process.env.COPILOT_MODEL ?? "auto",
    workingDirectory: repositoryRoot,
    customAgents: [synthesizer],
    agent: synthesizer.name,
    onPermissionRequest: approveAll,
  });

  try {
    const response = await session.sendAndWait(
      {
        prompt: [
          `Synthesize the attached research for ${provider.name}.`,
          "",
          `Return exactly two Markdown documents using these markers, with no code fences:`,
          mainStartMarker,
          `# ${provider.name}`,
          "",
          "The main audit must include: an evidence date; a short bottom line; product/ecosystem",
          "scope; official access routes; data available and granularity; direct export and privacy",
          "routes; supported ecosystem integrations and their directionality; credible open-source",
          "routes; material restrictions and risks; evidence gaps; and a provisional openness",
          "assessment that explains its reasoning without pretending to be a final score.",
          mainEndMarker,
          resourcesStartMarker,
          `# ${provider.name} resources`,
          "",
          "The resource index must deduplicate every useful URL from the reports and group links",
          "under Official documentation, Official support and policy, Integrations, Open-source",
          "projects, and Secondary context. For each link include the owner/project, access date",
          `${new Date().toISOString().slice(0, 10)}, and one-line relevance. Include license and`,
          "maintenance notes for open-source projects when confirmed.",
          resourcesEndMarker,
          "",
          "Every non-obvious factual claim in the main audit must have a clickable citation. Do not",
          "carry weak or contradictory claims into the bottom line without explicitly qualifying",
          "them.",
        ].join("\n"),
        attachments: rawReports.map((report) => ({
          type: "file" as const,
          path: report.path,
          displayName: report.displayName,
        })),
      },
      Number.parseInt(process.env.COPILOT_TIMEOUT_MS ?? "1800000", 10),
    );
    const content = response?.data.content;

    if (!content) {
      throw new Error("The synthesis agent returned no content");
    }

    return {
      main: extractSection(content, mainStartMarker, mainEndMarker),
      resources: extractSection(content, resourcesStartMarker, resourcesEndMarker),
    };
  } finally {
    await session.disconnect();
  }
}

async function writeProviderIndex(roster: Provider[]): Promise<void> {
  const rows = await Promise.all(
    roster.map(async (provider) => {
      const complete = await fileExists(providerMainPath(provider));
      const providerCell = complete
        ? `[${provider.name}](./${provider.slug}/README.md)`
        : provider.name;
      const resourcesCell = complete
        ? `[Resources](./${provider.slug}/resources.md)`
        : "Pending";

      return `| ${provider.priority} | ${providerCell} | ${complete ? "Complete" : "Pending"} | ${resourcesCell} |`;
    }),
  );

  const content = [
    "# Provider audits",
    "",
    "Provider research proceeds in priority order from",
    "[the fitness data provider landscape](../fitness-data-providers.md). Each completed provider",
    "has a canonical audit and a separate resource index.",
    "",
    "| Priority | Provider | Status | Resource index |",
    "|---:|---|---|---|",
    ...rows,
    "",
  ].join("\n");

  await mkdir(providerRoot, { recursive: true });
  await writeFile(path.join(providerRoot, "README.md"), content, "utf8");
}

async function printStatus(roster: Provider[]): Promise<void> {
  let nextProvider: Provider | undefined;

  for (const provider of roster) {
    const complete = await fileExists(providerMainPath(provider));
    console.log(`${provider.priority}\t${complete ? "complete" : "pending"}\t${provider.name}`);
    if (!complete && !nextProvider) {
      nextProvider = provider;
    }
  }

  console.log(
    nextProvider
      ? `\nNext provider: ${nextProvider.name} (${nextProvider.slug})`
      : "\nAll providers are complete",
  );
}

async function main(): Promise<void> {
  const options = parseArguments(process.argv.slice(2));
  const agents = await loadAgents();
  const roster = await loadProviderRoster();

  if (options.list) {
    for (const agent of agents) {
      console.log(`${agent.config.name}\t${agent.config.description}`);
    }
    return;
  }

  if (options.status) {
    await printStatus(roster);
    return;
  }

  const provider = await selectProvider(options.provider, roster);
  const client = new CopilotClient({ workingDirectory: repositoryRoot });
  await client.start();

  try {
    const configs = agents.map((agent) => agent.config);
    const settled = await Promise.allSettled(
      agents.map((agent) => runAgent(client, agent, configs, provider, options.smoke)),
    );
    const failures = settled.filter(
      (result): result is PromiseRejectedResult => result.status === "rejected",
    );
    const results = settled
      .filter(
        (result): result is PromiseFulfilledResult<AgentResult> => result.status === "fulfilled",
      )
      .map((result) => result.value);

    if (options.smoke) {
      for (const result of results) {
        console.log(`${result.agent.config.name}: ${result.content}`);
      }

      if (failures.length > 0) {
        throw new AggregateError(
          failures.map((failure) => failure.reason),
          `${failures.length} research agent(s) failed`,
        );
      }
      return;
    }

    const rawOutputDirectory = path.resolve(
      options.outputDirectory ?? defaultRawOutputDirectory(provider),
    );
    await mkdir(rawOutputDirectory, { recursive: true });
    const rawReports = await Promise.all(
      results.map(async (result) => {
        const reportPath = path.join(rawOutputDirectory, result.agent.output);
        await writeFile(reportPath, `${result.content.trim()}\n`, "utf8");
        return { path: reportPath, displayName: result.agent.output };
      }),
    );

    if (failures.length > 0) {
      throw new AggregateError(
        failures.map((failure) => failure.reason),
        `${failures.length} research agent(s) failed; successful reports were preserved in ${rawOutputDirectory}`,
      );
    }

    const synthesis = await synthesizeProvider(client, provider, rawReports);
    const outputDirectory = path.join(providerRoot, provider.slug);
    await mkdir(outputDirectory, { recursive: true });
    await Promise.all([
      writeFile(path.join(outputDirectory, "README.md"), `${synthesis.main}\n`, "utf8"),
      writeFile(path.join(outputDirectory, "resources.md"), `${synthesis.resources}\n`, "utf8"),
    ]);
    await writeProviderIndex(roster);

    console.log(`Provider audit complete: ${path.relative(repositoryRoot, outputDirectory)}`);
    console.log(`Raw specialist reports: ${path.relative(repositoryRoot, rawOutputDirectory)}`);
  } finally {
    await client.stop();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
