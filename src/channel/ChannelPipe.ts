import ChannelPipeOptions from './ChannelPipeOptions';
import ChannelSocket from './ChannelSocket';
import { ChannelMessage } from './ChannelMessage';
import ChannelManager from './ChannelManager';

class ChannelPipe {
    private channelManager: ChannelManager;
    private channelSocket: ChannelSocket;

    constructor(options: ChannelPipeOptions) {
        this.channelManager = new ChannelManager();

        this.channelSocket = new ChannelSocket(options.udpPort);
        this.channelSocket.on(
            'message',
            this.onChannelSocketMessage.bind(this),
        );
    }

    /**
     *
     * @param channelMessage
     */
    private onChannelSocketMessage(channelMessage: ChannelMessage): void {
        this.channelManager.handleClient(
            channelMessage.channelId,
            channelMessage.clientInfo,
        );
        this.channelManager
            .getChannelMessageHandlers(channelMessage.channelId)
            .forEach((handler) =>
                handler.handle(
                    channelMessage,
                    this.channelSocket,
                    this.channelManager,
                ),
            );
    }

    /**
     *
     * @returns
     */
    getChannelManager(): ChannelManager {
        return this.channelManager;
    }
}

export default ChannelPipe;
