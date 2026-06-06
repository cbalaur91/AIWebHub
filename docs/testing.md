# Testing

This project uses [bun's built-in test runner](https://bun.sh/docs/cli/test). Pure
modules (e.g. `lib/*`) are exercised directly, without rendering a page.

## Running tests

```sh
bun test            # run the whole test suite
bun test smoke      # run only files matching "smoke"
bun run typecheck   # tsc --noEmit across the codebase
```

## Conventions

- Test files live in `tests/` (or alongside the module as `*.test.ts`). Bun
  discovers any file matching `*.test.ts` / `*.spec.ts`.
- Import test primitives from `bun:test`:

  ```ts
  import { describe, expect, test } from "bun:test";
  ```

- Types for `bun:test` come from the `@types/bun` dev dependency, so test files
  type-check under `bun run typecheck`.
