# Apple resources

**Evidence date:** 18 August 2026  
**Audit:** [Apple](./README.md)

Links are grouped by role and deduplicated. "Accessed" records the research date, not the page's
publication date.

## Official developer documentation

- [HealthKit reference](https://developer.apple.com/documentation/healthkit) — **Apple**;
  accessed 2026-08-18. Primary framework and API reference.
- [HealthKit overview](https://developer.apple.com/health-fitness/healthkit/) — **Apple**;
  accessed 2026-08-18. Platform overview and supported use cases.
- [HealthKit data types](https://developer.apple.com/documentation/healthkit/data-types) —
  **Apple**; accessed 2026-08-18. Current data-type catalogue.
- [Setting up HealthKit](https://developer.apple.com/documentation/healthkit/setting-up-healthkit)
  — **Apple**; accessed 2026-08-18. Entitlements, capabilities and project configuration.
- [Authorizing access to health data](https://developer.apple.com/documentation/healthkit/authorizing-access-to-health-data)
  — **Apple**; accessed 2026-08-18. Per-type read/write consent model.
- [Reading data from HealthKit](https://developer.apple.com/documentation/healthkit/reading-data-from-healthkit)
  — **Apple**; accessed 2026-08-18. Query patterns and historical reads.
- [Workouts and activity rings](https://developer.apple.com/documentation/healthkit/workouts-and-activity-rings)
  — **Apple**; accessed 2026-08-18. Workout sessions, records and activity summaries.
- [Clinical Health Records](https://developer.apple.com/documentation/healthkit/clinical-health-records)
  — **Apple**; accessed 2026-08-18. User-authorized institutional records and FHIR payloads.
- [WorkoutKit](https://developer.apple.com/documentation/workoutkit) — **Apple**; accessed
  2026-08-18. Structured workout creation and scheduling.
- [SensorKit](https://developer.apple.com/documentation/sensorkit) — **Apple**; accessed
  2026-08-18. Restricted research sensor framework.
- [App Review Guidelines: Health and health research](https://developer.apple.com/app-store/review/guidelines/#health-and-health-research)
  — **Apple**; accessed 2026-08-18. Rules governing HealthKit data use and distribution.

## Official support, export, security and policy

- [Share and export health data](https://support.apple.com/guide/iphone/share-your-health-data-iph5ede58c3d/ios)
  — **Apple**; accessed 2026-08-18. User-facing Health XML export route.
- [Manage Health data from multiple sources](https://support.apple.com/en-us/108779) —
  **Apple**; accessed 2026-08-18. Source priority, permissions and iCloud behavior.
- [HealthKit data security](https://support.apple.com/guide/security/healthkit-data-security-sec88be9900f/web)
  — **Apple**; accessed 2026-08-18. Device and iCloud security model.
- [Get a copy of Apple account data](https://support.apple.com/en-us/102208) — **Apple**;
  accessed 2026-08-18. Data & Privacy portal process.
- [Apple Data & Privacy portal](https://privacy.apple.com/) — **Apple**; accessed 2026-08-18.
  Authenticated account export and privacy controls.
- [Apple Privacy Policy](https://www.apple.com/legal/privacy/en-ww/) — **Apple**; accessed
  2026-08-18. Access, deletion and portability rights.
- [Encrypted computer backups](https://support.apple.com/108353) — **Apple**; accessed
  2026-08-18. Backup encryption required to preserve sensitive Health data.

## Integration documentation

- [Strava and Apple Health](https://support.strava.com/hc/en-us/articles/216917527-Health-App-and-Strava)
  — **Strava**; accessed 2026-08-18. Supported workout directions and recent-history limit.
- [TrainingPeaks for Apple Watch](https://www.trainingpeaks.com/apple-watch/) —
  **TrainingPeaks**; accessed 2026-08-18. Structured workout delivery and completed-workout sync.
- [Garmin Connect and Apple Health](https://support.garmin.com/en-US/?faq=lK5FPB9iPF5PXFkIpFlFPA)
  — **Garmin**; accessed 2026-08-18. Garmin-to-Health categories and constraints.
- [Oura and Apple Health](https://support.ouraring.com/hc/en-us/articles/360025438734-How-to-Use-Apple-Health-with-Oura)
  — **Oura**; accessed 2026-08-18. Selected bidirectional HealthKit sync.
- [WHOOP and Apple Health](https://support.whoop.com/s/article/Apple-Health-Integration?language=en_US)
  — **WHOOP**; accessed 2026-08-18. Selected workouts, sleep and physiological records.
- [Withings and Apple Health](https://support.withings.com/hc/en-us/articles/201494667-Partner-Apps-Apple-Health-What-is-the-Apple-Health-integration)
  — **Withings**; accessed 2026-08-18. Body, vital, sleep and activity integration.
- [Polar Flow and Apple Health](https://support.polar.com/en/support/connecting_polar_flow_with_apple_health)
  — **Polar**; accessed 2026-08-18. Polar-to-Health transfer.
- [Suunto app and Apple Health](https://www.suunto.com/Support/faq-articles/suunto-app/how-do-i-use-the-suunto-app-with-apple-health/)
  — **Suunto**; accessed 2026-08-18. Suunto-to-Health transfer.
- [Peloton Apple Health integration](https://support.onepeloton.com/s/article/360048773312-Apple-Health-Integration)
  — **Peloton**; accessed 2026-08-18. Peloton workout records written to Health.
- [Health Connect](https://support.google.com/android/answer/12201227) — **Google**; accessed
  2026-08-18. Confirms Android-local architecture; no first-party Apple bridge.
- [Samsung Health Connect developer guide](https://developer.samsung.com/health/android/data/guide/health-connect.html)
  — **Samsung**; accessed 2026-08-18. Samsung's Android interchange route.
- [Apple GymKit equipment support](https://support.apple.com/guide/watch/use-gym-equipment-apd15b0268fd/watchos)
  — **Apple**; accessed 2026-08-18. Session-level Apple Watch and equipment exchange.

## Open-source projects

- [kingstinct/react-native-healthkit](https://github.com/kingstinct/react-native-healthkit) —
  **MIT; TypeScript/Swift**; accessed 2026-08-18. Maintained React Native HealthKit binding for
  authorized local queries and incremental sync.
- [StanfordSpezi/SpeziHealthKit](https://github.com/StanfordSpezi/SpeziHealthKit) —
  **MIT; Swift**; accessed 2026-08-18. Maintained native HealthKit collection framework.
- [StanfordBDHG/HealthKitOnFHIR](https://github.com/StanfordBDHG/HealthKitOnFHIR) —
  **Apache-2.0; Swift**; accessed 2026-08-18. Maps supported HealthKit records to FHIR resources;
  verify current dependency compatibility.
- [tdda/applehealthdata](https://github.com/tdda/applehealthdata) — **MIT; Python**; accessed
  2026-08-18. Parser for official Apple Health exports; lower maintenance cadence and newer
  record types need fixture testing.
- [abrignoni/iLEAPP](https://github.com/abrignoni/iLEAPP) — **MIT; Python**; accessed
  2026-08-18. Actively maintained forensic parser for authorized local backups; produces broad,
  highly sensitive reports.
- [libimobiledevice/libimobiledevice](https://github.com/libimobiledevice/libimobiledevice) —
  **LGPL-2.1-or-later; C**; accessed 2026-08-18. Active component for creating local
  Finder/iTunes-compatible backups; not a Health normalizer.
- [dogsheep/healthkit-to-sqlite](https://github.com/dogsheep/healthkit-to-sqlite) —
  **Apache-2.0; Python**; accessed 2026-08-18. Converts official export XML to SQLite; useful but
  not actively maintained enough to assume current type coverage.
- [k0rventen/apple-health-grafana](https://github.com/k0rventen/apple-health-grafana) —
  **MIT; Python/Docker**; accessed 2026-08-18. Visualizes selected export records; not a lossless
  archive and maintenance is less dependable than its adoption suggests.
- [dariosalvi78/cordova-plugin-health](https://github.com/dariosalvi78/cordova-plugin-health) —
  **MIT; JavaScript/native**; accessed 2026-08-18. Mature HealthKit bridge for existing Cordova
  apps; lower cadence and not preferred for new exporters.

## Historical or fragile projects

- [quantifiedself/qs-access](https://github.com/quantifiedself/qs-access) — **Open-source iOS
  exporter**; accessed 2026-08-18. Historically important but effectively abandoned and tied to
  old HealthKit/Xcode assumptions.
- [agencyenterprise/react-native-health](https://github.com/agencyenterprise/react-native-health)
  — **MIT; React Native**; accessed 2026-08-18. Legacy bridge superseded for new work by
  `react-native-healthkit`.
- [openmhealth/omh-ios](https://github.com/openmhealth/omh-ios) — **Apache-2.0; Swift**;
  accessed 2026-08-18. Inactive HealthKit-to-Open mHealth mapping retained mainly for schema
  research.

## Secondary package context

- [react-native-healthkit on npm](https://www.npmjs.com/package/@kingstinct/react-native-healthkit)
  — **npm**; accessed 2026-08-18. Package release and adoption context.
- [SpeziHealthKit on Swift Package Index](https://swiftpackageindex.com/StanfordSpezi/SpeziHealthKit)
  — **Swift Package Index**; accessed 2026-08-18. Package compatibility and release context.
