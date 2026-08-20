# Polar

**Evidence date:** 2026-08-20

**Canonical coverage:** [Polar taxonomy mapping](./coverage.json)

## Bottom line

Polar gives an ordinary Flow account holder three materially different official ways to retrieve
data: a manual account ZIP, one-session-at-a-time Flow exports, and the automatable
[AccessLink API](https://www.polar.com/accesslink-api/). AccessLink is unusually approachable for a
wearable cloud API: its current documentation says any registered Flow user can create a client,
then authorize an account with OAuth 2.0. It exposes substantial exercise, activity, heart-rate,
sleep, recovery, load and newer biosensing resources.

That still does not make Polar Flow fully open. Polar explicitly excludes data derived with its
algorithms from the account download, publishes no complete Flow-app-to-AccessLink field map or
stable account-ZIP schema, and gives no guarantee that either official route returns every retained
record. The
[Polar BLE SDK](https://github.com/polarofficial/polar-ble-sdk) adds direct, prospective sensor
access on compatible devices; it is not a route to the user's historical Flow cloud account.
Therefore the ordinary account-holder verdict is **Partial**, not Mostly open.

## Access snapshot

| Route | Who can use it? | Automated? | Main output | Main limitation |
|---|---|---:|---|---|
| Flow account ZIP | Signed-in Flow account holder | No documented recurring schedule | ZIP containing machine-readable account and training records | Algorithm-derived data and deleted records are excluded; public schema and retained-history depth are unknown |
| Individual Flow session exports | Signed-in Flow account holder | No; session-by-session | GPX, TCX, CSV or FIT; optional ZIP | Training sessions only; formats preserve different fields |
| AccessLink API | Registered Flow user with an API client and OAuth-authorized user | Yes; pull notifications and webhooks | JSON or XML API resources; endpoint-specific exercise representations | Named-resource API, not a documented complete Flow mirror |
| Polar BLE SDK | App developer with a compatible nearby Polar sensor/watch | Yes; app/device dependent | Live and device-dependent offline HR, RR, ECG, accelerometer, PPG and related data | Prospective/direct-device access, not Flow account history |
| Supported integrations | Account holder with destination account/app and permissions | Yes after linking, by integration | Selective health records, sessions, routes or plans | Directional, normalized and often future-only |
| Open-source/unofficial routes | Technically capable user | Varies | Usually an AccessLink wrapper or narrow local/device workflow | No maintained complete Flow exporter or consumer private client was verified |

## Openness comparison

| Openness test | Result | Required finding |
|---|---|---|
| App-to-interface parity | No | The account download explicitly excludes Polar-algorithm-derived data, and AccessLink does not document a complete route for every Flow score, narrative or device-specific output |
| Self-service developer access | Yes | The live AccessLink guide says any registered Flow user can create a client; OAuth authorization and API terms still apply |
| Official automation | Yes | AccessLink supports recurring pulls and webhooks, while the account ZIP and session exports remain manual |
| Complete history | Unknown | No public route guarantees every retained record, a universal retrospective window or pre-authorization backfill |
| Raw and derived data coverage | Partial | AccessLink includes selected derived resources and the BLE SDK exposes rich device streams, but neither is a complete raw-plus-derived Flow account export |
| **Overall personal-data openness** | **Partial** | Substantial self-service official access exists, but completeness, history and app parity remain unproven and some routes are device/platform dependent |

## Data inventory and route coverage

The inventory starts with what compatible Polar watches and sensors capture and what Flow displays or
derives, then keeps six distinct retrieval routes separate. Device, firmware, sport profile, region,
feature enablement and recording mode all affect availability. A route-level `A` means evidence
establishes that family, not every field or full history.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` affirmatively unavailable or
incompatible by route design; `U` unknown from current evidence; `NA` not applicable.

| Data family | Included metrics or app outputs | Captured or produced as | Flow account ZIP | Flow session export | AccessLink | Polar BLE SDK | Supported integrations | Open-source / unofficial |
|---|---|---|---|---|---|---|---|---|
| Body measurements and composition | Physical information, weight, height | User-entered / normalized | P | N | A | NA | P | U |
| Daily movement | Daily activity, steps, distance | Captured / normalized / derived | N | N | A | U | A | U |
| Energy and active time | Active and total calories, active time | Normalized / derived | P | P | A | N | P | U |
| Heart rate | Workout, continuous and resting HR; zones | Captured / normalized / derived | A | A | A | A | A | A |
| Heart-rate variability | RR intervals, HRV and ANS charge | Captured / derived | P | P | P | A | U | P |
| Blood pressure | No established Polar family | Unknown | U | N | U | N | U | U |
| ECG and rhythm | Wrist ECG test report; raw ECG stream | Captured / derived | P | N | A | A | U | P |
| Cardio fitness and VO2 max | VO2 max, Fitness Test, Running Index | Derived | N | P | P | U | P | U |
| Respiration and oxygen saturation | SpO2 and breathing-rate outputs | Captured / normalized / derived | P | N | P | P | P | U |
| Body and skin temperature | Body and sleep skin temperature | Captured / normalized | P | N | A | P | U | U |
| Sleep sessions and stages | Sleep intervals and Sleep Plus Stages | Captured / normalized / derived | N | N | A | U | P | U |
| Sleep insights and score | Sleep score, SleepWise, Sleep charge | Derived | N | N | P | N | U | U |
| Stress and autonomic recovery | ANS charge, Recovery Pro, Orthostatic Test | Captured / derived | N | N | P | N | U | U |
| Energy and readiness | Nightly Recharge, recovery status, alertness | Derived | N | N | A | N | U | U |
| Training load and status | Cardio Load, Training Load Pro, perceived load | Derived | N | P | A | N | U | U |
| Performance predictions | Running Index, Fitness Test and supported tests | Derived | N | P | P | N | U | U |
| Workout sessions | Sport, duration, distance, calories, laps | Captured / normalized | A | A | A | P | A | U |
| Route and elevation | GPS track, altitude, speed and pace | Captured / normalized | A | A | A | P | A | U |
| Sport dynamics | Cadence, power, laps and sport-specific samples | Captured / normalized / derived | P | P | P | P | P | U |
| Plans, workouts and courses | Training targets, TrainingPeaks plans, komoot routes | User-entered / external | U | N | U | N | A | U |
| Gait and functional mobility | No separate established family | Unknown | U | N | U | U | U | U |
| Cycle and pregnancy | No established Polar family | Unknown | U | N | U | N | U | U |
| Nutrition and hydration | No established stored/exported family | Unknown | U | N | U | N | U | U |
| Clinical records and medications | No established Polar family | Unknown | U | N | U | N | U | U |
| Mindfulness, mood and symptoms | No established portable family | Unknown | U | N | U | N | U | U |
| Hearing and audio exposure | No established Polar family | Unknown | U | N | U | N | U | U |
| Trends, alerts and awards | SleepWise alertness, training summaries, Flow trends | Derived | N | N | P | N | U | U |
| Raw and live sensor streams | ECG, accelerometer, PPG, RR and offline recordings | Captured | U | P | N | A | N | P |
| Provenance and metadata | Device/exercise IDs, time, sport and sensor metadata | Captured / normalized | P | P | A | A | P | P |

The machine-readable [coverage ledger](./coverage.json) maps all 29 canonical taxonomy IDs exactly
once. The account ZIP is `A` or `P` where Polar establishes supplied or device-produced records, `N` for
families consisting solely of Polar-algorithm-derived outputs, and `U` where the unversioned package
inventory leaves both availability and absence unresolved. Likewise, the open-source/unofficial
column remains `U` where no project-specific output was verified; an evidence gap is not converted
into an absence claim.

## Official access routes

### Flow account ZIP

Polar's [account-download support entry](https://support.polar.com/en/how-to-download-all-your-data-from-polar-flow)
describes a signed-in, asynchronous/manual ZIP download containing information supplied by the user
and most data produced while using Polar devices and applications. The same page explicitly excludes
data derived from supplied data using Polar algorithms and says deleted training or activity records
cannot be recovered. It may be the broadest consumer portability route, but the public documentation
does not publish:

- a current filename and field inventory;
- a versioned schema or migration policy;
- whether raw samples, corrections and annotations are included; or
- a fixed retention period or guarantee of every retained historical record.

It should therefore be treated as a one-off portability package requiring hands-on inspection, not
as evidence of app parity or recurring export automation.

### Individual Flow session exports

The current [session-export guide](https://support.polar.com/en/export-training-sessions-flow)
distinguishes route files from richer training files. GPX and FIT can contain routes; TCX, CSV and
FIT can contain training data such as heart rate, calories and cadence; multisport sessions support
GPX, FIT and TCX. Each can be downloaded as a ZIP. GPX is principally route geometry, TCX/CSV are
normalized and format-specific, and FIT can retain richer device/session fields. Polar warns that
third parties may recalculate or filter data, so equal-looking fields are not necessarily equal.

This route does not cover daily activity, sleep history, account settings or the complete set of
Flow-derived scores. It is manual and session-scoped; older sessions can be exported individually,
but that is not bulk backfill.

### AccessLink

[AccessLink v3](https://www.polar.com/accesslink-api/) is a REST API to Polar Flow data. The current
getting-started flow is self-service: create a Flow account, register application/service details in
the [client administration portal](https://admin.polaraccesslink.com/), store the client ID and
secret, obtain OAuth authorization, exchange the code for a token and register the user. Users must
have mandatory Polar consents accepted and can change consents through their account. The broad
`accesslink.read_all` scope and long-lived bearer credentials are sensitive; client secrets and
tokens must not be committed or exposed.

The live resource catalogue includes users, exercises, daily activity, continuous heart rate,
Cardio Load, SleepWise, Elixir biosensing, sleep/stages, Nightly Recharge and physical information.
It documents JSON and XML, transaction/pull-notification workflows, signed webhooks and dynamic
short- and long-term limits. Webhooks notify that data is available; they do not prove that all past
data can be enumerated. Resource presence also does not guarantee population for every device,
sport, region or account.

History is resource-specific and should be treated as prospective or bounded retrieval rather than
full backfill. Current exercise/file endpoints return only exercises uploaded in the last 30 days
and only those uploaded after the user registered with the client. Current daily-activity and sample
endpoints allow dates up to 365 days old in ranges of at most 28 days. Sleep, Nightly Recharge,
Cardio Load, SleepWise and current biosensing list endpoints expose 28-day windows. The older
transactional daily-activity, physical-information and exercise resources are explicitly deprecated;
their consumption workflow should not be confused with the replacement endpoints. The public
documentation does not promise pre-registration recovery of all Flow history or replay of missed
notifications.

The current [API agreement](https://www.polar.com/en/legal/polar-api-agreement) is a limited licence
and prohibits unauthorized automated scraping. AccessLink is the supported automation path, not a
license to crawl Flow's consumer web service.

### Polar BLE SDK

The official [`polarofficial/polar-ble-sdk`](https://github.com/polarofficial/polar-ble-sdk) is an
Android/iOS library for compatible sensors and watches. It can provide device information, battery
status, live HR/RR and model-dependent ECG, accelerometer, PPG and other online streams, plus
supported offline recordings. This is the richest established route for direct sensor granularity.

It requires a custom mobile app, Bluetooth permissions, physical access to a compatible device and
device-specific feature support. It captures prospective or device-local data; it does not query a
user's complete Flow archive, recover data never retained by the device or reproduce Flow's cloud
derivations. GitHub's live repository API reports no detected SPDX licence, so the project is
recorded conservatively as `NOASSERTION`, despite conflicting licence assertions in the persisted
reports.

## Data available

Polar's outputs span three layers that must not be conflated:

1. **Device-captured data:** workout HR, RR intervals, GPS, altitude, pace/speed, cadence, power and
   model-dependent ECG, SpO2, temperature, accelerometer and PPG measurements.
2. **Flow-normalized records:** exercises, daily activity, continuous HR, sleep intervals/stages,
   physical settings, routes, sport metadata and device/record identifiers.
3. **Flow-derived outputs:** Cardio Load, Sleep score, SleepWise alertness/circadian periods, Nightly
   Recharge and ANS charge, Running Index, Fitness/Orthostatic tests and other recovery or
   performance interpretations.

AccessLink explicitly names several derived families, which is stronger than inferring a score from
its inputs. Nevertheless, no source maps every app card, coaching narrative, trend, alert or
device-only report to an API field. Availability and granularity vary by device generation, sensor,
firmware, sport, recording setting and feature eligibility. The API's structured data should not be
called raw simply because it contains samples.

## Ecosystem integrations

| Destination | Direction | Confirmed payload/history | Material limits |
|---|---|---|---|
| [Apple Health](https://support.polar.com/en/support/connecting_polar_flow_with_apple_health) | Flow → Apple Health | New active/resting energy, workout HR, sleep timing, steps, weight and workouts; troubleshooting can resync the last two weeks | No Health → Flow route; continuous HR and proprietary scores are excluded or not documented |
| [Health Connect](https://support.polar.com/en/flow-app-health-connect) | Flow → Health Connect | New exercise/routes, workout HR, sleep/stages, steps, energy, SpO2, VO2 max, height and weight after permission | No current evidence of reverse import or full historical backfill |
| [Strava](https://support.polar.com/en/support/how_can_i_automatically_sync_my_data_from_polar_flow_to_strava) | Flow → Strava training | Automatically sends eligible completed sessions after linking | Polar notes calculation differences and no Polar calorie transfer; not wellness/sleep portability |
| [TrainingPeaks](https://support.polar.com/en/support/how_can_i_automatically_sync_my_data_from_polar_flow_to_trainingpeaks) | Plans/targets → Flow/device; eligible completed sessions → TrainingPeaks | Automatic future workflow after linking | Previously synced sessions require manual export; manual/no-sample/third-party sessions can be excluded and zone mappings are lossy |
| [komoot](https://support.polar.com/en/komoot) | Planned tours → Flow; Flow training routes → komoot | Two-way route synchronization after connecting/reconnecting | Routes and navigation only, not reciprocal health or completed-session history |

These are separate directional routes, not a single synchronized health graph. Apple Health and
Health Connect expose permissioned normalized categories. Strava and TrainingPeaks are
training-centric. komoot is route-centric. The reports also mentioned MyFitnessPal and legacy Google
Fit, but their cited pages did not provide reliable current evidence in the live check, so their
present availability, direction and history are left unresolved rather than repeated as fact.

## Open-source routes

| Project | Route | Output | Assessment |
|---|---|---|---|
| [`polarofficial/polar-ble-sdk`](https://github.com/polarofficial/polar-ble-sdk) | Official direct BLE device SDK | Live/device-dependent offline sensor measurements | Active official project; GitHub SPDX `NOASSERTION`; not a Flow-cloud exporter |
| [`polarofficial/accesslink-example-python`](https://github.com/polarofficial/accesslink-example-python) | Official AccessLink OAuth example | User, exercise, activity, physical-information, sleep and Nightly Recharge JSON | MIT; useful reference, but stores example credentials/tokens in local YAML and is not a complete production exporter |
| [`fsmeraldi/bleakheart`](https://github.com/fsmeraldi/bleakheart) | Unofficial direct BLE client | H10 HR/RR, ECG and accelerometer; Verity Sense PPG and accelerometer | MPL-2.0; narrow, maintained sensor logger with no Flow cloud history or offline recording support |

The harness report misnamed the official example as `polarofficial/accesslink`; the current canonical
repository is `polarofficial/accesslink-example-python`. Community AccessLink wrappers cannot exceed
the API's server-side coverage. No independently verified maintained project was found for complete
Flow account export, browser automation, private mobile-database extraction, broad watch-protocol
extraction or lossless recovery of every Flow-derived score.

Password-based scrapers and private-endpoint clients are not recommended. They can hold broad
account authority, conflict with the API agreement, break under login/anti-bot changes and silently
omit records. An absence of a verified project is an evidence gap, not proof that no private or new
tool exists.

## Material barriers and risks

- **Parity gap:** named API resources do not prove every Flow/device/app output has a portable field.
- **Opaque account package:** the account ZIP lacks a published stable schema and completeness
  contract.
- **History uncertainty:** transactions, notifications and future integration sync do not establish
  unlimited retrospective backfill; only Apple Health's two-week troubleshooting resync is explicit.
- **Device variance:** raw sensors, Elixir reports, sleep stages, tests and sport dynamics depend on
  compatible hardware, firmware and recording settings.
- **Credential sensitivity:** AccessLink client secrets, bearer tokens, webhook signing keys and
  Flow archives expose health and location data and require encrypted storage and revocation plans.
- **Format loss:** GPX, TCX, CSV, FIT, JSON/XML and destination schemas preserve different details;
  services can recalculate calories, elevation, zones and sport classifications.
- **Platform dependency:** BLE needs a nearby device and Android/iOS app; Apple Health and Health
  Connect require their respective mobile platforms and permissions.
- **Terms risk:** AccessLink is royalty-free but licensed and rate-limited; unauthorized scraping is
  prohibited. The agreement bars competing services and DMA gatekeepers, allows Polar to suspend or
  terminate access immediately for any or no reason, and requires deletion of Licensed Materials and
  Data when the agreement ends.
- **Propagation uncertainty:** no reviewed source fully establishes how Flow edits, deletions,
  revoked consent or corrected sessions propagate across AccessLink, exports and destinations.
- **Open-source licence uncertainty:** GitHub currently detects no SPDX licence for the BLE SDK, so
  reuse rights must be reviewed from authoritative legal material before redistribution.

## Rubric snapshot

| Dimension | Polar finding |
|---|---|
| Consumer effort | Session export is simple but repetitive; account download is manual; AccessLink requires application registration and OAuth implementation |
| Cost | AccessLink is currently free and needs no paid developer membership, but Polar reserves the right to charge; compatible hardware and app-development effort may be required |
| Platform dependency | Flow cloud/account for exports and API; Android/iOS plus compatible nearby hardware for BLE; destination platform for integrations |
| Data completeness | Strong workout/wellness coverage, but raw streams, complete proprietary derivations and app parity are not established |
| Granularity | Ranges from account files and summaries to exercise samples, routes, stages, reports and live BLE sensor streams |
| Historical depth | Account ZIP and old manual sessions may provide history, but no universal retention or complete API backfill guarantee is documented |
| Automation | AccessLink and linked integrations automate future retrieval; account and session exports are manual |
| Formats | AccessLink JSON/XML; sessions GPX/TCX/CSV/FIT and optional ZIP; account ZIP schema unknown; BLE uses SDK/device models |
| User authorization | OAuth consent for AccessLink; explicit mobile health permissions; account links can be disconnected |
| Developer access | Registration is self-service but subject to credentials, quotas, consents and terms that exclude competing services and DMA gatekeepers and permit immediate suspension or termination |
| Integrations | Directional and family-specific; none is a lossless Flow mirror |
| Provenance | API/file/device identifiers exist, but destinations may normalize or drop source metadata |
| Corrections and deletion | Propagation behavior is insufficiently documented |
| Portability | Good for workouts and selected API resources, but weaker for derived insights/history and contractually fragile because termination requires deletion of API Data |
| Evidence quality | Strong live primary API/session/integration sources; account archive and hands-on parity/backfill evidence remain weak |

## Provisional openness assessment

**Overall personal-data openness: Partial.**

Polar is more open than a provider whose only programmable surfaces require commercial approval:
ordinary users can register AccessLink applications and automate meaningful retrieval. It is less
than Mostly open because the audited evidence does not reduce the remaining omissions to narrow,
documented exceptions. The account ZIP is opaque, Flow parity is unpublished, history/backfill is
not guaranteed, raw direct-device access is a separate hardware/app route, and supported
integrations are selective and lossy.

## Evidence gaps

1. Request a fresh account ZIP and publish a redacted filename, schema, identifier, timestamp and
   field inventory for every current Flow family.
2. Compare the same multi-device account across Flow web/app, account ZIP, individual FIT/TCX/CSV,
   and every AccessLink endpoint, including Elixir, SleepWise, Nightly Recharge and Cardio Load.
3. Measure AccessLink's actual retrospective window for a newly authorized old account, transaction
   availability, pagination and behavior after missed/failed webhooks.
4. Test edits, manual sessions, deletions, revoked consent and account deletion across API,
   subsequent exports and each supported integration.
5. Record exact sampling intervals, units, nullability, schema/version headers, device attribution
   and deduplication keys by device generation and sport.
6. Establish which HRV, ECG, SpO2, temperature, recovery, load, performance-test and Flow insight
   fields are reports, samples, summaries or UI-only narratives.
7. Revalidate Apple Health and Health Connect initial backfill separately from future sync; do not
   infer parity between the two mobile platforms.
8. Test Strava, TrainingPeaks and komoot with indoor, GPS, multisport, edited, deleted and old
   sessions, and document destination-side recalculation.
9. Obtain authoritative licensing clarification for the BLE SDK because GitHub reports
   `NOASSERTION` and the persisted research reports conflict.
10. Search again for maintained unofficial clients/export parsers, then verify repository
    existence, current fixtures, security model and SPDX metadata before recommending any.
