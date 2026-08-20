# Huawei resources

**Evidence date:** 2026-08-20

All resources were accessed on the evidence date. Huawei developer pages are JavaScript-rendered;
HTTP availability does not guarantee that every account or region exposes the documented service.

## Official developer documentation

- [Health Kit introduction](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-introduction-0000001050071662)
  — **Huawei**; supported health and fitness data-sharing service.
- [Health Kit development overview](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-development-overview-0000001050071660)
  — **Huawei**; development surfaces and record-oriented capability areas.
- [Health Kit API overview](https://developer.huawei.com/consumer/en/doc/hmscore-references/health-api-overview-0000001050030935)
  — **Huawei**; typed API/controller reference.
- [Huawei developer registration](https://developer.huawei.com/consumer/en/doc/app/agc-help-createaccount-0000001146718717)
  — **Huawei**; developer account registration and identity verification.
- [Health Kit integration preparation](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-configuring-0000001050030937)
  — **Huawei**; developer project and application configuration.
- [Health Kit app permission application](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-app-permission-0000001050069764)
  — **Huawei**; app-level application for health-data permissions.
- [Health Kit authorization](https://developer.huawei.com/consumer/en/doc/HMSCore-Guides/health-authorize-0000001050030936)
  — **Huawei**; separate end-user authorization and data-specific scopes.
- [HMS Core service availability](https://developer.huawei.com/consumer/en/doc/development/HMSCore-Guides-V5/service-introduction-0000001050040062-V5)
  — **Huawei**; service and regional availability context.

## Official support

- [Huawei Consumer Privacy Policy](https://consumer.huawei.com/en/privacy/privacy-policy/) —
  **Huawei**; data-subject access/copy rights and regional legal context.
- [Huawei consumer privacy portal](https://consumer.huawei.com/en/privacy/) — **Huawei**; regional
  privacy information and request entry points.
- [Huawei Health on the Apple App Store](https://apps.apple.com/us/app/huawei-health/id1325481372)
  — **Huawei/Apple**; current consumer app description, product-visible records and limited
  bidirectional HealthKit behavior.
- [Huawei Watch GT 5 Pro](https://consumer.huawei.com/en/wearables/watch-gt5-pro/) — **Huawei**;
  examples of app/device-visible derived emotion, sleep and fitness guidance.

## Integration documentation

- [Manage Health data from multiple sources](https://support.apple.com/en-us/108779) — **Apple**;
  source permissions, attribution and priority behavior.
- [Health Sync FAQ](https://healthsync.app/f-a-q/) — **Health Sync**; third-party sync mechanics,
  supported route caveats and file-based destinations.
- [Health Sync Google Play listing](https://play.google.com/store/apps/details?id=nl.appyhapps.healthsync)
  — **Health Sync/Google**; current Android app, supported services and licensing context.
- [Health Connect availability](https://developer.android.com/health-and-fitness/health-connect/availability)
  — **Google**; Android 9+ and Google Play services requirements for a Health Connect destination.
- [Google Fit developer documentation](https://developers.google.com/fit) — **Google**; Fit API
  deprecation and migration direction.

Current direct Strava and TrainingPeaks Huawei pages supplied by the initial specialist reports
returned HTTP 404 during editorial verification, so they are not retained as evidence of a current
supported route.

## Open-source projects

- [Gadgetbridge](https://codeberg.org/Freeyourgadget/Gadgetbridge) — **AGPLv3; Java/Kotlin**;
  maintained local Bluetooth client for supported wearables, hosted on Codeberg.
- [`JordyThien/Huawei-Health-Importer`](https://github.com/JordyThien/Huawei-Health-Importer) —
  **MIT; Swift**; parsers and fixtures for privacy-export HR, SpO2, body composition, sleep stages
  and daily activity, plus a separate CH100/AH100 local-database workflow.
- [`christianeirich/huawei-health-to-health-connect`](https://github.com/christianeirich/huawei-health-to-health-connect)
  — **MIT; Python/Tasker**; parses exported weight/body-fat JSON for Health Connect import.
- [`CTHRU/Hitrava`](https://github.com/CTHRU/Hitrava) — **custom NPOSL-3.0; GitHub SPDX
  `NOASSERTION`; Python**; source-available unofficial parser for project-supported Huawei Health
  ZIP/JSON/HiTrack workouts and generated TCX/JSON.
- [Hitrava licence](https://github.com/CTHRU/Hitrava/blob/master/LICENSE.md) — **CTHRU**; custom
  non-profit source licence; it is not classified here as OSI open source.
- [`aricooperdavis/Huawei-TCX-Converter`](https://github.com/aricooperdavis/Huawei-TCX-Converter) —
  **MIT; Python**; archived converter for legacy HiTrack workout files.
- [`RealityNet/kobackupdec`](https://github.com/RealityNet/kobackupdec) — **MIT; Python**; end-of-life
  decryptor for user-password-protected Huawei HiSuite/KoBackup archives.

## Secondary context

- [Canonical data taxonomy](../../data-taxonomy.md) — **OpenHealthData**; normalized metric-family
  vocabulary used by `coverage.json`.
- [Provider audit rubric](../../audit-rubric.md) — **OpenHealthData**; evidence and openness rules
  used by this audit.
