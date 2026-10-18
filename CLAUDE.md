# AeroSpeak frontend: notes for Claude and the team

AeroSpeak is a web app for practicing VFR radio phraseology in English (ICAO/EASA,
European market). The user hears a scripted ATC instruction, answers by voice and
gets instant feedback: score, transcript, matched/missed elements, tip, retry.
This repo is the React frontend. The NestJS backend lives in
`SergeyPoly/goit--apstone-project-AeroSpeak-BE` (deployed at
`https://aerospeak-be.onrender.com`, OpenAPI at `/api-json`, Swagger at `/docs`).

UX reference: ARSim (PlaneEnglish): lesson list, lesson details, practice screen with
the aerodrome chart, ATC/RES transcript toggles, Help and Feedback dialogs.

## Scope decisions (do not undo without the team)

- **MVP flow:** login → pick a scenario → practice (hear ATC if the step has it →
  record → feedback → retry) → finish the scenario.
- **Scoring and STT live only on the backend.** `POST /attempts` takes the recorded
  audio and returns the full feedback. The frontend never scores (dev fallback aside,
  see `src/shared/lib/local-scoring`).
- **No real auth yet.** The backend has no auth endpoints. Login/register screens are a
  local mock; under the hood every user practices as a backend guest (`POST /guests`).
- **Content for now:** one aircraft `SP-TFA` (Cessna 172), controlled aerodrome
  `EPPO` (Poznań-Ławica), uncontrolled aerodrome `EPPI` (Piła). UI and content are in
  English; team docs are in Ukrainian.
- **ATC audio** is pre-generated MP3 in `public/audio/atc/<scenarioId>/<stepId>.mp3`.
  No runtime TTS.
- Not in the MVP: welcome screen, Pro/locked scenarios, signup prompts, LLM ATC.

## Architecture (Feature-Sliced Design)

```
src/
  app/        app shell, providers, global styles
  routes/     TanStack Router file routes: thin, only wire a page component
  pages/      route-level screens
  widgets/    large composite blocks (practice panel, sidebar)
  features/   user actions (auth, record attempt, play ATC audio)
  entities/   domain models + queries (pack, scenario, guest, attempt)
  shared/     api client, ui kit (shadcn/base-ui), lib, config
content/      scenario JSON in the backend format (packs.json, scenarios/<pack>/*.json)
```

Imports go only downward: `pages → widgets → features → entities → shared`.

## Conventions

- Components: `export const Name = () => { ... }` (arrow functions), one component
  per file. A file that exports a component exports nothing else
  (`react-refresh/only-export-components` stays on, never disable it).
- `cva` variants go to a sibling `styles.ts`.
- shadcn components live in `src/shared/ui/<name>/` with one file per part and an
  `index.ts`. After `npx shadcn add`, split the generated file the same way and drop
  `"use client"`.
- Zustand: no `persist` unless the data must survive reload. Expose state through
  `selectors.ts` and `actions.ts` hooks, never call the store inline in components.
- Server state only through TanStack Query; query keys come from a factory per entity.
- API types are generated from the backend schema (`npm run api:types`), never
  written by hand.
- Forms: React Hook Form + zod.
- Phraseology: ICAO pronunciation in spoken text (niner, tree, fife, decimal); written
  values in digits (`runway 29`, `QNH 1013`, `118.505`).

## Commands

```bash
npm run dev            # http://localhost:5173
npm run api:types      # regenerate src/shared/api/schema.d.ts from the backend
npm run content:check  # validate content/ against the backend zod schema
npm run lint && npm run build
```

Before calling work done: `npm run lint && npm run build`, then walk the changed flow
in the browser. Work on a branch from `main`, open a PR, squash-merge.
Commit messages follow Conventional Commits.
