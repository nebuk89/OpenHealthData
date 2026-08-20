# Google / Fitbit

**Evidence date:** 2026-08-20

**Canonical coverage:** [Google / Fitbit taxonomy mapping](./coverage.json)

## Bottom line

Google now documents the [Google Health API](https://developers.google.com/health) as the
successor to the Fitbit Web API. An ordinary account holder can create a Google Cloud project,
enable the API, add their own account as a test user, request read-only scopes and automate
retrieval with OAuth refresh tokens. The API exposes a broad set of Fitbit and Pixel Watch records,
including interval heart rate and activity, sleep stages, HRV, oxygen saturation, ECG, irregular
rhythm notifications, VO2 max, exercise, nutrition and source/device metadata.

That is meaningful self-service access, but it is not complete app-to-interface parity. Google's
published data-type catalogue does not document portable records for Fitbit Sleep Score,
Readiness, Stress Management Score, badges, coaching narratives or every other app-visible
insight. The official account export is useful for portability, but its public help page does not
publish a stable field-by-field schema. The practical verdict for an ordinary user is therefore
**Partial**: broad official automation exists, while proprietary derived outputs and some
first-party application state remain unaccounted for.

## Access snapshot

| Route | Who can use it? | Automated? | Data scope | Main limitation |
|---|---|---:|---|---|
| Google Health API | Google Health account holder with a Cloud project and OAuth client | Yes | Current documented health, activity, sleep, ECG, nutrition and profile types | Published catalogue does not cover every app-visible insight |
| Google Health webhooks | API developer with an HTTPS subscriber | Yes | Change notifications for a documented subset of API data types | Notification triggers retrieval; it is not a second copy of the record |
| Google Health data export | Signed-in account holder | Periodic full archives can be scheduled in Takeout | Documented examples include activity, exercise, sleep and heart rate | No public exhaustive schema or incremental-change feed |
| Legacy Fitbit Web API personal app | Existing Fitbit developer during migration | Yes | Public and intraday endpoints for the developer's own account | Legacy surface is being replaced and requires separate Fitbit OAuth |
| Legacy third-party intraday access | Approved client/server application | Yes | Other users' detailed activity, breathing, heart-rate, HRV and SpO2 series | Case-by-case approval; not required for a personal application |
| Documented file interoperability | Account holder with a retrievable exercise TCX file | Manual | Individual workouts accepted by compatible destinations | Activity-only, lossy and not a native full-account sync |
| Open-source clients | Technically capable account holder | Yes | Mirrors the selected official API and scopes | Adds local token/data handling and does not expand provider coverage |

## Openness comparison

| Openness test | Result | Finding |
|---|---|---|
| App-to-interface parity | Partial | The Google Health API catalogue is broad, but no documented route was found for several Fitbit scores, badges, coaching narratives and insights |
| Self-service developer access | Yes | An ordinary user can create a Cloud project, enable the API and authorize their own test account without partner approval |
| Official automation | Yes | OAuth refresh tokens, paginated queries and webhooks support recurring retrieval |
| Complete history | Partial | Google documents queries as far back as a record has been retained for supported types, but app-only outputs and export completeness remain unknown |
| Raw and derived data coverage | Partial | Interval/sample records and several derived measurements are exposed; raw accelerometer streams and many proprietary scores have no documented route |
| **Overall personal-data openness** | **Partial** | Broad self-service automation exists, but it does not establish access to everything Google/Fitbit displays or derives |

## Data inventory and route coverage

The inventory uses Google's current
[data-type catalogue](https://developers.google.com/health/data-types),
[endpoint examples](https://developers.google.com/health/endpoints), legacy
[Fitbit Web API reference](https://dev.fitbit.com/build/reference/web-api/) and the account-export
help page. Device compatibility, region, enabled features and user consent still control whether a
record exists.

**Codes:** `A` available; `P` partial, conditional or notification-only; `N` not available by the
documented route design; `U` no documented availability or absence found; `NA` not applicable.
`GH API` and `Personal API` are ordinary self-service routes. `3P intraday` is the legacy
case-by-case approval route for retrieving other users' detailed series. `Open source` uses the
official APIs and does not bypass their scopes.

| Data family | Included metrics or app outputs | Captured or produced as | GH API | Webhooks | Account export | Personal API | 3P intraday | File interoperability | Open source |
|---|---|---|---|---|---|---|---|---|---|
| Body measurements and composition | Weight, height, BMI/body fat | Scale, entered and normalized samples | A | P | P | A | NA | NA | A |
| Daily movement | Steps, distance, floors, activity level, sedentary periods | Captured intervals and rollups | A | P | P | A | P | NA | A |
| Energy and active time | Active energy, total calories, Active Zone Minutes, time in zones | Normalized and derived intervals/rollups | A | P | P | A | P | P | A |
| Heart rate | Samples, resting HR, zones and exercise HR | Captured samples plus daily derivations | A | P | P | A | P | P | A |
| Heart-rate variability | HRV samples and daily HRV | Sleep-associated samples and derived daily summary | A | P | U | A | P | NA | A |
| Blood pressure | No current Google Health data type documented | Unknown | U | U | U | U | NA | NA | U |
| ECG and rhythm | ECG waveform/classification and irregular-rhythm notifications | Captured session plus regulated derivation | A | U | U | P | NA | NA | A |
| Cardio fitness and VO2 max | VO2 max, run VO2 max and daily VO2 max | Derived estimate | A | P | U | A | NA | P | A |
| Respiration and oxygen saturation | Respiratory rate, sleep summary, SpO2 samples and daily summary | Captured/normalized samples and daily derivations | A | P | U | A | P | NA | A |
| Body and skin temperature | Core body temperature and daily sleep-temperature derivations | Sample plus sleep-derived deviation | A | P | U | A | NA | NA | A |
| Sleep sessions and stages | Sleep intervals, stages, duration and summary fields | Captured and derived session | A | P | P | A | NA | NA | A |
| Sleep insights and score | Fitbit Sleep Score and coaching | Proprietary derivation | U | U | U | U | NA | NA | U |
| Stress | Stress Management Score and stress insights | Proprietary derivation | U | U | U | U | NA | NA | U |
| Energy and readiness | Daily Readiness and related guidance | Proprietary derivation | U | U | U | U | NA | NA | U |
| Training load and status | Cardio load, target load and training status | Derived training model | U | U | U | U | NA | NA | U |
| Performance predictions | Race/performance predictions | Derived estimate | U | U | U | U | NA | NA | U |
| Workout sessions | Exercise type, time, duration, calories, HR and notes | Captured/entered session | A | P | P | A | NA | A | A |
| Route and elevation | GPS location, altitude, distance and elevation | Captured series and session metadata | P | P | U | P | NA | P | P |
| Sport dynamics | Swim lengths/strokes and selected exercise details | Captured and normalized sport fields | P | P | U | P | NA | P | P |
| Plans, workouts and courses | Saved plans, coached workouts and routes | User-authored or provider-authored content | U | U | U | U | NA | U | U |
| Gait and functional mobility | Walking-function and gait measures | Unknown | U | U | U | U | NA | NA | U |
| Cycle and pregnancy | Menstrual periods, ovulation tests and symptoms | User-entered records | N | U | U | P | NA | NA | N |
| Nutrition and hydration | Foods, nutrients, meal logs and water | User-entered records and reference catalogue | A | P | U | A | NA | NA | A |
| Clinical records and medications | Health records and medication history | Unknown | U | U | U | U | NA | NA | U |
| Mindfulness, mood and symptoms | Moods, mindfulness and logged symptoms | User-entered records | N | U | U | P | NA | NA | N |
| Hearing and audio exposure | Audiograms and sound exposure | Unknown | U | U | U | U | NA | NA | U |
| Trends, alerts and awards | Badges, trends, coaching and app alerts | Proprietary derivation | U | U | U | U | NA | NA | U |
| Raw and live sensor streams | Interval health/activity samples; no accelerometer waveform route found | Captured/normalized series | P | P | U | P | P | P | P |
| Provenance and metadata | Data source family, platform, device, recording method, timestamps and source app | Captured/normalized metadata | A | P | U | P | U | P | A |

The machine-readable [coverage map](./coverage.json) preserves the same 29 canonical IDs and maps
every route separately. `N` is used only where the current API design explicitly lacks a read
operation; otherwise an unsupported negative remains `U`.

## Official access routes

### Google Health API

The current [getting-started guide](https://developers.google.com/health/get-started) describes the
Google Health API as the forward-looking surface and points existing Fitbit developers to a
migration path. [Setup](https://developers.google.com/health/setup) is self-service: create or
select a Google Cloud project, enable `health.googleapis.com`, configure an OAuth client, add test
users and select scopes. An unverified project is capped at 100 users; supporting more than 100
requires a third-party security review. For a personal integration, the account holder can remain
a named test user.

Read access is grouped into
[OAuth scopes](https://developers.google.com/health/scopes) for activity and fitness, health
measurements, ECG, irregular-rhythm notifications, nutrition, profile, settings and sleep.
Reproductive health, mood, symptoms and mindfulness are documented as write-only scopes, so they
are not counted as self-retrieval routes.

The API supplies REST and gRPC protocols, `list`, `reconcile`, `rollUp` and `dailyRollUp`
operations depending on type, source-family filters and explicit provenance. Google's
[historical-data guidance](https://developers.google.com/health/data-types) says applications can
query as far back as data has been recorded, with no API restriction on total history. Long
retrievals require pagination; rollups have 14- or 90-day request windows depending on type.

Default [rate limits](https://developers.google.com/health/rate-limits) are documented per project
and per user. The personal bottleneck is normally pagination and backoff rather than a partner
contract.

### Webhooks

[Google Health webhooks](https://developers.google.com/health/webhooks) notify an HTTPS subscriber
when supported data changes. The published set includes activity, steps, exercise, heart rate,
HRV, oxygen saturation, respiratory rate, sleep, weight, nutrition and several daily derivations.
A webhook carries a notification, not the complete health record; the application then reads the
authorized data through the API.

### Account export

Google's [health-data export help](https://support.google.com/googlehealth/answer/14236615?hl=en)
offers a signed-in archive and explicitly names activity, exercise, sleep and heart rate as
examples. The help surface does not publish a complete, versioned file inventory, per-device
schema, deletion representation or incremental-change option. General
[Google Takeout guidance](https://support.google.com/accounts/answer/3024190?hl=en) allows a full
archive every two months for one year. This audit therefore treats the archive as a broad periodic
fallback, not proof of parity or a live synchronization contract.

### Legacy Fitbit Web API

The [migration guide](https://developers.google.com/health/migration) says the Google Health API
uses a new console, Google OAuth, data types, endpoint schema and response format. Existing Fitbit
OAuth tokens cannot be transferred, so users must re-consent. The guide instructs integrations to
support old and new login methods temporarily while the legacy endpoints remain active and refers
to a future hard cutoff without publishing the date on that page.

The legacy API remains important for interpreting old tools. Its
[application-design guide](https://dev.fitbit.com/build/reference/web-api/developer-guide/application-design/)
documents a Personal application type that can read the developer's own public and intraday data
without an intraday request. Client and Server applications need case-by-case approval to retrieve
other users' intraday activity, breathing-rate, heart-rate, HRV and SpO2 data. The same guide
documents a 150-request-per-user-per-hour limit.

## Data available

Google's current catalogue contains interval, sample, session, food and daily records. Strong
portable families include steps, distance, altitude, energy, heart rate, HRV, sleep stages,
respiratory rate, oxygen saturation, temperature, weight/body fat, ECG, irregular-rhythm
notifications, VO2 max, exercise, swim lengths, nutrition and hydration.

The [endpoint guide](https://developers.google.com/health/endpoints) shows source metadata such as
recording method, device display name and platform, and supports source families that distinguish
Google/Fitbit wearables from reconciled first- and third-party records. That provenance is useful
for deduplication and avoids assuming every value was captured directly by a wearable.

The API is not a raw device protocol. Google's catalogue says Fitbit devices communicate and sync
through the Fitbit mobile app before data becomes available to third parties. No documented route
was found for continuous accelerometer/gyroscope waveforms, internal algorithms, Sleep Score,
Readiness, Stress Management Score, badges or coaching narratives.

## Ecosystem integrations

| Destination or bridge | Direction | Confirmed payload and history | Material limits |
|---|---|---|---|
| Google Health API | Fitbit/Pixel Watch via Fitbit app → authorized application | Documented current health, activity, sleep, ECG, nutrition and metadata types; history back to retained records | App-visible derived-score parity is not documented |
| Health Connect | Health Connect → Google first-party source family is documented | Health Connect records may be reconciled with Google/Fitbit sources in API results | No live Fitbit-specific support page was found that proves a complete Fitbit → Health Connect export |
| Strava manual upload | Google/Fitbit exercise TCX → Strava | Individual exercise data accepted when the retrieved file is compatible | Manual and activity-only; no sleep, daily health or proprietary scores |
| TrainingPeaks manual upload | Google/Fitbit exercise file → TrainingPeaks | Individual compatible workout files | Manual and activity-only; exact Fitbit field preservation needs testing |
| Apple Health | Unknown | No current first-party Google/Fitbit route was documented in this pass | Third-party relay apps are outside this supported-route audit |
| Samsung Health | Unknown | Health Connect may permit overlapping records, but no direct route was established | Direction, backfill and provenance need hands-on validation |

The previous specialist draft cited a Fitbit Health Connect help URL that now returns `404`; that
stale link was removed rather than used to support a current Fitbit-to-Health-Connect claim.
Absence of a current page is recorded as **no documented route found**, not proof that a regional
or app-version-specific feature does not exist.

## Open-source routes

| Project | Route | Output | Assessment |
|---|---|---|---|
| [`Google-Health-API/google-health-cli`](https://github.com/Google-Health-API/google-health-cli) | OAuth client for Google Health API v4 | JSON plus schema, list, rollup, reconcile and TCX commands | Apache-2.0; purpose-built current CLI; tokens are stored locally in plaintext JSON with restrictive file modes |
| [`wysie/google-health-local-sync`](https://github.com/wysie/google-health-local-sync) | Google Health API OAuth and paginated local sync | Raw payloads in SQLite plus checkpoints and summaries | MIT; local-first and useful for backfill; young project with limited adoption |
| [`davidmosiah/google-health-mcp`](https://github.com/davidmosiah/google-health-mcp) | Local MCP wrapper over Google Health API | Structured agent tools and optional raw responses | MIT; actively developed beta; privacy modes transform returned data and must not be confused with a lossless archive |
| [`mountainash-io/fitbit-export`](https://github.com/mountainash-io/fitbit-export) | Legacy Fitbit Web API OAuth | JSON by family plus TCX exercise files | MIT; narrow transition utility tied to the legacy API and its future cutoff |

These tools simplify setup, pagination and storage; none expands the provider's permissions. Local
OAuth credentials, refresh tokens, SQLite databases, JSON, ECG and GPS files are sensitive. They
should be encrypted at rest, excluded from version control and isolated from hosted agent
workspaces unless the user deliberately authorizes that transfer.

The raw specialist report identified `orcasgit/python-fitbit` as MIT and current enough to shortlist.
Repository inspection instead found an Apache-2.0 licence file, no GitHub-detected SPDX licence and
a latest commit from 2019. It is therefore omitted from the recommended table rather than carrying
the stale licence and maintenance claim into the audit.

## Material barriers and risks

- **Cloud setup:** personal access is self-service but still requires a Cloud project, OAuth client,
  scope configuration and consent flow.
- **Scale gate:** more than 100 users requires a third-party security review; this is distinct from
  ordinary personal access.
- **Testing tokens:** refresh tokens for an OAuth client in Testing mode expire after seven days;
  production-mode setup is needed for durable unattended access.
- **Derived-output gaps:** several important Fitbit scores and narratives have no documented
  current API type.
- **Device and region variation:** ECG, irregular-rhythm notifications, SpO2, temperature and
  other records depend on compatible hardware, feature availability and jurisdiction.
- **Legacy transition:** Fitbit Web API clients require re-consent and migration to new identities,
  schemas and tokens.
- **Export uncertainty:** the account archive has no public exhaustive schema or incremental
  contract.
- **Local security:** open-source tools store OAuth credentials and highly sensitive health and
  location data under the user's control.

## Rubric snapshot

This snapshot follows the repository's [provider audit rubric](../../audit-rubric.md).

| Dimension | Google / Fitbit finding |
|---|---|
| Consumer effort | Medium for first OAuth setup; low once an automated sync is configured |
| Cost | No API fee documented for ordinary use; compatible hardware and optional subscriptions affect which records exist |
| Platform dependency | Cloud project and Google account required; device data reaches the API after Fitbit app synchronization |
| Data completeness | Broad documented catalogue, but no every-app-output parity statement |
| Granularity | Samples, intervals, sessions, daily values, reconciled streams and rollups |
| Historical depth | All retained history is queryable for supported types, with pagination and rollup windows |
| Automation | Strong: refresh tokens, pagination, reconciliation and webhooks |
| Formats | REST JSON, gRPC/protobuf, TCX for supported exercise retrieval and account archives |
| User authorization | Google OAuth with selectable read-only scopes and partial-consent handling |
| Developer access | Self-service for a personal/test app; security review beyond 100 users |
| Integrations | Strong API integration; current first-party destination documentation is sparse |
| Provenance | Explicit data source, platform, device, recording method and timestamp fields |
| Corrections and deletion | Create/update/delete exists for selected writable types; propagation to exports and downstream services remains unverified |
| Portability | Strong for documented API types; weaker for proprietary insights and export schema stability |
| Evidence quality | Strong current developer documentation; account export and ecosystem routes need hands-on checks |

## Provisional openness assessment

**Broad self-service access, incomplete first-party product parity.**

Google / Fitbit is substantially more programmable than a manual-export-only provider. A user can
build a supported recurring reader without commercial approval, and the current API explicitly
supports historical queries and provenance. The unresolved issue is scope: Google's catalogue is
detailed enough to identify important omissions rather than assume that every Fitbit display,
score and recommendation is portable. Those omissions keep the provider in the **Partial**
category.

## Evidence gaps

1. Authorize a new personal Cloud project and confirm all read-only scopes against a real migrated
   Fitbit account.
2. Compare every Google Health API data type with the Fitbit and Google Health app screens for the
   same account, especially Sleep Score, Readiness, Stress Management Score, cardio load, badges
   and coaching.
3. Request a fresh Google Health export and inventory every directory, schema, metric, timestamp,
   source identifier, deletion marker and date range.
4. Measure initial full-history pagination, webhook latency, update/delete notifications and
   correction propagation.
5. Test ECG waveform, irregular-rhythm, SpO2, temperature and route access across supported regions
   and devices.
6. Validate Health Connect directionality, historical backfill, duplicate handling and provenance
   in current Android and Fitbit/Google Health app versions.
7. Upload retrieved TCX exercises to Strava and TrainingPeaks and compare route, HR, elevation and
   sport fields.
8. Recheck the legacy Fitbit Web API cutoff and migration notices before relying on any Fitbit
   OAuth client.
9. Threat-model local token and health-data storage for each open-source route before production
   use.
