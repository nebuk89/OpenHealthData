# Provider audit rubric

Every provider audit uses the same dimensions so evidence can be compared without turning early,
incomplete research into a misleading league table.

| Dimension | What to establish |
|---|---|
| Consumer effort | Steps, technical skill and time required for a person to retrieve their data |
| Cost | Required device, subscription, developer membership, paid tool or partner agreement |
| Platform dependency | Required hardware, operating system, mobile app, region or cloud account |
| Data completeness | Which collected raw, normalized and derived records are available or omitted |
| Granularity | Summary, sample, series, route, event or raw-sensor resolution |
| Historical depth | Retrospective window, retention rules, backfill and deletion behavior |
| Automation | One-off manual export, scheduled export, local SDK, webhook or cloud API |
| Formats | Documented machine-readable formats, schemas, versioning and provenance |
| User authorization | Consent model, scopes, revocation and whether denial is observable |
| Developer access | Self-service registration, review, commercial approval, quotas and terms |
| Integrations | Direction, data types, backfill, relay restrictions and lossy transformations |
| Provenance | Source/device attribution, identifiers, metadata and deduplication support |
| Corrections and deletion | Whether edits and deletions propagate to exports and connected services |
| Portability | Ability to reuse the result without the original provider or proprietary software |
| Evidence quality | Primary-source coverage, link health, access date and hands-on validation gaps |

## Mandatory openness comparison

Every provider audit must answer the same practical question: **can an ordinary account holder
programmatically retrieve everything the provider shows or derives about them?** Rate the
user-controlled route, not the richest interface available only to approved commercial partners.

Use this exact table in every audit:

| Openness test | Result | Required finding |
|---|---|---|
| App-to-interface parity | Yes / Partial / No / Unknown | Whether every app-visible collected and derived record is available through official interfaces |
| Self-service developer access | Yes / Partial / No / Unknown | Whether an ordinary user can register and build without commercial approval |
| Official automation | Yes / Partial / No / Unknown | Whether recurring retrieval is supported without scraping or repeated manual exports |
| Complete history | Yes / Partial / No / Unknown | Whether full retained history is documented and retrievable |
| Raw and derived data coverage | Yes / Partial / No / Unknown | Whether samples, metadata and proprietary scores are included, not only summaries |
| **Overall personal-data openness** | **Open / Mostly open / Partial / Restricted / Closed / Unknown** | The categorical verdict for an ordinary account holder |

Overall ratings mean:

- **Open:** Complete, documented, self-service and automatable official access.
- **Mostly open:** Self-service official automation with narrow, documented omissions.
- **Partial:** Substantial access exists, but it is incomplete, manual or platform-dependent.
- **Restricted:** Useful consumer exports exist, but programmable access is partner-gated or
  unsupported.
- **Closed:** No meaningful machine-readable route is available to an ordinary account holder.
- **Unknown:** Evidence is insufficient to rate the provider responsibly.

## Publication states

- **Generated:** The research swarm and synthesis completed, but automated evidence checks have
  not passed.
- **Verified:** Required documents, claim ledger, links and declared GitHub project licences
  passed the automated quality gate.
- **Reviewed:** A human has reviewed the verified package and explicitly approved it.

Numeric scores are intentionally deferred until enough providers have verified audits to
calibrate fair thresholds. The categorical openness rating above is required now because it
directly answers whether people can build against all of their own product-visible data.

## Scope boundary

The first research pass covers official provider access, supported ecosystem integrations and
open-source retrieval projects. Closed-source third-party export applications may be noted as an
evidence gap, but they are not endorsed or assessed unless a later workstream explicitly examines
their cost, privacy, automation and output formats.
