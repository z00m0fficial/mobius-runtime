import { MobiusRuntime } from "./runtime.js";

const runtime = new MobiusRuntime();

let graph = runtime.start({
  organizationId: "mobius-technologies",
  actorId: "founder-michael-bell",
  goal: "Create a Platform Change Proposal to improve Memory.",
  priority: "high"
});

for (const eventName of [
  "RequestReceived",
  "BrainPlanCreated",
  "IntentClassified",
  "MemoryLookupCompleted",
  "RouteSelected",
  "ProviderExecuted",
  "PulseMetricRecorded",
  "MemoryEventCreated",
  "McmsAuditRecorded",
  "DashboardRefreshRequested"
]) {
  graph = runtime.completeStep(graph.context.loopId, eventName);
}

console.log(JSON.stringify(graph, null, 2));
