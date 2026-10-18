# AeroSpeak — web

VFR radio phraseology trainer: hear ATC, answer by voice, get instant feedback, retry.
React + Vite + TanStack Router/Query + Zustand + shadcn/ui (Base UI). Scoring and STT live in the
[backend](https://github.com/SergeyPoly/goit--apstone-project-AeroSpeak-BE).

```bash
npm install
npm run dev            # http://localhost:5173, /api is proxied to the backend
npm run content:check  # validate content/ (backend format)
npm run audio:atc      # generate placeholder ATC audio (macOS say + ffmpeg)
npm run api:types      # regenerate API types from the backend OpenAPI schema
```

- Scenarios: `content/scenarios/<pack>/*.json`, aerodrome facts and open questions in
  `content/aerodromes.md`.
- Scenarios not deployed to the backend yet are scored locally in dev (Chrome Web Speech API
  + a copy of the backend engine). Production always uses the backend.
- Team conventions: see [CLAUDE.md](CLAUDE.md).
