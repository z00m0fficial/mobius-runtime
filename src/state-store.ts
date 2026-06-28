import type { ExecutionGraph } from "./types.js";

export class InMemoryStateStore {
  private readonly loops = new Map<string, ExecutionGraph>();

  save(graph: ExecutionGraph): ExecutionGraph {
    this.loops.set(graph.context.loopId, graph);
    return graph;
  }

  get(loopId: string): ExecutionGraph | undefined {
    return this.loops.get(loopId);
  }

  list(): ExecutionGraph[] {
    return [...this.loops.values()];
  }

  clear(): void {
    this.loops.clear();
  }
}
