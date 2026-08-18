# Apple

**Evidence date:** 18 August 2026  
**Products in scope:** Apple Watch, iPhone Health, Fitness, HealthKit and related Apple health
frameworks  
**Resource index:** [Apple resources](./resources.md)

## Bottom line

Apple provides unusually broad, record-level access to a person's retained health and fitness
data through [HealthKit](https://developer.apple.com/documentation/healthkit), including
historical samples, workouts, routes, activity summaries and some clinical records. The catch is
architectural: HealthKit is a permissioned database on Apple devices, not a consumer cloud API.
Automated access therefore requires a signed Apple-platform app, while the only first-party bulk
route for an ordinary user is a manual
[XML export](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/ios)
whose complete schema is not publicly versioned.

Apple Health is also a valuable interchange layer, but partner integrations move selected
records, not a complete health history. Apple-derived metrics, vendor-specific recovery scores,
edits, deletions and historical backfill are frequently lost or restricted.

## Access snapshot

| Route | Ordinary user? | Automated? | Historical reach | Main limitation |
|---|---:|---:|---|---|
| HealthKit app | Yes, after per-type consent | Yes | Retained, authorized local history | Requires an entitled Apple-platform app |
| Export All Health Data | Yes | No | Broad retained Health-store contents | Manual XML archive; no stable public schema |
| Individual reports | Yes | No | Feature-specific | PDF or partial human-readable output |
| Apple Data & Privacy portal | Yes | No | Apple-retained account data | Granular HealthKit inclusion is not confirmed |
| SensorKit | Only in approved research | Yes | Prospective system-buffered data | Apple entitlement and study consent |
| Consumer cloud API | No | N/A | N/A | No documented REST API or OAuth scope |

## Official access routes

### HealthKit

[HealthKit](https://developer.apple.com/health-fitness/healthkit/) is Apple's primary supported
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
[privacy.apple.com](https://privacy.apple.com/). Apple prepares this asynchronously, but its
public documentation does not promise the complete sample-level HealthKit database, the same
archive as the Health app, or end-to-end-encrypted Health data. It should not be treated as a
replacement for the on-device export.

Jurisdictional access and portability rights are covered by the
[Apple Privacy Policy](https://www.apple.com/legal/privacy/en-ww/), but a formal request does not
create an API or recover deleted or local-only data.

### Narrower frameworks and exports

- [WorkoutKit](https://developer.apple.com/documentation/workoutkit) creates and schedules
  structured workouts. It is principally a write/planning surface, not a history reader.
- [SensorKit](https://developer.apple.com/documentation/sensorkit) provides approved research
  studies with prospective sensor and device-usage records. It requires Apple-granted
  entitlements and per-sensor consent.
- [Clinical Health Records](https://developer.apple.com/documentation/healthkit/clinical-health-records)
  lets authorized apps read records a participating institution supplied to Health, including an
  underlying FHIR resource. Completeness depends on the institution and region.
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
| [Withings](https://support.withings.com/hc/en-us/articles/201494667-Partner-Apps-Apple-Health-What-is-the-Apple-Health-integration) | Selected types both ways | Body, blood pressure, HR, sleep and activity | Advanced Withings interpretations are omitted |
| [Polar Flow](https://support.polar.com/en/support/connecting_polar_flow_with_apple_health) | Polar → Apple | Workouts, HR, activity, energy and sleep | No general Apple → Polar path |
| [Suunto](https://www.suunto.com/Support/faq-articles/suunto-app/how-do-i-use-the-suunto-app-with-apple-health/) | Suunto → Apple | Workouts and selected daily metrics | Routes, load and recovery data may be reduced |
| [Peloton](https://support.onepeloton.com/s/article/360048773312-Apple-Health-Integration) | Peloton → Apple; Watch → Peloton in sessions | Workout summary, calories, HR and selected distance | Class, leaderboard and detailed output data are simplified or absent |

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
| [HealthKitOnFHIR](https://github.com/StanfordBDHG/HealthKitOnFHIR) | Maps authorized HealthKit records to FHIR | FHIR resources, commonly JSON | Useful interoperability bridge; possible mapping loss; Apache-2.0 |
| [iLEAPP](https://github.com/abrignoni/iLEAPP) | Parses an authorized encrypted device backup | HTML and structured forensic reports | Strong maintained recovery tool but exposes far more private data; MIT |
| [libimobiledevice](https://github.com/libimobiledevice/libimobiledevice) | Creates a local Finder/iTunes-compatible backup | Native backup container | Strong transport component, not a Health parser; LGPL-2.1-or-later |
| [healthkit-to-sqlite](https://github.com/dogsheep/healthkit-to-sqlite) | Converts official export to SQLite | Queryable SQLite database | Convenient but low maintenance cadence; Apache-2.0 |

There is no clearly maintained, fully open-source, one-click iPhone exporter matching proprietary
tools such as Health Auto Export or HealthFit. No credible maintained personal Apple Health cloud
API was found. Older bridges and direct `healthdb.sqlite` scripts are fragile because Apple
changes SDKs and undocumented internal schemas.

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

## Provisional openness assessment

**Mixed, with strong local access and weak cloud portability.**

Apple is comparatively open once the data is on an Apple device: HealthKit offers deep,
permissioned, historical record access, and the Health app gives every user a broad
machine-readable export without a commercial partnership. That is materially better than
providers that expose only dashboards, PDFs or approved partner APIs.

It is not fully open. There is no user-facing REST API, automated export, cross-platform client or
stable bulk schema. Automated access is tied to Apple's hardware, SDK, signing and review
ecosystem, while downstream connectors are selective. The result is good user agency for someone
willing to use an iPhone app or process XML, but poor platform-independent automation.

## Evidence gaps and hands-on checks

1. Generate a current export and inventory every archive file, XML element and version marker.
2. Compare HealthKit queries with the XML export for routes, ECGs, sleep, rings, workout effort,
   symptoms, state of mind, medications and clinical documents.
3. Confirm the oldest retrievable record after multi-device iCloud synchronization.
4. Inspect privacy.apple.com output for Health/Fitness coverage across multiple regions.
5. Test partner backfill, route transfer, duplicate handling and edit/deletion propagation.
6. Recheck Fitbit and Samsung iOS settings for any newly supported Apple connector.
7. Validate maintained open-source parsers against a large 2026 export without discarding unknown
   identifiers or nested metadata.
8. Confirm current SensorKit entitlement criteria, buffer retention and physiological streams.
