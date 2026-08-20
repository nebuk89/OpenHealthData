# Samsung

**Evidence date:** 2026-08-20

**Canonical coverage:** [Samsung taxonomy mapping](./coverage.json)

## Bottom line

Samsung gives an ordinary Android user two materially different routes: a manual Samsung Health
personal-data download and permissioned synchronization through
[Health Connect](https://developer.samsung.com/health/blog/en/accessing-samsung-health-data-through-health-connect).
Health Connect is automatable and self-service, but Samsung documents only a selected cross-platform
record set. It explicitly excludes Samsung Health's activity-tracker records from that sync and does
not promise transfer of proprietary app interpretations such as coaching or every Samsung-specific
score.

The richer current [Samsung Health Data SDK](https://developer.samsung.com/health/data/overview.html)
and [Samsung Health Sensor SDK](https://developer.samsung.com/health/sensor/overview.html) are not
ordinary consumer APIs. Testing can use hidden developer modes, but Samsung requires partnership
approval and app registration for distribution. Samsung publishes no general consumer-account cloud
API. The result is useful but incomplete personal automation: **Partial** openness rather than full
app-to-interface parity.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Samsung Health personal-data download | Samsung Health user | No; in-app request | Broad app archive observed as per-type CSV plus JSON/binary attachments | Samsung's former export support URL now redirects to a generic app page; no current versioned schema or completeness statement |
| Health Connect | Android user and authorized app | Yes | Selected bidirectional health records | Android-only; category permissions; no guarantee for proprietary scores, raw sensors or complete history |
| Samsung Health Data SDK | Developer in test mode; approved partner in production | Yes, on device | Selected Samsung Health datastore records | Production distribution is partner-gated; Android 10+, Samsung Health 6.30.2+ |
| Samsung Health Sensor SDK | Watch developer in test mode; approved partner in production | Yes, live/on device | Raw ECG/PPG/accelerometer and selected processed measurements | Galaxy Watch4+; production distribution is partner-gated; not account history |
| Samsung Health Accessory SDK | Approved device partner | Device sync | BLE device measurements sent into Samsung Health | Inbound integration and certification route, not consumer extraction |
| Samsung Health SDK for Android | Existing legacy integrations | Historically automated | Older Samsung Health datastore types | Deprecated on 31 July 2025; Samsung directs new work to Data SDK |
| Strava connected service | Linked Samsung Health and Strava user | Yes after linking | Activity-focused transfer | Current help page exists, but exact fields and backfill require rendered revalidation |
| Samsung Health Research Stack | Research team and enrolled participants | Study-specific | Data intentionally collected by a study app | Open-source study infrastructure, not retrieval of a participant's pre-existing Samsung Health account |
| Open-source archive parsers | User holding an export | Yes, locally | Fields present in the downloaded archive | Young community projects; archive schema can change |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | No | The current Data SDK list, Health Connect map and Sensor SDK each expose different subsets; no route covers every app-visible score, coaching output, clinical record and raw signal |
| Self-service developer access | Partial | Health Connect is self-service, while production Data SDK and Sensor SDK applications require Samsung partnership approval |
| Official automation | Yes | Health Connect supports permissioned recurring reads; it is selected-record automation rather than a complete Samsung Health mirror |
| Complete history | Unknown | Samsung publishes no complete-history guarantee for the app download, Data SDK or Health Connect |
| Raw and derived data coverage | Partial | Sensor SDK exposes valuable raw watch signals and Data SDK exposes Energy Score, but those partner-gated surfaces do not establish ordinary-user access to every raw and derived output |
| **Overall personal-data openness** | **Partial** | Meaningful self-service official automation exists through Health Connect, but it is Android-dependent and materially narrower than Samsung's app/device data |

## Data inventory and route coverage

Samsung's product surface and access interfaces must not be conflated. The
[Samsung Health app](https://www.samsung.com/us/apps/samsung-health/) documents device- and
region-dependent features, while the Data SDK publishes an explicit read-type list and the Sensor
SDK publishes a separate live-sensor specification. Health Connect has another explicit mapping and
states that Samsung Health activity-tracker data are not synchronized.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` not available; `U` unknown from
current evidence; `NA` not applicable. `Data SDK` and `Sensor SDK` are partner-gated for production.
`Legacy SDK` is deprecated. `Accessory SDK` is an inbound device route. `Research Stack` collects
study-specific records rather than opening existing account history.

| Data family | Included metrics or app outputs | Captured or produced as | Personal download | Data SDK | Health Connect | Sensor SDK | Accessory SDK | Legacy SDK | Strava | Research Stack | Archive parsers |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Daily movement | Steps, floors, activity summary, goals | Captured and normalized | P | A | P | N | P | U | N | P | P |
| Energy and active time | Active calories, active time and goals | Normalized and derived | P | A | P | N | N | U | P | P | P |
| Heart rate | Continuous and workout HR | Captured and normalized | P | A | A | A | A | U | U | A | A |
| HRV | Inter-beat intervals, RMSSD-style archive fields where present | Captured and derived | P | N | N | P | N | U | U | P | A |
| Blood pressure | Systolic and diastolic measurements | Captured, entered or external | P | A | A | N | A | U | N | P | P |
| ECG and rhythm | ECG waveform, irregular-heart-rhythm notification | Captured and derived | P | P | N | P | N | U | N | P | P |
| Cardio fitness | Exercise VO2 max | Derived | P | N | A | N | N | U | U | P | P |
| Oxygen and respiration | Blood oxygen; archive respiratory rate where present | Captured and derived | P | P | P | P | N | U | N | P | A |
| Body and skin temperature | Body temperature and watch skin temperature | Captured and normalized | P | A | N | A | N | U | N | P | A |
| Sleep sessions and stages | Sleep interval, awake/light/deep/REM stages, blood oxygen | Captured and derived | P | A | A | N | N | U | N | A | A |
| Sleep insights | Sleep score, coaching, goal, consistency | Derived and user-entered | P | P | N | N | N | U | N | P | P |
| Stress | Samsung Health stress records | Derived | P | N | N | N | N | U | N | P | A |
| Energy Score and readiness | Energy Score and vitality-style archive records | Derived | P | A | N | N | N | U | N | P | A |
| Training and performance | Running Coach, training guidance and app analyses | Derived | U | N | N | N | N | U | N | P | U |
| Exercise sessions | Sport, duration, calories, distance, HR | Captured and normalized | P | A | A | P | P | U | A | A | A |
| Route and sport dynamics | Exercise location, speed, power, cadence, GPS | Captured and normalized | P | A | P | P | A | U | P | P | A |
| Body composition | Weight, BMI, body fat, skeletal muscle, body water, BMR | Captured, entered and normalized | P | A | P | A | A | U | N | P | A |
| Nutrition and hydration | Food, nutrients, water and goals | User-entered or external | P | A | A | N | P | U | N | P | A |
| Cycle tracking | Menstrual-cycle logs and predictions | User-entered and derived | P | N | N | N | N | U | N | P | P |
| Medications and health records | Medication schedule; regional Samsung Health Records | User-entered and external | U | N | N | N | N | U | N | P | U |
| Trends, alerts and coaching | IHRN, sleep-apnea result, goals and narrative guidance | Derived | P | P | N | N | N | U | N | P | P |
| Raw watch sensors | Accelerometer, raw ECG, raw PPG, EDA | Captured | U | N | N | A | N | N | N | A | U |
| Provenance | Record IDs, timestamps, source/device and attachment metadata | Captured and normalized | P | P | P | P | P | U | P | A | P |

The detailed machine-readable mapping in [coverage.json](./coverage.json) preserves all 29 canonical
families exactly once. A `P` for the personal download means recent real-export tooling demonstrates
the family, not that Samsung guarantees it for every account, region or app version.

## Official access routes

### Personal-data download and privacy access

Recent export parsers document Samsung Health's current **Settings > Download personal data**
workflow and parse per-type CSV files, a `jsons/` directory and binary attachments. Samsung's former
export article now redirects to the generic
[Samsung Health support page](https://www.samsung.com/us/support/owners/app/samsung-health), which
does not publish a schema. The route is therefore usable but incompletely documented. Samsung's
[privacy portal](https://privacy.samsung.com/) is a separate data-subject channel and should not be
treated as a scheduled export API.

### Health Connect: ordinary self-service automation

Samsung documents [bidirectional synchronization with Health Connect](https://developer.samsung.com/health/blog/en/accessing-samsung-health-data-through-health-connect)
from Samsung Health 6.22.5 onward. Users grant read and write permissions separately. Samsung's
published map includes steps, blood glucose, blood oxygen, blood pressure, exercise session and
selected exercise series, heart rate, nutrition, sleep sessions/stages, weight, body fat, BMR and
height. It also explicitly says Samsung Health's **activity tracker data are not synchronized**.

Health Connect is the strongest ordinary-user automation route. It remains Android-specific and
record-type-specific. Android's current model also requires a separate history permission to read
other apps' records older than the default 30-day window, so complete Samsung history must not be
assumed from a successful connection.

### Samsung Health Data SDK: current stored-data SDK

The [Data SDK overview](https://developer.samsung.com/health/data/overview.html) lists current read
types, including activity summary, goals, blood glucose/oxygen/pressure, body composition and
temperature, Energy Score, exercise and location, floors, heart rate, irregular-rhythm notification,
nutrition, skin temperature, sleep, sleep apnea, steps, water and user profile. Its write list is
narrower.

This SDK is an Android interface to selected records in the Samsung Health app's local data store,
not a web API or a raw Galaxy Watch/Galaxy Ring protocol. Samsung requires Samsung Health 6.30.2 or
later and Android 10 or later. The
[app creation process](https://developer.samsung.com/health/data/process.html) and
[developer-mode guide](https://developer.samsung.com/health/data/guide/developer-mode.html) draw the
critical access boundary: hidden developer mode permits testing, but distributed applications must
be approved and registered with package/signature and allowed data scopes. Writing additionally
requires an approved access code.

### Samsung Health Sensor SDK: current live watch SDK

The [Sensor SDK](https://developer.samsung.com/health/sensor/overview.html) is a distinct Wear OS
surface for Galaxy Watch4 and later, not a route into Samsung Health history. It exposes raw
accelerometer, ECG and PPG, processed heart rate with inter-beat intervals, skin temperature, SpO2,
body composition, EDA on supported models and sweat loss. The
[sensor specification](https://developer.samsung.com/health/sensor/guide/data-specifications.html)
documents frequencies such as 25 Hz accelerometer/continuous PPG and 500 Hz on-demand ECG.

As with Data SDK, the [Sensor SDK creation process](https://developer.samsung.com/health/sensor/process.html)
allows developer-mode testing but requires partner approval and app registration for distribution.
Raw-sensor openness therefore exists for approved watch applications, not as a self-service account
export.

### Inbound, legacy and research surfaces

The [Accessory SDK](https://developer.samsung.com/health/accessory/overview.html) lets approved BLE
device makers send blood glucose, blood pressure, heart rate, weight, cycling power/cadence and
exercise data into Samsung Health after verification. It is not an extraction interface.

The older [Samsung Health SDK for Android](https://developer.samsung.com/health/android/overview.html)
was deprecated on 31 July 2025. Its historical data types are not evidence that new applications can
obtain current production access; Samsung explicitly directs developers to Data SDK.

[Samsung Health Research Stack](https://developer.samsung.com/health/research/overview.html) is an
open-source Android/Wear OS study stack with participant onboarding, consent, surveys, a portal and
backend APIs. It can collect data intentionally for a study, but it does not grant a researcher
general access to participants' existing Samsung Health accounts.

## Data available

Samsung devices and apps produce more than any one interface exposes. The app page documents
device- and region-dependent Energy Score, sleep coaching, sleep apnea, skin temperature, AGEs
index, body composition, blood pressure, ECG/IHRN, medications, cycle tracking and regional health
records. The current Data SDK includes some of these outputs (for example Energy Score, sleep apnea
and IHRN), but omits others such as medications, clinical records, cycle tracking, HRV and training
guidance from its published read list.

Galaxy Ring and Galaxy Watch measurements normally flow into Samsung Health before Data SDK or
Health Connect can read them. Sensor SDK instead measures live signals inside a custom Galaxy Watch
application. Availability varies by device generation, software, country, regulatory clearance and
permission. No public source establishes one complete device-to-app-to-export parity matrix.

## Ecosystem integrations

| Destination or source | Direction | Confirmed scope | Material limits |
|---|---|---|---|
| [Health Connect](https://developer.samsung.com/health/blog/en/accessing-samsung-health-data-through-health-connect) | Bidirectional by record type | Explicit mapping for steps, selected vitals, exercise, HR, nutrition, sleep and body measurements | Samsung activity-tracker data excluded; proprietary scores/raw signals not mapped; history permission and Android constraints |
| [Strava](https://support.strava.com/en-us/articles/15401747-samsung-health-and-strava) | Samsung Health to Strava activities | Current Strava help article confirms the supported connection surface | Exact fields, non-GPS behavior, deletion propagation and backfill need rendered hands-on validation |
| Accessory SDK devices | BLE device to Samsung Health | Glucose, blood pressure, heart rate, weight, cycling power/cadence and exercise | Partner verification; inbound only |
| Apple Health | No first-party route established | Unknown | Samsung's current developer surfaces are Android/Wear OS; no current primary Samsung Apple Health sync documentation was found |
| TrainingPeaks | No direct route established | Unknown | Do not treat a Health Connect relay or file conversion as a native Samsung integration |

## Open-source routes

| Project | Route | Output | Assessment |
|---|---|---|---|
| [`v-2841/samsung-health-export`](https://github.com/v-2841/samsung-health-export) | Parses a user-downloaded Samsung Health folder | Self-describing filtered JSON plus coverage manifest | MIT; very new and single-commit; useful schema evidence, not an official completeness guarantee |
| [`Devasy/samsung-health-sdk`](https://github.com/Devasy/samsung-health-sdk) | Parses Samsung export CSV/JSON/attachments | pandas data frames and HTML dashboards | MIT; active in 2026 but low adoption; derived dashboard scores are project calculations, not Samsung outputs |
| [`S-HealthStack/app-sdk`](https://github.com/S-HealthStack/app-sdk) | Builds participant Android/Wear OS study apps | Study-collected records, tasks and surveys | Apache-2.0; official Samsung research stack component; not account-history retrieval |
| [`S-HealthStack/backend-system`](https://github.com/S-HealthStack/backend-system) | Self-hosted research backend | Study storage/query services | Apache-2.0; research infrastructure rather than Samsung Health export |

No maintained open-source consumer-account API client or modern Galaxy Watch/Galaxy Ring sync
protocol implementation met the audit bar. Local parsers are safer than credential scraping because
they operate on files the user already controls, but those files contain sensitive health, location
and device identifiers.

## Material barriers and risks

- **Production partnership gate:** Data SDK and Sensor SDK distribution requires Samsung approval,
  registered package/signature and allowed scopes.
- **Android dependency:** Samsung's self-service programmable route is Health Connect on Android.
- **Interface fragmentation:** app outputs, Data SDK records, Health Connect types, Sensor SDK
  signals and legacy SDK types are different sets.
- **No consumer cloud API:** no current general REST/GraphQL account interface was found.
- **Undocumented archive:** current exports are machine-readable, but Samsung publishes no current
  versioned schema, retention guarantee or parity statement.
- **Derived-output loss:** destination platforms can receive source measurements without Samsung
  coaching, classifications or proprietary scores.
- **Regulatory and device variation:** ECG, IHRN, sleep apnea, blood pressure and other features vary
  by country, model and software.
- **History ambiguity:** full retained history, edits, deletion markers and downstream deletion
  propagation are undocumented.
- **Sensitive local files:** export CSV/JSON, ECG attachments and GPS data require deliberate local
  storage and sharing controls.

## Rubric snapshot

This snapshot follows the repository's [provider audit rubric](../../audit-rubric.md).

| Dimension | Samsung finding |
|---|---|
| Consumer effort | Low for Health Connect authorization; medium for manual download and local parsing |
| Cost | Core routes need compatible Android hardware; partner SDK production access requires approval, with public pricing not established |
| Platform dependency | Strong Android, Samsung Health and Galaxy Watch dependency for the richest routes |
| Data completeness | Broad but fragmented; no ordinary route establishes complete app/device parity |
| Granularity | Summary/session records through Data SDK and Health Connect; high-rate live signals through partner-gated Sensor SDK |
| Historical depth | Unknown for download/Data SDK; Health Connect needs extra history permission beyond its default window |
| Automation | Official and self-service through Health Connect; full archive download remains manual |
| Formats | Health Connect typed records; SDK objects; observed export CSV/JSON/binary attachments; research backend APIs |
| User authorization | Per-type Health Connect permissions; Samsung SDK permissions plus production app registration |
| Developer access | Health Connect self-service; current Samsung Data/Sensor production SDKs partner-gated |
| Integrations | Strong Android interoperability; activity-only Strava route; no Apple Health or TrainingPeaks route established |
| Provenance | Health Connect and SDK records carry metadata, but preservation across destinations and archive completeness are not guaranteed |
| Corrections and deletion | Bidirectional Health Connect updates are documented; deletion propagation and archive markers remain unverified |
| Portability | Good for selected Health Connect types and local archive parsing; weak for Samsung-specific interpretations |
| Evidence quality | Strong current SDK/type/gate evidence; consumer archive contents and Strava payload need hands-on checks |

## Provisional openness assessment

**Partial: useful self-service Android automation, incomplete interface parity.**

Samsung is more open to an ordinary developer than an ecosystem limited to partner APIs: Health
Connect provides a documented, permissioned and bidirectional route. It is still not a complete
mirror. Samsung's own table excludes activity-tracker data, current Data/Sensor SDK production use is
partner-gated, and app-visible clinical, coaching and proprietary outputs do not have one documented
portable representation.

## Evidence gaps

1. Download a fresh archive and inventory every file, metric, attachment, timestamp, identifier,
   date range, edit and deletion marker.
2. Compare the same account across Samsung Health UI, archive, Data SDK and Health Connect.
3. Test Health Connect in both directions for every Samsung-mapped type, including edits, deletions,
   duplicates, source attribution and history permission.
4. Obtain Data SDK production approval and record review criteria, allowed scopes, quotas and
   revocation behavior.
5. Obtain Sensor SDK production approval and test raw signals, device/firmware matrices, background
   duration and battery constraints.
6. Confirm Galaxy Ring-specific fields and whether any raw Ring signal is accessible outside
   Samsung's own processing.
7. Render and exercise the Strava connection for GPS/non-GPS activities, HR/cadence/power, backfill,
   edits and deletion.
8. Verify regional availability for ECG, IHRN, blood pressure, sleep apnea, AGEs, medications and
   Samsung Health Records.
9. Validate the two archive parsers against multiple 2026 exports and unknown/new data types.
10. Confirm whether Samsung publishes a replacement for the retired export-support article and a
    stable archive schema.
