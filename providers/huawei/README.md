# Huawei

**Evidence date:** 2026-08-20

**Canonical coverage:** [Huawei taxonomy mapping](./coverage.json)

## Bottom line

Huawei offers two materially different forms of access. An account holder can request Huawei Health
data through privacy workflows documented by community projects including
[Hitrava](https://github.com/CTHRU/Hitrava) and
[Huawei Health Importer](https://github.com/JordyThien/Huawei-Health-Importer). No public,
versioned archive schema, complete field inventory or cross-region equivalence guarantee was
located in the cited Huawei sources as of the evidence date. Developers can build
authorized applications with [HMS Core Health Kit](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-introduction-0000001050071662),
including an Android SDK and REST interfaces, but developer identity verification, AppGallery
Connect application setup, app-level data-permission applications and end-user authorization are
separate gates.

The practical result is useful but constrained portability. Community projects observe heart rate,
SpO2, body composition, sleep stages, daily activity and workout data in particular privacy-export
layouts. Hitrava states support for Huawei's 2025 ZIP layout and can convert supported workouts
locally to TCX; this is not proof of arbitrary current or regional archive compatibility. Selected
devices can also be read directly with Gadgetbridge.
Neither path establishes access to every Huawei Health record or proprietary score. Health Kit is
automatable, but it is an application integration surface rather than a documented personal cloud
API or complete account dump.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Huawei Health privacy ZIP | Huawei account holder where a privacy workflow is available | No; request and download | Community-observed heart rate, SpO2, body composition, sleep, daily activity and workouts | No public versioned Huawei schema located; layouts, regions and completeness are not guaranteed |
| Health Kit Android SDK | Identity-verified and configured Huawei developer application plus consenting user | Yes | Documented permissioned Android health, activity and exercise types | Separate app-level permission applications; ordinary-developer production eligibility is unknown |
| Health Kit REST APIs | Configured service application plus consenting user | Yes | REST records only where a route-specific endpoint, scope and query are documented | Endpoint/type parity with Android and ordinary-developer production eligibility are unknown |
| Apple Health / HealthKit | Huawei Health iOS user | App-mediated | Weight and motion/exercise sharing documented by Huawei's App Store listing | Narrow documented categories; broader parity and backfill are unknown |
| Health Sync bridge | Android user with Huawei Health and a destination | Yes, through a third party | Source/destination-specific compatible categories | Paid bridge after trial; mappings, history and lossiness vary |
| Gadgetbridge | User with a supported Huawei/Honor wearable | Yes, locally | Device-resident records exposed by the reverse-engineered protocol | Model/firmware dependent; not Huawei Health cloud history |
| Huawei Health Importer | iOS user with a Huawei privacy-export folder | Yes, after export | Exported HR, SpO2, body composition, sleep stages and daily activity imported to Apple Health | MIT personal-use project; fixtures establish observed fields, not provider-guaranteed completeness |
| Huawei Health to Health Connect | User with exported Huawei weight/body-fat JSON | Yes, after export | Weight and body-fat CSV imported through Tasker | MIT narrow converter; requires a separate Health Connect-capable Android environment |
| Hitrava | User with a supported Huawei Health ZIP/JSON or legacy HiTrack files | Yes, after export | Workout-source records parsed and generated TCX/JSON outputs | NPOSL-3.0 source-available unofficial parser; project-stated 2025 ZIP support, not arbitrary archive support |
| CH100 local database | Owner of a CH100/AH100 scale and recoverable app backup | Partial | Model-specific body-composition records from `HW100.db` | Separate local silo; reverse-engineered static key and SQLCipher workflow, not Huawei Health export data |
| HiSuite backup tools | Technically capable user with their own compatible backup | Partial | Files and databases actually included in a decryptable backup | No maintained end-to-end Huawei Health database parser was verified |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Unknown | Huawei publishes no complete mapping from Huawei Health screens and derived outputs to Health Kit, privacy ZIPs or integrations |
| Self-service developer access | Unknown | Huawei documents developer registration and app configuration, but ordinary-developer production eligibility after identity and app-level permission review was not verified |
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

| Data family | Included metrics or app outputs | Captured or produced as | Privacy ZIP | Android SDK | REST API | Apple Health | Health Sync | Gadgetbridge | Hitrava | Backup/DB tools |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Daily movement | Steps, distance, active periods | Captured and normalized summaries | P | A | U | P | U | P | N | U |
| Energy and active time | Calories and exercise duration | Normalized and derived | P | A | U | U | U | P | P | U |
| Heart rate | Continuous, resting and workout heart rate | Captured samples and summaries | P | A | U | U | U | P | P | U |
| HRV | Device-dependent HRV observations or trends | Captured and derived | U | U | U | U | U | U | U | U |
| Blood pressure | Measurements from supported devices such as Watch D products | Captured and normalized | U | P | U | U | U | U | N | U |
| ECG and rhythm | Waveform and classifications on supported products/regions | Captured and derived | U | U | U | U | U | U | N | U |
| VO2 max and cardio fitness | Device/app fitness estimates | Derived | U | U | U | U | U | U | U | U |
| SpO2 and respiration | Blood oxygen and respiration where supported | Captured and normalized | P | P | U | U | U | P | U | U |
| Temperature | Temperature observations on compatible devices | Captured and normalized | U | U | U | U | U | U | U | U |
| Sleep sessions and stages | Duration, stages and intervals | Captured and normalized | P | A | U | U | U | P | N | U |
| Sleep insights and score | TruSleep-style analysis and guidance | Derived | U | U | U | U | U | U | N | U |
| Stress and emotional wellbeing | Stress records, mood displays and breathing guidance | Captured and derived | P | P | U | U | U | U | N | U |
| Training load and recovery | Load, recovery time and training guidance where supported | Derived | U | U | U | U | U | U | P | U |
| Workout sessions | Sport, duration, distance, calories and intervals | Captured sessions and summaries | A | A | U | P | U | P | A | U |
| Routes and elevation | GPS track, pace/speed and elevation where recorded | Captured series and normalized route | A | P | U | U | U | P | A | U |
| Sport dynamics | Cadence, laps, heart rate and activity-specific telemetry | Captured and derived workout fields | P | P | U | U | U | P | P | U |
| Plans and courses | Structured workouts and coaching content | User-entered or external | U | U | U | U | U | U | N | U |
| Body measurements | Weight, height, BMI and body composition | Captured, entered and normalized | P | A | U | P | U | U | N | P |
| Reproductive health | Cycle records and predictions where supported | User-entered and derived | U | U | U | U | U | U | N | U |
| Trends, alerts and awards | App trends, reminders, alerts and achievements | Derived | U | U | U | U | U | U | N | U |
| Raw sensor streams | Accelerometer, optical and other device-level signals | Captured | U | U | U | NA | U | U | U | U |
| Provenance metadata | Record IDs, timestamps and source/device fields | Captured and normalized metadata | P | P | U | P | U | P | P | U |

The complete 29-family mapping, including families for which current evidence is insufficient, is in
[coverage.json](./coverage.json). Route codes do not imply complete history or every field.

## Official access routes

### Huawei Health privacy export

Huawei's public privacy policy establishes rights to access or obtain a copy of personal data. No
public, versioned Huawei Health archive schema was located in the cited Huawei sources as of the
evidence date. The source-available
[Hitrava documentation](https://github.com/CTHRU/Hitrava) records one practical flow:
Huawei Health → account name → Privacy Center → Request Your Data → Health. It describes an
email-delivered, password-encrypted ZIP and project-stated support for Huawei's 2025 ZIP layout.

That is community operational evidence for a consumer-controlled archive, not a provider guarantee.
[Huawei Health Importer](https://github.com/JordyThien/Huawei-Health-Importer) includes parsers and
fixtures for exported heart rate, SpO2, body composition, sleep stages and daily activity.
[Huawei Health to Health Connect](https://github.com/christianeirich/huawei-health-to-health-connect)
parses exported weight/body-fat JSON. Those observations justify partial route coverage for the
named families without proving arbitrary archive compatibility. Hitrava-generated TCX and JSON are
converter outputs, separate from source records supplied in Huawei's ZIP.

Archive preparation time, expiry, retention, deleted records and regional
availability require hands-on verification. In particular, no primary source was found proving that
mainland-China and international Huawei IDs receive identical files or use the same request route.

### HMS Core Health Kit

[Health Kit](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-introduction-0000001050071662)
is Huawei's supported programmable surface for authorized applications. Four distinct gates must
not be collapsed:

1. [Developer registration and identity verification](https://developer.huawei.com/consumer/en/doc/app/agc-help-createaccount-0000001146718717).
2. [AppGallery Connect project and application setup](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-configuring-0000001050030937).
3. [App-level Health Kit permission applications](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-app-permission-0000001050069764).
4. [End-user data authorization](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-authorize-0000001050030936).

The
[configuration guide](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-configuring-0000001050030937)
requires application configuration through Huawei's developer platform, and the
[authorization guide](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-authorize-0000001050030936)
uses data-specific user authorization rather than blanket account access.

### Android SDK

The Android/HMS Core SDK documents typed health and fitness records for installed applications.
Coverage in this audit is retained only where the Android data-type documentation supports the
family. Identity verification, app-level permission review, end-user scopes, device support and
region remain independent constraints.

### REST APIs

Huawei also documents REST interfaces, but this audit does not assume Android parity. REST coverage
is `U` unless a route-specific endpoint, scope and query contract has been verified for the family.
OAuth authorization alone does not prove that every SDK type, historical record or derived output
can be queried from a server.

A native iOS Health
Kit developer SDK was not confirmed; the presence of the Huawei Health iOS consumer app is not
evidence of one. App identity verification, sensitive-permission review, publication requirements,
quotas and production eligibility should be recorded from a real AppGallery Connect project before
ordinary-developer access is classified as self-service or partner-gated.

Health Kit is record-oriented. It supports meaningful activity, exercise, sleep, heart-rate, body
and selected health measurements, but no public statement establishing exposure of every metric,
score, alert or recommendation visible in Huawei Health was located in the cited sources.

## Data available

The strongest supported route is Health Kit for applications with the necessary configuration and
user grant. Record granularity varies by data type: timestamped observations, aggregate samples,
measurements and exercise sessions are all represented. REST and Android SDK parity, historical
depth, pagination, deletion propagation and universal request limits were not established.

The privacy archive is broader in user control but weaker in provider documentation. Community
parsers observe structured heart rate, SpO2, body composition, sleep-stage, daily-activity and
workout records in particular exports. Hitrava states support for a 2025 ZIP layout with
HiTrack-style workout data, route information and selected telemetry. Its generated TCX/JSON files
are not source archive formats. Successful parsing does not prove that Huawei exported everything
retained by the service.

Huawei's product catalogue includes measurements and proprietary analyses whose availability
depends on device and region. Examples include ECG and blood-pressure products, TruSleep analysis,
stress/emotional-wellbeing guidance and training outputs. Unless a Health Kit type, archive field or
integration explicitly names the derived value, this audit records route coverage as unknown.

## Ecosystem integrations

| Destination | Classification and direction | Confirmed payload/history | Material limits |
|---|---|---|---|
| [Apple Health](https://apps.apple.com/us/app/huawei-health/id1325481372) | Native Huawei Health iOS integration; Huawei Health writes motion/exercise and weight, and can obtain exercise data from HealthKit | Current App Store description confirms those categories; backfill is unknown | Broader health categories, proprietary scores, source fidelity and complete history are not documented |
| [Health Sync](https://healthsync.app/f-a-q/) → Health Connect | Independent Android bridge from Huawei Health to a configured destination | Automatic/category-specific sync is supported by the bridge; exact Huawei matrix and history are unknown | Health Connect requires Android 9+ and Google Play services; many Huawei phones lack GMS, so a separate Google-enabled Android environment may be needed |
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
| [Huawei Health Importer](https://github.com/JordyThien/Huawei-Health-Importer) | Parses a Huawei privacy-export folder and, separately, a CH100 database CSV | Apple Health HR, SpO2, body composition, sleep stages and daily activity | MIT iOS personal-use project; zero network calls; community fixtures, not provider-guaranteed schema |
| [Huawei Health to Health Connect](https://github.com/christianeirich/huawei-health-to-health-connect) | Parses exported weight/body-fat JSON | CSV then Tasker/Health Connect records | MIT and narrow; requires Tasker plus Google Play services on Android 9+ |
| [Hitrava](https://github.com/CTHRU/Hitrava) | Parses project-supported encrypted ZIPs, JSON and legacy HiTrack files | Source workout records plus generated HiTrack/JSON/TCX files | Active Huawei-specific source-available project under custom NPOSL-3.0; GitHub reports SPDX `NOASSERTION`; not OSI open source |
| [Huawei-TCX-Converter](https://github.com/aricooperdavis/Huawei-TCX-Converter) | Parses legacy copied HiTrack files | TCX workouts | MIT but archived; older Android storage paths and Huawei schemas make it fragile |
| [kobackupdec](https://github.com/RealityNet/kobackupdec) | Decrypts user-password-protected HiSuite/KoBackup archives | Restored files and raw application directories/databases | MIT and explicitly end-of-life; does not parse Huawei Health semantics |

Huawei Health Importer's CH100/AH100 path is separate and model-specific. It documents a local
`HW100.db` silo in the Huawei Body Fat Scale companion app, recovered from an iOS app backup and
opened through a reverse-engineered SQLCipher key. It is not evidence that Huawei Health stores,
exports or can query that history.

No maintained end-to-end parser was verified for general current Huawei Health private databases or
every file in the privacy archive. HiSuite decryption only helps if a backup includes the relevant
app data, and modern backup policies may exclude it. Rooting, copying private databases or using
session emulators substantially increases account and device risk.

## Material barriers and risks

- **Two different ecosystems:** Huawei Health is the consumer app; Health Kit is a developer
  service configured through AppGallery Connect. Neither name implies access to the other surface's
  complete data.
- **Separate access gates:** Developer identity verification, app setup, app-level data-permission
  applications and end-user authorization each apply; ordinary-developer production eligibility is
  still unknown.
- **Regional uncertainty:** Huawei ID region, HMS Core availability, product regulation and app
  distribution can change routes and data.
- **No located public versioned export contract:** Community tooling observes workable ZIP layouts,
  but no public versioned schema or parity guarantee was located in the cited Huawei sources as of
  the evidence date.
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
| Granularity | Android SDK records, REST records where separately documented, and structured community-observed privacy-export data |
| Historical depth | No universal retention or backfill guarantee was found |
| Automation | Supported for configured Health Kit apps; not documented as a direct personal account API |
| Formats | Permissioned SDK/REST records, community-observed encrypted ZIP/JSON/HiTrack, and converter-generated CSV/TCX/JSON |
| User authorization | Data-specific Huawei authorization for Health Kit; identity verification for privacy requests |
| Developer access | Identity verification, app setup, app-level permission applications and end-user authorization are separate; ordinary-developer production eligibility is unknown |
| Integrations | Narrow verified Apple Health sharing plus third-party bridges; current partner workout links need revalidation |
| Provenance | Health Kit and workout files can retain timestamps and source fields, but normalized destinations may reduce fidelity |
| Corrections and deletion | Propagation through exports, APIs and connected services is undocumented |
| Portability | Useful for workouts and selected records; weak for complete recurring consumer-controlled retrieval |
| Evidence quality | Strong for interface architecture and community-tool mechanics; regional export and production approval need hands-on checks |

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
10. Validate Hitrava specifically against multiple 2025-layout and later regional privacy ZIPs and
    distinguish archive source records from generated TCX/JSON.
11. Determine whether current HiSuite backups include Huawei Health app data and whether any
    maintained parser can interpret it without unsafe credential or key handling.
