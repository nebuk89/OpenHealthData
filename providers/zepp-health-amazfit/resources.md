# Zepp Health / Amazfit resources

**Evidence date:** 2026-08-20

All resources were checked on the evidence date. Zepp's documentation is versioned by API level but
often lacks a visible publication date. The historical Amazfit integration blog URL returned 404
and is deliberately excluded.

## Official developer documentation

- [Zepp Health Developer Platform](https://developer.zepp.com/) — **Zepp Health**; developer
  account and Zepp OS entry point.
- [Introduction to Zepp OS](https://docs.zepp.com/docs/intro/) — **Zepp Health**; current wearable
  mini-program platform and supported-product context.
- [Zepp OS quick start](https://docs.zepp.com/docs/guides/quick-start/) — **Zepp Health**;
  development, tooling, testing and device setup.
- [Heart Rate API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/HeartRate/) —
  **Zepp Health**; current, daily, resting and rhythm-related device values by API level.
- [Sleep API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Sleep/) — **Zepp
  Health**; sleep summary, score, stages, naps and refresh behavior.
- [Blood Oxygen API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/BloodOxygen/)
  — **Zepp Health**; current and recent SpO2 access.
- [Stress API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Stress/) — **Zepp
  Health**; current, daily and seven-day stress windows.
- [PAI API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Pai/) — **Zepp
  Health**; current, daily and seven-day PAI values.
- [Accelerometer API](https://docs.zepp.com/docs/reference/device-app-api/newAPI/sensor/Accelerometer/)
  — **Zepp Health**; live x/y/z device samples and frequency modes.
- [Supported-device resource](https://docs.zepp.com/docs/reference/related-resources/device-list/) —
  **Zepp Health**; device-source and regional-version context.

## Official support

- [Zepp app privacy policy](https://upload-cdn.zepp.com/tposts/8192) — **Zepp Health**; current
  Zepp/Amazfit data inventory, user rights, derived services and policy scope.
- [Zepp privacy support](https://www.zepp.com/privacy-support) — **Zepp Health**; privacy-rights
  request channel.
- [Zepp app privacy/export portal](https://user.huami.com/privacy2/index.html?loginPlatform=web&platform_app=com.huami.watch.hmwatchmanager)
  — **Zepp Health/Huami**; authenticated first-party Zepp app export surface.
- [Zepp Android listing](https://play.google.com/store/apps/details?id=com.huami.watch.hmwatchmanager)
  — **Zepp Health / Google Play**; current app scope, metric families and workout import/export
  permission explanation.
- [Zepp iOS listing](https://apps.apple.com/us/app/zepp/id1127269366) — **Zepp Health / Apple App
  Store**; current app scope and workout import/export explanation.

## Integration documentation

- [Amazfit and Strava](https://support.strava.com/en-us/articles/15402010-amazfit-and-strava) —
  **Strava**; current reciprocal support page for automatic Amazfit activity synchronization.
- [Amazfit partner page](https://www.trainingpeaks.com/partners/amazfit/) — **TrainingPeaks**;
  current partnership and product integration context; field mapping and history are not specified.
- [Manage Health data from multiple sources](https://support.apple.com/en-us/108779) — **Apple**;
  Health per-app permissions, source attribution and priority model.
- [Health Connect](https://support.google.com/android/answer/12201227) — **Google**; Android
  permissioned health-store model used to interpret, but not independently prove, Zepp coverage.
- [Connect apps with Google Fit](https://support.google.com/fit/answer/6098255) — **Google**;
  Google Fit third-party authorization model.

## Open-source projects

- [Gadgetbridge GitHub mirror](https://github.com/Freeyourgadget/Gadgetbridge) — **AGPL-3.0;
  Java/Kotlin**; local-first Bluetooth companion with Amazfit support. This mirror is archived and
  points to the active [Codeberg repository](https://codeberg.org/Freeyourgadget/Gadgetbridge).
- [`huami-token`](https://github.com/argrento/huami-token) — **MIT; Python**; Zepp- and
  Mi-Fitness-specific login modes for device keys and tokens; not a health-history exporter.
- [Mi Fit and Zepp workout exporter](https://github.com/rolandsz/Mi-Fit-and-Zepp-workout-exporter)
  — **MIT; Python**; selected workout retrieval through undocumented Huami/Zepp services and
  multiple local output formats.

## Secondary context

- [Mi Fitness Android listing](https://play.google.com/store/apps/details?id=com.xiaomi.wearable) —
  **Xiaomi / Google Play**; establishes the distinct Xiaomi application/package boundary.
- [Zepp Life Android listing](https://play.google.com/store/apps/details?id=com.xiaomi.hm.health) —
  **Zepp Health / Google Play**; legacy Mi Fit lineage and separate application/package context.
