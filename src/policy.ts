import type { ExecutionPolicy, RuntimeContext } from "./types.js";

export const defaultExecutionPolicy: ExecutionPolicy = {
  requireMemory: true,
  requireGovernance: true,
  requirePulse: true,
  requireDocumentation: true,
  maxRetries: 2,
  minimumConfidence: 0.8
};

export interface ConstitutionCheckResult {
  allowed: boolean;
  reasons: string[];
  policy: ExecutionPolicy;
}

export function checkConstitution(context: RuntimeContext, policy = defaultExecutionPolicy): ConstitutionCheckResult {
  const reasons: string[] = [];

  if (!context.organizationId) reasons.push("organizationId is required");
  if (!context.actorId) reasons.push("actorId is required");
  if (!context.goal.trim()) reasons.push("goal is required");
  if (policy.requireMemory) reasons.push("memory capture required");
  if (policy.requireGovernance) reasons.push("MCMS governance required");
  if (policy.requirePulse) reasons.push("Pulse metrics required");

  return {
    allowed: Boolean(context.organizationId && context.actorId && context.goal.trim()),
    reasons,
    policy
  };
}
