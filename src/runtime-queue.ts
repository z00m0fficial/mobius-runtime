export interface QueueItem<TPayload = unknown> {
  id: string;
  type: string;
  payload: TPayload;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
}

export class RuntimeQueue<TPayload = unknown> {
  private readonly items: QueueItem<TPayload>[] = [];

  add(input: Omit<QueueItem<TPayload>, "id" | "attempts" | "createdAt">): QueueItem<TPayload> {
    const item: QueueItem<TPayload> = {
      id: "queue-" + Date.now(),
      attempts: 0,
      createdAt: new Date().toISOString(),
      ...input
    };

    this.items.push(item);
    return item;
  }

  next(): QueueItem<TPayload> | undefined {
    return this.items.shift();
  }

  count(): number {
    return this.items.length;
  }
}
