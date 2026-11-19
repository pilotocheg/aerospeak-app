---
name: atc-audio
description: Generate or regenerate the ATC MP3 files for scenario steps (public/audio/atc). Use after a scenario with atcText was added or changed in the backend repo, or when an atcAudio file is missing.
---

# ATC audio

Scenarios live in the backend repo; the audio lives here. A scenario has several variants
(aerodrome, weather, aircraft), and every distinct `atcText` of any variant needs
`public/audio/atc/<hash>.mp3`: the backend sets `atcAudio` to
`/audio/atc/<sha256 of atcText, 16 hex>.mp3`. The script reads every variant through
`GET /scenarios/:id/variants`.

## Stitched transmissions

A transmission is built from clips: the callsign at the start (`SP-TFA, ...`), the body and
the wind at the end (`..., wind 270 degrees 10 knots.`), with the station name (`Poznań Tower`)
as a clip of its own after the callsign. A readback correction
(`atcCorrection`, "SP-TFA, negative, I say again, taxi to ...") also gets
`negative, I say again` as a clip of its own, so it reuses the body clip of the clearance. Each clip is spoken once and cached
in `node_modules/.cache/atc-audio/<voice>/`; ffmpeg joins the clips with a short pause and
puts the radio effect over the whole file, so the joins sit under the same hiss. Variants
share the callsign, station and wind clips, so only the bodies are new: 68 clips (3,300
spoken characters) for 312 files including corrections, instead of about 30,000 characters
for every text spoken whole. The
script prints these numbers; they are what a paid voice is charged for.

## Placeholder voices (current)

`npm run audio:atc` runs `scripts/generate-atc-audio.ts`: it reads scenarios from the
API (`VITE_API_URL`, production by default), then macOS `say` → AIFF → `ffmpeg`
band-pass (300–3400 Hz) + light noise → MP3. It only creates missing files; pass
`--force` to rebuild placeholders, and deletes placeholders no variant uses any more.
Requires macOS and `ffmpeg` (`brew install ffmpeg`).

For a scenario that is not deployed yet, run the backend locally from its branch and
use `VITE_API_URL=http://localhost:3000 npm run audio:atc`.

Spoken text is not the raw `atcText`: the script converts it to ICAO speech with
`toSpoken()` (`src/shared/lib/phraseology`) by ICAO Doc 9432 2.4 (Polish edition, our source
of truth), the same rules the backend scores against: digits one by one with "tree", "fife",
"niner", "decimal"; whole hundreds/thousands for altitude ("two thousand fife hundred feet");
flight levels without a leading zero (FL 65 "six fife"); squawk/QNH in whole thousands
("seven thousand"); frequencies with four figures when the last two are zeros; NATO letters
for `SP-TFA`. When a phrase sounds wrong, extend `toSpoken()`, not the content.

After changing `toSpoken()`, regenerate only the files whose spoken text changed:
delete them and run `npm run audio:atc` (it creates missing files only).

After generating, run `npm run content:check`: it warns about missing audio files
and audio files no scenario step uses.

## Final voices

The team will replace placeholders with ElevenLabs / OpenAI TTS files of the same
names. Never overwrite a file that is not a placeholder: placeholders are listed in
`public/audio/atc/placeholders.json`.
