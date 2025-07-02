import logger from '../util/logger';
import Channel from './Channel';
import { ClientInfo } from './ClientInfo';

class ChannelManager {
    private channelRegistry: Map<number, Channel>;

    constructor() {
        this.channelRegistry = new Map<number, Channel>();
    }

    hasChannel(channelId: number): boolean {
        return this.channelRegistry.has(channelId);
    }

    createChannel(channelId: number) {
        this.channelRegistry.set(channelId, {
            channelId,
            channelClientRegistry: [],
            channelMessageHandlers: [],
        });
    }

    getClients(channelId: number): ClientInfo[] {
        if (!this.hasChannel(channelId)) return [];
        return this.channelRegistry.get(channelId)!.channelClientRegistry;
    }

    hasClient(channelId: number, clientInfo: ClientInfo): boolean {
        return this.getClients(channelId).some(
            (info) =>
                info.address === clientInfo.address &&
                info.port === clientInfo.port,
        );
    }

    registerClient(channelId: number, clientInfo: ClientInfo) {
        if (!this.hasChannel(channelId)) this.createChannel(channelId);
        this.channelRegistry
            .get(channelId)!
            .channelClientRegistry.push(clientInfo);
        logger.info(
            `${clientInfo.address}:${clientInfo.port} registered for channel ${channelId}`,
        );
    }
}

export default ChannelManager;
