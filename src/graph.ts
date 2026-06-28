import type { ExecutionGraph, RuntimeContext, RuntimeStep } from "./types.js";

export function createLoopId(): string {
  return "ML-" + new Date().getUTCFullYear() + "-" + Date.now();
}

export function createRuntimeContext(input: {
  organizationId: string;
  actorId: string;
  goal: string;
  priority?: "low" | "medium" | "high";
}): RuntimeContext {
  const now = new Date().toISOString();
  const loopId = createLoopId();

  return {
    loopId,
    organizationId: input.organizationId,
    actorId: input.actorId,
    correlationId: "corr-" + loopId,
    goal: input.goal,
    priority: input.priority ?? "medium",
    status: "queued",
    createdAt: now,
    updatedAt: now
  };
}

export function createExecutionGraph(context: RuntimeContext): ExecutionGraph {
  return {
    context,
    steps: [
      step("request", "mobius-api", "FounderInput", "RequestReceived"),
      step("brain", "mobius-brain", "RequestReceived", "BrainPlanCreated"),
      step("atlas", "atlas-core", "BrainPlanCreated", "IntentClassified"),
      step("memory-lookup", "mobius-memory", "IntentClassified", "MemoryLookupCompleted"),
      step("router", "mobius-router", "MemoryLookupCompleted", "RouteSelected"),
      step("provider", "mobius-provider-engine", "RouteSelected", "ProviderExecuted"),
      step("pulse", "mobius-pulse", "ProviderExecuted", "PulseMetricRecorded"),
      step("memory-create", "mobius-memory", "ProviderExecuted", "MemoryEventCreated"),
      step("mcms", "mobius-mcms", "MemoryEventCreated", "McmsAuditRecorded"),
      step("command-center", "mobius-command-center", "McmsAuditRecorded", "DashboardRefreshRequested")
    ]
  };
}

export function markStep(graph: ExecutionGraph, outputEvent: string, status: RuntimeStep["status"]): ExecutionGraph {
  const now = new Date().toISOString();

  return {
    context: { ...graph.context, status: status === "failed" ? "failed" : graph.context.status, updatedAt: now },
    steps: graph.steps.map((runtimeStep) =>
      runtimeStep.outputEvent === outputEvent
        ? { ...runtimeStep, status, completedAt: status === "completed" ? now : runtimeStep.completedAt }
        : runtimeStep
    )
  };
}

function step(id: string, owner: string, inputEvent: string, outputEvent: string): RuntimeStep {
  return { id, owner, inputEvent, outputEvent, status: "pending" };
}
