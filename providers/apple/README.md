# Apple

**Evidence date:** 20 August 2026
**Products in scope:** Apple Watch, iPhone Health, Fitness, HealthKit and related Apple health
frameworks  
**Resource index:** [Apple resources](./resources.md)

**Canonical coverage:** [Apple taxonomy mapping](./coverage.json)

## Bottom line

Apple provides broad, record-level access to a person's retained health and fitness data through
[HealthKit](https://developer.apple.com/documentation/healthkit), including historical samples,
workouts, routes, activity summaries and some clinical records. The catch is architectural:
HealthKit is a permissioned database on Apple devices, not a consumer cloud API. Automated access
therefore requires an existing trusted app or a signed Apple-platform app.

An ordinary user has two first-party bulk routes: the Health app's manual
[XML export](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/ios)
and an Apple Account
[data-copy request](https://support.apple.com/en-us/102208). Apple explicitly says Health data
can be downloaded through either route, but does not document whether their contents, formats and
historical coverage are equivalent.

Apple Health is also a valuable interchange layer, but partner integrations move selected
records, not a complete health history. Apple-derived metrics, vendor-specific recovery scores,
edits, deletions and historical backfill are frequently lost or restricted.

## Access snapshot

| Route | Who can use it? | Automated? | Historical reach | Main limitation |
|---|---:|---:|---|---|
| Existing HealthKit app | Consumer, after per-type consent | App-dependent | Retained, authorized local history | User must trust the app's data handling and supported types |
| Self-built HealthKit app | Developer | Yes | Retained, authorized local history | Apple hardware/tooling, signing and entitlement required |
| Export All Health Data | Yes | No | Broad retained Health-store contents | Manual XML archive; no stable public schema |
| Individual reports | Yes | No | Feature-specific | PDF or partial human-readable output |
| Apple Data & Privacy portal | Yes | Request-based | Apple-retained Health data | Exact equivalence with the device XML export is not documented |
| SensorKit | Only in approved research | Yes | Prospective system-buffered data | Apple entitlement and study consent |
| Consumer cloud API | No | N/A | N/A | No documented REST API or OAuth scope |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Partial | HealthKit and exports cover broad retained records, but Apple does not establish that every Health/Fitness UI value, raw stream and derived feature is available |
| Self-service developer access | Partial | A person can build with HealthKit, but only through Apple's device, SDK, entitlement and signing model |
| Official automation | Partial | An installed HealthKit app can automate local reads; Apple provides no automated first-party bulk export or consumer cloud API |
| Complete history | Partial | Authorized retained local history is queryable, but there is no universal retention guarantee and the two export routes are not documented as equivalent |
| Raw and derived data coverage | Partial | Samples, workouts, routes and metadata are strong; some raw sensors, rings, reports and proprietary derivations are absent or constrained |
| **Overall personal-data openness** | **Partial** | Substantial user-controlled access exists, but it is incomplete and tightly dependent on Apple's platform |

## Data inventory and route coverage

This is a family-level inventory of records documented in
[HealthKit](https://developer.apple.com/documentation/healthkit/data-types) plus outputs documented
in the Apple Watch [Vitals](https://support.apple.com/guide/watch/vitals-apd15aa7ed96/watchos),
[Sleep](https://support.apple.com/guide/watch/track-your-sleep-apd830528336/watchos) and
[Training Load](https://support.apple.com/guide/watch/track-your-training-load-apde4c07a6cf/26/watchos/26)
apps. Availability varies by hardware, OS, region, user settings and source app. It does not claim
that Apple publishes a complete internal schema for the Health or Fitness UI.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` not available; `U` unknown from
current evidence; `NA` not applicable. A code establishes family-level coverage, not every field
or complete history.

| Data family | Included metrics or app outputs | Captured or produced as | HealthKit | Health XML export | Account privacy export | SensorKit | Supported integrations | Open-source routes |
|---|---|---|---|---|---|---|---|---|
| Body measurements | Height, weight, BMI, body fat, lean mass | User-entered or connected-device samples | A | P | P | NA | P | P |
| Daily movement and energy | Steps, distance, flights, active/basal energy | Motion-derived samples and aggregates | A | P | P | NA | P | P |
| Activity rings and goals | Move, exercise and stand values and targets | Apple-derived daily summaries | A | U | U | NA | P | P |
| Heart rate | Current, resting, walking, workout and recovery HR | Optical/electrical samples plus normalized summaries | A | P | P | NA | P | A |
| HRV | SDNN samples and trends | Derived from heartbeat timing | A | P | P | NA | P | P |
| Cardio fitness estimate | VO2 max quantity | Apple-derived estimate | A | P | U | NA | P | P |
| Cardio fitness classification | Low-to-high fitness labels and trends | Apple-derived UI interpretation | U | U | U | NA | U | U |
| Overnight vital samples | HR, respiratory rate, wrist temperature, SpO2 and sleep duration | Sensor samples and normalized summaries | A | P | U | NA | P | P |
| Vitals ranges and notifications | Typical ranges and multi-metric outlier alerts | Apple-derived baseline and UI interpretation | U | U | U | NA | U | U |
| ECG and rhythm features | ECG waveform, classification, irregular-rhythm and rate notifications | Electrical series plus regulated classifications | P | P | U | NA | U | P |
| Blood oxygen and respiration | SpO2, respiratory rate, peak flow and lung measurements | Sensor, connected-device or entered samples | A | P | P | NA | P | P |
| Blood pressure and glucose | Systolic/diastolic pressure and blood glucose | Connected-device or user-entered samples | A | P | P | NA | P | P |
| Temperature | Body and wrist temperature samples and baseline deviations | Sensor samples plus Apple-derived baseline | P | P | U | NA | P | P |
| Sleep | In-bed, awake, core, deep and REM intervals; schedules, goals and trends | Motion/heart-derived stages plus user configuration | P | P | P | NA | P | P |
| Workouts and routes | Type, duration, energy, distance, events, effort, linked samples and GPS route | Captured session plus normalized records | A | P | P | NA | P | P |
| Heart-rate zones and training load | Personalized zones; 7-day intensity/duration versus previous 28 days; classification from well below to well above | Apple-derived workout interpretation | U | U | U | NA | U | U |
| Sport and mobility metrics | Running power/cadence/stride, cycling/swimming metrics, gait, walking steadiness and stair speed | Sensor-derived samples and estimates | A | P | P | NA | P | P |
| Reproductive health | Cycle, symptoms, ovulation/fertile-window estimates, pregnancy and lactation | User-entered records plus predictions | A | P | P | NA | P | P |
| Nutrition and hydration | Energy, macro/micronutrients, caffeine and water | User-entered or third-party records | A | P | P | NA | P | P |
| Hearing and wellbeing | Audio exposure, audiograms, mindful minutes, symptoms and State of Mind | Sensor, user-entered and structured records | A | P | P | NA | P | P |
| Clinical and medication records | Allergies, conditions, labs, medications, procedures and FHIR resources | Institution-supplied or user-entered structured records | P | U | U | NA | P | P |
| Trends, awards and notifications | Change-detection narratives, badges, risk labels and alerts | Apple-derived UI output | U | U | U | NA | U | U |
| Research-only sensor signals | Ambient light/pressure, device usage, keyboard, on-wrist, visits and telephony signals | Prospective device sensor or behavior streams | N | N | N | A | N | U |
| Provenance and metadata | UUID, timestamps, source revision, device and record metadata | Store metadata | A | P | P | P | P | P |

`Supported integrations` is deliberately aggregate here because each partner selects different
types. The [route-by-route table](#ecosystem-integrations) below records the confirmed direction
and losses. `Open-source routes` covers authorized HealthKit clients, XML parsers and user-owned
backup analysis; no single project covers every row.

## Official access routes

### HealthKit

[HealthKit](https://developer.apple.com/documentation/healthkit) is Apple's primary supported
data surface. Apps query a protected local store using `HKHealthStore` and native
Swift/Objective-C APIs. An app must be signed, include the HealthKit capability, declare why it
needs the data and request separate read or write authorization for each type.

Authorization is deliberately privacy-preserving. HealthKit does not reliably tell an app that a
user denied read permission; an empty result may mean either denial or no matching data.
[Apple's authorization documentation](https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data)
describes this behavior.

HealthKit has no documented global history cap or requests-per-minute quota. Apps can query older
records that remain in the store, including records created before the app was installed.
Practical coverage still depends on collection start dates, deletion, source retention, device
and iCloud state, hardware, region and OS version. Background delivery is system-scheduled rather
than a guaranteed real-time stream.

### Manual bulk export

The Health app's
[Export All Health Data](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/ios)
command produces a user-controlled archive that Apple describes as XML. It requires no developer
account and is broader than the permissions granted to any one app.

The export is not scheduled or incremental, and Apple does not publish a complete versioned
schema for every current data type or supplemental file. Current exports may include XML plus
specialized files such as workout routes or ECG records, but exact 2026 contents need hands-on
inventory before claiming lossless coverage. Apple provides no general import function for this
archive.

### Account and privacy export

An Apple Account holder can request selected account data through
[privacy.apple.com](https://privacy.apple.com/). Apple prepares this asynchronously and
[explicitly documents](https://support.apple.com/en-us/102208) that Health data can be downloaded
as part of the request. Apple does not document whether this is the same XML archive as the
Health app or whether file layout, granularity and regional availability are equivalent, so the
two routes require hands-on comparison.

Jurisdictional access and portability rights are covered by the
[Apple Privacy Policy](https://www.apple.com/legal/privacy/en-ww/), but a formal request does not
create an API or recover deleted or local-only data.

### Narrower frameworks and exports

- [WorkoutKit](https://developer.apple.com/documentation/workoutkit) creates and schedules
  structured workouts. It is principally a write/planning surface, not a history reader.
- [SensorKit](https://developer.apple.com/documentation/sensorkit) provides approved research
  studies with prospective sensor and device-usage records. It requires Apple-granted
  entitlements and per-sensor consent.
- Clinical Health Records in HealthKit let authorized apps read records a participating
  institution supplied to Health, including an underlying FHIR resource. Completeness depends on
  the institution and region; the previous deep-link source is pending replacement after Apple
  removed it.
- Apple supports partial human-readable exports such as ECG and medication PDFs. These are not
  machine-complete bulk exports.
- Encrypted device backups can preserve Health data, but Apple documents them as restoration
  mechanisms rather than supported interoperable exports.

## Data available through HealthKit

HealthKit's [data-type catalogue](https://developer.apple.com/documentation/healthkit/data-types)
is broad and evolves with hardware and OS releases.

| Area | Representative records | Typical granularity |
|---|---|---|
| Body | Height, weight, BMI, body fat, lean mass | Timestamped quantity samples |
| Activity | Steps, distance, flights, move/exercise/stand time, energy | Samples and aggregate statistics |
| Cardio and vitals | Heart rate, resting heart rate, HRV, respiratory rate, SpO2, blood pressure, temperature, glucose, VO2 max | Timestamped quantities and some series |
| Mobility and sport | Running speed/power/cadence, stride and gait metrics, cycling and swimming metrics | Samples and workout statistics |
| Sleep | In-bed, awake, core, deep and REM intervals | Categorized intervals |
| Reproductive health | Cycle, pregnancy, lactation and related records | Category or quantity samples |
| Nutrition | Energy, macro/micronutrients, caffeine and water | Timestamped quantities |
| Hearing and respiratory | Audio exposure, audiograms, peak flow and lung measurements | Samples or structured measurements |
| Wellbeing | Symptoms, mindfulness and state-of-mind entries | Events, intervals or structured objects |
| Workouts | Type, duration, energy, distance, events, metadata and source | Workout plus associated samples |
| Activity rings | Daily move, exercise and stand values and goals | Daily summary |
| Routes and ECG | Ordered locations, ECG voltages and heartbeat timing | Point or measurement series |
| Clinical records | Allergies, conditions, labs, medications, procedures and vitals | Clinical record plus FHIR resource |

Most samples retain UUID, timestamps, source revision, device information when supplied and
metadata. Resolution depends on the originating device or app; HealthKit does not expose every
raw sensor stream or guarantee a common sampling frequency.

Seeing information in the Health or Fitness UI does not prove that a third-party API type exists.
Medical ID, received Health Sharing data, alerts, awards, trends and some Fitness summaries
require type-by-type confirmation.

## Ecosystem integrations

HealthKit is a local interchange store. A partner decides which types to read, write, backfill or
ignore, and "visible in Health" does not mean another service will relay the record.

| Service | Supported direction | What generally moves | Material loss or restriction |
|---|---|---|---|
| [Strava](https://support.strava.com/hc/en-us/articles/216917527-Health-App-and-Strava) | Apple ↔ Strava | Eligible workouts, route, HR, distance, time and calories | Health import is limited to recent workouts; no sleep, rings or Apple Training Load |
| [TrainingPeaks](https://www.trainingpeaks.com/apple-watch/) | TrainingPeaks → Watch → TrainingPeaks | Structured workout targets and completed workout streams | Prospective workflow; Apple and TrainingPeaks derive training metrics separately |
| [Garmin Connect](https://support.garmin.com/en-US/?faq=lK5FPB9iPF5PXFkIpFlFPA) | Garmin → Apple | Selected workouts, activity, HR, sleep and body data | No supported Apple → Garmin route; Garmin readiness/load scores omitted |
| Fitbit / Health Connect | None confirmed | None | Health Connect is Android-only; no supported generic Apple bridge |
| Samsung Health | None confirmed | None | No supported Apple Health bridge confirmed |
| [Oura](https://support.ouraring.com/hc/en-us/articles/360025438734-How-to-Use-Apple-Health-with-Oura) | Apple ↔ Oura | Selected sleep, vitals, activity, body data and workouts | Oura scores do not transfer as equivalent Health records |
| [WHOOP](https://support.whoop.com/s/article/Apple-Health-Integration?language=en_US) | Apple ↔ WHOOP | Selected sleep/vitals/workouts; Health workouts into WHOOP | WHOOP scores remain proprietary; membership and history constraints |
| [Withings](https://support.withings.com/hc/en-us/articles/203728916-Partner-Apps-Apple-Health-Importing-Apple-Health-data-into-the-Withings-App) | Selected types both ways | Body, blood pressure, HR, sleep and activity | Advanced Withings interpretations are omitted |
| [Polar Flow](https://support.polar.com/en/support/connecting_polar_flow_with_apple_health) | Polar → Apple | Workouts, HR, activity, energy and sleep | No general Apple → Polar path |
| Suunto | Suunto → Apple reported, pending source replacement | Workouts and selected daily metrics | Previous official source is no longer live; requires reverification |
| Peloton | Peloton → Apple reported, pending source replacement | Workout summary, calories, HR and selected distance | Previous official source is no longer live; requires reverification |

Common ecosystem-wide gaps include limited historical backfill, blocked third-party relays,
separate authorization for routes, recalculated rather than transferred derived scores, and no
guaranteed propagation of edits or deletions. There is no first-party Apple Health–Android Health
Connect bridge.

## Open-source routes

Open-source tools use three legitimate mechanisms: an authorized HealthKit app, the official
Health export, or recovery from the user's own encrypted local backup.

| Project | Mechanism | Output/use | Assessment |
|---|---|---|---|
| [react-native-healthkit](https://github.com/kingstinct/react-native-healthkit) | HealthKit binding for a signed React Native app | Typed records for app-defined serialization | Strong reusable cross-platform-app layer; MIT |
| [SpeziHealthKit](https://github.com/StanfordSpezi/SpeziHealthKit) | Native Swift HealthKit collection and synchronization | HealthKit samples through Spezi abstractions | Strong maintained native framework; MIT |
| [applehealthdata](https://github.com/tdda/applehealthdata) | Parses the official export | Python analysis and CSV-oriented data | Practical starting point; test newer record types; MIT |
| [HealthKitOnFHIR](https://github.com/StanfordBDHG/HealthKitOnFHIR) | Maps authorized HealthKit records to FHIR | FHIR resources, commonly JSON | Useful interoperability bridge; possible mapping loss; MIT |
| [iLEAPP](https://github.com/abrignoni/iLEAPP) | Parses an authorized encrypted device backup | HTML and structured forensic reports | Strong maintained recovery tool but exposes far more private data; MIT |
| [libimobiledevice](https://github.com/libimobiledevice/libimobiledevice) | Creates a local Finder/iTunes-compatible backup | Native backup container | Strong transport component, not a Health parser; LGPL-2.1 |
| [healthkit-to-sqlite](https://github.com/dogsheep/healthkit-to-sqlite) | Converts official export to SQLite | Queryable SQLite database | Convenient but low maintenance cadence; Apache-2.0 |

There is no clearly maintained, fully open-source, one-click iPhone exporter matching
closed-source consumer tools such as Health Auto Export or HealthFit. Those products may be
practical, but evaluating their cost, privacy, automation and output formats is outside the first
research pass. No credible maintained personal Apple Health cloud API was found. Older bridges
and direct `healthdb.sqlite` scripts are fragile because Apple changes SDKs and undocumented
internal schemas.

## Material barriers and risks

- **Platform lock-in:** automated supported access requires an Apple-platform app and code
  signing; there is no server-side consumer API.
- **Developer friction:** a user can export manually, but building durable automation requires
  Apple tooling, entitlements and per-type permission design.
- **Undocumented bulk schema:** XML is inspectable but not a stable, versioned interchange
  contract.
- **Selective integrations:** partner sync is not complete portability and often strips
  provenance, routes, derived metrics or history.
- **Permission ambiguity:** denied read permission can look like an empty dataset.
- **Highly sensitive files:** XML, ECG, GPX, SQLite, backups and forensic reports must be stored
  and processed securely.
- **Duplicate data:** Health may contain records from the phone, watch and multiple third-party
  sources; downstream tools need explicit provenance and deduplication rules.
- **Backup overreach:** local backup tooling can expose much more than health data and depends on
  undocumented internal schemas.

## Rubric snapshot

This snapshot follows the repository's [provider audit rubric](../../audit-rubric.md).

| Dimension | Apple finding |
|---|---|
| Consumer effort | Low for a manual export; medium to high for repeatable automation |
| Cost | Export is included; self-built automation requires Apple hardware/tooling and may require developer membership for distribution |
| Platform dependency | High: supported automation is tied to Apple operating systems and HealthKit |
| Completeness | Broad retained records, but not every UI feature or raw sensor stream is exposed |
| Granularity | Strong: samples, summaries, workouts and selected series/routes |
| Historical depth | Retained authorized history; no universal duration guarantee |
| Automation | Strong through an installed HealthKit app; absent for first-party bulk export |
| Formats | Native HealthKit objects or manual XML; bulk schema is not publicly versioned |
| Integrations | Broad but selective, directional and often lossy |
| Provenance | HealthKit retains source/device metadata; downstream services may reduce it |
| Portability | Good local extraction, weak platform-independent cloud access |
| Evidence quality | Strong primary API evidence; export equivalence and several partner links need hands-on validation |

## Provisional openness assessment

**Mixed, with strong local access and weak cloud portability.**

Once the data is on an Apple device, HealthKit offers deep, permissioned historical record access,
and Apple gives users machine-readable account and device export routes without a commercial
partnership.

It is not fully open. There is no user-facing REST API, automated export, cross-platform client or
stable bulk schema. Automated access is tied to Apple's hardware, SDK, signing and review
ecosystem, while downstream connectors are selective. The result is good user agency for someone
willing to use an iPhone app or process XML, but poor platform-independent automation.

## Evidence gaps and hands-on checks

1. Generate a current export and inventory every archive file, XML element and version marker.
2. Compare HealthKit queries with the XML export for routes, ECGs, sleep, rings, workout effort,
   symptoms, state of mind, medications and clinical documents.
3. Confirm the oldest retrievable record after multi-device iCloud synchronization.
4. Compare privacy.apple.com Health files with the Health-app export across multiple regions.
5. Test partner backfill, route transfer, duplicate handling and edit/deletion propagation.
6. Recheck Fitbit and Samsung iOS settings for any newly supported Apple connector; describe
   absence only as "no documented route found."
7. Replace or remove the dead official Suunto and Peloton integration sources before treating
   those rows as verified.
8. Validate maintained open-source parsers against a large 2026 export without discarding unknown
   identifiers or nested metadata.
9. Confirm current SensorKit entitlement criteria, buffer retention and physiological streams.
