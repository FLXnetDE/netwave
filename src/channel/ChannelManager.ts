import logger from '../util/logger';
import Channel from './Channel';
import ChannelMessageHandler from './ChannelMessageHandler';
import { ClientInfo, clientInfoString } from './ClientInfo';
import EchoChannelMessageHandler from './handlers/EchoChannelMessageHandler';
import LoggerChannelMessageHandler from './handlers/LoggerChannelMessageHandler';

class ChannelManager {
    private channelRegistry: Map<number, Channel>;

    constructor() {
        this.channelRegistry = new Map<number, Channel>();
    }

    /**
     * Get all registered channels
     * @returns all registered channels
     */
    getChannels(): Channel[] {
        return Array.from(this.channelRegistry.values());
    }

    /**
     * Check if a channel with given id is registered
     * @param channelId channel id to check
     * @returns True or false wheter the channel is registered or not
     */
    hasChannel(channelId: number): boolean {
        return this.channelRegistry.has(channelId);
    }

    /**
     * Create a new channel with default settings based on a given id
     * @param channelId channel id to be created
     */
    createChannel(channelId: number): void {
        this.channelRegistry.set(channelId, {
            channelId,
            channelClientRegistry: [],
            channelMessageHandlers: [...this.defaultChannelMessageHandlers()],
        });
    }

    /**
     * Get registered clients of a channel id
     * @param channelId channel id to query
     * @returns List of ClientInfo
     */
    getClients(channelId: number): ClientInfo[] {
        if (!this.hasChannel(channelId)) return [];
        return this.channelRegistry.get(channelId)!.channelClientRegistry;
    }

    /**
     * Get registered channel message handlers of a channel
     * @param channelId channel id to query
     * @returns List of ChannelMessageHandler
     */
    getChannelMessageHandlers(channelId: number): ChannelMessageHandler[] {
        if (!this.hasChannel(channelId)) return [];
        return this.channelRegistry.get(channelId)!.channelMessageHandlers;
    }

    /**
     * Add a ChannelMessageHandler to a given channel
     * @param channelId channel id to add the handler to
     * @param channelMessageHandler handler implementation to be added
     */
    addChannelMessageHandler(
        channelId: number,
        channelMessageHandler: ChannelMessageHandler,
    ): void {
        if (this.hasChannel(channelId)) {
            this.channelRegistry
                .get(channelId)!
                .channelMessageHandlers.push(channelMessageHandler);
        }
    }

    /**
     * Check if a channel with given id has registered a given client
     * @param channelId channel id to query
     * @param clientInfo client info to query
     * @returns True or false wheter a client is registered to a channel or not
     */
    hasClient(channelId: number, clientInfo: ClientInfo): boolean {
        return this.getClients(channelId).some(
            (info) =>
                info.address === clientInfo.address &&
                info.port === clientInfo.port,
        );
    }

    /**
     * Handle the client data behaviour
     * @param channelId channel id where to be handled
     * @param clientInfo client info to be handled
     */
    handleClient(channelId: number, clientInfo: ClientInfo): void {
        if (!this.hasChannel(channelId)) this.createChannel(channelId);

        if (!this.hasClient(channelId, clientInfo)) {
            this.registerClient(channelId, clientInfo);
        }
    }

    /**
     * Register a client
     * @param channelId channel id where to be registered
     * @param clientInfo client info to be registered
     */
    registerClient(channelId: number, clientInfo: ClientInfo): void {
        this.channelRegistry
            .get(channelId)!
            .channelClientRegistry.push(clientInfo);
        logger.info(
            `${clientInfoString(
                clientInfo,
            )} => registered for channel ${channelId}`,
        );
    }

    /**
     * Default set of channel message handlers
     * @returns List of ChannelMessageHandler
     */
    defaultChannelMessageHandlers(): ChannelMessageHandler[] {
        return [
            new LoggerChannelMessageHandler(),
            new EchoChannelMessageHandler(1000),
        ];
    }

    /**
     * Get the instance of the channel registry
     * @returns Map<number, Channel>
     */
    getChannelRegistry(): Map<number, Channel> {
        return this.channelRegistry;
    }
}

export default ChannelManager;
