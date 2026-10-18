---
name: atc-audio
description: Generate or regenerate the ATC MP3 files for scenario steps (public/audio/atc). Use after adding or changing atcText in content/, or when an atcAudio file is missing.
---

# ATC audio

Every step with `atcText` needs `public/audio/atc/<scenarioId>/<stepId>.mp3`, and the
step's `atcAudio` must be `/audio/atc/<scenarioId>/<stepId>.mp3`.

## Placeholder voices (current)

`npm run audio:atc` runs `scripts/generate-atc-audio.ts`: macOS `say` → AIFF →
`ffmpeg` band-pass (300–3400 Hz) + light noise → MP3. It only creates missing files;
pass `--force` to rebuild all. Requires macOS and `ffmpeg` (`brew install ffmpeg`).

Spoken text is not the raw `atcText`: the script converts it to ICAO speech
(digits one by one, "niner", "decimal", NATO letters for `SP-TFA`). When a phrase
sounds wrong, extend `toSpokenAtc()` in the script, not the content.

## Final voices

The team will replace placeholders with ElevenLabs / OpenAI TTS files of the same
names. Never overwrite a file that is not a placeholder: placeholders are listed in
`public/audio/atc/placeholders.json`.
