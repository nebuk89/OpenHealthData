# OpenHealthData
Our goal is to audit how open different health data trackers (Garmin, Apple, Fitbit/Google. etc) are in regards to giving you API or 'easy' access to your own data vs having to do a GDPR requested export

## Research

- [Fitness data provider landscape](fitness-data-providers.md) - the initial 20-provider audit list
- [Provider audits](providers/README.md) - completed provider write-ups and resource indexes
- [Provider audit rubric](audit-rubric.md) - normalized evidence dimensions and publication states

### Copilot research agents

The repository contains three custom agents under `.github/agents/`:

- `open-health-api-docs` researches official APIs, SDKs, and account exports.
- `open-health-open-source` researches community projects that retrieve user data.
- `open-health-integrations` researches supported data flows into other health and fitness
  services.

Copilot CLI discovers these profiles automatically when it runs from this repository. Invoke one
directly with:

```bash
copilot --agent=open-health-api-docs --prompt "Research Apple and Garmin"
```

The research harness works through the provider list from the top down. For each run it selects
one provider, loads the same three profiles through the GitHub Copilot SDK, runs their research
workstreams concurrently, and synthesizes:

- `providers/<provider>/README.md` - the canonical provider audit;
- `providers/<provider>/resources.md` - a deduplicated evidence and project index;
- `providers/<provider>/claims.json` - decision-relevant claims with evidence and confidence;
- `providers/<provider>/verification.json` and `manifest.json` - automated evidence checks and
  publication state; and
- `research/runs/<timestamp>/<provider>/` - ignored raw specialist reports for debugging.

```bash
npm install
npm run research:list
npm run research:status
npm run research:smoke
npm run research
npm run research -- --provider Garmin
npm run research:verify -- --provider Apple
npm run research:review -- --provider Apple
```

With no `--provider`, the harness selects the first provider without a verified audit. An
explicit provider reruns or targets that provider regardless of list position. Set
`COPILOT_MODEL` to override the default model or `COPILOT_TIMEOUT_MS` to change the per-agent
timeout. Generated packages are staged, checked for required sections, claim/source coverage,
dead links, repository existence and GitHub licence mismatches, then atomically published as
`verified`. `research:review` is the explicit human approval step.
