# Samsung resources

**Evidence date:** 2026-08-20

All links were checked on the evidence date. Samsung's former US export answer redirects to the
generic Samsung Health support page, so current archive details are corroborated by recent
open-source parsers and remain a hands-on evidence gap rather than an official schema claim.

## Official developer documentation

- [Samsung Health Data SDK overview](https://developer.samsung.com/health/data/overview.html) —
  **Samsung**; current v1.1.0 stored-data SDK, exact read/write type lists and platform limits.
- [Data SDK app creation process](https://developer.samsung.com/health/data/process.html) —
  **Samsung**; developer mode, partnership requirement, production registration and write access
  code.
- [Data SDK developer mode](https://developer.samsung.com/health/data/guide/developer-mode.html) —
  **Samsung**; test-only read mode and registered package/signature/data-scope model.
- [Data SDK FAQ](https://developer.samsung.com/health/data/faq.html) — **Samsung**; confirms selected
  Android reads from the Samsung Health data store and connected-device context.
- [Samsung Health Sensor SDK overview](https://developer.samsung.com/health/sensor/overview.html) —
  **Samsung**; current raw and processed Galaxy Watch signal catalogue.
- [Sensor data specifications](https://developer.samsung.com/health/sensor/guide/data-specifications.html)
  — **Samsung**; tracker types, raw/processed distinction, frequencies and device constraints.
- [Sensor SDK app creation process](https://developer.samsung.com/health/sensor/process.html) —
  **Samsung**; Galaxy Watch requirement, developer mode and production partnership gate.
- [Samsung Health Accessory SDK](https://developer.samsung.com/health/accessory/overview.html) —
  **Samsung**; approved inbound BLE device categories and certification.
- [Legacy Samsung Health SDK for Android](https://developer.samsung.com/health/android/overview.html)
  — **Samsung**; historical datastore SDK and explicit 31 July 2025 deprecation notice.
- [Samsung Health Research Stack](https://developer.samsung.com/health/research/overview.html) —
  **Samsung**; open-source participant app, portal and backend study architecture.

## Official support

- [Samsung Health app](https://www.samsung.com/us/apps/samsung-health/) — **Samsung**; current
  device/app features and region/device qualification notes for Energy Score, sleep, ECG/IHRN,
  blood pressure, body composition, medications, cycle tracking and records.
- [Samsung Health support](https://www.samsung.com/us/support/owners/app/samsung-health) —
  **Samsung**; current US support landing page and destination of the retired export answer.
- [Samsung Privacy](https://privacy.samsung.com/) — **Samsung**; formal privacy and data-subject
  request entry point, not a scheduled health-data API.
- [Samsung Health partnerships](https://developer.samsung.com/health/partnerships) — **Samsung**;
  health partnership context across research and digital-health programs.

## Integration documentation

- [Accessing Samsung Health data through Health Connect](https://developer.samsung.com/health/blog/en/accessing-samsung-health-data-through-health-connect)
  — **Samsung**; bidirectional behavior, permissions, sync timing, exact mapped types and explicit
  exclusion of Samsung Health activity-tracker data.
- [Managing sleep with Samsung Health and Health Connect](https://developer.samsung.com/health/blog/en/managing-sleep-data-with-samsung-health-and-health-connect)
  — **Samsung**; sleep session/stage synchronization and Galaxy Watch processing path.
- [Health Connect data types](https://developer.android.com/health-and-fitness/health-connect/data-types)
  — **Google**; current record categories and additional background/history permissions.
- [Reading Health Connect data](https://developer.android.com/health-and-fitness/health-connect/read-data)
  — **Google**; current foreground/background reads, pagination and default 30-day historical limit.
- [Samsung Health and Strava](https://support.strava.com/en-us/articles/15401747-samsung-health-and-strava)
  — **Strava**; current supported-connection article; exact payload needs rendered revalidation.

## Open-source projects

- [`v-2841/samsung-health-export`](https://github.com/v-2841/samsung-health-export) — **MIT;
  Python**; current local parser for Samsung download folders, producing self-describing JSON and a
  per-datatype coverage manifest. Very new and single-commit.
- [`Devasy/samsung-health-sdk`](https://github.com/Devasy/samsung-health-sdk) — **MIT; Python**;
  2026 parser for export CSV/JSON/attachments with data frames and dashboards. Low adoption; its
  derived analyses are not Samsung metrics.
- [`S-HealthStack/app-sdk`](https://github.com/S-HealthStack/app-sdk) — **Apache-2.0; Kotlin**;
  official open-source participant app SDK for Samsung Health Research Stack.
- [`S-HealthStack/backend-system`](https://github.com/S-HealthStack/backend-system) —
  **Apache-2.0; Kotlin/Java**; official open-source study backend and query services.

No maintained open-source Samsung consumer-account API client or modern Galaxy Watch/Galaxy Ring
protocol implementation was confirmed. Projects without a detected licence or demonstrated current
Samsung export/device support were excluded.

## Secondary context

- [Samsung Health Data SDK API reference](https://developer.samsung.com/health/data/api-reference/index.html)
  — **Samsung**; package index for the current proprietary SDK.
- [Research Stack REST API overview](https://developer.samsung.com/health/research/developer-guide/portal-REST-API-reference/overview.html)
  — **Samsung**; study-management and study-data APIs, not Samsung Health account APIs.
