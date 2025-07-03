import logger from '../util/logger';
import Channel from './Channel';
import ChannelMessageHandler from './ChannelMessageHandler';
import { ClientInfo } from './ClientInfo';
import EchoChannelMessageHandler from './handlers/EchoChannelMessageHandler';
import LoggerChannelMessageHandler from './handlers/LoggerChannelMessageHandler';

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
            channelMessageHandlers: [...this.defaultChannelMessageHandlers()],
        });
    }

    getClients(channelId: number): ClientInfo[] {
        if (!this.hasChannel(channelId)) return [];
        return this.channelRegistry.get(channelId)!.channelClientRegistry;
    }

    getChannelMessageHandlers(channelId: number): ChannelMessageHandler[] {
        if (!this.hasChannel(channelId)) return [];
        return this.channelRegistry.get(channelId)!.channelMessageHandlers;
    }

    addChannelMessageHandler(
        channelId: number,
        channelMessageHandler: ChannelMessageHandler,
    ) {
        if (!this.hasChannel(channelId)) return;
        this.channelRegistry
            .get(channelId)!
            .channelMessageHandlers.push(channelMessageHandler);
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
        if (this.hasClient(channelId, clientInfo)) return;
        this.channelRegistry
            .get(channelId)!
            .channelClientRegistry.push(clientInfo);
        logger.info(
            `${clientInfo.address}:${clientInfo.port} registered for channel ${channelId}`,
        );
    }

    defaultChannelMessageHandlers(): ChannelMessageHandler[] {
        return [
            // new LoggerChannelMessageHandler(),
            new EchoChannelMessageHandler(),
        ];
    }
}

export default ChannelManager;
