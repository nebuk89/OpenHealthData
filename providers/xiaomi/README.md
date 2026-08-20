# Xiaomi

**Evidence date:** 2026-08-20  
**Scope:** current Xiaomi-controlled Mi Fitness (`com.xiaomi.wearable`), Xiaomi Watch, Redmi Watch
and Xiaomi Smart Band products. Legacy Mi Fit/Zepp Life, Huami cloud and Amazfit/Zepp are excluded
unless a current Xiaomi source establishes continuity.

## Bottom line

Xiaomi is **Restricted** for personal-data openness. Mi Fitness displays a broad, device-dependent
set of activity, workout, heart-rate, sleep, stress, energy and manually entered health data, but
Xiaomi publishes no complete export schema or ordinary-user Mi Fitness API. Xiaomi's current
privacy policy provides a request route for a copy of personal information and, where law applies,
data portability in a structured, commonly used and machine-readable format; it does not promise
that a response contains all Mi Fitness records, samples, routes or derived scores
([Xiaomi privacy policy](https://privacy.mi.com/all/en_US/)).

On Android, the current Mi Fitness Play listing explicitly says the app can synchronize fitness and
health data to Health Connect. This creates a user-authorized, automatable route for whichever
records Mi Fitness actually writes, but Xiaomi does not publish a category mapping or completeness
guarantee ([Mi Fitness on Google Play](https://play.google.com/store/apps/details?id=com.xiaomi.wearable&hl=en_US)).
For supported hardware, Gadgetbridge can replace the vendor app and collect selected records
directly over Bluetooth, but it cannot recover Mi Fitness cloud history
([Gadgetbridge](https://codeberg.org/Freeyourgadget/Gadgetbridge)).

## Access snapshot

| Route | Ordinary-user access | Automation | Established scope | Principal limitation |
|---|---|---|---|---|
| Xiaomi privacy request | Yes, subject to identity and applicable law | No | A copy of personal information; portability where applicable | No Mi Fitness archive schema, field list or history guarantee |
| Health Connect | Yes, Android and permission dependent | Yes, through a user-authorized reader | Fitness and health data that Mi Fitness writes | Xiaomi publishes no exact record map, backfill promise or parity statement |
| Xiaomi developer portal | Registration/console based | Unknown for Mi Fitness | Generic HyperOS developer platform | No current Mi Fitness personal-history API was established |
| Gadgetbridge | Yes, supported devices only | Yes, local synchronization | Device-dependent activity, sleep, heart rate, workouts and metadata | Replaces or competes with Mi Fitness; no prior cloud history |
| Health Connect reader | Developer-built, permission dependent | Yes | Standard Health Connect records attributed to Mi Fitness | Not turnkey and cannot restore Xiaomi-only fields |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | No | No official source maps every app-visible value or derived result to an export or interface |
| Self-service developer access | No | No public Mi Fitness personal-data API, scopes or self-service registration path was established |
| Official automation | Partial | Health Connect can support recurring reads, but only for records Mi Fitness elects to write |
| Complete history | Unknown | Xiaomi publishes no Mi Fitness export retention, backfill or all-history commitment |
| Raw and derived data coverage | No | No route is documented to include raw sensor history and all proprietary scores |
| **Overall personal-data openness** | **Restricted** | A privacy-copy route and partial Android relay exist, but complete programmable access is unsupported or undocumented |

## Data inventory and route coverage

Codes: **A** available, **P** partial/conditional, **N** not available by route design, **U** unknown,
**NA** not applicable. The complete 29-family mapping is in
[`coverage.json`](./coverage.json).

| Data family | Included metrics or app outputs | Captured or produced as | Privacy request | Health Connect | Developer portal | Gadgetbridge | HC reader |
|---|---|---|---|---|---|---|---|
| Body measurements | Weight and other manually managed health data | User-entered / normalized | U - archive contents undocumented | P - compatible standard records possible | U - no Mi Fitness API established | P - scale/device dependent | P - only records written to Health Connect |
| Daily activity | Steps, distance and daily activity | Captured / normalized / derived | U - archive contents undocumented | P - app only promises general synchronization | U - no Mi Fitness API established | P - device/model dependent | P - standard records only |
| Energy and active time | Calories, activity progress and energy | Normalized / derived | U - archive contents undocumented | P - exact categories unpublished | U - no Mi Fitness API established | P - device estimates on supported models | P - standard records only |
| Heart rate | Wearable heart rate and trends | Captured / normalized / derived | U - cadence and history undocumented | P - exact mapping unpublished | U - no Mi Fitness API established | P - supported-device samples | P - if Mi Fitness writes HeartRateRecord |
| Sleep respiration | Breathing quality and related sleep analysis | Captured / derived | U - cadence and history undocumented | U - exact mapping unpublished | U - no Mi Fitness API established | P - supported-device measurements | U - no current Xiaomi type map |
| Sleep sessions and stages | Sleep duration, deep/light/REM, sleep heart rate, breathing quality | Captured / normalized / derived | U - stage intervals undocumented | P - exact mapping unpublished | U - no Mi Fitness API established | P - model-dependent sessions/stages | P - standard sleep records only |
| Sleep insights | Personalized sleep report and guidance | Derived | U - derived fields undocumented | U - proprietary report has no published mapping | U - no Mi Fitness API established | N - cloud/app report is outside device retrieval | U - no standard parity established |
| Stress and energy | Stress, energy and related warnings | Derived | U - fields and history undocumented | U - no current Xiaomi mapping published | U - no Mi Fitness API established | P - some device metrics, not guaranteed scores | U - proprietary fields not established |
| Workout sessions | Walking, running, cycling and other sessions | Captured / normalized | U - session files and history undocumented | P - exercise records possible | U - no Mi Fitness API established | P - supported modes and fields vary | P - standard exercise records only |
| Route and elevation | Workout route, distance and progress | Captured / normalized | U - point series and formats undocumented | U - route mapping unpublished | U - no Mi Fitness API established | P - some devices/workouts | U - standard session may omit Xiaomi route detail |
| Reproductive health | Women's health records | User-entered | U - record inclusion undocumented | U - no current Xiaomi mapping published | U - no Mi Fitness API established | NA - not a wearable BLE history | U - only if Mi Fitness writes standard cycle records |
| Alerts and insights | Risk warnings, trends and reports | Derived | U - archive contents undocumented | U - proprietary representation unpublished | U - no Mi Fitness API established | P - limited device alerts, not app insight parity | U - no standard parity established |
| Raw sensor data | Accelerometer and other internal streams | Captured | U - no raw archive promise | N - Health Connect stores normalized record types | U - no Mi Fitness API established | P - live/device-specific access only | N - relay cannot recreate unexported raw streams |
| Provenance | Timestamps, source app/device, firmware and identifiers | Captured / normalized | U - schema undocumented | P - standard metadata and data origin | U - no Mi Fitness API established | P - local device and app metadata | P - Health Connect metadata, not Xiaomi cloud provenance |

The table starts with current first-party app outputs documented by Xiaomi's app listings. An
app-visible metric is not treated as exportable merely because an input signal is available.

## Official access routes

### Privacy access and portability

Xiaomi states that a user can request a free copy of personal information and, under some legal
circumstances, receive it in a structured, commonly used and machine-readable format. Requests go
through Xiaomi Privacy Support and can require identity verification
([policy](https://privacy.mi.com/all/en_US/);
[request portal](https://privacy.mi.com/support/?locale=en)). This is the only documented
Xiaomi-controlled route that can be requested specifically for existing account data.

No current official document names Mi Fitness archive files, formats, date ranges, source metadata,
deleted-record behavior or proprietary-score coverage. The former product-specific URL reported by
the research harness now redirects to the general policy, so it is not used as a Mi Fitness schema.

### Developer access

The Xiaomi developer console currently resolves to the generic HyperOS developer platform
([developer portal](https://dev.mi.com/console/)). No public documentation was found for a Mi
Fitness history API, OAuth scopes, endpoint catalogue, quotas, backfill or user-consent flow.
Developer-console availability is therefore not counted as fitness-data access.

### Health Connect

Mi Fitness's current Google Play listing explicitly names the Health Connect permission and says it
is used to "Synchronize your fitness and health data to Google Health Connect"
([listing](https://play.google.com/store/apps/details?id=com.xiaomi.wearable&hl=en_US)).
Health Connect supports permissioned instant, interval and series records and exposes separate
permissions for background reads and records older than 30 days
([data types](https://developer.android.com/health-and-fitness/health-connect/data-types)).
The Android API can therefore automate retrieval after data reaches the shared store
([read data](https://developer.android.com/health-and-fitness/health-connect/read-data)).

This is not proof that Mi Fitness writes every compatible Health Connect type. Xiaomi does not
publish its type map, backfill behavior, conflict handling, source preservation or treatment of
deleted records.

## Data available

The current iOS listing names Xiaomi Watch, Redmi Watch, Xiaomi Smart Band and Redmi Smart Band as
supported families and describes route-tracked workouts; heart rate, sleep, stress and energy;
manual weight and women's-health records; sleep stages; sleep heart rate; breathing quality; body
movement; personalized reports; and risk warnings
([App Store](https://apps.apple.com/us/app/mi-fitness-xiaomi-wear-lite/id1493500777)).
Availability is device, firmware, app-version and region dependent.

The listing establishes first-party visibility, not external granularity. Xiaomi does not document
sample intervals, event schemas, units, record identifiers, edit/deletion markers, score inputs or
whether calculations are performed on the wearable, phone or cloud. Consequently, the canonical
coverage map uses `unknown` rather than `absent` for unconfirmed families such as HRV, ECG, VO2 max,
temperature, training load and performance predictions.

## Ecosystem integrations

**Health Connect is the only current integration whose purpose is directly stated in a retrievable
Xiaomi-controlled source.** It is outbound from Mi Fitness to Google's shared Android store and is
permission controlled. A separate app can read only the records and history allowed by Android and
actually written by Mi Fitness.

The specialist workstream also found reports of Apple Health and Strava settings in current Mi
Fitness builds. The candidate Xiaomi FAQ searches returned only a generic JavaScript shell during
verification, with no retrievable category, direction or backfill text. Those routes are therefore
not promoted to confirmed coverage. Legacy Mi Fit/Zepp Life Google Fit instructions are explicitly
excluded; Android's current supported relay is Health Connect.

No current direct TrainingPeaks integration was established. A route through another service would
be an indirect, potentially lossy activity relay rather than Xiaomi portability.

## Open-source routes

### Gadgetbridge

Gadgetbridge is the strongest current open-source route. Its active Codeberg project describes a
local Android application that works without the vendor app or vendor account and links to a
device-support catalogue ([upstream](https://codeberg.org/Freeyourgadget/Gadgetbridge);
[device catalogue](https://gadgetbridge.org/gadgets/)). Xiaomi support remains exact-model and
firmware dependent. It is a device route: it cannot download records that exist only in an existing
Mi Fitness account.

The GitHub mirror is archived but remains licence-verifiable as `AGPL-3.0`; the active canonical
upstream is Codeberg
([GitHub mirror](https://github.com/Freeyourgadget/Gadgetbridge)). Device pairing can require
model-specific authentication and may prevent simultaneous use of Mi Fitness. Proprietary
app/cloud scores and complete raw streams are not established.

### Health Connect reader

Google's maintained [`android/health-samples`](https://github.com/android/health-samples) repository
is an `Apache-2.0` developer reference, not a turnkey Xiaomi exporter. It demonstrates the supported
Health Connect mechanism from which a user can build local, permissioned retrieval. Coverage is
limited to records Mi Fitness writes and fields Health Connect represents.

No credible maintained project was found for current Mi Fitness cloud history or the protected
`com.xiaomi.wearable` Android databases. Projects that use Huami/Zepp endpoints, Mi Fit package
`com.xiaomi.hm.health`, Mi Home tokens or old Mi Band protocols are not evidence of current Xiaomi
service access.

## Material barriers and risks

- **No parity contract:** app listings describe visible features but no interface enumerates all
  corresponding records.
- **No documented consumer archive:** privacy rights exist, but Mi Fitness inclusion, file format
  and historical completeness require a real request.
- **Relay loss:** Health Connect normalizes supported types and may omit Xiaomi-specific scores,
  routes, algorithm inputs and detailed provenance.
- **Device fragmentation:** metrics and Gadgetbridge support vary by exact device and firmware.
- **Regional fragmentation:** Xiaomi account region, app distribution and connected-service
  availability can differ.
- **Unsupported protocols:** BLE reverse engineering can break with firmware updates; pairing keys
  and exported databases are sensitive credentials/data.
- **Ecosystem confusion:** legacy Huami/Zepp/Mi Fit tools can appear Xiaomi-branded while targeting a
  different service and must not be treated as current Mi Fitness access.

## Rubric snapshot

| Dimension | Assessment |
|---|---|
| Consumer effort | Privacy request is simple to initiate but untested; Health Connect setup is moderate; Gadgetbridge is technical |
| Cost | No paid Xiaomi subscription identified; compatible hardware and platform are required |
| Platform dependency | Mi Fitness requires supported mobile/device combinations; Health Connect is Android-only |
| Data completeness | Unknown for privacy requests; partial for Health Connect and local BLE |
| Granularity | App granularity is visible; external sample/series coverage is undocumented or device dependent |
| Historical depth | No Xiaomi guarantee; Health Connect history requires platform permission; BLE is prospective/device-limited |
| Automation | Partial through Health Connect readers or Gadgetbridge; no Xiaomi account API established |
| Formats | No Xiaomi archive schema; Health Connect is typed Android records; Gadgetbridge uses internal/export formats |
| User authorization | Privacy identity verification and Android per-type permissions are documented at their respective layers |
| Developer access | Generic Xiaomi portal exists; no self-service Mi Fitness history API established |
| Integrations | Health Connect confirmed; Apple Health/Strava details remain an evidence gap |
| Provenance | Health Connect exposes origin metadata, but Xiaomi-to-relay fidelity is undocumented |
| Corrections and deletion | Propagation and tombstones are undocumented |
| Portability | Useful partial routes, but no route reproduces the complete Mi Fitness account |
| Evidence quality | Current first-party app/policy pages and maintained project sources; no hands-on export sample |

## Provisional openness assessment

**Restricted.** Xiaomi offers a legal/privacy route to request a copy and a current Android relay,
but neither establishes complete app parity. The ordinary account holder has no documented,
complete, self-service API. Gadgetbridge materially improves local ownership for supported devices
but is an unsupported substitute for the vendor app, not an account-history export.

## Evidence gaps

1. Submit a Xiaomi privacy request from an account with Mi Fitness history and inspect formats,
   date ranges, samples, routes, scores, provenance, corrections and deleted records.
2. Capture Mi Fitness's Health Connect permission screen and compare each enabled record type with
   the records actually written, including pre-link history and duplicates.
3. Verify Apple Health and Strava in current iOS/Android builds by region; record exact direction,
   categories and backfill before adding them as confirmed routes.
4. Check the authenticated developer console for a restricted Mi Fitness product, without assuming
   the generic HyperOS portal provides it.
5. Test exact current Xiaomi/Redmi models against Gadgetbridge and document pairing, data families,
   history depth and export formats.
6. Determine whether app-visible HRV, ECG, VO2 max, temperature, training load or readiness outputs
   exist on any current devices and whether any direct route carries them.
