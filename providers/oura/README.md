# Oura

**Evidence date:** 2026-08-20

**Products in scope:** Oura Ring Gen3 and later, the Oura App, Oura on the Web, Membership Hub,
Oura Cloud API v2, Oura's contractually documented MCP Server, and supported integrations

**Resource index:** [Oura resources](./resources.md)
**Canonical coverage:** [Oura taxonomy mapping](./coverage.json)

## Bottom line

Oura offers unusually broad self-service access for a consumer wearable. An account holder can
register an OAuth 2.0 application, connect up to ten users before Oura approval is required, and
retrieve documented JSON resources for daily Activity, Readiness and Sleep scores and contributors,
sleep periods, heart rate, SpO2, Daytime Stress summaries, Resilience, Cardiovascular Age, VO2 max,
workouts, sessions, tags, ring configuration and rest mode. The current
[API v2 schema](https://cloud.ouraring.com/v2/static/json/openapi-1.37.json) says personal access
tokens were deprecated in December 2025, so new personal automations must use OAuth rather than the
older token workflow.

The publicly documented API v2 surface still is not a complete copy of the app or the ring. It omits raw PPG,
accelerometer and temperature streams; the 15-minute Daytime Stress graph; workout route, pace,
splits and heart-rate-zone records; Cycle Insights and predictions; Symptom Radar; reports, crowns,
Spotlight narratives and Oura Advisor conversations. Input signals being available does not make
those derived outputs available.

Oura's effective June 2026
[API and MCP Agreement](https://cloud.ouraring.com/legal/api-agreement) separately establishes an
Oura-operated MCP Server that exposes User Data through defined endpoints. No public MCP setup
guide, endpoint or tool catalogue, schema, eligibility rule or data-family documentation was found.
This audit therefore records MCP as an official route with unknown access and unknown coverage; it
does not transfer API v2 findings or omissions to MCP.

Membership is a separate gate from OAuth and application approval. Gen3 and later users without an
active membership retain their data and can request an export, but Oura says they
[cannot access API v2](https://support.ouraring.com/hc/en-us/articles/4409086524819-Oura-Membership).
The Membership Hub export is available with or without an active membership and may take up to ten
days. No first-party source found in this audit promises a fixed universal retention period for
every API v2 resource.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Membership Hub export | Any Oura account holder | No; asynchronous request | Download described with API v2 data models | May take up to ten days; public page does not enumerate every delivered field |
| Oura on the Web download | Gen3-and-later users while service remains available | No | User-selected trend metrics and date range | Oura says the web service will be discontinued later in 2026 |
| Cloud API v2 with OAuth | Active member with a registered application | Yes | Broad normalized records and many proprietary scores | API v2 has no raw sensor stream or full app parity; membership required |
| Oura MCP Server | Unknown from public evidence | Contract describes programmable access; operation unverified | Contract says User Data through defined endpoints | No public setup, authentication method, tool catalogue, schema, eligibility, history or metric coverage found |
| API webhooks | Registered OAuth application | Yes | Change notifications for supported API resources | Notification plus follow-up API read; not a bulk record payload |
| Approved OAuth application | Application owner after Oura review | Yes | Same documented API v2 resources for more than ten users | Approval is a distribution threshold, not an extra metric tier |
| Apple Health | iPhone user with permissions | Yes after app sync | Selected sleep, activity, workout, heart-rate and body records | No Oura scores, Stress, Resilience or Cardiovascular Age records |
| Health Connect | Supported Android user with permissions | Yes after app sync | Selected activity, body, sleep and vital records | Normalized, category-limited relay; no proprietary scores |
| Strava | User linking both accounts | Yes for supported workouts | Selected workouts in both directions | Current-day-only Strava import; not wellness-data portability |
| Natural Cycles | Active Oura member and Natural Cycles subscriber | Daily after app sync | Overnight temperature trend | Focused fertility input only |
| Open-source clients | Technically capable user | Yes | API v2-defined resources or unsupported local ring data | OAuth setup, maintenance, security and licence constraints vary |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Partial | API v2 exposes the three daily scores and several newer derived metrics, but app-only graphs, routes, predictions, reports, alerts and Advisor content remain; MCP parity is unknown |
| Self-service developer access | Yes | An ordinary member can register an OAuth application for up to ten users; approval is required only to exceed that limit |
| Official automation | Yes | OAuth API reads and webhooks support recurring retrieval; the agreement also establishes an MCP Server whose public technical path was not located |
| Complete history | Partial | API v2 queries accept start/end ranges and the account export is retained without membership, but Oura publishes no universal per-resource retention guarantee |
| Raw and derived data coverage | Partial | API v2 contains many normalized samples, score contributors and proprietary outputs; its raw/app gaps are material, while MCP coverage is unknown |
| **Overall personal-data openness** | **Mostly open** | Broad self-service official automation exists, with important but identifiable omissions and a subscription gate |

## Data inventory and route coverage

**Codes:** `A` available; `P` partial, conditional or lossy; `N` not available; `U` unknown from
current evidence; `NA` not applicable. `API OSS` means open-source clients of API v2.
`MCP` is Oura's contractually established but publicly undocumented MCP Server. `Local BLE` is the
unsupported reverse-engineered ring route. The normalized 29-family mapping is in
[coverage.json](./coverage.json).

| Data family | Included metrics or app outputs | Captured or produced as | Account export | API v2 | MCP | Apple Health | Health Connect | Strava | Natural Cycles | API OSS | Local BLE |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Body measurements and composition | Height, weight, sex, age; imported body fat and lean mass; calculated BMI | User-entered, external and derived | P | P | U | P | P | N | N | P | N |
| Daily movement | Steps, inactivity, activity classes, targets and activity goal | Captured, normalized and derived | A | A | U | P | P | P | N | A | P |
| Energy and active time | Active/total calories, MET minutes, sedentary and activity time | Normalized and derived | A | A | U | P | P | P | N | A | P |
| Heart rate | Daytime, live, sleep, workout, resting and lowest HR | Captured and normalized | A | A | U | P | P | P | N | A | A |
| Heart-rate variability | Nightly average/max and five-minute sleep samples | Captured and normalized | A | A | U | N | A | N | N | A | A |
| Blood pressure | Apple Health-imported readings | External | U | N | U | P | P | N | N | N | N |
| ECG and rhythm | No documented first-party ECG or rhythm classification | Not established | N | N | U | N | N | N | N | N | N |
| Cardio fitness and VO2 max | Cardio Capacity, VO2 max, level and Future Me projection | Derived, user-entered or external | P | P | U | P | P | N | N | P | N |
| Respiration and oxygen saturation | Nighttime respiratory rate, average SpO2 and breathing disturbance index | Captured and derived | A | A | U | P | P | N | N | A | A |
| Body and skin temperature | Nightly skin-temperature deviation, baseline and trend | Captured and derived | P | P | U | N | N | N | A | P | A |
| Sleep sessions and stages | Bedtime, wake time, stages, naps, latency, efficiency, movement and timing | Captured, normalized and derived | A | A | U | A | A | N | N | A | A |
| Sleep insights and score | Sleep Score, contributors, bedtime recommendation and sleep regularity | Derived | A | A | U | N | N | N | N | A | P |
| Stress | 15-minute zones, daily stressed/restored time, summary and Cumulative Stress | Derived | P | P | U | N | N | N | N | P | P |
| Energy and readiness | Readiness Score, contributors, Restorative Time and rest mode | Derived | A | A | U | N | N | N | N | A | P |
| Training load and status | Activity Balance, Training Frequency/Volume, Recovery Time and Recovery Index | Derived | A | A | U | N | N | N | N | A | P |
| Performance predictions | Future Me cardio projection and related forward-looking app guidance | Derived | U | N | U | N | N | N | N | N | N |
| Workout sessions | Detected, recorded, imported and manually entered activities | Captured, normalized and user-entered | A | A | U | A | A | A | N | A | P |
| Route and elevation | Phone-recorded route, map, distance, pace and splits | Captured and normalized | U | N | U | A | P | P | N | N | N |
| Sport dynamics | Activity HR graph, zones, pace, splits, intensity and calories | Captured, normalized and derived | P | P | U | P | P | P | N | P | P |
| Plans, workouts and courses | No documented structured training-plan or course family | Not established | U | U | U | U | U | U | U | U | U |
| Gait and functional mobility | No documented gait, asymmetry or clinical mobility family | Not established | U | U | U | U | U | U | U | U | U |
| Cycle and pregnancy | Cycle phases, period logs/predictions, fertile window and pregnancy insights | User-entered and derived | U | N | U | N | N | N | P | N | P |
| Nutrition and hydration | Meals and meal-timing insights | User-entered and derived | U | N | U | N | N | N | N | N | N |
| Clinical records and medications | Imported health records and Health Panels | External and user-provided | P | N | U | N | N | N | N | N | N |
| Mindfulness, mood and symptoms | Explore sessions, session mood, tags and symptom entries | User-entered and normalized | A | A | U | P | N | N | N | A | P |
| Hearing and audio exposure | No documented first-party hearing or audiogram family | Not established | N | N | U | N | N | N | N | N | N |
| Trends, alerts and awards | Trends, crowns, reports, Spotlight, Symptom Radar and Oura Advisor | Derived | P | P | U | N | N | N | N | P | P |
| Raw and live sensor streams | PPG/IBI, accelerometer, raw temperature, motion and SpO2 signals | Captured | U | N | U | N | N | N | N | N | A |
| Source and record metadata | IDs, timestamps, ring ID/configuration, algorithm version and source | Captured and normalized | P | A | U | P | P | P | P | A | A |

The official [API v2 schema](https://cloud.ouraring.com/v2/static/json/openapi-1.37.json) defines
that route's boundary. For example, it explicitly supplies Activity, Readiness and Sleep scores and
contributors; daily Stress totals and summary; Resilience level and contributors; vascular age and
pulse-wave velocity; and VO2 max. API v2 does not expose a derived score merely because the schema
contains the score's input signals. This says nothing about the undocumented MCP data boundary.

## Official access routes

### Oura MCP Server

The June 2026 agreement says Oura operates an MCP Server that exposes User Data through defined
endpoints, subject to authentication, authorization and consent verification. It also says MCP
clients should request only necessary User Data, generally may not cache MCP data without separate
written authorization, receive no default SLA, and may face future fees.

The agreement is the only public first-party MCP evidence located for this audit. No public setup
instructions, server URL, endpoint or tool catalogue, schema, client-registration process,
authentication method, eligibility rule, membership requirement, application-approval threshold,
rate limit, historical depth or metric coverage was found. Those properties remain unknown rather
than being copied from API v2.

### Cloud API v2

API v2 is Oura's only publicly documented programmable data API. Registration is self-service, but
the current schema says every API application is capped at ten users until approved by Oura. Each
API user must consent to the requested data types. OAuth access tokens are required; personal access
tokens were deprecated in December 2025. The API and MCP agreement is effective 8 June 2026 and
permits Oura to change or discontinue either interface and to introduce future fees
([agreement](https://cloud.ouraring.com/legal/api-agreement)).

API v2 exposes collection and single-document routes for daily Activity, Readiness, Sleep, SpO2,
Stress, Resilience and Cardiovascular Age; sleep periods and recommended sleep time; VO2 max;
workouts; sessions; tags; rest mode; ring configuration; personal information; and timestamped
heart rate. Ring battery level is also exposed. Collection routes use dates or datetimes and
pagination tokens. No public page found in this audit promises a fixed maximum history, and a `403`
can indicate an expired Oura subscription.

Webhooks are part of the same current OpenAPI document. Oura recommends one historical pull when a
user connects and webhooks for ongoing updates. A webhook indicates a change; the application must
read the corresponding API resource. Rate limits exist at per-token and per-application layers and
return retry headers, but the public schema does not publish one fixed request count for every
application.

### API v2 authentication and approval are separate gates

- **OAuth consent:** every connected user approves requested scopes/data types.
- **Application registration:** a developer creates a client ID and secret.
- **Application approval:** required when an application needs more than ten connected users.
- **Membership:** Gen3-and-later users need an active membership for API access, independently of
  OAuth or application approval.
- **Personal access tokens:** deprecated in December 2025 and unavailable for new integrations.

These gates should not be collapsed into a single claim that the API is either "public" or
"partner-only." It is self-service for personal and small-scale use, reviewed for wider
distribution, and subscription-dependent for the data owner.

## Data available and granularity

Oura exposes both daily derived documents and finer records. Daily Activity includes the score,
contributors, minute-level MET samples and five-minute activity classes. Daily Readiness includes
the score, contributor values and temperature deviations. Daily Sleep contains the score and
contributors, while the sleep-period resource adds stage durations, 30-second movement and stage
classifications, five-minute heart-rate and HRV series, average respiration, latency, efficiency,
algorithm version and ring ID.

In API v2, heart rate is a timestamped observation series with source labels, not raw PPG. Daily SpO2 is an
aggregate percentage plus breathing disturbance index. Workouts contain type, time, intensity,
distance and calories, but the schema does not include the app's route map, pace, splits,
heart-rate zones or a workout-linked heart-rate series. Daytime Stress is reduced to daily high
stress/high recovery seconds and a day summary; the app's
[15-minute stress graph](https://support.ouraring.com/hc/en-us/articles/21205822135315-Daytime-Stress)
is not an API v2 record.

Major proprietary outputs have explicit resources:

- Activity, Readiness and Sleep each expose the score and contributors.
- Resilience exposes a level and sleep recovery, daytime recovery and stress contributors.
- Cardiovascular Age exposes predicted vascular age and pulse-wave velocity.
- Cardio Capacity exposes VO2 max, but not the app's category or Future Me projection.
- Sleep Time exposes a recommendation, status and optimal bedtime window.

App-only derived features remain material. Symptom Radar classifies signs of strain and highlights
changed biometrics, but has no API v2 endpoint
([support](https://support.ouraring.com/hc/en-us/articles/35593651188115-Symptom-Radar)).
Oura Advisor uses scores, contributors, activities, tags, profile information and conversations,
but its generated guidance, memories and conversation history are not API v2 resources
([support](https://support.ouraring.com/hc/en-us/articles/39512345699219-Oura-Advisor)).

## Direct export and privacy routes

Oura's current [export guide](https://support.ouraring.com/hc/en-us/articles/360025441594-Export-Share-Your-Oura-Data)
documents three different user-controlled outputs:

1. Membership Hub provides a requested account download to all users, with or without active
   membership. Oura says preparation can take up to ten days and points to API v2 for data models.
2. Oura on the Web currently lets eligible users choose trend metrics and a date range, but Oura
   says this web service will be discontinued later in 2026.
3. Shareable PDF reports contain selected sleep, movement, cycle, health-panel or menopause
   information and have fixed report-specific windows. They are human-readable reports, not bulk
   machine exports.

The Membership FAQ says cancelled members keep their account data and can export all Oura data in
CSV. The public guide does not publish a complete file manifest or a field-by-field equivalence
statement between the Membership Hub package, API v2 resources and every app feature, so this audit
does not treat the archive as proven app parity.

Oura's [privacy policy](https://ouraring.com/privacy-policy) also describes access, portability,
deletion and consent withdrawal rights. A statutory request is not an automated API and may differ
by jurisdiction. The policy confirms that Oura processes measured heart rate, movement, temperature
and respiration plus calculated sleep phases, activity levels and readiness, but it does not define
the downloadable package schema.

## Ecosystem integrations

| Destination | Direction | Confirmed payload and history | Material limits |
|---|---|---|---|
| [Apple Health](https://support.ouraring.com/hc/en-us/articles/360025438734-Apple-Health-Integration) | Selected categories both ways | Oura exports active energy, one-minute HR, height, mindful minutes, respiratory rate, sleep/stages, steps, weight, workout routes and eligible workouts; imports a broader selected list | No Oura scores, HRV, Stress, Resilience, temperature trend or Cardiovascular Age export; graph rounding differs |
| [Health Connect](https://support.ouraring.com/hc/en-us/articles/10786105824531-Health-Connect-by-Android-Integration) | Selected categories both ways | Oura exports activity, body measurement, sleep, HR and HRV; imports activity, VO2 max, body measurements and vitals | Normalized category relay; Google Fit integration is discontinued; no proprietary scores |
| [Strava](https://support.ouraring.com/hc/en-us/articles/10766662499219-Strava-Integration) | Eligible Oura workouts out; Strava workouts in | Recorded Oura activities can export; inbound workouts include timing, duration and pace | Strava import is current-day only; AAD and manually added Oura activities do not export; score stickers are images, not data |
| [Natural Cycles](https://support.ouraring.com/hc/en-us/articles/10785345623827-Natural-Cycles-Integration) | Oura to Natural Cycles | Overnight temperature trend after morning sync | Active Oura membership and Natural Cycles subscription; no period data or other Oura metrics |

Apple Health and Health Connect are brokers, not complete mirrors. Downstream applications choose
which normalized types to read, and no source establishes universal historical backfill, correction
or deletion propagation. Oura's direct Cycle Insights and Natural Cycles also use separate models;
the latter receives temperature trend only.

## Open-source routes

| Project | Mechanism | Output | Assessment |
|---|---|---|---|
| [`hedgertronic/oura-ring`](https://github.com/hedgertronic/oura-ring) | Current API v2 OAuth client | Python objects/JSON for 19 API requests | MIT; released v1.0.0 in June 2026; current supported starting point, but intentionally omits webhooks and sparse fields |
| [`louispires/Oura-Home-Assistant-Integration`](https://github.com/louispires/Oura-Home-Assistant-Integration) | API v2 OAuth into Home Assistant | Sensors and long-term statistics for scores, sleep, stress, resilience, heart health and more | MIT; actively released in August 2026; broad personal automation with local token and database risk |
| [`turing-complet/python-ouraring`](https://github.com/turing-complet/python-ouraring) | API v1/v2 client using OAuth or legacy PAT | Python and pandas records | MIT; last release April 2024; maintainer seeks help and PAT examples are obsolete after December 2025 |
| [`sam-roberts/oura-data-visualiser`](https://github.com/sam-roberts/oura-data-visualiser) | API pull into SQL/Grafana | Selected sleep scores and durations | GPL-3.0; explicitly personal-use quality, last substantive documentation targets 2023 PAT use |
| [`Th0rgal/open_oura`](https://github.com/Th0rgal/open_oura) | Reverse-engineered Bluetooth protocol | Local SQLite/JSONL and raw PPG, IBI, temperature, motion and SpO2 history | NOASSERTION; active and uniquely broad, but unsupported, credential-sensitive and not legally reusable without a licence |

API v2 clients can retrieve only what API v2 exposes. The reverse-engineered local project is
materially different: it reports direct Ring 3/4/5 data and raw signals unavailable through the
public API v2 surface. MCP raw-signal coverage is unknown. The repository also says Oura's
proprietary scoring models are not included, so local
input recovery is not proof that the official 0-100 scores or every app insight can be reproduced.

## Material barriers and risks

- **Subscription gate:** active membership is required for Gen3-and-later API v2 access even though
  cancelled members retain export access.
- **OAuth migration:** PAT-based examples and tools are obsolete or transitional after December
  2025.
- **Approval threshold:** self-service applications stop at ten users until Oura approves broader
  distribution.
- **Terms:** the June 2026 API and MCP agreement restricts competing/replicating products, imposes
  special aggregator obligations, generally prohibits caching MCP data without separate
  authorization, permits interface changes and reserves future fees.
- **MCP uncertainty:** the agreement establishes the official server, but no public technical
  documentation was found for access, metrics, history or operation.
- **App omissions:** routes, stress intervals, Cycle Insights, Symptom Radar, reports and Advisor
  content are not documented API v2 resources; MCP coverage is unknown.
- **No raw API v2 stream:** API v2 omits raw optical, movement and temperature signals; MCP coverage
  is unknown, while local retrieval currently requires unsupported reverse engineering.
- **History uncertainty:** there is no public universal retention/backfill guarantee across all
  API v2 resources and integrations.
- **Sensitive credentials:** OAuth access/refresh tokens, Bluetooth authentication keys and local
  databases expose intimate longitudinal health data.
- **Device and region variation:** Gen2 lacks many newer features; regulated and sensor-dependent
  features vary by ring generation, baseline duration, firmware and country.

## Rubric snapshot

| Dimension | Assessment |
|---|---|
| Consumer effort | Export is straightforward but asynchronous; automation requires OAuth application setup |
| Cost | Ring purchase and, for Gen3+, active membership for detailed app/API v2 access; MCP cost and membership requirements are unknown |
| Platform dependency | Cloud account and mobile sync; Apple/Android requirements vary by integration |
| Data completeness | Strong normalized and derived API v2 coverage with material app-only and raw-sensor gaps; MCP coverage unknown |
| Granularity | API v2 has daily documents, timestamped HR, sleep series and minute/five-minute activity records; MCP granularity unknown |
| Historical depth | API v2 date-range queries and account retention are supported; universal API and MCP limits are undocumented |
| Automation | Official OAuth API and webhooks; contractually established MCP Server with no located public setup |
| Formats | JSON API; account CSV/download package; selected PDF reports; MCP payload format/schema unknown |
| User authorization | API v2 uses per-data-type OAuth consent; agreement requires MCP authentication, authorization and consent but does not name the method |
| Developer access | API v2 is self-service to ten users and approved above ten; MCP eligibility and onboarding unknown |
| Integrations | Strong Apple Health/Health Connect interoperability, focused Strava and Natural Cycles routes |
| Provenance | API IDs, timestamps, source fields, ring ID/configuration and algorithm version where supplied |
| Corrections and deletion | API v2 resources can change and webhooks notify; downstream propagation is not guaranteed |
| Portability | High for API v2/export data; low for app-only insights and proprietary raw-to-score processing |
| Evidence quality | Current OpenAPI 1.37, live first-party support pages, current agreement and verified repository metadata |

## Provisional openness assessment

**Mostly open.** Oura's API v2 supports ordinary-user automation and exposes many proprietary scores that
other wearable APIs omit. The result falls short of Open because an active subscription is needed
for API access, wider API applications need review, API v2 omits raw ring signals and several
consequential app outputs, and the separately documented MCP Server is too opaque to improve the
coverage assessment.

## Evidence gaps and hands-on checks

1. Locate or obtain Oura's MCP server URL, setup process and tool catalogue, then verify
   authentication, eligibility, membership, application approval, metrics, history, raw coverage,
   caching restrictions and deletion behavior without assuming API v2 parity.
2. Compare a current Membership Hub package with API v2 for the same account and date range,
   including stress, resilience, Cardiovascular Age, Cycle Insights and deleted records.
3. Measure the oldest retrievable record for every API v2 endpoint on Gen2, Gen3, Ring 4 and Ring 5
   accounts, including after membership expiry and renewal.
4. Confirm OAuth scopes, rotating refresh-token behavior, webhook deletion/update events and
   per-token/per-application limits in a registered application.
5. Check whether Oura on the Web is retired on the announced 2026 schedule and whether Membership
   Hub fully replaces its selectable CSV workflow.
6. Test correction and deletion propagation through Apple Health, Health Connect and Strava,
   including duplicate handling and source metadata.
7. Verify the exact Membership Hub file manifest and whether imported health records, Meals,
   Advisor conversations and women's-health logs are included.
8. Re-test the listed open-source projects with the current OAuth flow and OpenAPI version.
9. Independently validate the unsupported Bluetooth project's Ring 3/4/5 coverage and security
   model before relying on it for irreplaceable personal archives.
