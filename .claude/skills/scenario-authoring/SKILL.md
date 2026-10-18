---
name: scenario-authoring
description: Write or edit AeroSpeak practice scenarios in content/ (backend JSON format). Use when adding a scenario, adding or fixing steps, required/critical elements, accepted variants, briefing or phraseology notes.
---

# Authoring AeroSpeak scenarios

Scenarios live in `content/scenarios/<packId>/<name>.json`, packs in `content/packs.json`.
The format is exactly the backend one (`src/scenarios/scenario.schema.ts` in the backend
repo), mirrored in `scripts/content-schema.ts`, so files can be copied to the backend as is.

## Fixed world

- Aircraft: `SP-TFA`, Cessna 172, spoken "Sierra Papa Tango Foxtrot Alpha".
  After first contact ATC may abbreviate to `SP-FA` ("Sierra Foxtrot Alpha") — accept both
  in callsign variants once the abbreviation is used.
- Controlled: `EPPO` Poznań-Ławica. Uncontrolled: `EPPI` Piła.
- Aerodrome facts (runways, taxiways, frequencies, reporting points) come only from
  `content/aerodromes.md`. If a fact you need is not there, stop and ask the user —
  never invent frequencies or taxiways.

## Rules for each step

1. `prompt` tells the pilot the situation and what to say, without giving the phrase.
2. `atcText` is required for `pilot_readback` and `atc_instruction` steps; set `atcAudio`
   to `/audio/atc/<scenarioId>/<stepId>.mp3` and run the `atc-audio` skill.
3. `expectedPilotResponse` follows ICAO order: readbacks put the callsign last;
   initial calls start with station, then callsign.
4. `requiredElements` cover every safety item of the phrase; weights sum to 100.
   Mark `critical: true` and list in `criticalElements`: runway, hold short, cleared
   for take-off / to land, frequency, QNH, squawk, altitude, reporting point, and the
   callsign in a readback.
5. `acceptedVariants` hold realistic alternatives a pilot may say ("hold short runway 29",
   "holding short runway 29"). Numbers may be written as digits; the backend
   normalizer turns "two niner" into "29".
6. Every `expectedPilotResponse` must score 100 against its own elements: each element
   needs a variant contained in the expected phrase.

## Per scenario

- `briefing`: Airport, ATC unit / frequency, Callsign, Aircraft, Position, ATIS/QNH,
  Runway, Intention — what applies.
- `phraseologyNote`: one concept the scenario teaches, with an example and why it matters.
- 2–5 steps that tell a short story in order (request → instruction → readback → report).

## After editing

Run `npm run content:check`. Fix every error it lists before finishing.
