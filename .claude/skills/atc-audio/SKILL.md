---
name: atc-audio
description: Generate or regenerate the ATC MP3 files for scenario steps (public/audio/atc). Use after a scenario with atcText was added or changed in the backend repo, or when an atcAudio file is missing.
---

# ATC audio

Scenarios live in the backend repo; the audio lives here. Every step with `atcText`
needs `public/audio/atc/<scenarioId>/<stepId>.mp3`, and the backend checks that the
step's `atcAudio` is `/audio/atc/<scenarioId>/<stepId>.mp3`.

## Placeholder voices (current)

`npm run audio:atc` runs `scripts/generate-atc-audio.ts`: it reads scenarios from the
API (`VITE_API_URL`, production by default), then macOS `say` → AIFF → `ffmpeg`
band-pass (300–3400 Hz) + light noise → MP3. It only creates missing files; pass
`--force` to rebuild placeholders. Requires macOS and `ffmpeg` (`brew install ffmpeg`).

For a scenario that is not deployed yet, run the backend locally from its branch and
use `VITE_API_URL=http://localhost:3000 npm run audio:atc`.

Spoken text is not the raw `atcText`: the script converts it to ICAO speech with
`toSpoken()` (`src/shared/lib/phraseology`) by UK CAA CAP 413 chapter 2, the same rules
the backend scores against: digits one by one with "tree", "fife", "niner", "decimal";
whole hundreds/thousands for altitude ("two thousand fife hundred feet"); FL with three
digits; squawk/QNH in whole thousands ("seven thousand"); frequencies with four figures
when the last two are zeros; NATO letters for `SP-TFA`. When a phrase sounds wrong,
extend `toSpoken()`, not the content.

After changing `toSpoken()`, regenerate only the files whose spoken text changed:
delete them and run `npm run audio:atc` (it creates missing files only).

After generating, run `npm run content:check`: it warns about missing audio files
and audio folders without a scenario.

## Final voices

The team will replace placeholders with ElevenLabs / OpenAI TTS files of the same
names. Never overwrite a file that is not a placeholder: placeholders are listed in
`public/audio/atc/placeholders.json`.
