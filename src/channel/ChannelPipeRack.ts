import ChannelPipeRackOptions from './ChannelPipeRackOptions';
import ChannelSocket from './ChannelSocket';
import { ChannelMessage } from './ChannelMessage';
import ChannelManager from './ChannelManager';

class ChannelPipeRack {
    private channelManager: ChannelManager;

    private channelSocket: ChannelSocket;

    constructor(options: ChannelPipeRackOptions) {
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
    }
}

export default ChannelPipeRack;
