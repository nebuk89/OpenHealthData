import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { execFile } from "node:child_process";
import { devNull } from "node:os";
import path from "node:path";
import process from "node:process";
import { promisify } from "node:util";
import { CopilotClient, approveAll, type CustomAgentConfig } from "@github/copilot-sdk";
import matter from "gray-matter";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const providerRoot = path.join(repositoryRoot, "providers");
const execFileAsync = promisify(execFile);

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
const claimsStartMarker = "<!-- OPENHEALTHDATA_CLAIMS_START -->";
const claimsEndMarker = "<!-- OPENHEALTHDATA_CLAIMS_END -->";
const coverageStartMarker = "<!-- OPENHEALTHDATA_COVERAGE_START -->";
const coverageEndMarker = "<!-- OPENHEALTHDATA_COVERAGE_END -->";
const taxonomyPath = path.join(repositoryRoot, "data-taxonomy.json");

const mainRequiredSections = [
  "## Bottom line",
  "## Access snapshot",
  "## Openness comparison",
  "## Data inventory and route coverage",
  "## Official access routes",
  "## Data available",
  "## Ecosystem integrations",
  "## Open-source routes",
  "## Material barriers and risks",
  "## Rubric snapshot",
  "## Provisional openness assessment",
  "## Evidence gaps",
] as const;

const opennessComparisonRows = [
  "App-to-interface parity",
  "Self-service developer access",
  "Official automation",
  "Complete history",
  "Raw and derived data coverage",
  "Overall personal-data openness",
] as const;

const opennessRatings = [
  "Open",
  "Mostly open",
  "Partial",
  "Restricted",
  "Closed",
  "Unknown",
] as const;

type OpennessRating = (typeof opennessRatings)[number];

const opennessTestResults = ["Yes", "Partial", "No", "Unknown"] as const;

const dataCoverageCodes = ["A", "P", "N", "U", "NA"] as const;
const presenceValues = ["present", "absent", "not-applicable", "unknown"] as const;
const appVisibilityValues = ["yes", "partial", "no", "unknown"] as const;
const productionLayers = [
  "captured",
  "normalized",
  "derived",
  "user-entered",
  "external",
] as const;
const routeKinds = [
  "consumer-export",
  "official-api",
  "official-mcp",
  "official-sdk",
  "integration",
  "open-source",
  "unofficial",
] as const;
const routeAccessValues = [
  "self-service",
  "partner-gated",
  "research-gated",
  "unsupported",
  "unknown",
] as const;

const resourceRequiredSections = [
  "## Official developer documentation",
  "## Official support",
  "## Integration documentation",
  "## Open-source projects",
] as const;

type PublicationStatus = "generated" | "verified" | "reviewed";
type Confidence = "high" | "medium" | "low";
type DataCoverageCode = (typeof dataCoverageCodes)[number];
type Presence = (typeof presenceValues)[number];
type AppVisibility = (typeof appVisibilityValues)[number];
type ProductionLayer = (typeof productionLayers)[number];
type RouteKind = (typeof routeKinds)[number];
type RouteAccess = (typeof routeAccessValues)[number];

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
  verify: boolean;
  markReviewed: boolean;
  provider?: string;
  outputDirectory?: string;
}

interface AgentResult {
  agent: LoadedAgent;
  content: string;
}

interface EvidenceClaim {
  id: string;
  claim: string;
  sourceUrl: string;
  evidence: string;
  confidence: Confidence;
}

interface ProjectEvidence {
  name: string;
  repositoryUrl: string;
  license: string;
}

interface ClaimLedger {
  schemaVersion: 1;
  provider: string;
  evidenceDate: string;
  claims: EvidenceClaim[];
  projects: ProjectEvidence[];
}

interface TaxonomyFamily {
  id: string;
  domain: string;
  name: string;
}

interface DataTaxonomy {
  schemaVersion: 1;
  taxonomyVersion: string;
  presenceValues: Presence[];
  appVisibilityValues: AppVisibility[];
  productionLayers: ProductionLayer[];
  routeCoverageCodes: DataCoverageCode[];
  routeKindValues: RouteKind[];
  routeAccessValues: RouteAccess[];
  families: TaxonomyFamily[];
}

interface CoverageRoute {
  id: string;
  label: string;
  kind: RouteKind;
  access: RouteAccess;
}

interface ProviderCoverageEntry {
  taxonomyId: string;
  providerNames: string[];
  presence: Presence;
  appVisible: AppVisibility;
  productionLayers: ProductionLayer[];
  routeCoverage: Record<string, DataCoverageCode>;
  notes: string;
}

interface ProviderCoverage {
  schemaVersion: 1;
  taxonomyVersion: string;
  provider: string;
  evidenceDate: string;
  routes: CoverageRoute[];
  coverage: ProviderCoverageEntry[];
}

interface LinkCheck {
  url: string;
  status: "ok" | "restricted" | "failed";
  httpStatus?: number;
  finalUrl?: string;
  error?: string;
}

interface ProjectCheck {
  name: string;
  repositoryUrl: string;
  declaredLicense: string;
  detectedLicense?: string;
  status: "ok" | "failed";
  error?: string;
}

