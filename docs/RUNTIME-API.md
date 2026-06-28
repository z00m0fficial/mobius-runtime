# Runtime API

## Purpose

Runtime API defines the service-facing contract for creating and tracking Mobius Intelligence Loops.

## Core Operations

### Start Loop

Creates a Runtime context, checks constitutional policy, creates an execution graph, and stores loop state.

Input:

```ts
{
  organizationId: string;
  actorId: string;
  goal: string;
  priority?: "low" | "medium" | "high";
}
```

Output:

```ts
ExecutionGraph
```

### Complete Step

Marks a step complete using its output event.

Input:

```ts
{
  loopId: string;
  outputEvent: string;
}
```

Output:

```ts
ExecutionGraph
```

## DP1 Rule

Every First Breath request must execute inside Runtime and receive a permanent Loop ID.
