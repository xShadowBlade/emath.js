## Repository Notes

eMath.js is a TypeScript library for incremental games built on top of break_eternity.js. It focuses on game math, upgrades, currencies, save/load, and helper systems rather than on an app UI.

The main runtime entry points are:

- `src/index.ts` for the core math and utility exports.
- `src/game/index.ts` for the game/runtime modules such as managers and save handling.
- `src/presets/index.ts` for ready-made helper presets.

Keep changes aligned with those module boundaries. The package publishes three public entry points: `emath.js`, `emath.js/game`, and `emath.js/presets`.

When editing the library, prefer the source under `src/` and keep exports stable unless the user explicitly asks for an API change. The `documentation/` folder contains the docs site, and `examples/` contains usage samples.

## Validation

- Use `vp build` for library builds.
- Use `vp test` for the test suite.
- Use `vp lint src/**/*.ts` or `npm run lint` for linting.
- Use `npm run doc` when validating Typedoc output.

## Vite+

This project uses Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp test` and the narrowest relevant validation command for the touched area before broadening scope.
- [ ] Check whether `package.json` scripts or `vite.config.ts` tasks are the right validation entry point.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.
