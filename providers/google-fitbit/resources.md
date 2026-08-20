# Google / Fitbit resources

**Evidence date:** 2026-08-20

All links were checked on the evidence date. The audit uses the current Google Health API as the
primary programmable surface and retains Fitbit Web API documentation only to describe the active
migration period and legacy tooling.

## Official developer documentation

- [Google Health API](https://developers.google.com/health) — **Google**; current successor to the
  Fitbit Web API.
- [Get started](https://developers.google.com/health/get-started) — **Google**; current developer
  path, protocols, codelab and migration resources.
- [Cloud and OAuth setup](https://developers.google.com/health/setup) — **Google**; API enablement,
  test users, the 100-user cap for newly created unverified OAuth clients, third-party review and
  token behavior.
- [OAuth scopes](https://developers.google.com/health/scopes) — **Google**; read-only and
  write-only data collections and partial-consent rules.
- [Data types](https://developers.google.com/health/data-types) — **Google**; canonical current
  type catalogue, operations, compatible devices, pagination and history rules.
- [Endpoint guide](https://developers.google.com/health/endpoints) — **Google**; list, reconcile,
  rollup, identity and source-family examples.
- [Webhooks](https://developers.google.com/health/webhooks) — **Google**; supported notification
  types and subscriber configuration.
- [Rate limits](https://developers.google.com/health/rate-limits) — **Google**; per-project and
  per-user request limits.
- [Fitbit Web API migration](https://developers.google.com/health/migration) — **Google**; new
  identities, OAuth re-consent, history backfill and temporary dual-stack guidance.
- [Legacy Fitbit Web API](https://dev.fitbit.com/build/reference/web-api/) — **Google/Fitbit**;
  endpoint catalogue retained for existing integrations.
- [Legacy application design](https://dev.fitbit.com/build/reference/web-api/developer-guide/application-design/)
  — **Google/Fitbit**; Personal, Client and Server application access, intraday approval and legacy
  quota.
- [Legacy intraday access](https://dev.fitbit.com/build/reference/web-api/intraday/) —
  **Google/Fitbit**; own-account access and case-by-case access for other users.
- [Legacy subscriptions](https://dev.fitbit.com/build/reference/web-api/developer-guide/using-subscriptions/)
  — **Google/Fitbit**; webhook collections and change-notification behavior.
- [Legacy ECG endpoint](https://dev.fitbit.com/build/reference/web-api/electrocardiogram/) —
  **Google/Fitbit**; ECG record access and research/investigational-use restriction.
- [Legacy activity log endpoint](https://dev.fitbit.com/build/reference/web-api/activity/get-activity-log-list/)
  — **Google/Fitbit**; exercise details, provenance and TCX download link.

## Official support

- [Use Health Connect with Google Health](https://support.google.com/fitbit/answer/14506680?hl=en) —
  **Google**; bidirectional integration, asymmetric read/write type lists, permissions and
  synchronization behavior.
- [Export Google Health data](https://support.google.com/googlehealth/answer/14236615?hl=en) —
  **Google**; migrated-account Takeout, original Fitbit-login complete archives and selectable
  exports, and per-GPS-workout TCX.
- [Download data with Google Takeout](https://support.google.com/accounts/answer/3024190?hl=en) —
  **Google**; general archive creation, scheduling, delivery and retention behavior for
  Google-account users.

## Integration documentation

- [Health Connect overview](https://developer.android.com/health-and-fitness/health-connect) —
  **Google/Android**; on-device shared store and record model; the Google Health support page above
  supplies the provider-specific direction and type evidence.
- [Upload and sync an activity](https://www.strava.com/upload/select) — **Strava**; signed-in
  manual file-upload entry point. Exact accepted Fitbit/Google Health fields still need testing.
- [Manually upload a workout file](https://help.trainingpeaks.com/hc/en-us/articles/204071914-How-to-manually-upload-a-workout-file)
  — **TrainingPeaks**; manual workout-file import.

## Open-source projects

- [`Google-Health-API/google-health-cli`](https://github.com/Google-Health-API/google-health-cli) —
  **Apache-2.0; Go**; purpose-built Google Health API v4 CLI with OAuth, schema discovery, list,
  reconcile, rollup and TCX support.
- [`wysie/google-health-local-sync`](https://github.com/wysie/google-health-local-sync) —
  **MIT; Python/SQLite**; local-first raw-payload sync with paging checkpoints and bounded backfill.
- [`davidmosiah/google-health-mcp`](https://github.com/davidmosiah/google-health-mcp) —
  **MIT; TypeScript**; beta local MCP wrapper for scoped Google Health API access.
- [`mountainash-io/fitbit-export`](https://github.com/mountainash-io/fitbit-export) —
  **MIT; Python**; legacy Fitbit Web API bulk downloader for JSON families and exercise TCX files.

## Secondary context

- [`orcasgit/python-fitbit`](https://github.com/orcasgit/python-fitbit) — older community Fitbit
  client excluded from the recommended project ledger: its repository contains an Apache-2.0
  licence, GitHub reports `NOASSERTION`, and the latest commit found was from 2019.
