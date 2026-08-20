# Zepp Health / Amazfit

**Evidence date:** 2026-08-20

**Canonical coverage:** [Zepp Health / Amazfit taxonomy mapping](./coverage.json)

## Bottom line

Zepp Health gives account holders a first-party privacy and data-portability surface for the Zepp
app, and the current mobile listings describe workout import/export. However, Zepp does not publish
a stable archive schema, a complete field inventory, or a self-service cloud API for an ordinary
account holder's full history.

The public [Zepp OS developer platform](https://docs.zepp.com/docs/intro/) is materially useful but
different: installed watch mini apps can read selected current, daily, and recent device values.
For example, official APIs expose heart rate, sleep stages and score, blood oxygen, stress, PAI,
and accelerometer samples on compatible devices. They do not document arbitrary Zepp cloud history
or parity with every value visible in the Zepp app.

For repeatable personal access, [Gadgetbridge](https://github.com/Freeyourgadget/Gadgetbridge)
offers the strongest local-first route for supported Amazfit devices. It synchronizes directly over
Bluetooth and therefore cannot recover complete cloud history or metrics no longer retained by the
device. Legacy Mi Fit/Zepp Life clients demonstrate older Huami service access but do not establish
equivalent private-cloud coverage for the current Zepp app.

This audit covers **Amazfit devices and the Zepp app**. Xiaomi's **Mi Fitness** application and
backend are a separate provider. Legacy Huami and Mi Fit names in URLs or project titles do not
establish Mi Fitness compatibility and are not used to merge the two ecosystems.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Zepp app data-portability request | Authenticated Zepp account holder | No; request workflow | Personal-data package | Public schema, formats, history and regional parity are undocumented |
| Zepp workout import/export | Zepp app user | No; app workflow | Workout records supported by the current app/device | Exact formats and field coverage require hands-on validation |
| Zepp OS device APIs | Registered developer and compatible Zepp OS device owner | Yes, while an installed mini app runs | Selected live, daily and recent device metrics | On-device interface, not a cloud account-history API |
| Supported integrations | Account holder with destination account | Route-dependent | Named partner connections; Strava activity sync is directly documented | Except for Strava, direction, fields and backfill are unknown from current evidence |
| Gadgetbridge | Owner of a supported Amazfit device | Yes, locally | Device-retained activity, sleep, heart rate, workouts and model-specific metrics | Model/firmware specific; pairing keys may be required |
| Legacy Mi Fit/Zepp Life private scripts | Technically capable legacy-app user | Yes when endpoints still work | Selected legacy workouts and account metadata | Current Zepp app applicability is unknown; unsupported endpoints and credentials are fragile |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | No | The app presents many captured, entered and derived outputs, but Zepp publishes no complete mapping to its privacy export, Zepp OS APIs or integrations |
| Self-service developer access | Partial | Zepp OS development is public and self-service, but it is device-local; no self-service personal cloud-history API was confirmed |
| Official automation | Partial | On-device mini apps and linked integrations automate selected data, but complete account automation is not documented |
| Complete history | Unknown | Zepp publishes neither archive depth nor a complete cloud/API retention and backfill contract |
| Raw and derived data coverage | Partial | Zepp OS exposes useful samples and summaries, while privacy export and integration coverage for proprietary scores and raw signals remain undocumented |
| **Overall personal-data openness** | **Restricted** | First-party export and selective automation exist, but complete repeatable account access is not documented and broad alternatives are unsupported |

## Data inventory and route coverage

The inventory combines the current
[Zepp app privacy policy](https://upload-cdn.zepp.com/tposts/8192), app-store descriptions and
official Zepp OS references. Availability varies by hardware, firmware, API level, region,
permissions and whether a record was captured, entered or derived. A policy statement that Zepp
processes a metric establishes app/account presence, not export availability.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` not available; `U` unknown from
current evidence; `NA` not applicable. `Privacy export` remains `U` where no public archive schema
exists. `Legacy private cloud` refers to reverse-engineered Mi Fit/Zepp Life evidence whose
applicability to the current Zepp app is unknown.

| Data family | Included metrics or app outputs | Captured or produced as | Privacy export | Workout export | Zepp OS | Integrations | Gadgetbridge | Legacy private cloud |
|---|---|---|---|---|---|---|---|---|
| Body measurements and composition | Weight, BMI, body fat, muscle, water, bone mass, body age | Scale, user-entered and derived values | U | NA | U | U | P | U |
| Daily movement | Steps, stand events, distance and floors | Motion-derived samples and daily summaries | U | N | A | U | A | U |
| Energy and active time | Calories, activity time, goals and HybridCharge Energy Intelligence | Derived daily/workout summaries and readiness estimate | U | P | A | U | A | U |
| Heart rate | Current, continuous, resting, zones and daily maximum | Optical samples plus summaries | U | P | A | U | A | U |
| HRV | Sleep HRV and app recovery inputs | Captured intervals plus derived summaries | U | U | U | U | P | U |
| Blood pressure | Manually added external readings | User-entered/external records | U | NA | U | U | P | U |
| ECG and rhythm | ECG and atrial-fibrillation records where supported | Electrical samples plus classification | U | NA | P | U | P | U |
| VO2 max | Exercise-capacity estimate | Workout-derived estimate | U | U | U | U | P | U |
| Blood oxygen | Current and recent SpO2 | Optical readings and hourly summaries | U | U | A | U | P | U |
| Temperature | Device-recorded temperature and readiness input | Sensor values plus baseline interpretation | U | U | P | U | P | U |
| Sleep sessions and stages | Sleep duration, REM, light/deep stages and naps | Sensor-derived intervals | U | N | A | U | A | U |
| Sleep insights and score | Sleep score, breathing and recovery quality | Proprietary derived outputs | U | N | A | U | P | U |
| Stress | Current, minute, hourly and seven-day stress values | Proprietary derived series | U | N | A | U | P | U |
| PAI, Readiness and HybridCharge | PAI; physical/mental recovery; Readiness; HybridCharge Energy Intelligence | Proprietary derived scores | U | N | P | U | P | U |
| Training load and status | Training effect, load, recovery and status | Workout-derived outputs | U | P | U | U | P | U |
| Performance predictions | Exercise capacity and Zepp Coach recommendations | Proprietary derived estimates | U | U | U | U | U | U |
| Workout sessions | Sport, duration, distance, pace, speed, calories and laps | Recorded session plus summaries | U | A | P | P | A | U |
| Route and elevation | GPS track, altitude, pressure and weather context | GNSS/barometer series | U | P | P | U | A | U |
| Sport dynamics | Cadence, stride, strokes, SWOLF and strength logs | Sensor values and derived fields | U | P | U | U | P | U |
| Plans and coaching | Zepp Coach plans, targets and recommendations | User preference plus proprietary coaching | U | U | U | U | U | U |
| Gait and functional mobility | One-legged standing test | Captured test plus derived result | U | NA | U | U | U | U |
| Cycle and reproductive health | Cycle dates, symptoms, mood and predictions | User-entered records plus predictions | U | NA | U | U | U | U |
| Nutrition and hydration | Food diary, calories and macronutrients | User-entered, photo-derived and external data | U | NA | U | U | U | U |
| Mood and symptoms | Emotion records and guidance | User-entered records plus guidance | U | NA | U | U | U | U |
| Hearing and audio exposure | Ambient sound and earphone volume | Captured and normalized values | U | NA | U | U | U | U |
| Trends, alerts and awards | Goals, HybridCharge, LifeLoad, readiness and coaching insights | Derived classifications and summaries | U | N | P | U | P | U |
| Raw sensors | Accelerometer and other supported device sensor callbacks | Live device-local samples | U | N | A | N | P | U |
| Provenance and metadata | Device ID, model, firmware, timestamps and source context | Device/account/file metadata | U | P | P | U | A | U |

`Workout export` is not treated as proof of every listed format or stream: the current app-store
listing confirms an import/export capability, while the exact app-version behavior still needs
hands-on testing. Likewise, receiving an input such as heart rate does not imply that a destination
receives Zepp's score derived from it. Route codes for the three families containing HybridCharge
also cover established calories, PAI or other insights; HybridCharge itself remains `U` on every
route because no extraction path is documented.

## Official access routes

### Privacy export and account rights

The current [Zepp app privacy policy](https://upload-cdn.zepp.com/tposts/8192) applies to the Zepp
app and Amazfit devices, describes the broad categories Zepp processes, and identifies data
portability among user rights. The first-party
[Huami privacy portal](https://user.huami.com/privacy2/index.html?loginPlatform=web&platform_app=com.huami.watch.hmwatchmanager)
exposes an authenticated export workflow for the Zepp app package.

Neither source publishes a versioned archive schema, file list, date-range behavior, generation
time, historical-depth guarantee, deletion treatment, or a metric-by-metric completeness promise.
The portal's Huami hostname is legacy first-party infrastructure; it is not evidence that the
separate Xiaomi Mi Fitness service uses the same export.

### Workout import and export

The current [Zepp Android listing](https://play.google.com/store/apps/details?id=com.huami.watch.hmwatchmanager)
and [Zepp iOS listing](https://apps.apple.com/us/app/zepp/id1127269366) state that storage access is
used to import or export workout data. This establishes a consumer-controlled activity route, not
its exact format. Current primary documentation reviewed here does not specify whether each
platform/device offers GPX, TCX, FIT, route-only, or another representation, nor whether every
sensor stream is retained.

### Zepp OS APIs

[Zepp OS](https://docs.zepp.com/docs/intro/) supports mini programs on current Amazfit watches.
Its permissioned device APIs expose useful local data:

- [Heart rate](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/HeartRate/) offers
  current/continuous values, minute data for today, resting heart rate, daily maximum and
  device-reported atrial-fibrillation records at supported API levels.
- [Sleep](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Sleep/) exposes duration,
  score, stages and naps; the system refresh cadence documented for sleep is 30 minutes.
- [Blood oxygen](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/BloodOxygen/)
  exposes current measurements, 24 hourly averages and recent samples on supported hardware.
- [Stress](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Stress/) exposes current,
  minute-level daily, hourly and seven-day values.
- [PAI](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Pai/) exposes current,
  daily and seven-day values.
- [Accelerometer](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/)
  exposes live x/y/z samples and selectable frequency modes.

These interfaces are device-, API-level- and permission-dependent. They do not establish arbitrary
date-range retrieval, unattended access after the mini app stops, a cloud OAuth grant, or complete
Zepp app parity.

## Data available

The privacy policy provides unusually broad evidence of what Zepp may collect or produce:
heart-rate families, SpO2, stress, PAI, PPG, HRV, ECG, body composition, exercise dynamics, GPS
tracks, temperature, sleep and REM, cycle records, mood, Readiness, Zepp Coach, food diary, device
metadata and settings. The current [Zepp app page](https://us.amazfit.com/pages/zepp-app) also
describes HybridCharge Energy Intelligence as a derived preparedness estimate that combines
training load, recovery inputs and sleep. No reviewed source establishes HybridCharge extraction
through any route. The policy distinguishes captured values from manually supplied and derived
outputs.

That breadth must not be mistaken for portability. The policy is a processing disclosure rather
than an export contract. Zepp OS documents selected device-local windows ranging from current
samples to today or the previous seven days; it does not document complete account history.

## Ecosystem integrations

| Destination | Direction | Confirmed scope | Material limits |
|---|---|---|---|
| Apple Health | Unknown | Unknown | Generic Apple documentation does not establish current Zepp direction, record types, history or deletion propagation |
| Android Health Connect | Unknown | Unknown | Generic Android documentation does not establish current Zepp read/write behavior or record types |
| Google Fit | Unknown | Unknown | Generic Google documentation does not establish current Zepp direction, fields or regional availability |
| [Strava](https://support.strava.com/en-us/articles/15402010-amazfit-and-strava) | Zepp/Amazfit to Strava | Newly synchronized eligible activities | Not daily health portability; payload and backfill vary |
| [TrainingPeaks](https://us.amazfit.com/pages/zepp-app) | Unknown | Current Zepp page names the platform | Direction, record types, history and device behavior are unknown |
| [komoot](https://us.amazfit.com/pages/zepp-app) | Unknown | Current Zepp page names the platform | Direction, routes, fields and backfill are unknown |
| [Runna](https://us.amazfit.com/pages/zepp-app) | Unknown | Current Zepp page names the platform | Direction, workout-plan behavior, fields and history are unknown |
| adidas Running | Unknown | Current Zepp page names the platform | Direction, fields and history are unknown |
| Relive | Unknown | No current provider-specific primary evidence established in this pass | Current support, direction, fields and history are unknown |

No reviewed integration establishes transfer of the complete account, raw PPG, every route,
user-entered records, PAI, Readiness, Zepp Coach outputs, sleep/stress scores, corrections or
deletions. Undocumented behavior is recorded as unknown rather than absent.

## Open-source routes

| Project | Route | Output | Assessment |
|---|---|---|---|
| [Gadgetbridge](https://github.com/Freeyourgadget/Gadgetbridge) | Direct Bluetooth sync with supported Amazfit devices | Local database/backups and model-dependent activity, sleep, HR, workout and GPX records | Strongest local-first route; AGPL-3.0; GitHub mirror is archived because active development moved to Codeberg |
| [`huami-token`](https://github.com/argrento/huami-token) | Unofficial Zepp or Xiaomi login selected explicitly | Device list, BLE authentication keys and account/session tokens | MIT; useful pairing helper, not a health-history exporter; Zepp and Mi Fitness modes remain distinct |
| [Mi Fit and Zepp workout exporter](https://github.com/rolandsz/Mi-Fit-and-Zepp-workout-exporter) | Undocumented legacy Mi Fit/Zepp Life (`com.xiaomi.hm.health`) endpoints or token | Workout files in multiple geospatial/tabular formats | MIT; does not evidence current Zepp app (`com.huami.watch.hmwatchmanager`) cloud access |

Gadgetbridge recovers device-retained data, not the user's historical Zepp cloud account. Pairing
can require keys and may disrupt the official-app relationship on some models. `huami-token`
processes credentials and returns reusable secrets. The workout exporter uses the legacy
`com.xiaomi.hm.health` package identifier associated with Mi Fit/Zepp Life; it is not evidence of
workout, route, sleep, daily-health or derived-score access for the current Zepp app.

## Material barriers and risks

- **Undocumented archive:** no public schema, field inventory, history guarantee or regional parity
  statement covers the privacy export.
- **No public personal cloud API:** public developer documentation covers Zepp OS mini apps, not
  complete account-history automation.
- **Device dependence:** Zepp OS and Gadgetbridge behavior varies by model, firmware, API level,
  permissions and retained device data.
- **Selective integrations:** platform stores and sport destinations receive subsets rather than a
  lossless Zepp copy.
- **Derived-metric opacity:** availability of source signals does not imply access to Readiness,
  PAI, sleep analysis, training status or Zepp Coach internals.
- **Private-client fragility:** login hosts, CAPTCHA/MFA, tokens, endpoints and schemas can change
  without notice.
- **Credential and key exposure:** account tokens and BLE keys are sensitive; exports and workout
  files may contain precise health and location history.
- **Provider confusion:** legacy Huami/Mi Fit terminology can lead projects to overstate support for
  Xiaomi Mi Fitness or current Zepp accounts.

## Rubric snapshot

This snapshot follows the repository's [provider audit rubric](../../audit-rubric.md).

| Dimension | Zepp Health / Amazfit finding |
|---|---|
| Consumer effort | Medium for privacy export; low once selective integrations are linked; high for local BLE or private clients |
| Cost | Core app, privacy request and Zepp OS tooling appear free; destination subscriptions may affect downstream features |
| Platform dependency | Privacy workflow is account/app based; Zepp OS and Gadgetbridge require compatible hardware; platform bridges depend on iOS/Android |
| Data completeness | Broad app data is documented, but no complete export or interface parity contract exists |
| Granularity | Strong for selected on-device APIs; unknown for the privacy archive and inconsistent across integrations |
| Historical depth | Unpublished for privacy export and cloud access; Zepp OS methods expose bounded current/today/recent windows |
| Automation | Selective official integrations and device-local APIs; no supported broad personal cloud automation confirmed |
| Formats | Workout formats need hands-on confirmation; Zepp OS returns JavaScript values; community tools produce local databases and workout files |
| User authorization | App/account authentication and destination grants; device permissions for Zepp OS; broad credentials/tokens for private clients |
| Developer access | Self-service device-app development, but no confirmed self-service personal cloud API |
| Integrations | Useful for workouts and selected platform-health records, not a full mirror |
| Provenance | Device/app metadata exists; preservation through export and integrations is undocumented |
| Corrections and deletion | Propagation to archives, linked platforms and partner services is unknown |
| Portability | A privacy route and workout export exist, but repeatable broad personal access remains unsupported |
| Evidence quality | Strong for current app inventory and Zepp OS methods; weaker for archive contents and integration field mappings |

## Provisional openness assessment

**Restricted: useful rights-based export and device-local development, but no documented complete
personal automation.**

Zepp Health is not a data dead end. It acknowledges portability rights, exposes an authenticated
export surface, describes workout import/export, supports selective destinations, and publishes
device-local health APIs richer than many wearable platforms. The gap is an ordinary account
holder's ability to retrieve and maintain a complete, repeatable, documented copy of cloud history.
The privacy package is unversioned publicly, while the broad automated alternatives are either
device-bounded or unofficial.

## Evidence gaps

1. Request fresh exports from EU, US and other-region Zepp accounts and inventory files, schemas,
   dates, source identifiers, raw/derived values and deletion markers.
2. Record the current iOS and Android privacy-export menu path, generation time, expiry and
   rate/repeat limits.
3. Exercise workout import/export on representative Amazfit watch and ring accounts and identify
   exact formats, streams, route precision and device metadata.
4. Compare the export against the Zepp UI for sleep, HRV, PAI, Readiness, stress, Zepp Coach,
   nutrition, cycle records and edited/manual values.
5. Capture Apple Health, Health Connect and Google Fit connection screens before asserting current
   Zepp support, direction, record types, backfill, correction or deletion behavior.
6. Link clean Strava, TrainingPeaks, komoot, Runna and adidas Running accounts to establish
   direction, eligible content, payload fidelity and historical limits; separately recheck Relive.
7. Build a Zepp OS test mini app across multiple API levels and devices to confirm runtime
   permissions, retention windows, sampling behavior and store-review constraints.
8. Test Gadgetbridge with recent Amazfit watches and Helio Ring while preserving the original Zepp
   pairing and unsynchronized data.
9. Threat-model `huami-token` and private workout exporter credential/session handling with a
   disposable account.
10. Audit Xiaomi Mi Fitness separately; do not carry Zepp findings across merely because a legacy
    Huami hostname or Xiaomi-labelled device appears in tooling.
