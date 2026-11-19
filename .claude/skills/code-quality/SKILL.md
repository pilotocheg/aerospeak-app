---
name: code-quality
description: AeroSpeak frontend code rules - where logic lives in Feature-Sliced Design, keeping components presentational, no duplication. Use before writing or changing any React component, hook or model code in src/, and when reviewing a diff before a commit or PR.
---

# Code quality in the AeroSpeak frontend

The project rules in `CLAUDE.md` (FSD layers, component and store conventions) still apply.
This skill adds how to split code inside them. Check the diff against every rule below
before calling the work done.

## 1. Components render, hooks decide

- A component in `ui/` takes data and callbacks and renders them. It does not compute
  domain state, choose what to play, or decide what happens after a request.
- Derived state ("which ATC transmission is in effect", "is this step done", "what the
  summary score is") lives in a hook or a pure function in the slice's `model/` (or `lib/`
  for pure helpers), with a name that says what it returns: `useActiveAtcTransmission`,
  `isStepDone`.
- Side effects (mutations, playing audio, toasts, navigation after a result) live in a
  hook in `model/` that returns handlers: `const { submit, isPending } = useSubmitAttempt()`.
  The component wires the handlers to buttons.
- A page or widget component that is mostly hooks and handlers with a short JSX tail is a
  sign the logic belongs in a `model/use-<widget>.ts` hook.
- Pure functions first: if logic needs no React, write a plain function and test it; the
  hook only connects it to state.

## 2. Say it once

- The same condition written twice (in a handler and in render) becomes one named value or
  function. Example: "readback missed a critical element and the step has a correction"
  is one `getAtcCorrection(step, result)`, used by both the render and the `onSuccess`.
- The same JSX block or class list in two places becomes a component or a `cva` variant.
- The same props passed down several levels: pass the object once, or move the hook down
  to where the data is used.
- Before adding a helper, search `src/shared/lib` and the entity's `model/` for an existing
  one.

## 3. Put it in the lowest layer that owns it

- Facts about a scenario step (does it have a correction, what is its ATC text) belong to
  `entities/scenario/model`. Facts about an attempt belong to `entities/attempt`.
  Practice-run state belongs to `features/practice-session`. The widget only composes.
- Never import upward or sideways between slices of the same layer; lift the shared part
  down instead.
- Each slice exports through its `index.ts`; import from the slice, not from its files.

## 4. Small, named, typed

- One exported hook, helper, utility or query per file, the file named after it; local
  unexported helpers that only serve that function may stay beside it (see `CLAUDE.md`).
- One reason to change per file. Split a component when it grows past roughly 150 lines
  or holds two unrelated pieces of state.
- Name booleans as questions (`isPlaying`, `hasCorrection`), handlers as `handle<Event>`
  inside components and as verbs in hooks (`retry`, `play`).
- No nested ternaries in JSX: compute the value above the return or use a lookup object.
- Comments say why, not what. Remove comments that restate the code.

## Before calling it done

1. Re-read the diff with the rules above and fix what breaks them.
2. Run the `simplify` skill on the diff.
3. `npm run check && npm run build`, then walk the changed flow in the browser.
4. When opening a PR, run the `code-review` skill on it (see `CLAUDE.md`, Skills).
