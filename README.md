# OpenHealthData
Our goal is to audit how open different health data trackers (Garmin, Apple, Fitbit/Google. etc) are in regards to giving you API or 'easy' access to your own data vs having to do a GDPR requested export

## Research

- [Fitness data provider landscape](fitness-data-providers.md) - the initial 20-provider audit list

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

The research harness loads the same profiles through the GitHub Copilot SDK and runs all three
workstreams concurrently:

```bash
npm install
npm run research:list
npm run research:smoke
npm run research -- --providers "Apple,Garmin"
npm run research
```

Full runs write separate Markdown reports to a timestamped directory under `research/runs/`.
Set `COPILOT_MODEL` to override the default model or `COPILOT_TIMEOUT_MS` to change the
per-agent timeout.
