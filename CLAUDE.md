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

- **MVP flow:** login → pick a scenario → practice (ATC call plays automatically →
  tap the mic or Space to start/stop recording → feedback → retry) → finish the scenario.
  The next step unlocks after one scored attempt. Recordings: 1 s minimum, 2 min maximum.
- **Routes:** `/` landing placeholder, `/lessons` training plan (section cards),
  `/lessons/:sectionId` packs and scenario details, `/practice/:scenarioId` practice.
  Everything under `/_app` requires login.
- **Scoring and STT live only on the backend.** `POST /attempts` takes the recorded
  audio and returns the full feedback. The frontend never scores.
- **Scenarios live in the backend repo** (`content/` there) and come from `GET /packs` and
  `GET /scenarios/:id`. Write or edit scenarios in the backend repo. This repo keeps only
  the UI side: `src/shared/content/sections.json` and the ATC audio.
- **Auth is Firebase Authentication.** The frontend signs in with the Firebase JS SDK and
  sends `Authorization: Bearer <ID token>`; the backend only verifies the token. There is
  no guest mode: practice needs a profile with accepted terms (`POST /me`).
- **Content for now:** controlled aerodrome `EPPO` (Poznań-Ławica), uncontrolled aerodrome
  `EPPI` (Piła), four aircraft and four weather presets (backend `content/`). UI and content
  are in English; team docs are in Ukrainian.
- **Scenario variants.** The backend renders each scenario for several variants (aerodrome,
  weather and runway in use, aircraft). The scenario page picks one at random per visit
  (`ScenarioDto.variants`), practice gets it as `?variant=` and sends it with every attempt.
  Without a variant the backend uses the default one.
- **ATC audio** is pre-generated MP3 in `public/audio/atc/<hash of atcText>.mp3`, one file
  per distinct transmission of any variant, stitched from clips (callsign, station or
  "negative, I say again", body, wind; see `scripts/generate-atc-audio.ts`). No runtime TTS.
- **ATC corrects a wrong readback.** When a readback attempt misses a critical element, the
  feedback shows ATC's `atcCorrection` ("<callsign>, negative, I say again, …") and plays it
  right away, and it becomes the step's ATC transmission until a readback without
  a critical miss. The next step still unlocks after any scored attempt.
- Not in the MVP: welcome screen, Pro/locked scenarios, signup prompts, LLM ATC.

## Architecture (Feature-Sliced Design)

```
src/
  app/        app shell, providers, global styles
  routes/     TanStack Router file routes: thin, only wire a page component
  pages/      route-level screens
  widgets/    large composite blocks (practice panel, sidebar)
  features/   user actions (auth, record attempt, play ATC audio)
  entities/   domain models + queries (scenario, section, aerodrome, user, attempt, progress)
  shared/     api client, ui kit (shadcn/base-ui), lib, config, content (sections)
scripts/      content:check, audio:atc and api:types; they read scenarios from the API
```

`src/shared/content/sections.json` groups backend packs into Basics, Traffic Pattern,
VFR — Uncontrolled, VFR — Controlled, IFR (soon); every pack must be in exactly one
section (`npm run content:check`). A step's optional `visual` comes from the backend and
follows where the aircraft is: `{ kind: 'text', text, caption? }` (drills),
`{ kind: 'airspace', point, direction }` (aerodrome airspace: VFR chart from the AIP, data in
`src/entities/aerodrome/model/airspace/`), `{ kind: 'pattern', side, position, runway }`
(in, joining or leaving the circuit). Without `visual` the aircraft is on the ground and the
practice screen shows the aerodrome ground chart. En route charts are not drawn yet.

Imports go only downward: `pages → widgets → features → entities → shared`.

## Conventions

- Components: `export const Name = () => { ... }` (arrow functions), one component
  per file. A file that exports a component exports nothing else
  (`react-refresh/only-export-components` stays on, never disable it).
- One hook, helper, utility or query per file, named after it (`use-atc-playback.ts`,
  `get-atc-transmission.ts`). The only exception is a local, unexported hook or helper
  that only serves the file's main function. Types it takes or returns may live with it.
- `cva` variants go to a sibling `styles.ts`.
- shadcn components live in `src/shared/ui/<name>/` with one file per part and an
  `index.ts`. After `npx shadcn add`, split the generated file the same way and drop
  `"use client"`.
