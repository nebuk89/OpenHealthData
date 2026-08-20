# Garmin resources

**Evidence date:** 2026-08-20

All resources were accessed on the evidence date. Garmin Support FAQ pages are JavaScript-rendered;
an HTTP 200 confirms link availability but not the rendered article body.

## Official developer documentation

- [Garmin Connect Developer Program overview](https://developer.garmin.com/gc-developer-program/overview/)
  — **Garmin**; current cloud API catalogue and data direction.
- [Developer Program FAQ](https://developer.garmin.com/gc-developer-program/program-faq/) —
  **Garmin**; business eligibility, OAuth 2.0, approval and licensing conditions.
- [Health API](https://developer.garmin.com/gc-developer-program/health-api/) — **Garmin**;
  JSON health categories, delivery modes, consent, backfill and commercial-licence note.
- [Activity API](https://developer.garmin.com/gc-developer-program/activity-api/) — **Garmin**;
  activity detail, FIT/GPX/TCX access, consent and delivery architecture.
- [Women's Health API](https://developer.garmin.com/gc-developer-program/womens-health-api/) —
  **Garmin**; consented cycle and pregnancy data in JSON.
- [Training API](https://developer.garmin.com/gc-developer-program/training-api/) — **Garmin**;
  structured workouts and plans sent to compatible devices.
- [Courses API](https://developer.garmin.com/gc-developer-program/courses-api/) — **Garmin**;
  partner-created courses sent to compatible devices.
- [Garmin Health SDKs](https://developer.garmin.com/health-sdk/overview/) — **Garmin**; approved
  enterprise mobile SDKs for all-day data, direct logging and real-time sensor streams.
- [Connect IQ overview](https://developer.garmin.com/connect-iq/overview/) — **Garmin**;
  on-device application platform and sensor/feature access.
- [FIT protocol overview](https://developer.garmin.com/fit/overview/) — **Garmin**; official FIT
  data model, supported SDK languages and local tooling.

## Official support

- [Export Your Data](https://www.garmin.com/en-US/account/datamanagement/exportdata/) —
  **Garmin**; signed-in first-party account-archive request.
- [Garmin privacy hub](https://www.garmin.com/en-US/privacy/) — **Garmin**; privacy policy and
  regional account-rights entry point.
- [Exporting files from Garmin Connect](https://support.strava.com/en-us/articles/15402167-exporting-files-from-garmin-connect)
  — **Strava**; current instructions for Garmin's per-activity FIT/GPX/TCX export controls.
- [Garmin health science](https://www.garmin.com/en-US/garmin-technology/health-science/) —
  **Garmin**; device/app health-feature catalogue. The page is JavaScript-rendered, so individual
  feature claims require rendered or product-manual confirmation.
- [Garmin physiological measurements](https://www.garmin.com/en-US/garmin-technology/running-science/physiological-measurements/)
  — **Garmin**; catalogue of performance and training-derived measurements on selected devices.
- [Garmin sleep tracking](https://www.garmin.com/en-US/garmin-technology/health-science/sleep-tracking/)
  — **Garmin**; device-dependent sleep analysis and app outputs.
- [Body Battery energy monitoring](https://www.garmin.com/en-US/garmin-technology/health-science/body-battery/)
  — **Garmin**; first-party description of Garmin's proprietary energy score.

## Integration documentation

- [Garmin Connect and Apple Health](https://support.garmin.com/en-US/?faq=lK5FPB9iPF5PXFkIpFlFPA)
  — **Garmin**; reported Garmin-to-Apple Health sharing; exact categories require rendered
  revalidation because automated retrieval returns only the support shell.
- [Garmin and Strava](https://support.strava.com/en-us/articles/15401903-garmin-and-strava) —
  **Strava**; automatic Garmin activity synchronization.
- [Syncing Strava Routes to Garmin](https://support.strava.com/en-us/articles/15401810-syncing-strava-routes-to-your-garmin-device)
  — **Strava**; saved route delivery to compatible Garmin devices.
- [Garmin Connect with TrainingPeaks](https://help.trainingpeaks.com/hc/en-us/articles/204070854-How-to-Sync-Garmin-Connect-With-TrainingPeaks)
  — **TrainingPeaks**; activity/health sync, five-year optional workout backfill and structured
  workouts sent to Garmin.
- [Garmin Connect with MyFitnessPal](https://support.myfitnesspal.com/hc/en-us/articles/360040110912-Garmin-Connect-FAQ-and-Troubleshooting)
  — **MyFitnessPal**; exact directional categories and future-only transfer.
- [Using komoot on Garmin](https://support.komoot.com/hc/en-us/articles/10317378384666-Use-the-komoot-app-for-Garmin)
  — **komoot**; route delivery, navigation modes and device-dependent activity return.

## Open-source projects

- [`cyberjunky/python-garminconnect`](https://github.com/cyberjunky/python-garminconnect) —
  **MIT; Python**; broad unofficial client using Garmin's consumer mobile/private services.
- [`tcgoetz/GarminDB`](https://github.com/tcgoetz/GarminDB) — **GPL-2.0; Python/SQLite**;
  repeatable download, local archive, database and analysis workflow.
- [`james-langridge/garmin-export-parser`](https://github.com/james-langridge/garmin-export-parser)
  — **MIT; TypeScript**; parser for first-party Garmin account-export ZIP files.
- [`polyvertex/fitdecode`](https://github.com/polyvertex/fitdecode) — **MIT; Python**; maintained
  local FIT decoder with JSON and text output.
- [`dtcooper/python-fitparse`](https://github.com/dtcooper/python-fitparse) — **MIT; Python**;
  established local FIT parser whose maintainer reports limited availability.
- [`garmin/fit-sdk-tools`](https://github.com/garmin/fit-sdk-tools) — **NOASSERTION; Java/data**;
  official FIT profile, CSV conversion, repair tools and examples.
- [`pe-st/garmin-connect-export`](https://github.com/pe-st/garmin-connect-export) —
  **MIT; Python**; activity exporter currently blocked by Garmin TLS fingerprinting.

## Secondary context

- [Android Health Connect](https://developer.android.com/health-and-fitness/health-connect) —
  **Google**; platform model used when evaluating, but not evidence of a Garmin integration.