interface VerificationReport {
  schemaVersion: 1;
  provider: string;
  checkedAt: string;
  result: "passed" | "failed";
  failures: string[];
  warnings: string[];
  links: LinkCheck[];
  projects: ProjectCheck[];
}

interface PublicationManifest {
  schemaVersion: 1;
  provider: string;
  priority: number;
  status: PublicationStatus;
  generatedAt: string;
  verifiedAt: string | null;
  reviewedAt: string | null;
  files: {
    audit: "README.md";
    resources: "resources.md";
    claims: "claims.json";
    coverage: "coverage.json";
    verification: "verification.json";
  };
}

interface Synthesis {
  main: string;
  resources: string;
  claims: ClaimLedger;
  coverage: ProviderCoverage;
}

function parseArguments(arguments_: string[]): HarnessOptions {
  const options: HarnessOptions = {
    list: false,
    smoke: false,
    status: false,
    verify: false,
    markReviewed: false,
  };

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

    if (argument === "--verify") {
      options.verify = true;
      continue;
    }

    if (argument === "--mark-reviewed") {
      options.markReviewed = true;
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
    throw new Error(`${file}: field "${field}" must be a non-empty string`);
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

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

async function writeJson(file: string, value: unknown): Promise<void> {
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
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

function providerDirectory(provider: Provider): string {
  return path.join(providerRoot, provider.slug);
}

function manifestPath(provider: Provider): string {
  return path.join(providerDirectory(provider), "manifest.json");
}

async function readManifest(provider: Provider): Promise<PublicationManifest | null> {
  if (!(await fileExists(manifestPath(provider)))) {
    return null;
  }

  const manifest = await readJson<PublicationManifest>(manifestPath(provider));
  if (
    manifest.provider !== provider.name ||
    !["generated", "verified", "reviewed"].includes(manifest.status)
  ) {
    throw new Error(`${manifestPath(provider)} is invalid`);
  }

  return manifest;
}

function isPublishable(status: PublicationStatus | undefined): boolean {
  return status === "verified" || status === "reviewed";
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
    const manifest = await readManifest(provider);
    if (!isPublishable(manifest?.status)) {
      return provider;
    }
  }

  throw new Error("All providers in fitness-data-providers.md have verified write-ups");
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
    "inferences or evidence gaps. For every important claim, include a short supporting quotation",
    "or precise source note that can be carried into a claim ledger. For GitHub projects, confirm",
    "repository existence and the SPDX licence from the repository itself. Do not edit repository",
    "files because the harness persists your final response.",
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

function validateClaimLedger(value: unknown, provider: Provider): ClaimLedger {
  if (!value || typeof value !== "object") {
    throw new Error("Claim ledger must be a JSON object");
  }

  const ledger = value as Partial<ClaimLedger>;
  if (ledger.schemaVersion !== 1 || ledger.provider !== provider.name) {
    throw new Error("Claim ledger schemaVersion/provider does not match the selected provider");
  }

  if (typeof ledger.evidenceDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(ledger.evidenceDate)) {
    throw new Error("Claim ledger evidenceDate must use YYYY-MM-DD");
  }

  if (!Array.isArray(ledger.claims) || ledger.claims.length < 8) {
    throw new Error("Claim ledger must contain at least eight key claims");
  }

  const ids = new Set<string>();
  for (const claim of ledger.claims) {
    requireString(claim.id, "claim.id", "claims.json");
    requireString(claim.claim, "claim.claim", "claims.json");
    requireString(claim.sourceUrl, "claim.sourceUrl", "claims.json");
    requireString(claim.evidence, "claim.evidence", "claims.json");
    if (!["high", "medium", "low"].includes(claim.confidence)) {
      throw new Error(`Claim ${claim.id} has invalid confidence`);
    }
    if (ids.has(claim.id)) {
      throw new Error(`Duplicate claim id: ${claim.id}`);
    }
    ids.add(claim.id);
  }

  if (!Array.isArray(ledger.projects)) {
    throw new Error("Claim ledger projects must be an array");
  }

  for (const project of ledger.projects) {
    requireString(project.name, "project.name", "claims.json");
    requireString(project.repositoryUrl, "project.repositoryUrl", "claims.json");
    requireString(project.license, "project.license", "claims.json");
  }

  return ledger as ClaimLedger;
}

function validateDataTaxonomy(value: unknown): DataTaxonomy {
  if (!value || typeof value !== "object") {
    throw new Error("Data taxonomy must be a JSON object");
  }

  const taxonomy = value as Partial<DataTaxonomy>;
  if (taxonomy.schemaVersion !== 1) {
    throw new Error("Data taxonomy schemaVersion must be 1");
  }
  if (
    typeof taxonomy.taxonomyVersion !== "string" ||
    !/^\d+\.\d+\.\d+$/.test(taxonomy.taxonomyVersion)
  ) {
    throw new Error("Data taxonomy taxonomyVersion must use semantic versioning");
  }

  const exactVocabulary = (
    label: string,
    actual: readonly string[] | undefined,
    expected: readonly string[],
  ): void => {
    if (!actual || JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Data taxonomy ${label} must be: ${expected.join(", ")}`);
    }
  };
  exactVocabulary("presenceValues", taxonomy.presenceValues, presenceValues);
  exactVocabulary("appVisibilityValues", taxonomy.appVisibilityValues, appVisibilityValues);
  exactVocabulary("productionLayers", taxonomy.productionLayers, productionLayers);
  exactVocabulary("routeCoverageCodes", taxonomy.routeCoverageCodes, dataCoverageCodes);
  exactVocabulary("routeKindValues", taxonomy.routeKindValues, routeKinds);
  exactVocabulary("routeAccessValues", taxonomy.routeAccessValues, routeAccessValues);

  if (!Array.isArray(taxonomy.families) || taxonomy.families.length < 20) {
    throw new Error("Data taxonomy must contain at least twenty canonical families");
  }

  const ids = new Set<string>();
  for (const family of taxonomy.families) {
    requireString(family.id, "family.id", "data-taxonomy.json");
    requireString(family.domain, "family.domain", "data-taxonomy.json");
    requireString(family.name, "family.name", "data-taxonomy.json");
    if (!/^[a-z][a-z0-9-]*(\.[a-z][a-z0-9-]*)+$/.test(family.id)) {
      throw new Error(`Invalid canonical taxonomy id: ${family.id}`);
    }
    if (ids.has(family.id)) {
      throw new Error(`Duplicate canonical taxonomy id: ${family.id}`);
    }
    ids.add(family.id);
  }

  return taxonomy as DataTaxonomy;
}

async function loadDataTaxonomy(): Promise<DataTaxonomy> {
  return validateDataTaxonomy(await readJson<unknown>(taxonomyPath));
}

function validateProviderCoverage(
  value: unknown,
  provider: Provider,
  taxonomy: DataTaxonomy,
): ProviderCoverage {
  if (!value || typeof value !== "object") {
    throw new Error("Provider coverage must be a JSON object");
  }

  const document = value as Partial<ProviderCoverage>;
  if (
    document.schemaVersion !== 1 ||
    document.provider !== provider.name ||
    document.taxonomyVersion !== taxonomy.taxonomyVersion
  ) {
    throw new Error("coverage.json schemaVersion, provider, or taxonomyVersion does not match");
  }
  if (
    typeof document.evidenceDate !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(document.evidenceDate)
  ) {
    throw new Error("coverage.json evidenceDate must use YYYY-MM-DD");
  }
  if (!Array.isArray(document.routes) || document.routes.length < 4) {
    throw new Error("coverage.json must define at least four provider access routes");
  }

  const routeIds = new Set<string>();
  for (const route of document.routes) {
    requireString(route.id, "route.id", "coverage.json");
    requireString(route.label, "route.label", "coverage.json");
    if (!/^[a-z][a-z0-9-]*$/.test(route.id)) {
      throw new Error(`Invalid coverage route id: ${route.id}`);
    }
    if (!routeKinds.includes(route.kind)) {
      throw new Error(`Route ${route.id} has invalid kind`);
    }
    if (!routeAccessValues.includes(route.access)) {
      throw new Error(`Route ${route.id} has invalid access`);
    }
    if (routeIds.has(route.id)) {
      throw new Error(`Duplicate coverage route id: ${route.id}`);
    }
    routeIds.add(route.id);
  }

  if (!Array.isArray(document.coverage)) {
    throw new Error("coverage.json coverage must be an array");
  }
  const expectedIds = new Set(taxonomy.families.map((family) => family.id));
  const coverageIds = new Set<string>();
  for (const entry of document.coverage) {
    requireString(entry.taxonomyId, "coverage.taxonomyId", "coverage.json");
    requireString(entry.notes, "coverage.notes", "coverage.json");
    if (!expectedIds.has(entry.taxonomyId)) {
      throw new Error(`Unknown taxonomy id in coverage.json: ${entry.taxonomyId}`);
    }
    if (coverageIds.has(entry.taxonomyId)) {
      throw new Error(`Duplicate taxonomy id in coverage.json: ${entry.taxonomyId}`);
    }
    coverageIds.add(entry.taxonomyId);

    if (!Array.isArray(entry.providerNames)) {
      throw new Error(`Coverage ${entry.taxonomyId} providerNames must be an array`);
    }
    entry.providerNames.forEach((name) =>
      requireString(name, "coverage.providerNames[]", "coverage.json"),
    );
    if (!presenceValues.includes(entry.presence)) {
      throw new Error(`Coverage ${entry.taxonomyId} has invalid presence`);
    }
    if (!appVisibilityValues.includes(entry.appVisible)) {
      throw new Error(`Coverage ${entry.taxonomyId} has invalid appVisible`);
    }
    if (!Array.isArray(entry.productionLayers)) {
      throw new Error(`Coverage ${entry.taxonomyId} productionLayers must be an array`);
    }
    for (const layer of entry.productionLayers) {
      if (!productionLayers.includes(layer)) {
        throw new Error(`Coverage ${entry.taxonomyId} has invalid production layer`);
      }
    }
    if (entry.presence === "present" && entry.productionLayers.length === 0) {
      throw new Error(`Coverage ${entry.taxonomyId} is present but has no production layer`);
    }
    if (!entry.routeCoverage || typeof entry.routeCoverage !== "object") {
      throw new Error(`Coverage ${entry.taxonomyId} routeCoverage must be an object`);
    }
    const actualRouteIds = Object.keys(entry.routeCoverage);
    if (
      actualRouteIds.length !== routeIds.size ||
      actualRouteIds.some((routeId) => !routeIds.has(routeId))
    ) {
      throw new Error(`Coverage ${entry.taxonomyId} must map every declared route exactly once`);
    }
    for (const [routeId, code] of Object.entries(entry.routeCoverage)) {
      if (!dataCoverageCodes.includes(code)) {
        throw new Error(`Coverage ${entry.taxonomyId}/${routeId} has invalid route code`);
      }
    }
  }

  const missingIds = [...expectedIds].filter((id) => !coverageIds.has(id));
  if (missingIds.length > 0) {
    throw new Error(`coverage.json is missing canonical families: ${missingIds.join(", ")}`);
  }

  return document as ProviderCoverage;
}

async function synthesizeProvider(
  client: CopilotClient,
  provider: Provider,
  rawReports: Array<{ path: string; displayName: string }>,
): Promise<Synthesis> {
  const taxonomy = await loadDataTaxonomy();
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
    const evidenceDate = new Date().toISOString().slice(0, 10);
    const response = await session.sendAndWait(
      {
        prompt: [
          `Synthesize the attached research for ${provider.name}.`,
          "",
          "Return exactly two Markdown documents, one JSON claim ledger and one JSON canonical",
          "coverage document using these markers, with no code fences:",
          mainStartMarker,
          `# ${provider.name}`,
          "",
          "The main audit must follow audit-rubric.md and include: an evidence date; Bottom line;",
          "Access snapshot; Openness comparison; Data inventory and route coverage; Official",
          "access routes; Data available and granularity; direct export and privacy routes;",
          "Ecosystem integrations with explicit directionality; Open-source routes; Material",
          "barriers and risks; Rubric snapshot; Provisional openness assessment without",
          "cross-provider superlatives; and Evidence gaps and hands-on checks.",
          "",
          "The Openness comparison section is mandatory. Use the exact six-row table from",
          "audit-rubric.md: App-to-interface parity; Self-service developer access; Official",
          "automation; Complete history; Raw and derived data coverage; and Overall personal-data",
          "openness. Use exactly Yes, Partial, No, or Unknown for each of the first five results.",
          "Rate the overall row with exactly one of: Open, Mostly open, Partial, Restricted,",
          "Closed, or Unknown. Judge the route an ordinary account holder can use, not the richest",
          "partner-only capability.",
          "",
          "The Data inventory and route coverage section is mandatory. Enumerate at least ten",
          "evidence-backed metric families covering device-captured, normalized, user-entered and",
          "app-derived outputs. Name major derived metrics individually. Use columns: Data family;",
          "Included metrics or app outputs; Captured or produced as; then at least four",
          "provider-specific access routes spanning consumer export, official programmable",
          "access, integrations and open-source/unofficial access. Every route cell must begin",
          "with exactly A, P, N, U or NA as defined in audit-rubric.md. Do not infer that a derived",
          "score is available merely because its input signals are available. Keep raw or",
          "normalized values in separate rows from app-derived classifications and scores.",
          mainEndMarker,
          resourcesStartMarker,
          `# ${provider.name} resources`,
          "",
          "The resource index must deduplicate useful URLs and group links under Official developer",
          "documentation, Official support and policy, Integration documentation, Open-source",
          "projects, and Secondary context. Include the evidence date and one-line relevance.",
          "For GitHub projects use the repository's detected SPDX licence, or NOASSERTION when no",
          "licence is detected. Do not include dead or deleted links.",
          resourcesEndMarker,
          claimsStartMarker,
          JSON.stringify(
            {
              schemaVersion: 1,
              provider: provider.name,
              evidenceDate,
              claims: [
                {
                  id: "stable-kebab-case-id",
                  claim: "A key factual claim from the main audit",
                  sourceUrl: "https://direct-primary-source.example",
                  evidence: "A short supporting quotation or precise source note",
                  confidence: "high",
                },
              ],
              projects: [
                {
                  name: "owner/repository",
                  repositoryUrl: "https://github.com/owner/repository",
                  license: "MIT",
                },
              ],
            },
            null,
            2,
          ),
          claimsEndMarker,
          coverageStartMarker,
          JSON.stringify(
            {
              schemaVersion: 1,
              taxonomyVersion: taxonomy.taxonomyVersion,
              provider: provider.name,
              evidenceDate,
              routes: [
                {
                  id: "provider-specific-route-id",
                  label: "Provider-specific route label",
                  kind: "consumer-export",
                  access: "self-service",
                },
              ],
              coverage: taxonomy.families.map((family) => ({
                taxonomyId: family.id,
                providerNames: [],
                presence: "unknown",
                appVisible: "unknown",
                productionLayers: [],
                routeCoverage: {
                  "provider-specific-route-id": "U",
                },
                notes: "Evidence-based provider mapping or explicit remaining uncertainty.",
              })),
            },
            null,
            2,
          ),
          coverageEndMarker,
          "",
          "Include at least eight decision-relevant claims. Every claim source and project must",
          "appear in the resource index. Every non-obvious factual claim in the main audit must have",
          "a clickable citation. Qualify negative findings as 'no documented route found' unless a",
          "primary source explicitly confirms absence.",
          "",
          "For coverage.json, use every canonical family from the attached data-taxonomy.json",
          "exactly once. Define at least four provider-specific routes and map every family to every",
          "declared route. Use only the taxonomy vocabularies. Use unknown rather than absent when",
          "evidence is missing, preserve proprietary provider names as aliases, and do not equate",
          "similar scores across providers.",
        ].join("\n"),
        attachments: [
          ...rawReports.map((report) => ({
            type: "file" as const,
            path: report.path,
            displayName: report.displayName,
          })),
          {
            type: "file" as const,
            path: taxonomyPath,
            displayName: "data-taxonomy.json",
          },
        ],
      },
      Number.parseInt(process.env.COPILOT_TIMEOUT_MS ?? "1800000", 10),
    );
    const content = response?.data.content;

    if (!content) {
      throw new Error("The synthesis agent returned no content");
    }

    const claimsText = extractSection(content, claimsStartMarker, claimsEndMarker);
    const coverageText = extractSection(content, coverageStartMarker, coverageEndMarker);
    return {
      main: extractSection(content, mainStartMarker, mainEndMarker),
      resources: extractSection(content, resourcesStartMarker, resourcesEndMarker),
      claims: validateClaimLedger(JSON.parse(claimsText) as unknown, provider),
      coverage: validateProviderCoverage(
        JSON.parse(coverageText) as unknown,
        provider,
        taxonomy,
      ),
    };
  } finally {
    await session.disconnect();
  }
}

function extractUrls(content: string): string[] {
  return [...content.matchAll(/https?:\/\/[^\s<>()\]]+/g)].map((match) =>
    match[0].replace(/[.,;:!?]+$/, ""),
  );
}

