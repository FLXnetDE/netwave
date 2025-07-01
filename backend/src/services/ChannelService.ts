import { ChannelMessage } from '../channel/ChannelMessage';
import ChannelMessageQueue from '../channel/ChannelMessageQueue';
import ChannelServiceStats from '../channel/ChannelServiceStats';
import Service from './Service';

class ChannelService implements Service {
    private channelMessageQueue: ChannelMessageQueue;

    constructor() {
        this.channelMessageQueue = new ChannelMessageQueue(1024);
    }

    submit(message: ChannelMessage): void {
        this.channelMessageQueue.enqueue(message);
    }

    getStats(): ChannelServiceStats {
        const queues: Map<number, ChannelMessage[]> =
            this.channelMessageQueue.getQueues();
        const stats: Record<number, number> = Object.fromEntries(
            Array.from(queues.entries()).map(([key, value]) => [
                key,
                value.length,
            ]),
        );
        return stats;
    }

    start(): Promise<void> | void {}

    stop(): Promise<void> | void {}
}

export default ChannelService;
