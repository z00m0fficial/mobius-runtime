import assert from "node:assert/strict";
import test from "node:test";
import { RuntimeTraceLog } from "../src/runtime-log.js";

test("runtime trace log records and returns loop events", () => {
  const log = new RuntimeTraceLog();

  log.record({
    loopId: "ML-TEST-001",
    level: "info",
    event: "brain.memory.search.started",
    message: "Brain started memory search."
  });

  log.record({
    loopId: "ML-TEST-001",
    level: "info",
    event: "brain.memory.search.completed",
    message: "Brain completed memory search."
  });

  const trace = log.getLoopTrace("ML-TEST-001");

  assert.equal(trace.length, 2);
  assert.equal(trace[0].event, "brain.memory.search.started");
});
