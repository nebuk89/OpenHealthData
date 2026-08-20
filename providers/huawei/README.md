# Huawei

**Evidence date:** 2026-08-20

**Canonical coverage:** [Huawei taxonomy mapping](./coverage.json)

## Bottom line

Huawei offers two materially different forms of access. An account holder can request Huawei Health
data through an in-app privacy workflow documented by the maintained
[Hitrava](https://github.com/CTHRU/Hitrava) converter, but Huawei does not publish a stable archive
schema, complete field inventory or cross-region equivalence guarantee. Developers can build
authorized applications with [HMS Core Health Kit](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-introduction-0000001050071662),
including an Android SDK and REST interfaces, but this requires Huawei developer and AppGallery
Connect configuration, data-specific user consent and potentially permission review.

The practical result is useful but constrained portability. Workout data in current privacy ZIPs
can be converted locally to TCX, and selected devices can be read directly with Gadgetbridge.
Neither path establishes access to every Huawei Health record or proprietary score. Health Kit is
automatable, but it is an application integration surface rather than a documented personal cloud
API or complete account dump.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Huawei Health privacy ZIP | Huawei account holder where the in-app workflow is available | No; request and download | At least workout records in observed export generations | Official schema, regional equivalence, preparation time and complete contents are undocumented |
| Health Kit Android SDK | Configured Huawei developer application plus consenting user | Yes | Permissioned health, activity and exercise records | AppGallery Connect setup, device/service availability and permission gates |
| Health Kit REST APIs | Configured service application plus consenting user | Yes | Permissioned cloud health and fitness records | Not an unrestricted personal API or documented complete-history endpoint |
| Apple Health / HealthKit | Huawei Health iOS user | App-mediated | Weight and motion/exercise sharing documented by Huawei's App Store listing | Narrow documented categories; broader parity and backfill are unknown |
| Health Sync bridge | Android user with Huawei Health and a destination | Yes, through a third party | Source/destination-specific compatible categories | Paid bridge after trial; mappings, history and lossiness vary |
| Gadgetbridge | User with a supported Huawei/Honor wearable | Yes, locally | Device-resident records exposed by the reverse-engineered protocol | Model/firmware dependent; not Huawei Health cloud history |
| Hitrava | User with a Huawei Health privacy ZIP or legacy HiTrack files | Yes, after export | Workout JSON/HiTrack, route and selected telemetry converted to TCX | Workout-only parser; it does not request or download the archive |
| HiSuite backup tools | Technically capable user with their own compatible backup | Partial | Files and databases actually included in a decryptable backup | No maintained end-to-end Huawei Health database parser was verified |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Unknown | Huawei publishes no complete mapping from Huawei Health screens and derived outputs to Health Kit, privacy ZIPs or integrations |
| Self-service developer access | Partial | Individual developers can register and configure apps, but production data permissions and verification requirements are not fully documented as universally self-service |
| Official automation | Partial | Health Kit supports application automation, but ordinary account holders do not get a documented personal API or scheduled account export |
| Complete history | Unknown | Neither Health Kit nor the privacy ZIP has a public universal retention, backfill or all-record guarantee |
| Raw and derived data coverage | Partial | Typed observations and workouts are available, while proprietary scores, alerts, coaching and raw sensor parity remain unconfirmed |
| **Overall personal-data openness** | **Restricted** | Useful export and application routes exist, but complete, recurring access for an ordinary account holder is not documented |

## Data inventory and route coverage

This inventory separates product-visible data from proven route coverage. Huawei devices and the
Huawei Health app expose different features by model, firmware and account region. Health Kit's
[development overview](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-development-overview-0000001050071660)
establishes typed health and fitness records, while Huawei's
[Watch GT 5 Pro page](https://consumer.huawei.com/en/wearables/watch-gt5-pro/) illustrates that the
consumer product also displays derived emotion, sleep and fitness guidance. Availability of those
derived displays through Health Kit or an export is not inferred.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` unavailable by the route's design;
`U` unknown from current evidence; `NA` not applicable.

| Data family | Included metrics or app outputs | Captured or produced as | Privacy ZIP | Health Kit SDK/REST | Apple Health | Health Sync | Gadgetbridge | Hitrava | HiSuite/database tools |
|---|---|---|---|---|---|---|---|---|---|
| Daily movement | Steps, distance, active periods | Captured and normalized summaries | U | A | P | U | P | N | U |
| Energy and active time | Calories and exercise duration | Normalized and derived | U | A | U | U | P | P | U |
| Heart rate | Continuous, resting and workout heart rate | Captured samples and summaries | U | A | U | U | P | P | U |
| HRV | Device-dependent HRV observations or trends | Captured and derived | U | U | U | U | U | U | U |
| Blood pressure | Measurements from supported devices such as Watch D products | Captured and normalized | U | P | U | U | U | N | U |
| ECG and rhythm | Waveform and classifications on supported products/regions | Captured and derived | U | U | U | U | U | N | U |
| VO2 max and cardio fitness | Device/app fitness estimates | Derived | U | U | U | U | U | U | U |
| SpO2 and respiration | Blood oxygen and respiration where supported | Captured and normalized | U | P | U | U | P | P | U |
| Temperature | Temperature observations on compatible devices | Captured and normalized | U | U | U | U | U | U | U |
| Sleep sessions and stages | Duration, stages and intervals | Captured and normalized | U | A | U | U | P | N | U |
| Sleep insights and score | TruSleep-style analysis and guidance | Derived | U | U | U | U | U | N | U |
| Stress and emotional wellbeing | Stress records, mood displays and breathing guidance | Captured and derived | U | P | U | U | U | N | U |
| Training load and recovery | Load, recovery time and training guidance where supported | Derived | U | U | U | U | U | P | U |
| Workout sessions | Sport, duration, distance, calories and intervals | Captured sessions and summaries | A | A | P | U | P | A | U |
| Routes and elevation | GPS track, pace/speed and elevation where recorded | Captured series and normalized route | A | P | U | U | P | A | U |
| Sport dynamics | Cadence, laps, heart rate and activity-specific telemetry | Captured and derived workout fields | P | P | U | U | P | P | U |
| Plans and courses | Structured workouts and coaching content | User-entered or external | U | U | U | U | U | N | U |
| Body measurements | Weight, height, BMI and body composition | Captured, entered and normalized | U | A | P | U | U | N | U |
| Reproductive health | Cycle records and predictions where supported | User-entered and derived | U | U | U | U | U | N | U |
| Trends, alerts and awards | App trends, reminders, alerts and achievements | Derived | U | U | U | U | U | N | U |
| Raw sensor streams | Accelerometer, optical and other device-level signals | Captured | U | U | NA | U | P | P | U |
| Provenance metadata | Record IDs, timestamps and source/device fields | Captured and normalized metadata | P | P | P | U | P | P | U |

The complete 29-family mapping, including families for which current evidence is insufficient, is in
[coverage.json](./coverage.json). Route codes do not imply complete history or every field.

## Official access routes

### Huawei Health privacy export

Huawei's public privacy policy establishes rights to access or obtain a copy of personal data, but
does not specify a universal Huawei Health archive. The maintained
[Hitrava documentation](https://github.com/CTHRU/Hitrava) records the current practical flow:
Huawei Health → account name → Privacy Center → Request Your Data → Health. It describes an
email-delivered, password-encrypted ZIP and supports Huawei's 2025 ZIP generation.

That is strong operational evidence for a consumer-controlled archive, not an official completeness
contract. Archive contents, preparation time, expiry, retention, deleted records and regional
availability require hands-on verification. In particular, no primary source was found proving that
mainland-China and international Huawei IDs receive identical files or use the same request route.

### HMS Core Health Kit

[Health Kit](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-introduction-0000001050071662)
is Huawei's supported programmable surface for authorized applications. The
[configuration guide](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-configuring-0000001050030937)
requires application configuration through Huawei's developer platform, and the
[authorization guide](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-authorize-0000001050030936)
uses data-specific user authorization rather than blanket account access.

Current documentation establishes Android/HMS Core and REST-style interfaces. A native iOS Health
Kit developer SDK was not confirmed; the presence of the Huawei Health iOS consumer app is not
evidence of one. App identity verification, sensitive-permission review, publication requirements,
quotas and production eligibility should be recorded from a real AppGallery Connect project before
being described as fully self-service.

Health Kit is record-oriented. It supports meaningful activity, exercise, sleep, heart-rate, body
and selected health measurements, but Huawei does not publish a statement that it exposes every
metric, score, alert or recommendation visible in Huawei Health.

## Data available

The strongest supported route is Health Kit for applications with the necessary configuration and
user grant. Record granularity varies by data type: timestamped observations, aggregate samples,
measurements and exercise sessions are all represented. REST and Android SDK parity, historical
depth, pagination, deletion propagation and universal request limits were not established.

The privacy archive is broader in user control but weaker in documentation. Hitrava demonstrates
that recent archive generations contain structured workout data, including HiTrack-style JSON,
route information and selected telemetry. It does not establish sleep, continuous health,
proprietary scores or all account metadata. A successful conversion also does not prove that
Huawei exported everything retained by the service.

Huawei's product catalogue includes measurements and proprietary analyses whose availability
depends on device and region. Examples include ECG and blood-pressure products, TruSleep analysis,
stress/emotional-wellbeing guidance and training outputs. Unless a Health Kit type, archive field or
integration explicitly names the derived value, this audit records route coverage as unknown.

## Ecosystem integrations

| Destination | Classification and direction | Confirmed payload/history | Material limits |
|---|---|---|---|
| [Apple Health](https://apps.apple.com/us/app/huawei-health/id1325481372) | Native Huawei Health iOS integration; Huawei Health writes motion/exercise and weight, and can obtain exercise data from HealthKit | Current App Store description confirms those categories; backfill is unknown | Broader health categories, proprietary scores, source fidelity and complete history are not documented |
| [Health Sync](https://healthsync.app/f-a-q/) → Health Connect | Independent Android bridge from Huawei Health to a configured destination | Automatic/category-specific sync is supported by the bridge; exact Huawei matrix and history are unknown | Paid after trial, Android scheduling limits and schema translation; not a Huawei-native connector |
| Health Sync → Samsung Health | Independent Android bridge | Route exists at the service level; Huawei-specific category coverage was not independently established | Potential aggregation, duplicates and loss of proprietary fields |
| Health Sync → Google Fit | Legacy-sensitive third-party bridge | Current operation and history are unknown | [Google Fit APIs are deprecated](https://developers.google.com/fit) in favor of Health Connect |
| Strava | Huawei Health activity link reported historically | Current direct Huawei/Strava documentation used by the initial research returned 404 | Marked unknown until a live account and current primary source establish region, fields and backfill |
| TrainingPeaks | Workout link reported by secondary/current-app evidence | Current direct TrainingPeaks Huawei landing page used by the initial research returned 404 | Direction, supported devices, subscription and history remain unknown |

Apple's own [source-management guidance](https://support.apple.com/en-us/108779) explains that
Health records retain source attribution and can be prioritized, but it does not expand Huawei's
documented category set. No native Huawei Health connector to Android Health Connect or Samsung
Health was established; Health Sync is a separate commercial bridge.

## Open-source routes

| Project | Route | Output | Assessment |
|---|---|---|---|
| [Gadgetbridge](https://codeberg.org/Freeyourgadget/Gadgetbridge) | Local reverse-engineered Bluetooth access to supported Huawei/Honor wearables | Local database, backups and device-dependent activity data | Active AGPLv3 project; private-by-design, but compatibility is model/firmware specific and it is not a cloud exporter |
| [Hitrava](https://github.com/CTHRU/Hitrava) | Parses current encrypted privacy ZIPs, JSON and legacy HiTrack files | Original HiTrack, JSON and TCX workout files | Active and Huawei-specific; GitHub reports `NOASSERTION`; workout conversion, not complete account parsing |
| [Huawei-TCX-Converter](https://github.com/aricooperdavis/Huawei-TCX-Converter) | Parses legacy copied HiTrack files | TCX workouts | MIT but archived; older Android storage paths and Huawei schemas make it fragile |
| [kobackupdec](https://github.com/RealityNet/kobackupdec) | Decrypts user-password-protected HiSuite/KoBackup archives | Restored files and raw application directories/databases | MIT and explicitly end-of-life; does not parse Huawei Health semantics |

No maintained end-to-end parser was verified for current Huawei Health private databases, SQLCipher
keys or every file in the privacy archive. HiSuite decryption only helps if a backup includes the
relevant app data, and modern backup policies may exclude it. Rooting, copying private databases or
using session emulators substantially increases account and device risk.

## Material barriers and risks

- **Two different ecosystems:** Huawei Health is the consumer app; Health Kit is a developer
  service configured through AppGallery Connect. Neither name implies access to the other surface's
  complete data.
- **Permission and verification gates:** Health Kit needs an identified application and explicit
  user scopes; production and sensitive-permission requirements are not fully documented publicly.
- **Regional uncertainty:** Huawei ID region, HMS Core availability, product regulation and app
  distribution can change routes and data.
- **Undocumented export contract:** Community tooling confirms a workable privacy ZIP, but Huawei
  publishes no versioned schema or parity guarantee.
- **Derived-data gap:** Product-visible scores, classifications, coaching and alerts cannot be
  inferred from access to their input observations.
- **Third-party lossiness:** Apple Health and Health Sync normalize selected categories rather than
  preserving a lossless Huawei record.
- **Local-tool sensitivity:** Privacy ZIPs, decrypted backups and TCX files can contain health,
  identity and precise location history.
- **Unofficial fragility:** Bluetooth protocols, archive schemas, Android storage and backup formats
  can change without compatibility guarantees.

## Rubric snapshot

This snapshot follows the repository's [provider audit rubric](../../audit-rubric.md).

| Dimension | Huawei finding |
|---|---|
| Consumer effort | Medium for an in-app privacy request and local conversion; high for complete automation |
| Cost | Privacy export is account-controlled; Health Sync is paid after trial; developer and commercial requirements are incompletely documented |
| Platform dependency | Huawei Health/Huawei ID and region matter; Android SDK/bridge and iOS HealthKit routes differ |
| Data completeness | Broad typed Health Kit data and workable workout exports, but no app-parity or archive-completeness guarantee |
| Granularity | Record and session access through Health Kit; structured workout files through Hitrava |
| Historical depth | No universal retention or backfill guarantee was found |
| Automation | Supported for configured Health Kit apps; not documented as a direct personal account API |
| Formats | Permissioned SDK/REST records, encrypted privacy ZIP, JSON/HiTrack and converted TCX |
| User authorization | Data-specific Huawei authorization for Health Kit; identity verification for privacy requests |
| Developer access | Registration and app configuration are documented; production/sensitive review gates remain partly unknown |
| Integrations | Narrow verified Apple Health sharing plus third-party bridges; current partner workout links need revalidation |
| Provenance | Health Kit and workout files can retain timestamps and source fields, but normalized destinations may reduce fidelity |
| Corrections and deletion | Propagation through exports, APIs and connected services is undocumented |
| Portability | Useful for workouts and selected records; weak for complete recurring consumer-controlled retrieval |
| Evidence quality | Strong for interface architecture and open-source mechanics; regional export and production approval need hands-on checks |

## Provisional openness assessment

**Restricted: useful privacy export and supported application access, without documented complete
personal automation.**

Huawei is not closed to machine-readable retrieval. A user can obtain and convert workout records,
selected devices can be used without the vendor cloud, and approved applications can retrieve broad
typed data. The unresolved issue is completeness under user control: the public record does not show
that an ordinary account holder can repeatedly retrieve every value Huawei Health stores or derives
without building and qualifying a Health Kit application.

## Evidence gaps

1. Run the privacy export for mainland-China and international Huawei IDs and compare menu path,
   legal entity, preparation time, expiry, encryption and every delivered file.
2. Inventory export history, raw samples, workouts, routes, sleep stages, derived scores, deleted
   records and source/device metadata against the same Huawei Health screens.
3. Create individual and organization AppGallery Connect projects and record identity, publication,
   verification and sensitive-permission gates.
4. Compare Android SDK and REST data types, pagination, backfill, quotas and revocation behavior.
5. Verify whether Huawei currently offers any native iOS Health Kit developer SDK.
6. Capture the exact Apple Health category and direction matrix from the current Huawei Health iOS
   permission screens and test pre-authorization history.
7. Revalidate Strava and TrainingPeaks with live in-app connectors and current destination-side
   documentation before rating them available.
8. Capture Health Sync's current Huawei-source matrix for Health Connect and Samsung Health,
   including history and duplicate handling.
9. Test Gadgetbridge across the currently documented Huawei/Honor model list and firmware.
10. Validate Hitrava against multiple 2025/2026 privacy ZIPs and compare converted TCX with original
    Huawei Health totals and routes.
11. Determine whether current HiSuite backups include Huawei Health app data and whether any
    maintained parser can interpret it without unsafe credential or key handling.

