# Polar resources

**Evidence date:** 2026-08-20

All resources were checked on the evidence date. Current canonical pages are used where Polar has
retired older support slugs. A successful link check establishes availability, not completeness or
app/export parity.

## Official developer documentation

- [Polar AccessLink API v3](https://www.polar.com/accesslink-api/) — **Polar**; current API
  registration, OAuth, consent, resources, JSON/XML formats, transactions, webhooks, schemas and
  rate limits.
- [Polar AccessLink client administration](https://admin.polaraccesslink.com/) — **Polar**;
  signed-in client registration and redirect-URI administration.
- [Polar API Limited License Agreement](https://www.polar.com/en/legal/polar-api-agreement) —
  **Polar**; API licence, permitted use, data handling and prohibition on unauthorized scraping.
- [`polarofficial/polar-ble-sdk`](https://github.com/polarofficial/polar-ble-sdk) — **Polar**;
  official Android/iOS BLE SDK, device support, online streaming, offline recording and examples.
  GitHub reports SPDX `NOASSERTION` as of 2026-08-20.

## Official support

- [Download all your data from Polar Flow](https://support.polar.com/en/how-to-download-all-your-data-from-polar-flow)
  — **Polar**; account-holder data-download entry point. The live public page does not provide a
  stable archive schema or full-history guarantee.
- [Export individual training sessions](https://support.polar.com/en/export-training-sessions-flow)
  — **Polar**; current Flow Diary workflow and GPX, TCX, CSV, FIT and ZIP options.
- [Polar Privacy Notice](https://www.polar.com/en/legal/privacy-notice) — **Polar**; handling,
  retention, access, correction, deletion and portability rights context.
- [SleepWise](https://www.polar.com/en/smart-coaching/sleepwise) — **Polar**; alertness,
  sleep-debt and circadian-derived product outputs.
- [Elixir biosensing](https://www.polar.com/en/explore/elixir) — **Polar**; device-dependent SpO2
  and other biosensing outputs saved to Flow.

## Integration documentation

- [Polar Flow and Apple Health](https://support.polar.com/en/support/connecting_polar_flow_with_apple_health)
  — **Polar**; one-way direction, exact categories and limited two-week troubleshooting resync.
- [Polar Flow and Health Connect](https://support.polar.com/en/flow-app-health-connect) —
  **Polar**; current Android categories, permissions and new-data-only wording.
- [Polar Flow and Strava](https://support.polar.com/en/support/how_can_i_automatically_sync_my_data_from_polar_flow_to_strava)
  — **Polar**; automatic training-session transfer and documented calculation/field differences.
- [Polar Flow and TrainingPeaks](https://support.polar.com/en/support/how_can_i_automatically_sync_my_data_from_polar_flow_to_trainingpeaks)
  — **Polar**; completed-session export, planned-workout import, eligibility and history limits.
- [Polar Flow and komoot](https://support.polar.com/en/komoot) — **Polar**; planned-tour import
  and Flow training-route export.
- [komoot two-way route update](https://support.polar.com/en/updates/polar-flow-update-komoot-two-way-sync)
  — **Polar**; current route-only two-way behavior and reconnection requirement.

The persisted integration report also named MyFitnessPal and legacy Google Fit. Their cited pages no
longer provide reliable current product evidence, so this package does not use them to assert
current payload or backfill behavior.

## Open-source projects

- [`polarofficial/polar-ble-sdk`](https://github.com/polarofficial/polar-ble-sdk) —
  **NOASSERTION; Kotlin/Swift**; official, active direct-device SDK. GitHub's repository API
  confirmed the URL, default branch `master`, non-archived state and no detected SPDX licence on
  2026-08-20.
- [`polarofficial/accesslink-example-python`](https://github.com/polarofficial/accesslink-example-python)
  — **MIT; Python**; official OAuth, user-registration and AccessLink retrieval examples. The
  repository is a reference implementation rather than a complete production exporter.
- [`fsmeraldi/bleakheart`](https://github.com/fsmeraldi/bleakheart) — **MPL-2.0; Python**;
  direct BLE collection for Polar H10 HR/RR, ECG and acceleration and Verity Sense PPG and
  acceleration. It does not retrieve Flow cloud history or support H10 offline recording.

The persisted harness report misnamed the official example as `polarofficial/accesslink`; GitHub
returned 404 for that repository, while the canonical `accesslink-example-python` repository above
is live. No maintained, clearly licensed complete Flow exporter, consumer-site client,
mobile-database reader or broad watch-protocol extractor was verified.
