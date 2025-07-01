import { ChannelMessage } from './ChannelMessage';

class ChannelMessageQueue {
    private queues: Map<number, ChannelMessage[]> = new Map();
    private maxQueueSize: number;

    constructor(maxQueueSize = 100) {
        this.maxQueueSize = maxQueueSize;
    }

    enqueue(message: ChannelMessage): void {
        const queue = this.queues.get(message.channelId) ?? [];
        queue.push(message);

        if (queue.length > this.maxQueueSize) {
            queue.shift(); // remove oldest
        }

        this.queues.set(message.channelId, queue);
    }

    dequeue(channelId: number): ChannelMessage | undefined {
        const queue = this.queues.get(channelId);
        if (!queue || queue.length === 0) return undefined;
        return queue.shift();
    }

    peek(channelId: number): ChannelMessage | undefined {
        const queue = this.queues.get(channelId);
        return queue?.[0];
    }

    getQueues(): Map<number, ChannelMessage[]> {
        return this.queues;
    }

    getQueue(channelId: number): ChannelMessage[] {
        return [...(this.queues.get(channelId) ?? [])];
    }

    clear(channelId: number): void {
        this.queues.set(channelId, []);
    }

    clearAll(): void {
        this.queues.clear();
    }
}

export default ChannelMessageQueue;
