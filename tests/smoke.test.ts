import { describe, expect, test } from "bun:test";

// Smoke test: proves the bun test runner + tsc typecheck wiring works
// end-to-end. Real unit tests for pure lib/* modules land in issues 002–005.
describe("test harness", () => {
  test("bun test runner is wired up", () => {
    expect(1 + 1).toBe(2);
  });
});
