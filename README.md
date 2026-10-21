# AeroSpeak — web

VFR radio phraseology trainer: hear ATC, answer by voice, get instant feedback, retry.
React + Vite + TanStack Router/Query + Zustand + shadcn/ui (Base UI). Scenarios, scoring and STT
live in the [backend](https://github.com/SergeyPoly/goit--apstone-project-AeroSpeak-BE).

```bash
npm install
npm run dev            # http://localhost:5173, /api is proxied to the backend
npm run content:check  # every backend pack is in sections.json, ATC audio files exist
npm run audio:atc      # generate placeholder ATC audio (macOS say + ffmpeg)
npm run api:types      # regenerate API types from the backend OpenAPI schema
```

- Scenarios are written in the backend repo (`content/`, with aerodrome facts in
  `content/aerodromes.md`). This repo keeps the grouping of packs into sections
  (`src/shared/content/sections.json`) and the ATC audio (`public/audio/atc/`).
- The dev server and scripts use `VITE_API_URL`, production by default. For scenarios that are
  not deployed yet, run the backend locally and set `VITE_API_URL=http://localhost:3000`.
- Team conventions: see [CLAUDE.md](CLAUDE.md).