- Every `src/shared/ui` component has a sibling `<name>.stories.tsx` that imports from
  `./index`. Variant option lists are typed with `satisfies` against the component props.
- Zustand: no `persist` unless the data must survive reload. Expose state through
  `selectors.ts` and `actions.ts` hooks, never call the store inline in components.
- Server state only through TanStack Query; query keys come from a factory per entity.
- API types are generated from the backend schema (`npm run api:types`), never
  written by hand.
- Forms: React Hook Form + zod.
- Imports have no file extension (`./config`, not `./config.ts`) unless the import does not
  resolve without it.
- Readability over compactness: name intermediate values, name the function a hook returns
  before returning it, destructure instead of chained property access (`a.b.c`), and group
  related files of a segment in subfolders (`model/form/`, `lib/math/`). Details in the
  `code-quality` skill, section 5.
- Memoization: the React Compiler (`reactCompilerPreset` in `vite.config.ts`) already memoizes
  components, JSX and derived values. Do not add `memo`, `useMemo` or `useCallback` by default;
  add one only where the React Profiler shows a re-render the compiler does not prevent, with a
  comment saying why.
- Phraseology: ICAO pronunciation in spoken text (niner, tree, fife, decimal); written
  values in digits (`runway 29`, `QNH 1013`, `118.505`).

## Skills (use them by default)

All skills live in `.claude/skills/`, so every Claude Code session in this repository has them
without installing plugins. Besides the project skills (`code-quality`, `api-sync`, `atc-audio`),
the folder holds MIT-licensed skills copied from the `lattice` and `audit-suite` plugins (versions,
sources and licenses in `.claude/skills/THIRD_PARTY_SKILLS.md`). `simplify` and `code-review` are
built into Claude Code.

| When | Skills |
| --- | --- |
| Writing or changing code in `src/` | `code-quality`, `clean-code`, `vercel-react-best-practices` |
| Refactoring existing code | `refactor-safely`, then `code-quality` |
| Designing a new feature or slice | `architecture` (FSD placement, data flow) |
| Writing tests | `test-quality` |
| Before committing | `simplify` on the diff |
| Opening a PR | `code-review` on the PR, fix what it finds before asking for review |
| App-wide audit | `audit-as-frontend-eng`, `audit-as-structural-eng`, `audit-as-a11y-eng` |
| Scenario or API changes | `atc-audio`, `api-sync` |

The audit-suite lenses were written for another repository layout: apply their checklists to
this one.

## Commands

```bash
npm run dev            # http://localhost:5173
npm run api:types      # regenerate src/shared/api/schema.d.ts from the backend
npm run content:check  # sections.json covers every backend pack, ATC audio exists for every variant
npm run audio:atc      # generate missing placeholder ATC audio for every variant (macOS say + ffmpeg)
npm run lint && npm run build   # the route tree is regenerated by the Vite plugin (no tsr CLI)
npm run typecheck      # tsc -b
npm run format:check   # prettier --check (npm run format fixes)
npm run check          # lint + format:check + typecheck + test:stories (what CI runs, plus build)
npm run storybook      # http://localhost:6006, shared/ui stories (dark theme by default)
npm run storybook:build
npm run test:stories   # every story renders + a11y check in headless Chromium (vitest.config.ts)
```

`test:stories` needs the Playwright browser once: `npx playwright install chromium`.

**Pre-commit (husky + lint-staged):** staged files get `eslint --fix` and `prettier --write`,
then the whole project runs `typecheck` and `test:stories`. Hooks install on `npm install`
(`prepare`). Do not skip them with `--no-verify`.

**CI:** GitHub Actions (`.github/workflows/ci.yml`) on every PR and push to `main`: lint,
format:check, typecheck, test:stories, build. Vercel deploys separately through its Git
integration (Vercel CI does not support public repos). `content:check` is not in CI because it
calls the backend.

Scripts and the dev proxy use `VITE_API_URL` (production by default). To work with
scenarios that are not deployed yet, run the backend locally and start the frontend
with `VITE_API_URL=http://localhost:3000`.

Before calling work done: `npm run lint && npm run build`, then walk the changed flow
in the browser. Work on a branch from `main`, open a PR, squash-merge.
Commit messages follow Conventional Commits.
