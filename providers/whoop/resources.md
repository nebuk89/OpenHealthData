# WHOOP resources

**Evidence date:** 2026-08-20

All links were checked on the evidence date. WHOOP Support pages are JavaScript- and
authentication-sensitive; a reachable article route does not establish a field-level payload unless
the audit records accessible primary text.

## Official developer documentation

- [WHOOP API reference](https://developer.whoop.com/api/) — **WHOOP**; interactive public API
  reference.
- [Current WHOOP OpenAPI JSON](https://api.prod.whoop.com/developer/doc/openapi.json) —
  **WHOOP**; authoritative current public paths, OAuth scopes, parameters and schemas.
- [Developer Platform overview](https://developer.whoop.com/docs/developing/overview) —
  **WHOOP**; membership prerequisite, OAuth flow, API use and launch approval.
- [Getting Started](https://developer.whoop.com/docs/developing/getting-started) — **WHOOP**;
  self-service dashboard registration, five-app limit, scopes and client credentials.
- [OAuth 2.0](https://developer.whoop.com/docs/developing/oauth/) — **WHOOP**; authorization-code
  flow, consent, offline scope, rotating refresh tokens and revocation.
- [App Approval](https://developer.whoop.com/docs/developing/app-approval) — **WHOOP**; immediate
  ten-member development and approval requirements for wider launch.
- [API Rate Limiting](https://developer.whoop.com/docs/developing/rate-limiting) — **WHOOP**;
  default 100 requests/minute and 10,000/day per client plus increase requests.
- [Webhooks](https://developer.whoop.com/docs/developing/webhooks/) — **WHOOP**; signed v2 update
  and delete notifications for workout, Sleep and Recovery.
- [API changelog](https://developer.whoop.com/docs/api-changelog) — **WHOOP**; v2 launch, webhook
  migration and recent platform changes.
- [WHOOP API Terms of Use](https://developer.whoop.com/api-terms-of-use/) — **WHOOP**; current
  pricing, end-user consent, storage/security and usage restrictions.
- [WHOOP 101](https://developer.whoop.com/docs/whoop-101) — **WHOOP**; definitions of Strain,
  Recovery and Sleep.
- [Cycle model](https://developer.whoop.com/docs/developing/user-data/cycle) — **WHOOP**;
  physiological-cycle model and score states.
- [Recovery model](https://developer.whoop.com/docs/developing/user-data/recovery) — **WHOOP**;
  Recovery score and documented inputs.
- [Sleep model](https://developer.whoop.com/docs/developing/user-data/sleep) — **WHOOP**; sleeps,
  naps, stages, need and score fields.
- [Workout model](https://developer.whoop.com/docs/developing/user-data/workout) — **WHOOP**;
  sport, Strain, heart-rate zones, energy, distance and altitude fields.
- [User and body measurements](https://developer.whoop.com/docs/developing/user-data/user) —
  **WHOOP**; profile, height, weight and maximum-heart-rate fields.

## Official support

- [Access your WHOOP data: export and integrations](https://www.whoop.com/thelocker/access-your-whoop-data-with-new-integrations-data-export-options/)
  — **WHOOP**; current CSV workflow, entire-history option, named fields, Journal inclusion,
  WHOOP Life additional data and supported integration links.
- [WHOOP Journal](https://www.whoop.com/gb/en/thelocker/the-whoop-journal/) — **WHOOP**; 300+
  behaviors, editable entries, Impacts threshold, Trends and WHOOP AI patterns.
- [Introducing WHOOP 5.0 and WHOOP MG](https://www.whoop.com/gb/en/thelocker/introducing-whoop-5-0-and-whoop-mg/)
  — **WHOOP**; ECG, Blood Pressure Insights, WHOOP Age, Pace of Aging and Hormonal Insights,
  including device, membership and regional qualifications.
- [WHOOP Life](https://www.whoop.com/gb/en/life/) — **WHOOP**; current membership, regional and
  eligibility qualifications for ECG, rhythm notifications, Blood Pressure Insights, Hormonal
  Insights and Advanced Labs.
- [WHOOP privacy notices](https://www.whoop.com/us/en/privacy/) — **WHOOP**; collected consumer
  health categories, derived/inferred data, retention language and rights portal.
- [WHOOP Privacy Center](https://privacy.whoop.com/) — **WHOOP/Transcend**; current authenticated
  data-management request surface.

## Integration documentation

- [Apple Health Integration](https://support.whoop.com/s/article/Apple-Health-Integration?language=en_US)
  — **WHOOP Support**; current Apple Health connection route, category permissions and selected
  workout import/export behavior; page body may require browser rendering.
- [Google Health Integration for Android](https://support.whoop.com/s/article/Google-Health-Integration-For-Android?language=en_US)
  — **WHOOP Support**; bidirectional Health Connect categories: activities, distance, calories and
  body measurements inward; activities, calories, steps, sleep and selected Recovery metrics
  outward.
- [Strava Integration](https://support.whoop.com/s/article/Strava-Integration?language=en_US) —
  **WHOOP Support**; current WHOOP workout publication route; page body may require browser
  rendering.
- [TrainingPeaks Integration](https://support.whoop.com/s/article/TrainingPeaks-Integration?language=en_US)
  — **WHOOP Support**; outbound Recovery, Sleep and Strain metrics and TrainingPeaks Premium
  requirement; inbound plans and backfill are not documented.
- [Access your WHOOP data: integration catalogue](https://www.whoop.com/thelocker/access-your-whoop-data-with-new-integrations-data-export-options/)
  — **WHOOP**; names Apple Health, Strava and TrainingPeaks as current integrations without
  publishing a complete field matrix.

## Open-source projects

- [`hedgertronic/whoop`](https://github.com/hedgertronic/whoop) — **MIT; Python**; maintained
  OAuth 2.0 client for WHOOP API v2.
- [`prankstr/hassio-whoop`](https://github.com/prankstr/hassio-whoop) — **MIT; Python/Home
  Assistant**; maintained OAuth integration exposing current WHOOP summaries as sensors.
- [`kryoseu/whoops`](https://github.com/kryoseu/whoops) — **Apache-2.0; Python/SQL**; self-hosted
  API importer with token refresh and PostgreSQL/MySQL storage.
- [`christianmeurer/whoop-reader`](https://github.com/christianmeurer/whoop-reader) — **MIT;
  Python/BLE**; WHOOP 4.0 live sensor interoperability research.
- [`Sophonbot0/whoop-vault`](https://github.com/Sophonbot0/whoop-vault) — **MIT; Python/BLE/SQLite**;
  WHOOP 5.0 device-history research and first-party CSV ingestion.

## Secondary context

- [WHOOP Developer Platform launch article](https://www.whoop.com/thelocker/access-your-whoop-data-with-new-integrations-data-export-options/)
  — also the current first-party export procedure; retained once in this index because it covers
  both consumer export and the supported integration catalogue.