async function mapWithConcurrency<T, R>(
  values: T[],
  limit: number,
  mapper: (value: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;

  async function worker(): Promise<void> {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(values[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, () => worker()));
  return results;
}

async function checkLink(url: string): Promise<LinkCheck> {
  async function probe(userAgent: string): Promise<Response> {
    return fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: {
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
        "User-Agent": userAgent,
      },
    });
  }

  try {
    const first = await probe("OpenHealthData evidence verifier");
    await first.body?.cancel();
    if (first.ok) {
      return {
        url,
        status: "ok",
        httpStatus: first.status,
        finalUrl: first.url,
      };
    }

    const second = await probe(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36",
    );
    await second.body?.cancel();
    if (second.ok) {
      return {
        url,
        status: "ok",
        httpStatus: second.status,
        finalUrl: second.url,
      };
    }

    let curlStatus: number | undefined;
    let curlFinalUrl: string | undefined;
    try {
      const { stdout } = await execFileAsync(
        "curl",
        [
          "-L",
          "-sS",
          "-o",
          devNull,
          "-w",
          "%{http_code}\t%{url_effective}",
          "--max-time",
          "20",
          "-A",
          "Mozilla/5.0",
          url,
        ],
        { timeout: 25_000 },
      );
      const [statusText, finalUrl] = stdout.trim().split("\t");
      curlStatus = Number.parseInt(statusText, 10);
      curlFinalUrl = finalUrl;
      if (curlStatus >= 200 && curlStatus < 400) {
        return {
          url,
          status: "ok",
          httpStatus: curlStatus,
          finalUrl: curlFinalUrl,
        };
      }
    } catch {
      // The fetch probes below still provide a useful restricted/dead result.
    }

    if (
      [404, 410].includes(first.status) &&
      [404, 410].includes(second.status) &&
      (curlStatus === undefined || [404, 410].includes(curlStatus))
    ) {
      return {
        url,
        status: "failed",
        httpStatus: curlStatus ?? second.status,
        finalUrl: curlFinalUrl ?? second.url,
      };
    }

    return {
      url,
      status: "restricted",
      httpStatus: second.status,
      finalUrl: second.url,
      error: `HTTP probes returned ${first.status}, ${second.status}, and ${curlStatus ?? "unavailable"}`,
    };
  } catch (error: unknown) {
    return {
      url,
      status: "restricted",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function parseGitHubRepository(url: string): { owner: string; repository: string } | null {
  const match = new URL(url).pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);
  if (!match || new URL(url).hostname.toLowerCase() !== "github.com") {
    return null;
  }

  return { owner: match[1], repository: match[2].replace(/\.git$/, "") };
}

async function checkProject(project: ProjectEvidence): Promise<ProjectCheck> {
  const repository = parseGitHubRepository(project.repositoryUrl);
  if (!repository) {
    return {
      name: project.name,
      repositoryUrl: project.repositoryUrl,
      declaredLicense: project.license,
      status: "failed",
      error: "Project URL is not a canonical GitHub repository URL",
    };
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "OpenHealthData evidence verifier",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repository.owner}/${repository.repository}`,
      { headers, signal: AbortSignal.timeout(20_000) },
    );
    if (!response.ok) {
      return {
        name: project.name,
        repositoryUrl: project.repositoryUrl,
        declaredLicense: project.license,
        status: "failed",
        error: `GitHub repository lookup returned ${response.status}`,
      };
    }

    const metadata = (await response.json()) as { license?: { spdx_id?: string | null } | null };
    const detectedLicense = metadata.license?.spdx_id || "NOASSERTION";
    const matches = detectedLicense.toLowerCase() === project.license.toLowerCase();

    return {
      name: project.name,
      repositoryUrl: project.repositoryUrl,
      declaredLicense: project.license,
      detectedLicense,
      status: matches ? "ok" : "failed",
      error: matches
        ? undefined
        : `Declared ${project.license}, but GitHub reports ${detectedLicense}`,
    };
  } catch (error: unknown) {
    return {
      name: project.name,
      repositoryUrl: project.repositoryUrl,
      declaredLicense: project.license,
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function checkRequiredSections(
  content: string,
  sections: readonly string[],
  fileName: string,
): string[] {
  return sections
    .filter((section) => !content.toLowerCase().includes(section.toLowerCase()))
    .map((section) => `${fileName} is missing required section "${section}"`);
}

function extractOpennessRating(content: string): OpennessRating | null {
  const section = content.match(
    /## Openness comparison\s*([\s\S]*?)(?=\n## |\s*$)/i,
  )?.[1];
  if (!section) {
    return null;
  }

  const normalized = section.replaceAll("**", "");
  const match = normalized.match(
    /\|\s*Overall personal-data openness\s*\|\s*(Open|Mostly open|Partial|Restricted|Closed|Unknown)\s*\|/i,
  );
  if (!match) {
    return null;
  }

  return opennessRatings.find((rating) => rating.toLowerCase() === match[1].toLowerCase()) ?? null;
}

function checkOpennessComparison(content: string): string[] {
  const section = content.match(
    /## Openness comparison\s*([\s\S]*?)(?=\n## |\s*$)/i,
  )?.[1];
  if (!section) {
    return [];
  }

  const normalized = section.replaceAll("**", "").toLowerCase();
  const failures = opennessComparisonRows.slice(0, -1).flatMap((row) => {
    const rowPattern = new RegExp(
      `\\|\\s*${row.toLowerCase()}\\s*\\|\\s*(${opennessTestResults.join("|")})\\s*\\|`,
      "i",
    );
    return rowPattern.test(normalized)
      ? []
      : [
          `README.md openness row "${row}" must use one of: ${opennessTestResults.join(", ")}`,
        ];
  });

  if (!extractOpennessRating(content)) {
    failures.push(
      `README.md overall openness rating must be one of: ${opennessRatings.join(", ")}`,
    );
  }

  return failures;
}

function checkDataInventory(content: string): string[] {
  const section = content.match(
    /## Data inventory and route coverage\s*([\s\S]*?)(?=\n## |\s*$)/i,
  )?.[1];
  if (!section) {
    return [];
  }

  const failures: string[] = [];
  const tableLines = section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  const headerIndex = tableLines.findIndex((line) =>
    /^\|\s*Data family\s*\|/i.test(line.replaceAll("**", "")),
  );
  if (headerIndex < 0) {
    return ['README.md data inventory must include a table headed "Data family"'];
  }

  const headerCells = tableLines[headerIndex]
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
  if (headerCells.length < 7) {
    failures.push("README.md data inventory must include at least four access-route columns");
  }

  const dataRows = tableLines.slice(headerIndex + 2).filter((line) => {
    const cells = line.split("|").slice(1, -1);
    return cells.length === headerCells.length;
  });
  if (dataRows.length < 10) {
    failures.push("README.md data inventory must include at least ten metric-family rows");
  }

  for (const row of dataRows) {
    const cells = row
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim().replaceAll("**", ""));
    const family = cells[0] || "unnamed";
    for (const cell of cells.slice(3)) {
      const codePattern = new RegExp(`^(${dataCoverageCodes.join("|")})(?:\\b|\\s|$)`, "i");
      if (!codePattern.test(cell)) {
        failures.push(
          `README.md data inventory row "${family}" has a route cell without an A/P/N/U/NA code`,
        );
        break;
      }
    }
  }

  return failures;
}

async function runQualityGate(
  provider: Provider,
  main: string,
  resources: string,
  claims: ClaimLedger,
  coverage: ProviderCoverage,
  taxonomy: DataTaxonomy,
): Promise<VerificationReport> {
  validateProviderCoverage(coverage, provider, taxonomy);
  const failures = [
    ...checkRequiredSections(main, mainRequiredSections, "README.md"),
    ...checkOpennessComparison(main),
    ...checkDataInventory(main),
    ...checkRequiredSections(resources, resourceRequiredSections, "resources.md"),
  ];
  const warnings: string[] = [];
  if (claims.evidenceDate !== coverage.evidenceDate) {
    failures.push("claims.json and coverage.json evidenceDate values must match");
  }
  if (!main.includes("./coverage.json")) {
    failures.push("README.md must link to the provider's canonical coverage.json");
  }
  const mainUrls = new Set(extractUrls(main));
  const resourceUrls = new Set(extractUrls(resources));
  const documentedUrls = new Set([...mainUrls, ...resourceUrls]);

  for (const claim of claims.claims) {
    if (!resourceUrls.has(claim.sourceUrl)) {
      failures.push(`Claim ${claim.id} source is absent from the resource index`);
    }
  }

  for (const project of claims.projects) {
    if (!resourceUrls.has(project.repositoryUrl)) {
      failures.push(`Project ${project.name} is absent from the resource index`);
    }
  }

  const urls = [...new Set([...documentedUrls, ...claims.claims.map((claim) => claim.sourceUrl)])];
  const urlsByHost = new Map<string, string[]>();
  for (const url of urls) {
    const host = new URL(url).hostname;
    urlsByHost.set(host, [...(urlsByHost.get(host) ?? []), url]);
  }
  const linkGroups = await mapWithConcurrency(
    [...urlsByHost.values()],
    4,
    async (hostUrls): Promise<LinkCheck[]> => {
      const checks: LinkCheck[] = [];
      for (const url of hostUrls) {
        checks.push(await checkLink(url));
      }
      return checks;
    },
  );
  const links = linkGroups.flat();
  for (const link of links) {
    if (link.status === "failed") {
      failures.push(`Dead source ${link.url} returned ${link.httpStatus ?? link.error}`);
    } else if (link.status === "restricted") {
      warnings.push(
        `Automated retrieval could not confirm ${link.url}: ${link.httpStatus ?? link.error}`,
      );
    }
  }

  const projects = await mapWithConcurrency(claims.projects, 4, checkProject);
  for (const project of projects) {
    if (project.status === "failed") {
      failures.push(`Project ${project.name}: ${project.error}`);
    }
  }

  return {
    schemaVersion: 1,
    provider: provider.name,
    checkedAt: new Date().toISOString(),
    result: failures.length === 0 ? "passed" : "failed",
    failures,
    warnings,
    links,
    projects,
  };
}

function createManifest(
  provider: Provider,
  status: PublicationStatus,
  generatedAt: string,
  verifiedAt: string | null,
  reviewedAt: string | null = null,
): PublicationManifest {
  return {
    schemaVersion: 1,
    provider: provider.name,
    priority: provider.priority,
    status,
    generatedAt,
    verifiedAt,
    reviewedAt,
    files: {
      audit: "README.md",
      resources: "resources.md",
      claims: "claims.json",
      coverage: "coverage.json",
      verification: "verification.json",
    },
  };
}

async function publishDirectory(stagingDirectory: string, targetDirectory: string): Promise<void> {
  const backupDirectory = `${targetDirectory}.backup-${Date.now()}`;
  const targetExists = await fileExists(targetDirectory);

  if (targetExists) {
    await rename(targetDirectory, backupDirectory);
  }

  try {
    await rename(stagingDirectory, targetDirectory);
    if (targetExists) {
      await rm(backupDirectory, { recursive: true });
    }
  } catch (error) {
    if (targetExists && !(await fileExists(targetDirectory))) {
      await rename(backupDirectory, targetDirectory);
    }
    throw error;
  }
}

async function stageAndPublish(
  provider: Provider,
  synthesis: Synthesis,
  rawOutputDirectory: string,
): Promise<void> {
  const taxonomy = await loadDataTaxonomy();
  validateProviderCoverage(synthesis.coverage, provider, taxonomy);
  await mkdir(providerRoot, { recursive: true });
  const stagingDirectory = await mkdtemp(path.join(providerRoot, `.staging-${provider.slug}-`));
  const generatedAt = new Date().toISOString();

  await Promise.all([
    writeFile(path.join(stagingDirectory, "README.md"), `${synthesis.main}\n`, "utf8"),
    writeFile(path.join(stagingDirectory, "resources.md"), `${synthesis.resources}\n`, "utf8"),
    writeJson(path.join(stagingDirectory, "claims.json"), synthesis.claims),
    writeJson(path.join(stagingDirectory, "coverage.json"), synthesis.coverage),
    writeJson(
      path.join(stagingDirectory, "manifest.json"),
      createManifest(provider, "generated", generatedAt, null),
    ),
  ]);

  const verification = await runQualityGate(
    provider,
    synthesis.main,
    synthesis.resources,
    synthesis.claims,
    synthesis.coverage,
    taxonomy,
  );
  await writeJson(path.join(stagingDirectory, "verification.json"), verification);

  if (verification.result === "failed") {
    const failedDirectory = path.join(rawOutputDirectory, "generated-package");
    await rm(failedDirectory, { recursive: true, force: true });
    await rename(stagingDirectory, failedDirectory);
    throw new Error(
      `Provider package failed verification; inspect ${path.relative(repositoryRoot, failedDirectory)}`,
    );
  }

  await writeJson(
    path.join(stagingDirectory, "manifest.json"),
    createManifest(provider, "verified", generatedAt, verification.checkedAt),
  );
  await publishDirectory(stagingDirectory, providerDirectory(provider));
}

async function verifyExistingProvider(provider: Provider): Promise<void> {
  const directory = providerDirectory(provider);
  const [main, resources, claims, coverage, taxonomy] = await Promise.all([
    readFile(path.join(directory, "README.md"), "utf8"),
    readFile(path.join(directory, "resources.md"), "utf8"),
    readJson<ClaimLedger>(path.join(directory, "claims.json")),
    readJson<ProviderCoverage>(path.join(directory, "coverage.json")),
    loadDataTaxonomy(),
  ]);
  const validatedClaims = validateClaimLedger(claims, provider);
  const validatedCoverage = validateProviderCoverage(coverage, provider, taxonomy);
  const verification = await runQualityGate(
    provider,
    main,
    resources,
    validatedClaims,
    validatedCoverage,
    taxonomy,
  );
  await writeJson(path.join(directory, "verification.json"), verification);

  if (verification.result === "failed") {
    throw new Error(
      `${provider.name} failed verification:\n${verification.failures
        .map((failure) => `- ${failure}`)
        .join("\n")}`,
    );
  }

  const previous = await readManifest(provider);
  const generatedAt = previous?.generatedAt ?? new Date().toISOString();
  const reviewedAt = previous?.status === "reviewed" ? previous.reviewedAt : null;
  await writeJson(
    manifestPath(provider),
    createManifest(
      provider,
      reviewedAt ? "reviewed" : "verified",
      generatedAt,
      verification.checkedAt,
      reviewedAt,
    ),
  );
}

async function markProviderReviewed(provider: Provider): Promise<void> {
  const manifest = await readManifest(provider);
  if (!manifest || !isPublishable(manifest.status)) {
    throw new Error(`${provider.name} must pass verification before it can be reviewed`);
  }

  await writeJson(manifestPath(provider), {
    ...manifest,
    status: "reviewed",
    reviewedAt: new Date().toISOString(),
  } satisfies PublicationManifest);
}

async function writeProviderIndex(roster: Provider[]): Promise<void> {
  const rows = await Promise.all(
    roster.map(async (provider) => {
      const manifest = await readManifest(provider);
      const status = manifest?.status ?? "pending";
      const published = isPublishable(manifest?.status);
      const openness = published
        ? extractOpennessRating(
            await readFile(path.join(providerDirectory(provider), "README.md"), "utf8"),
          ) ?? "Unknown"
        : "Pending";
      const providerCell = published
        ? `[${provider.name}](./${provider.slug}/README.md)`
        : provider.name;
      const resourcesCell = published
        ? `[Resources](./${provider.slug}/resources.md)`
        : "Pending";
      const coverageCell = published
        ? `[Coverage](./${provider.slug}/coverage.json)`
        : "Pending";

      return `| ${provider.priority} | ${providerCell} | ${openness} | ${status[0].toUpperCase()}${status.slice(1)} | ${coverageCell} | ${resourcesCell} |`;
    }),
  );

  const content = [
    "# Provider audits",
    "",
    "Provider research proceeds in priority order from",
    "[the fitness data provider landscape](../fitness-data-providers.md) and uses the",
    "[provider audit rubric](../audit-rubric.md). Each published provider has a canonical audit,",
    "resource index, canonical coverage map, claim ledger, verification report and publication",
    "manifest.",
    "",
    "| Priority | Provider | Personal-data openness | Status | Canonical coverage | Resource index |",
    "|---:|---|---|---|---|---|",
    ...rows,
    "",
  ].join("\n");

  await mkdir(providerRoot, { recursive: true });
  await writeFile(path.join(providerRoot, "README.md"), content, "utf8");
}

async function printStatus(roster: Provider[]): Promise<void> {
  let nextProvider: Provider | undefined;

  for (const provider of roster) {
    const manifest = await readManifest(provider);
    const status = manifest?.status ?? "pending";
    console.log(`${provider.priority}\t${status}\t${provider.name}`);
    if (!isPublishable(manifest?.status) && !nextProvider) {
      nextProvider = provider;
    }
  }

  console.log(
    nextProvider
      ? `\nNext provider: ${nextProvider.name} (${nextProvider.slug})`
      : "\nAll providers are verified",
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

  if (options.verify || options.markReviewed) {
    if (!options.provider) {
      throw new Error("--verify and --mark-reviewed require --provider");
    }
    const provider = await selectProvider(options.provider, roster);
    if (options.verify) {
      await verifyExistingProvider(provider);
    }
    if (options.markReviewed) {
      await markProviderReviewed(provider);
    }
    await writeProviderIndex(roster);
    console.log(`${provider.name}: ${options.markReviewed ? "reviewed" : "verified"}`);
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
    await stageAndPublish(provider, synthesis, rawOutputDirectory);
    await writeProviderIndex(roster);

    console.log(`Provider audit verified: ${path.relative(repositoryRoot, providerDirectory(provider))}`);
    console.log(`Raw specialist reports: ${path.relative(repositoryRoot, rawOutputDirectory)}`);
  } finally {
    await client.stop();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
