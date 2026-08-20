# WHOOP

**Evidence date:** 2026-08-20

**Canonical coverage:** [WHOOP taxonomy mapping](./coverage.json)

## Bottom line

WHOOP gives an ordinary member two useful first-party routes. Its
[CSV export](https://www.whoop.com/thelocker/access-your-whoop-data-with-new-integrations-data-export-options/)
can cover a selected date range or the member's entire account history and includes daily Sleep,
Recovery and Strain scores, selected physiological metrics, sleep architecture and individual
Journal entries. Its [Developer Platform](https://developer.whoop.com/docs/developing/overview)
is also self-service for personal development: a WHOOP member can create an app immediately, use
OAuth 2.0 and test with up to ten members before broader distribution requires approval.

The public API has unusually good access to WHOOP's central derived outputs. The current
[v2 OpenAPI document](https://api.prod.whoop.com/developer/doc/openapi.json) exposes cycle and
workout Strain, Recovery score and inputs, and detailed Sleep scores and stages. It does not expose
an endpoint or OAuth scope for the app's all-day Stress Monitor, Journal questions or responses,
Journal Impacts, Journal Trends, WHOOP AI narratives, raw PPG, accelerometer samples, or every
WHOOP MG and Advanced Labs record. Those omissions cannot be repaired by deriving a WHOOP score
from its input signals: the provider's score itself is a distinct portability requirement.

WHOOP's personal-data openness is therefore **Partial**. Supported automation and a broad
full-history CSV are meaningful strengths, but app-to-interface parity, raw sensor coverage and
several important app-derived experiences remain incomplete.

## Access snapshot

| Route | Who can use it? | Automated? | Confirmed scope | Main limitation |
|---|---|---:|---|---|
| Data Export CSV | Signed-in WHOOP member | No; emailed file | Selected dates or entire account history; core scores, selected vitals, sleep architecture and Journal entries | No stable public schema or raw-sensor guarantee; Stress and Journal-derived insights are not listed |
| WHOOP API v2 | WHOOP member who creates an app | Yes | Profile, body measurements, cycles, Recovery, Sleep and workouts | No Stress, Journal, raw stream, ECG, blood-pressure or lab-result endpoint in the current public OpenAPI |
| Webhooks plus API | Registered app | Yes | Change/delete notices for workout, sleep and Recovery followed by an API read | No cycle, Stress, Journal or raw-sensor event; notification payload is not the record |
| Approved public app | Developer whose app passes WHOOP review | Yes | Same scoped API for more than ten members | Approval, privacy policy and design review required |
| Supported integrations | Member with destination account and platform permissions | Yes, destination-specific | Selected workouts and standardized health fields | Direction, history and field mapping vary; WHOOP scores are not automatically portable |
| Open-source API clients | Technical member with app credentials | Yes | Mirrors official OAuth/API coverage | Maintenance and token-storage burden; cannot exceed public API fields |
| Direct BLE projects | Technical owner of a compatible strap | Yes, locally | Device-dependent live or retained sensor data | Unsupported, model/firmware-specific and does not reproduce cloud-derived scores |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Partial | Strain, Recovery and Sleep are substantially represented, but Stress Monitor, Journal records and insights, AI narratives and newer medical/lab surfaces are not all present in the public API |
| Self-service developer access | Yes | A WHOOP member can create up to five apps and test immediately with up to ten members; approval is required only for wider launch |
| Official automation | Yes | OAuth refresh tokens, paginated API collections and signed webhooks support recurring retrieval |
| Complete history | Partial | The CSV UI offers entire account history, while the API publishes no universal retention or complete-history guarantee and the export's full field schema is not versioned |
| Raw and derived data coverage | Partial | The public API includes central proprietary scores but omits raw wearable streams and several app-visible derived or user-entered surfaces |
| **Overall personal-data openness** | **Partial** | Self-service automation and a broad CSV exist, but material app-to-API and raw-data gaps remain |

## Data inventory and route coverage

The inventory starts with WHOOP's [three API pillars](https://developer.whoop.com/docs/whoop-101),
the current public OpenAPI, the first-party export description and current product/privacy
descriptions. The current
[WHOOP 5.0 and MG announcement](https://www.whoop.com/gb/en/thelocker/introducing-whoop-5-0-and-whoop-mg/)
confirms device/tier-specific ECG, Blood Pressure Insights, WHOOP Age, Pace of Aging and Hormonal
Insights. WHOOP 4.0, 5.0, MG, Life and Advanced Labs do not produce identical records.

**Codes:** `A` available; `P` partial, conditional or lossy; `N` not available in the documented
route; `U` unknown; `NA` not applicable. `Open-source API` mirrors the public API and does not gain
extra score coverage. `Direct BLE` covers only independently decoded device data, never a claim
that cloud-derived WHOOP scores are portable.

| Data family | Included metrics or app outputs | Captured or produced as | CSV export | Developer API v2 | Supported integrations | Open-source API | Direct BLE |
|---|---|---|---|---|---|---|---|
| Body measurements | Height, weight, max heart rate | User-entered and normalized profile values | U | A | U | A | N |
| Daily activity | Physiological cycle boundaries, steps where supported | Captured and normalized | P | P | P | P | P |
| Energy and active time | Cycle/workout kilojoules and active energy mappings | Normalized and derived | P | P | P | P | N |
| Heart rate | Cycle/workout average and maximum HR; live/device HR | Captured samples and summaries | P | P | P | P | A |
| HRV | Recovery RMSSD and trends | Captured input plus normalized daily value | A | A | P | A | P |
| Blood pressure | WHOOP MG Blood Pressure Insights where available | Derived and device-dependent | P | N | U | N | U |
| ECG and rhythm | WHOOP MG on-demand ECG where available | Captured electrical record plus classification | P | N | U | N | U |
| Cardio fitness | VO2 max where available | Derived | U | N | U | N | N |
| Respiration and oxygen | Sleep respiratory rate and Recovery SpO2 | Captured input plus normalized summary | A | A | P | A | U |
| Skin temperature | Recovery skin-temperature value | Captured input plus normalized summary | U | A | P | A | A |
| Sleep sessions and stages | Sleeps, naps, awake/light/SWS/REM totals and disturbances | Captured, normalized and derived | A | A | P | A | N |
| Sleep insights | Performance, consistency, efficiency, need, debt and nap credit | Proprietary derived scores | A | A | P | A | N |
| Stress Monitor | All-day 0-3 stress level, events and trends shown in the app | Proprietary derived output | U | N | U | N | N |
| Recovery | Recovery score, calibration state, RHR, HRV, SpO2 and temperature | Proprietary derived score plus inputs | A | A | P | A | N |
| Strain and training load | Cycle Strain, workout Strain and HR-zone load | Proprietary derived score | A | A | P | A | N |
| Healthspan predictions | WHOOP Age, Pace of Aging and related trends where enabled | Proprietary derived outputs | U | N | U | N | N |
| Workout sessions | Sport, start/end, score state, Strain, HR and energy | Captured session plus derived summary | A | A | A | A | P |
| Route and elevation | Distance, altitude gain/change and app route where recorded | Captured/normalized session data | P | P | P | P | N |
| Sport dynamics | HR zones, Strength Trainer classification and activity-specific detail | Captured, normalized and derived | P | P | P | P | U |
| Strength Trainer and plans | Strength Trainer activities, exercise/set context and planned work | User-entered and derived | P | P | P | P | N |
| Hormonal and reproductive logs | Journal symptoms, hormonal health and cycle-related context | User-entered and derived | A | N | U | N | N |
| Nutrition and hydration | Journal nutrition behaviors and partner-originated nutrition | User-entered and external | P | N | P | N | N |
| Clinical and laboratory data | WHOOP MG reports, Advanced Labs biomarkers, medications and conditions | Captured, external, user-entered and derived | P | N | U | N | N |
| Journal, mood and symptoms | 300+ behaviors, quantities, times, reflections and symptoms | User-entered | A | N | U | N | N |
| Journal Impacts and Trends | Recovery correlations, 90-day impacts, calendars and AI patterns | Proprietary derived outputs | U | N | N | N | N |
| Insights and coaching | Health Monitor trends, WHOOP Coach/AI and alerts | Proprietary derived outputs | P | N | U | N | N |
| Raw sensor streams | PPG/HR, motion, temperature and device events | Captured | N | N | N | N | P |
| Provenance | Record IDs, timestamps, updates, timezone, score state and user/device context | Captured and normalized metadata | P | A | P | A | A |

## Official access routes

### Data Export CSV

WHOOP's current
[data-export article](https://www.whoop.com/thelocker/access-your-whoop-data-with-new-integrations-data-export-options/)
documents export from the mobile app or web dashboard, a selectable date range, email delivery as a
CSV, and selection of the entire account history. It explicitly lists daily Sleep, Recovery and
Strain scores, resting heart rate, HRV, respiratory rate, sleep architecture and individual Journal
entries. It also says WHOOP Life members receive additional medical-grade health data, but does not
publish that file's exact fields.

The same page does not claim inclusion of raw PPG or accelerometer samples, beat-to-beat HR,
Stress Monitor history, Journal Impact percentages, Journal Trends, WHOOP AI narratives, deleted
records or source-level provenance. The export should therefore be treated as broad and useful,
not as a lossless account database. A real export is still required to establish the exact column
set, multi-file packaging, corrections and deletion behavior.

### Developer API v2

The current [OpenAPI document](https://api.prod.whoop.com/developer/doc/openapi.json) defines
OAuth-protected collections and by-ID reads for cycles, Recovery, Sleep and workouts, plus profile,
body-measurement and revocation operations. The corresponding models establish:

- cycle Strain, average/max heart rate and kilojoules;
- Recovery score, RHR, HRV RMSSD, SpO2, skin temperature and calibration state;
- sleep stages, sleep need/debt/strain/nap adjustments, performance, consistency, efficiency and
  respiratory rate; and
- workout Strain, heart-rate zones, HR, energy, distance and altitude summaries.

The schema's `start`, `end`, `limit` and `nextToken` parameters support historical pagination, but
WHOOP publishes no fixed retention period or statement that API history is identical to the app or
CSV. `SCORED`, `PENDING_SCORE` and `UNSCORABLE` states must be preserved; a missing score is not
zero.

The same current schema contains no public endpoint or OAuth scope for Stress Monitor, Journal,
Journal Impacts, Journal Trends, steps, raw sensor streams, ECG, blood pressure, Advanced Labs or
WHOOP AI. Earlier or unofficial clients that call additional stream/private endpoints do not
change the supported public API finding.

### OAuth, enrolment and approval

[Developing overview](https://developer.whoop.com/docs/developing/overview) says a WHOOP
membership is required to develop an app. [Getting Started](https://developer.whoop.com/docs/developing/getting-started)
allows up to five apps and issues client credentials through the dashboard. The
[OAuth guide](https://developer.whoop.com/docs/developing/oauth/) documents authorization-code
consent, scoped access, the optional `offline` scope for rotating refresh tokens and token
revocation.

[App Approval](https://developer.whoop.com/docs/developing/app-approval) is not a gate for personal
testing: a new app can be used immediately with up to ten WHOOP members. Approval, a privacy policy
and design review are required to launch to more members. The
[API terms](https://developer.whoop.com/api-terms-of-use/) say access is currently free, while
reserving WHOOP's right to change limits, terms and pricing.

### Webhooks and quotas

[Webhooks](https://developer.whoop.com/docs/developing/webhooks/) notify an app about workout,
Sleep and Recovery updates/deletions. The webhook carries an identifier and event type; the app
must retrieve the record through the API. Signed v2 webhooks use UUIDs and v1 webhooks are no
longer published.

[Rate limiting](https://developer.whoop.com/docs/developing/rate-limiting) documents default client
limits of 100 requests per minute and 10,000 per day, with response headers and a dashboard request
process for increases.

## Data available

### App-derived parity

| WHOOP app output | Public API result | CSV result | Portability finding |
|---|---|---|---|
| Strain | Available for physiological cycles and workouts | Explicitly included | Strong summary-score parity; no underlying proprietary algorithm or raw cardiac stream |
| Recovery | Recovery score and principal inputs available | Explicitly included | Strong score parity for documented fields; app narratives and every newer input are not guaranteed |
| Sleep | Sessions, naps, stages, need and core scores available | Explicitly included | Strong summary parity; no raw sleep-sensor series in the documented API |
| Stress Monitor | No endpoint or scope in current OpenAPI | Not listed by the export description | App-visible derived score is not established as portable |
| Journal entries | No endpoint or scope in current OpenAPI | Individual entries explicitly included | Manual full-history route exists; official recurring automation is absent |
| Journal Impacts, Trends and AI patterns | No endpoint or scope in current OpenAPI | Not listed | Input entries do not prove portability of WHOOP's derived correlations or narratives |

The public API's strongest granularity is record-level summaries: physiological cycles, Recovery
records, sleep sessions and workouts. It does not document continuous HR, raw optical waveforms,
beat intervals, second-level motion or the source signals used to calculate proprietary scores.

## Ecosystem integrations

WHOOP's current export article identifies
[Apple Health](https://support.whoop.com/s/article/Apple-Health-Integration?language=en_US),
[Strava](https://support.whoop.com/s/article/Strava-Integration?language=en_US) and TrainingPeaks
as supported integrations. The support site is JavaScript/authentication sensitive, so the link
gate establishes current route availability but not a complete field matrix.

| Destination | Direction established | Confirmed useful scope | Material limits |
|---|---|---|---|
| Apple Health | WHOOP to Apple Health; selected Apple Health workouts can be imported to WHOOP | Selected workouts and standardized health samples under category permissions | No evidence that WHOOP Stress, Recovery, Strain or Journal-derived outputs become equivalent Apple Health records; backfill is not guaranteed |
| Strava | WHOOP to Strava | Workout/activity publication | Activity route, not Sleep, Recovery, Stress or Journal portability; edit and historical behavior require testing |
| TrainingPeaks | WHOOP to TrainingPeaks | Training-oriented workout and selected recovery/sleep/strain context | Exact fields, subscription requirements, inbound plans and backfill are not specified on an accessible public matrix |

The specialist report also proposed Health Connect, MyFitnessPal and Peloton. This audit does not
promote them to confirmed route rows because a current, field-level primary page could not be
retrieved independently. They remain hands-on and primary-documentation checks rather than inferred
coverage.

## Open-source routes

| Project | Route and output | Licence and activity | Assessment |
|---|---|---|---|
| [`hedgertronic/whoop`](https://github.com/hedgertronic/whoop) | Python OAuth client for WHOOP API v2 | MIT; pushed 2026-07-07 | Best reusable typed/API client found; documented public methods mirror official score coverage, while its extra stream helper is not in the current OpenAPI |
| [`prankstr/hassio-whoop`](https://github.com/prankstr/hassio-whoop) | Home Assistant OAuth integration exposing cycle, Recovery, Sleep and workout sensors | MIT; pushed 2026-08-12 | Maintained personal automation for latest summaries; Home Assistant redirect and secret storage required |
| [`kryoseu/whoops`](https://github.com/kryoseu/whoops) | Imports WHOOP API data into PostgreSQL/MySQL with token refresh | Apache-2.0; pushed 2026-06-19 | Useful self-hosted longitudinal archive; requires database operation and API credentials |
| [`christianmeurer/whoop-reader`](https://github.com/christianmeurer/whoop-reader) | WHOOP 4.0 BLE live HR, R-R, SpO2, temperature and partly decoded motion to CSV/JSONL | MIT; pushed 2026-04-08 | Credible interoperability research, but packet fields remain partly unconfirmed and it is not a cloud-score extractor |
| [`Sophonbot0/whoop-vault`](https://github.com/Sophonbot0/whoop-vault) | WHOOP 5.0 BLE and first-party CSV ingestion into SQLite | MIT; pushed 2026-05-19 | Rich local research route for one tested firmware/platform; unsupported protocol, pairing disruption and empirical decoding make it fragile |

API clients still require a WHOOP membership, dashboard app, OAuth client secret and member consent.
Direct BLE can expose device-side signals that the API omits, but those projects do not recover
WHOOP's cloud algorithms or prove that raw signals are equivalent to Stress, Recovery, Sleep or
Journal outputs.

## Material barriers and risks

- **Membership dependency:** a WHOOP membership is required to create a developer app, and behavior
  after cancellation is not documented.
- **Parity gap:** Stress Monitor, Journal automation/insights, AI narratives and newer clinical
  surfaces are outside the current public OpenAPI.
- **Raw-data gap:** public API and documented CSV do not offer raw optical, accelerometer or
  beat-level history.
- **History ambiguity:** full account date range is offered in CSV, but API retention and field
  equivalence are not guaranteed.
- **Secret and token handling:** server-side client secrets and rotating refresh tokens protect
  highly sensitive data and must not be embedded in client apps or source control.
- **Approval ceiling:** personal apps are self-service, but distribution beyond ten members requires
  approval.
- **Licence versus reliability:** an open-source licence confirms reuse terms, not device safety,
  protocol correctness or future compatibility.
- **Corrections and deletion:** webhooks cover update/delete events only for workout, Sleep and
  Recovery; CSV propagation and other record families remain unverified.

## Rubric snapshot

| Dimension | WHOOP finding |
|---|---|
| Consumer effort | Low for CSV; moderate for OAuth automation; high for direct BLE |
| Cost | WHOOP device/membership required for collected data and for developer registration |
| Platform dependency | Cloud account and app; Apple integration requires iOS; BLE projects are model/OS specific |
| Data completeness | Core scores are strong; Stress, Journal automation/insights, AI, clinical and raw data are incomplete |
| Granularity | Record-level cycle/recovery/sleep/workout summaries; no documented raw public stream |
| Historical depth | Entire account date range in CSV; API retention limit unknown |
| Automation | OAuth API, refresh tokens and webhooks supported |
| Formats | API JSON and consumer CSV; no published stable CSV schema |
| User authorization | OAuth scopes, explicit consent, refresh and revocation |
| Developer access | Self-service for ten-member development; approval for wider launch |
| Integrations | Apple Health, Strava and TrainingPeaks confirmed at route level; field/backfill detail incomplete |
| Provenance | Strong API IDs and timestamps; export/device provenance uncertain |
| Corrections and deletion | API update timestamps and selected delete webhooks; export propagation unknown |
| Portability | Good for summaries and individual Journal entries, weak for raw and several proprietary app outputs |
| Evidence quality | Current docs/OpenAPI and repository metadata checked; account/device tests remain outstanding |

## Provisional openness assessment

**Partial.** WHOOP is materially more useful than a manual-export-only provider because personal
developers get supported OAuth automation and central proprietary scores. It is not "Mostly open"
because the omissions are not narrow: the all-day Stress score, Journal automation and insights,
AI/Healthspan/clinical outputs and raw sensor history are meaningful parts of the product.

## Evidence gaps

1. Request a new full-history CSV and record every file, column, identifier and date range.
2. Compare the same account/day across app, CSV and API for Strain, Recovery and Sleep.
3. Confirm whether Stress Monitor values appear anywhere in the current CSV.
4. Confirm whether CSV Journal data includes quantities/times only or also Impacts, Trends and AI
   narratives.
5. Test API pagination to the oldest account record and after membership cancellation.
6. Verify current Apple Health, Strava and TrainingPeaks fields, backfill, edits and deletions.
7. Obtain current primary documentation for Health Connect, MyFitnessPal and Peloton before rating
   those routes.
8. Check WHOOP MG, Life and Advanced Labs export contents without inferring them from product inputs.
9. Reproduce BLE projects on supported hardware/firmware before treating decoded fields as reliable.
