import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { CopilotClient, approveAll, type CustomAgentConfig } from "@github/copilot-sdk";
import matter from "gray-matter";

const repositoryRoot = path.resolve(import.meta.dirname, "..");

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

interface LoadedAgent {
  config: CustomAgentConfig;
  output: string;
}

interface HarnessOptions {
  list: boolean;
  smoke: boolean;
  providers?: string[];
  outputDirectory?: string;
}

function parseArguments(arguments_: string[]): HarnessOptions {
  const options: HarnessOptions = { list: false, smoke: false };

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

    if (argument === "--providers" || argument === "--output-dir") {
      const value = arguments_[index + 1];
      if (!value) {
        throw new Error(`${argument} requires a value`);
      }

      if (argument === "--providers") {
        options.providers = value
          .split(",")
          .map((provider) => provider.trim())
          .filter(Boolean);
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

async function loadProviderNames(): Promise<string[]> {
  const source = await readFile(path.join(repositoryRoot, "fitness-data-providers.md"), "utf8");
  const providers = source
    .split("\n")
    .map((line) => line.match(/^\|\s*\d+\s*\|\s*\*\*(.+?)\*\*\s*\|/)?.[1])
    .filter((provider): provider is string => Boolean(provider));

  if (providers.length === 0) {
    throw new Error("No providers found in fitness-data-providers.md");
  }

  return providers;
}

function selectProviders(requested: string[] | undefined, available: string[]): string[] {
  if (!requested) {
    return available;
  }

  const canonical = new Map(available.map((provider) => [provider.toLowerCase(), provider]));
  const selected = requested.map((provider) => {
    const match = canonical.get(provider.toLowerCase());
    if (!match) {
      throw new Error(
        `Unknown provider "${provider}". Available providers: ${available.join(", ")}`,
      );
    }
    return match;
  });

  return [...new Set(selected)];
}

function defaultOutputDirectory(): string {
  const timestamp = new Date().toISOString().replaceAll(":", "-").replace(/\.\d{3}Z$/, "Z");
  return path.join(repositoryRoot, "research", "runs", timestamp);
}

function researchPrompt(agentName: string, providers: string[]): string {
  return [
    `Run the ${agentName} workstream for the following providers:`,
    providers.map((provider) => `- ${provider}`).join("\n"),
    "",
    "Use fitness-data-providers.md only as the provider roster; independently verify every",
    "substantive claim against current sources. Research the full assigned scope, follow the",
    "agent's required output format, and return a self-contained Markdown report. Do not edit",
    "repository files because the harness persists your final response.",
  ].join("\n");
}

async function runAgent(
  client: CopilotClient,
  agent: LoadedAgent,
  allConfigs: CustomAgentConfig[],
  providers: string[],
  smoke: boolean,
): Promise<{ agent: LoadedAgent; content: string }> {
  const session = await client.createSession({
    model: process.env.COPILOT_MODEL ?? "auto",
    workingDirectory: repositoryRoot,
    customAgents: allConfigs,
    agent: agent.config.name,
    onPermissionRequest: approveAll,
  });

  try {
    const prompt = smoke
      ? "Do not use tools. In one sentence, state your assigned research role and confirm readiness."
      : researchPrompt(agent.config.name, providers);
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

async function main(): Promise<void> {
  const options = parseArguments(process.argv.slice(2));
  const agents = await loadAgents();
  const availableProviders = await loadProviderNames();

  if (options.list) {
    for (const agent of agents) {
      console.log(`${agent.config.name}\t${agent.config.description}`);
    }
    return;
  }

  const providers = selectProviders(options.providers, availableProviders);
  const client = new CopilotClient({ workingDirectory: repositoryRoot });
  await client.start();

  try {
    const configs = agents.map((agent) => agent.config);
    const settled = await Promise.allSettled(
      agents.map((agent) => runAgent(client, agent, configs, providers, options.smoke)),
    );
    const failures = settled.filter(
      (result): result is PromiseRejectedResult => result.status === "rejected",
    );

    if (failures.length > 0) {
      throw new AggregateError(
        failures.map((failure) => failure.reason),
        `${failures.length} research agent(s) failed`,
      );
    }

    const results = settled
      .filter(
        (result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof runAgent>>> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);

    if (options.smoke) {
      for (const result of results) {
        console.log(`${result.agent.config.name}: ${result.content}`);
      }
      return;
    }

    const outputDirectory = path.resolve(options.outputDirectory ?? defaultOutputDirectory());
    await mkdir(outputDirectory, { recursive: true });

    await Promise.all(
      results.map((result) =>
        writeFile(
          path.join(outputDirectory, result.agent.output),
          `${result.content.trim()}\n`,
          "utf8",
        ),
      ),
    );

    console.log(`Research complete: ${outputDirectory}`);
  } finally {
    await client.stop();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
