import { createExecutionGraph, createRuntimeContext, markStep } from "./graph.js";
import { checkConstitution } from "./policy.js";
import { InMemoryStateStore } from "./state-store.js";
import type { ExecutionGraph } from "./types.js";

export class MobiusRuntime {
  constructor(private readonly stateStore = new InMemoryStateStore()) {}

  start(input: {
    organizationId: string;
    actorId: string;
    goal: string;
    priority?: "low" | "medium" | "high";
  }): ExecutionGraph {
    const context = createRuntimeContext(input);
    const constitution = checkConstitution(context);

    if (!constitution.allowed) {
      throw new Error("Runtime request failed constitutional check: " + constitution.reasons.join(", "));
    }

    const graph = createExecutionGraph({ ...context, status: "running" });
    return this.stateStore.save(graph);
  }

  completeStep(loopId: string, outputEvent: string): ExecutionGraph {
    const graph = this.stateStore.get(loopId);

    if (!graph) {
      throw new Error("Loop not found: " + loopId);
    }

    const updated = markStep(graph, outputEvent, "completed");
    const allComplete = updated.steps.every((step) => step.status === "completed");

    return this.stateStore.save({
      ...updated,
      context: {
        ...updated.context,
        status: allComplete ? "completed" : "running",
        updatedAt: new Date().toISOString()
      }
    });
  }

  get(loopId: string): ExecutionGraph | undefined {
    return this.stateStore.get(loopId);
  }

  list(): ExecutionGraph[] {
    return this.stateStore.list();
  }
}
