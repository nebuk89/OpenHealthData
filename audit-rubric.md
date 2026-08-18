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

## Publication states

- **Generated:** The research swarm and synthesis completed, but automated evidence checks have
  not passed.
- **Verified:** Required documents, claim ledger, links and declared GitHub project licences
  passed the automated quality gate.
- **Reviewed:** A human has reviewed the verified package and explicitly approved it.

Scores are intentionally deferred until enough providers have verified audits to calibrate fair
thresholds. Until then, audits use dimension-level findings and a qualified provisional
assessment.

## Scope boundary

The first research pass covers official provider access, supported ecosystem integrations and
open-source retrieval projects. Closed-source third-party export applications may be noted as an
evidence gap, but they are not endorsed or assessed unless a later workstream explicitly examines
their cost, privacy, automation and output formats.
