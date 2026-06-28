# Service Interfaces

## Runtime Integration Pattern

Services do not own global execution state. Runtime owns state and coordinates service steps through versioned events.

## DP1 Services

| Step | Owner | Input Event | Output Event |
|---|---|---|---|
| Request | mobius-api | FounderInput | RequestReceived |
| Brain | mobius-brain | RequestReceived | BrainPlanCreated |
| Atlas | atlas-core | BrainPlanCreated | IntentClassified |
| Memory Lookup | mobius-memory | IntentClassified | MemoryLookupCompleted |
| Router | mobius-router | MemoryLookupCompleted | RouteSelected |
| Provider | mobius-provider-engine | RouteSelected | ProviderExecuted |
| Pulse | mobius-pulse | ProviderExecuted | PulseMetricRecorded |
| Memory Create | mobius-memory | ProviderExecuted | MemoryEventCreated |
| MCMS | mobius-mcms | MemoryEventCreated | McmsAuditRecorded |
| Command Center | mobius-command-center | McmsAuditRecorded | DashboardRefreshRequested |

## Rule

Each service receives context, performs one responsibility, emits one canonical event, and returns control to Runtime.
