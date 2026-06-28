export type LoopStatus = "queued" | "running" | "waiting" | "completed" | "failed" | "archived";
export type StepStatus = "pending" | "running" | "completed" | "failed" | "skipped";

export interface RuntimeContext {
  loopId: string;
  organizationId: string;
  actorId: string;
  correlationId: string;
  goal: string;
  priority: "low" | "medium" | "high";
  status: LoopStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RuntimeStep {
  id: string;
  owner: string;
  inputEvent: string;
  outputEvent: string;
  status: StepStatus;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface ExecutionGraph {
  context: RuntimeContext;
  steps: RuntimeStep[];
}

export interface ExecutionPolicy {
  requireMemory: boolean;
  requireGovernance: boolean;
  requirePulse: boolean;
  requireDocumentation: boolean;
  maxRetries: number;
  minimumConfidence: number;
}

export interface RuntimeEvent<TPayload = unknown> {
  id: string;
  name: string;
  version: "1.0";
  timestamp: string;
  source: "mobius-runtime";
  organizationId: string;
  correlationId: string;
  payload: TPayload;
}
