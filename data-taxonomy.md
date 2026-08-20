# Canonical health and fitness data taxonomy

This taxonomy is the cross-provider checklist for OpenHealthData audits. It prevents a provider's
terminology or documentation structure from deciding which data gets examined.

The taxonomy is intentionally broad. A family groups measurements that answer the same comparison
question while retaining provider-specific names in each provider's `coverage.json`. New families
require a taxonomy version change; new aliases or examples do not.

The machine-readable source of truth is [`data-taxonomy.json`](./data-taxonomy.json).

## Coverage model

Each provider maps every canonical ID and records:

- **Presence:** `present`, `absent`, `not-applicable` or `unknown`.
- **App visibility:** `yes`, `partial`, `no` or `unknown`.
- **Production layers:** one or more of `captured`, `normalized`, `derived`, `user-entered` and
  `external`.
- **Route coverage:** `A` available, `P` partial/conditional/lossy, `N` not available, `U` unknown
  or `NA` not applicable.
- **Route kind:** `consumer-export`, `official-api`, `official-mcp`, `official-sdk`, `integration`,
  `open-source` or `unofficial`.
- **Route access:** `self-service`, `partner-gated`, `research-gated`, `unsupported` or `unknown`.
- **Provider names:** the provider's own labels, such as Garmin Body Battery or Apple Training
  Load. An alias does not imply that two providers calculate equivalent values.

`Absent` requires affirmative evidence or a clearly incompatible product design. Use `unknown`
when no documented feature or route was found. A provider can have a `present` family whose route
coverage is entirely `U`: the app output exists, but extraction has not been established.

## Canonical families

| Stable ID | Domain | Canonical family | Representative data and outputs | Expected layers |
|---|---|---|---|---|
| `body.composition` | Body | Body measurements and composition | Height, weight, BMI, body fat, lean/muscle/bone mass, body water | User-entered, external, normalized |
| `activity.daily` | Activity | Daily movement | Steps, distance, floors/elevation, stand time and movement events | Captured, normalized, derived |
| `activity.energy` | Activity | Energy and active time | Active/resting calories, exercise minutes, intensity minutes and activity goals | Normalized, derived |
| `cardio.heart-rate` | Cardiovascular | Heart rate | Continuous, resting, walking and workout HR; zones and recovery HR | Captured, normalized, derived |
| `cardio.hrv` | Cardiovascular | Heart-rate variability | Beat timing, SDNN/RMSSD, overnight baseline, trend and status | Captured, normalized, derived |
| `cardio.blood-pressure` | Cardiovascular | Blood pressure | Systolic/diastolic readings and summaries | Captured, user-entered, external |
| `cardio.ecg-rhythm` | Cardiovascular | ECG and rhythm | ECG waveform, classification, irregular rhythm and rate alerts | Captured, derived |
| `cardio.vo2max` | Cardiovascular | Cardio fitness and VO2 max | VO2 max estimate, fitness level/classification and trend | Derived |
| `respiratory.rate-oxygen` | Respiratory | Respiration and oxygen saturation | Respiratory rate, SpO2, breathing disturbances and oxygen trends | Captured, normalized, derived |
| `temperature.body-skin` | Vitals | Body and skin temperature | Point readings, overnight wrist/skin temperature and baseline deviation | Captured, normalized, derived |
| `sleep.sessions-stages` | Sleep | Sleep sessions and stages | Bed/wake times, duration, awake/light/core/deep/REM stages and naps | Captured, normalized, derived |
| `sleep.insights-score` | Sleep | Sleep insights and score | Sleep score, quality, coaching, schedule, goal, consistency and trends | User-entered, derived |
| `recovery.stress` | Recovery | Stress | All-day stress, stress events, trends and relaxation/breathing response | Derived |
| `recovery.energy-readiness` | Recovery | Energy and readiness | Body energy, readiness/recovery score, charge/drain and daily guidance | Derived |
| `training.load-status` | Training | Training load and status | Acute/chronic load, load focus, status, effort and training effect | Derived |
| `training.performance-predictions` | Training | Performance predictions | Race predictions, performance condition, endurance/hill score and fitness age | Derived |
| `workout.sessions` | Workout | Workout sessions | Sport, start/end, duration, laps, energy, distance and linked samples | Captured, normalized |
| `workout.route-elevation` | Workout | Route and elevation | GPS track, course, altitude/elevation, pace and speed series | Captured, normalized |
| `workout.sport-dynamics` | Workout | Sport dynamics | Power, cadence, stride, running dynamics, strokes and SWOLF | Captured, normalized, derived |
| `workout.plans-courses` | Workout | Plans, workouts and courses | Structured workout steps, targets, training plans and navigation courses | User-entered, external |
| `mobility.gait-function` | Mobility | Gait and functional mobility | Walking speed, step length, asymmetry, steadiness, stair speed and walk tests | Captured, normalized, derived |
| `reproductive.cycle-pregnancy` | Reproductive | Cycle and pregnancy | Cycle logs, symptoms, fertile-window/ovulation estimates, pregnancy and lactation | User-entered, derived |
| `nutrition.hydration` | Nutrition | Nutrition and hydration | Food, calories, macro/micronutrients, caffeine and water | User-entered, external |
| `clinical.records-medications` | Clinical | Clinical records and medications | Conditions, allergies, labs, procedures, immunizations, prescriptions and FHIR records | User-entered, external |
| `wellbeing.mindfulness-mood` | Wellbeing | Mindfulness, mood and symptoms | Mindful time, breathwork, mood/emotion, state of mind and symptom logs | User-entered, derived |
| `hearing.audio-audiogram` | Hearing | Hearing and audio exposure | Environmental/headphone exposure, audiograms and hearing-test results | Captured, external, normalized |
| `insights.trends-alerts-awards` | Insights | Trends, alerts and awards | Baselines, outlier/risk notifications, narrative trends, achievements and badges | Derived |
| `device.raw-sensors` | Device | Raw and live sensor streams | Accelerometer, gyroscope, ambient sensors and real-time physiological streams | Captured |
| `provenance.metadata` | Provenance | Source and record metadata | Record IDs, timestamps, device/sensor, firmware, source app and deletion/edit markers | Captured, normalized |

## Evolution rules

1. Provider audits must include every stable ID exactly once in `coverage.json`.
2. A family should split only when providers expose materially different access or meaning for its
   components. Raw/normalized values and proprietary interpretations should not share one family
   when that would hide a portability gap.
3. Provider-specific metrics stay as aliases until evidence shows a genuinely new cross-provider
   family.
4. Coverage changes do not change the taxonomy version. Adding, removing or redefining a stable ID
   requires a semantic taxonomy-version update and migration of every verified provider.
5. The Markdown audit remains the evidence-backed narrative; `coverage.json` is the normalized
   comparison layer, not a substitute for citations.
