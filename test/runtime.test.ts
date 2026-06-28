import assert from "node:assert/strict";
import test from "node:test";
import { MobiusRuntime } from "../src/runtime.js";

test("runtime starts a loop", () => {
  const runtime = new MobiusRuntime();
  const graph = runtime.start({
    organizationId: "mobius-technologies",
    actorId: "founder-michael-bell",
    goal: "Test runtime loop."
  });

  assert.equal(graph.context.status, "running");
  assert.equal(graph.steps.length, 10);
});

test("runtime completes a loop", () => {
  const runtime = new MobiusRuntime();
  let graph = runtime.start({
    organizationId: "mobius-technologies",
    actorId: "founder-michael-bell",
    goal: "Test complete loop."
  });

  for (const step of graph.steps) {
    graph = runtime.completeStep(graph.context.loopId, step.outputEvent);
  }

  assert.equal(graph.context.status, "completed");
});
