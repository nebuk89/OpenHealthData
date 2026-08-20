# Garmin

**Evidence date:** 2026-08-20

## Bottom line

Garmin gives an account holder a signed-in
[Export Your Data](https://www.garmin.com/en-US/account/datamanagement/exportdata/) route and
manual activity-file exports, but it does not document an unrestricted consumer cloud API.
Official automated cloud access sits behind the enterprise-only
[Garmin Connect Developer Program](https://developer.garmin.com/gc-developer-program/overview/).
That program has strong health and activity coverage, pre-production developer tooling and OAuth
2.0 consent, but it requires business approval and some commercially used metrics require a
licence fee.

For a person retrieving their own data, the safest route is the first-party account archive plus
local parsing. Unofficial clients can automate much more of Garmin Connect, but they authenticate
against private consumer services, hold powerful account tokens and can stop working whenever
Garmin changes login or endpoint behaviour.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Export Your Data | Garmin account holder | No; asynchronous request | Account archive | Sign-in required; contents and schema are not publicly versioned |
| Individual activity export | Garmin account holder | No | One activity as FIT, GPX or TCX where available | Activity-only and one-at-a-time |
| Garmin Connect Health API | Approved business | Yes | All-day health summaries and detailed metrics | Enterprise approval; commercial use of some metrics is licensed |
| Garmin Connect Activity API | Approved business | Yes | Activity details and FIT/GPX/TCX files | Enterprise approval and user OAuth consent |
| Garmin Health SDKs | Approved enterprise partner | Yes | Direct mobile access and real-time streams | Evaluation licence, compatible device and custom app required |
| Connect IQ | Individual or business developer | App-dependent | Sensors and features exposed on a compatible device | Not an account-history API |
| FIT SDK and tools | Anyone with a FIT file | Yes, locally | Records present in that file | Does not retrieve data from Garmin Connect |
| Unofficial account clients | Technically capable account holder | Yes | Broad private Garmin Connect surfaces | Unsupported, credential-sensitive and breakable |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Unknown | Garmin does not publish a complete mapping from Garmin Connect app data to its consumer export, partner APIs or FIT files |
| Self-service developer access | No | Official Garmin Connect cloud APIs are for approved businesses, not ordinary users building personal clients |
| Official automation | No | Consumers get manual account/activity exports; broad personal automation depends on unsupported private endpoints |
| Complete history | Unknown | Archive depth, API retention and every-metric backfill are not publicly guaranteed |
| Raw and derived data coverage | Partial | FIT and partner products expose rich records, but proprietary scores, source detail and every app-visible metric are not guaranteed |
| **Overall personal-data openness** | **Restricted** | Useful machine-readable exports exist, but supported programmable access is partner-gated |

## Data inventory and route coverage

This family-level inventory combines Garmin's
[health](https://developer.garmin.com/gc-developer-program/health-api/),
[activity](https://developer.garmin.com/gc-developer-program/activity-api/) and
[women's health](https://developer.garmin.com/gc-developer-program/womens-health-api/) API
catalogues with its device/app feature catalogues for
[health science](https://www.garmin.com/en-US/garmin-technology/health-science/) and
[physiological measurements](https://www.garmin.com/en-US/garmin-technology/running-science/physiological-measurements/).
Features vary substantially by device, sensors, firmware, region and subscription. Garmin's
feature pages are JavaScript-rendered and no official field-by-device/export parity matrix exists.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` not available; `U` unknown from
current evidence; `NA` not applicable. `Archive` remains `U` where Garmin has not published a
schema. `Health API`, `Activity API`, `Women's API`, `Training/Courses APIs` and `Health SDK` are
business-gated, not ordinary-user developer routes.

| Data family | Included metrics or app outputs | Captured or produced as | Archive | Activity FIT/GPX/TCX | Health API | Activity API | Women's API | Training/Courses APIs | Health SDK | Connect IQ | Supported integrations | Unofficial clients/parsers |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Daily movement and energy | Steps, distance, floors, active/resting calories | Motion-derived epochs and daily summaries | U | P | A | NA | NA | NA | P | P | P | A |
| Heart rate | Continuous, resting and workout HR; zones | Optical/electrical samples plus summaries | U | A | A | A | NA | NA | A | P | P | A |
| HRV status | Overnight HRV, baseline and status bands | Firstbeat-derived trend and classification | U | N | U | NA | NA | NA | U | U | U | P |
| Pulse Ox | Overnight and on-demand SpO2 | Optical samples and summaries | U | P | A | NA | NA | NA | P | U | P | A |
| Respiration | All-day, sleep and activity respiration | Sensor-derived epochs | U | P | A | NA | NA | NA | U | U | P | A |
| Skin/body temperature | Overnight skin-temperature deviation on compatible devices | Sensor samples plus baseline deviation | U | U | U | NA | NA | NA | U | U | U | P |
| Stress | All-day stress levels and trends | Firstbeat-derived epochs and daily summaries | U | U | A | NA | NA | NA | P | U | U | A |
| Body Battery | Energy level, charge and drain | Proprietary HRV/stress/activity/sleep derivation | U | N | U | NA | NA | NA | P | U | N | A |
| Sleep | Duration, stages, score, naps and coaching where supported | Sensor-derived intervals plus proprietary score | U | N | A | NA | NA | NA | P | U | P | A |
| Body composition | Weight, BMI, body fat, muscle, bone and water from compatible scales | Connected-scale or entered measurements | U | NA | A | NA | NA | NA | P | NA | P | A |
| VO2 max | Running and cycling VO2 max estimates | Firstbeat-derived periodic estimate | U | U | U | U | NA | NA | U | U | N | P |
| Training status, load and readiness | Status, load, readiness, recovery and training effect | Proprietary workout and wellness derivations | U | P | U | U | NA | NA | U | U | N | P |
| Other performance predictions | Additional first-party performance estimates on selected devices; exact current list needs rendered confirmation | Proprietary derived estimates | U | P | U | U | NA | NA | U | U | N | P |
| Activity summary | Sport, duration, distance, calories, laps and events | Recorded session plus summaries | U | A | NA | A | NA | NA | P | P | A | A |
| GPS route and elevation | Track points, course, speed/pace and elevation | GNSS/barometer series | U | A | NA | A | NA | P | P | P | A | A |
| Sport dynamics | Power, cadence, stride, running dynamics, swim strokes and SWOLF | Device/sensor series and derived fields | U | A | NA | A | NA | NA | P | P | P | A |
| Intensity Minutes and Move IQ | Moderate/vigorous minutes and auto-detected activity events | Garmin-derived aggregates/classification | U | U | U | U | NA | NA | P | U | U | P |
| Women's health | Cycle logging, symptoms, pregnancy and predictions | User-entered records plus app-derived predictions | U | NA | NA | NA | A | NA | U | NA | U | P |
| Health Snapshot | Two-minute HR, HRV, SpO2, respiration and stress bundle | Captured point-in-time bundle | U | U | U | U | NA | NA | P | U | U | P |
| ECG | Waveform and classification on supported models/regions | Electrical series plus regulated classification | U | U | U | U | NA | NA | U | U | U | U |
| Nutrition and hydration | Food/calories and water logs | User-entered or connected-app records | U | NA | U | NA | NA | NA | U | U | P | A |
| Structured workouts, plans and courses | Workout steps, targets, training plans and navigation courses | User/coach-authored content sent to devices | U | P | NA | NA | NA | A | P | P | A | P |
| Real-time sensor streams | Live HR, accelerometer and current-activity metrics | Device streams | NA | NA | NA | NA | NA | NA | A | P | NA | P |
| Provenance and device metadata | Device, sensor, firmware, session and record metadata | File/API metadata | U | A | P | A | NA | NA | P | P | P | A |

`Supported integrations` aggregates the consumer routes in the
[route-by-route table](#ecosystem-integrations); none is a lossless mirror. `Unofficial
clients/parsers` combines private Garmin Connect clients with parsers for files already obtained.
The former can expose cloud-only scores but carry account-token risk; the latter cannot recover
records that Garmin did not write to a file.

## Official access routes

### Account archive and privacy access

Garmin's [Export Your Data](https://www.garmin.com/en-US/account/datamanagement/exportdata/)
endpoint sends an unauthenticated visitor to Garmin SSO, confirming that the account holder must
sign in before requesting an archive. The process is the broadest first-party consumer route, but
Garmin does not publish a stable field inventory, schema, retention guarantee or equivalence
statement for every product and region.

Community tooling provides useful evidence about current archive contents, not a contractual
guarantee. For example,
[`garmin-export-parser`](https://github.com/james-langridge/garmin-export-parser) parses complete
Garmin export ZIP files and identifies activities, daily summaries, sleep sessions and training
metrics. A hands-on request is still needed to establish exactly what Garmin supplies for a given
account.

Garmin's [privacy hub](https://www.garmin.com/en-US/privacy/) provides the policy and regional
rights context. Statutory access and deletion rights should not be confused with an always-on API.

### Individual activity export

Garmin Connect can export an individual activity as original FIT, GPX or TCX data where the
activity supports that format. Strava's current
[Garmin export instructions](https://support.strava.com/en-us/articles/15402167-exporting-files-from-garmin-connect)
document this user-controlled path. It preserves useful session, route and sensor information,
especially in FIT, but does not include the complete sleep, wellness, training-status or account
history.

### Garmin Connect Developer Program

The [program overview](https://developer.garmin.com/gc-developer-program/overview/) separates
cloud APIs that deliver data from Garmin Connect from APIs that publish training content back to
Garmin:

- [Health API](https://developer.garmin.com/gc-developer-program/health-api/) delivers JSON for
  steps, heart rate, calories, sleep, respiration, body composition, stress, pulse ox and
  all-day epoch summaries. It supports push or ping/pull delivery and customised feeds. Its
  Developer Web Tools advertise sample and backfill data for pre-production verification; the
  public page does not establish retrieval of a live user's pre-consent history.
- [Activity API](https://developer.garmin.com/gc-developer-program/activity-api/) supplies
  detailed fitness activities and FIT, GPX or TCX files. Data becomes available after the user
  consents and syncs a device to Garmin Connect.
- [Women's Health API](https://developer.garmin.com/gc-developer-program/womens-health-api/)
  supplies consented menstrual-cycle and pregnancy information as JSON.
- [Training API](https://developer.garmin.com/gc-developer-program/training-api/) and
  [Courses API](https://developer.garmin.com/gc-developer-program/courses-api/) push structured
  workouts, plans and courses to compatible devices; they are not extraction APIs.

The [program FAQ](https://developer.garmin.com/gc-developer-program/program-faq/) says the program
is for enterprise/business use, all APIs use OAuth 2.0, and applications are reviewed before
access. It states there are no general licensing or maintenance fees, while access to some
metrics may require a commercial licence fee or minimum device order. Public documentation does
not establish a hobbyist or personal-use approval route.

### Garmin Health SDKs and Connect IQ

The enterprise-only [Garmin Health SDKs](https://developer.garmin.com/health-sdk/overview/) provide
more direct device access than the cloud APIs. The Companion SDK can stream heart rate, stress,
accelerometer and other current sensor data while retaining Garmin Connect compatibility. The
Standard SDK can create a controlled mobile/device workflow that does not use Garmin servers.
Both require partner access, evaluation licences, compatible devices and an Android or iOS app.

[Connect IQ](https://developer.garmin.com/connect-iq/overview/) is Garmin's app platform for
compatible wearables. It exposes device sensors and features to installed apps, but Garmin does
not describe it as a route to a user's complete historical Garmin Connect account.

### FIT protocol and tools

The [FIT protocol](https://developer.garmin.com/fit/overview/) stores activity, course, workout
and other sport/health-device records in a compact binary format. Garmin publishes SDKs for
several languages and the
[`fit-sdk-tools`](https://github.com/garmin/fit-sdk-tools) repository, including the FIT profile,
CSV conversion, repair tooling and example files. These tools process files already under the
user's control; they do not authenticate to Garmin Connect or recover records that were never
written to a FIT file.

## Data available

Official enterprise surfaces cover substantially more than workout summaries. The Health API
documents all-day and interval data including heart rate, steps, sleep, stress, respiration,
body composition and pulse ox, while the Activity API can provide full activity files. Garmin
Health SDKs add live streams and, depending on product and approval, configurable logging.

Availability is not universal. It varies with device family, firmware, enabled sensors, account
state, region, user consent and the approved API product. Garmin's FAQ says the team aims to add
new device/data support but cannot always offer every metric. Public pages do not provide a
complete field-by-device matrix, fixed retention period, universal sampling interval or
consumer-export schema.

FIT is usually the richest portable activity format because it can retain laps, records, device
metadata, routes and sensor values. GPX and TCX can be useful for interoperability but are
narrower. The account archive may contain additional JSON and other records; its exact packaging
must be checked against a real export.

The Health SDK comparison also lists Body Battery, Health Snapshot, Index Scale biometrics,
intensity minutes and Move IQ among metrics available through the Developer Program. Public pages
do not map every listed metric to a specific cloud endpoint, approval tier or historical depth, so
that broader coverage still needs partner-level validation.

## Ecosystem integrations

| Destination | Direction | Confirmed payload and history | Material limits |
|---|---|---|---|
| [Apple Health](https://support.garmin.com/en-US/?faq=lK5FPB9iPF5PXFkIpFlFPA) | Garmin Connect → Apple Health reported | Selected activities and health categories after mobile sync | Garmin's dynamic support page returns an empty shell to automated retrieval; exact categories need rendered revalidation and no reverse route is documented |
| [Strava](https://support.strava.com/en-us/articles/15401903-garmin-and-strava) | Garmin → Strava activities | Automatic activity sync after account connection | Garmin wellness history and proprietary scores are not included |
| [Strava Routes](https://support.strava.com/en-us/articles/15401810-syncing-strava-routes-to-your-garmin-device) | Strava → compatible Garmin devices | Saved/starred routes through Garmin Connect sync | Course/navigation transfer, not health-data import |
| [TrainingPeaks](https://help.trainingpeaks.com/hc/en-us/articles/204070854-How-to-Sync-Garmin-Connect-With-TrainingPeaks) | Both directions by type | Garmin activities and selected daily health metrics outward; structured workouts inward; optional activity backfill up to five years | No historic body-composition or daily-health backfill; only the next 15 days of eligible workouts sync inward |
| [MyFitnessPal](https://support.myfitnesspal.com/hc/en-us/articles/360040110912-Garmin-Connect-FAQ-and-Troubleshooting) | Both directions by type | Garmin workouts, steps, calorie burn and weight outward; consumed calories and MyFitnessPal workouts inward | Only future information transfers after linking; not general health-history sync |
| [Komoot](https://support.komoot.com/hc/en-us/articles/10317378384666-Use-the-komoot-app-for-Garmin) | Routes to Garmin; activities may return | Saved routes, navigation and device-dependent dual activity sync | Device/subscription dependent; route conversion can alter navigation details |

No current first-party Garmin route to Android Health Connect, Samsung Health or Google Fit was
established from live official documentation in this pass. That is a qualified "no documented
route found" result, not proof that no regional beta or third-party relay exists.

## Open-source routes

| Project | Route | Output | Assessment |
|---|---|---|---|
| [`python-garminconnect`](https://github.com/cyberjunky/python-garminconnect) | Authenticates to Garmin's consumer mobile/private services | Broad Python/JSON health, activity, device and account records | Active and comprehensive; MIT; persistent tokens are effectively account credentials |
| [GarminDB](https://github.com/tcgoetz/GarminDB) | Downloads Garmin Connect records and imports FIT/JSON | Local SQLite databases, retained source files and reports | Strong personal archive; GPL-2.0; stores sensitive credentials and data locally |
| [`garmin-export-parser`](https://github.com/james-langridge/garmin-export-parser) | Parses the first-party account export ZIP | Typed activities, daily summaries, sleep and training metrics | Safer official-export route; MIT; young project with very limited adoption |
| [`fitdecode`](https://github.com/polyvertex/fitdecode) | Parses local FIT files | Python records plus JSON/text CLI output | Maintained FIT parser; MIT; cannot retrieve account-only data |
| [`python-fitparse`](https://github.com/dtcooper/python-fitparse) | Parses local FIT files | Python records and JSON/readable CLI output | MIT and widely used, but its maintainer explicitly reports limited availability |
| [`fit-sdk-tools`](https://github.com/garmin/fit-sdk-tools) | Official local FIT tools/profile | FIT/CSV conversion, repair and reference files | Current Garmin source; no GitHub-detected licence (`NOASSERTION`) |
| [`garmin-connect-export`](https://github.com/pe-st/garmin-connect-export) | Private Garmin Connect download | CSV plus GPX/TCX/FIT/JSON activity files | MIT, but maintainer says Garmin TLS fingerprinting currently blocks the tool |

The unofficial account clients are materially different from OAuth-based partner APIs. They use a
consumer login or stored mobile-session tokens with broad account authority rather than a narrow,
reviewed third-party grant. They should be self-hosted, rate-limited and isolated from unrelated
credentials. The first-party archive plus local parsing is slower but has a smaller account-risk
surface.

## Material barriers and risks

- **Business gate:** official automated cloud and direct-device access requires enterprise
  approval; some metrics have commercial licensing conditions.
- **No consumer OAuth API:** an individual cannot register a small personal client against the
  documented Garmin Connect APIs.
- **Manual export:** account and activity exports are request/UI workflows rather than scheduled
  feeds.
- **Undocumented archive:** no public versioned schema or completeness guarantee covers the
  account ZIP.
- **Private-client fragility:** authentication, bot protection and endpoint changes can break
  unofficial tools without notice.
- **Credential exposure:** passwords, MFA sessions and refresh tokens can grant broad Garmin
  account access; resulting JSON, FIT and SQLite files contain sensitive location and health data.
- **Selective integrations:** connected services receive product-specific subsets, not a
  lossless Garmin account copy.
- **Derived metrics:** receiving a Garmin score does not provide the source algorithm or guarantee
  that it can be reproduced outside Garmin.

## Rubric snapshot

This snapshot follows the repository's [provider audit rubric](../../audit-rubric.md).

| Dimension | Garmin finding |
|---|---|
| Consumer effort | Low-to-medium for a one-off archive; high for supported automation |
| Cost | Consumer export is included; enterprise APIs may require licensed metrics or device commitments |
| Platform dependency | Export is web-based; richer official SDK paths require Garmin devices and approved mobile/cloud integrations |
| Data completeness | Broad account and enterprise coverage, but no public archive schema or every-metric guarantee |
| Granularity | Strong for FIT activities and approved API/SDK feeds; variable by device and product |
| Historical depth | Archive depth and API retention are not publicly guaranteed; pre-production Developer Web Tools advertise backfill, not live pre-consent history |
| Automation | Strong for approved businesses; unsupported private clients are the only broad personal automation route found |
| Formats | Account ZIP, FIT/GPX/TCX files, JSON APIs and local SQLite/JSON through community tools |
| User authorization | OAuth 2.0 for approved APIs; broad credentials/tokens for unofficial clients |
| Developer access | Business-only approval rather than self-service personal registration |
| Integrations | Strong for activities/training, selective for health records and derived metrics |
| Provenance | FIT can preserve device, record and sensor metadata; downstream platforms often normalize it |
| Corrections and deletion | Propagation across export, APIs and partner services remains undocumented |
| Portability | Good for individual activities and the account archive; weak for ongoing consumer-controlled automation |
| Evidence quality | Strong current developer/integration evidence; archive contents and deletion behaviour need hands-on testing |

## Provisional openness assessment

**Mixed: useful first-party portability, strong enterprise access, weak personal automation.**

Garmin is not a closed dashboard: users can request an account archive and export activity files,
FIT is a documented portable protocol, and approved integrations can receive rich health and
activity data. The openness gap is control. The documented APIs and direct-device SDKs target
businesses, while an individual who wants repeatable access must either keep requesting exports or
accept the operational and account-security risks of private endpoints.

## Evidence gaps

1. Request a fresh account export and inventory every directory, format, metric, date range,
   deletion marker and source identifier.
2. Compare archive records with Garmin Connect UI totals and original FIT files from the same
   period.
3. Confirm account-export preparation time, expiry, regional differences and whether repeated
   requests are rate-limited.
4. Obtain a Developer Program evaluation and record exact scopes, quotas, backfill limits,
   delivery latency, retention and consent-revocation behaviour.
5. Test whether Garmin Connect+ changes any export or API-visible field.
6. Exercise Apple Health, TrainingPeaks and MyFitnessPal connections to measure category coverage,
   duplicate handling, edits, deletion propagation and historical limits.
7. Render and archive Garmin's JavaScript-dependent Apple Health support article before treating
   its category list as verified evidence.
8. Recheck Android Health Connect support in the current Garmin Connect Android release.
9. Validate `garmin-export-parser` against several real 2026 archives and unknown/new file types.
10. Threat-model unofficial-client token storage and confirm current login behaviour using a
   disposable test account.
