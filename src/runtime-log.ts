export type RuntimeLogLevel = "info" | "warn" | "error";

export interface RuntimeLogEntry {
  id: string;
  loopId: string;
  level: RuntimeLogLevel;
  event: string;
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class RuntimeTraceLog {
  private readonly entries: RuntimeLogEntry[] = [];

  record(input: Omit<RuntimeLogEntry, "id" | "timestamp">): RuntimeLogEntry {
    const entry: RuntimeLogEntry = {
      id: "log-" + Date.now() + "-" + this.entries.length,
      timestamp: new Date().toISOString(),
      ...input
    };

    this.entries.push(entry);
    return entry;
  }

  getLoopTrace(loopId: string): RuntimeLogEntry[] {
    return this.entries.filter((entry) => entry.loopId === loopId);
  }

  list(): RuntimeLogEntry[] {
    return [...this.entries];
  }
}
