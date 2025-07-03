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

    private onChannelSocketMessage(channelMessage: ChannelMessage): void {
        this.channelManager.registerClient(
            channelMessage.channelId,
            channelMessage.clientInfo,
        );
        this.channelManager
            .getChannelMessageHandlers(channelMessage.channelId)
            .forEach((handler) =>
                handler.handle(this.channelSocket, channelMessage),
            );
    }
}

export default ChannelPipe;
