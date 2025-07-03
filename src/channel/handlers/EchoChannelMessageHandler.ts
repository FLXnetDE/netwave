import ChannelManager from '../ChannelManager';
import { ChannelMessage } from '../ChannelMessage';
import ChannelMessageHandler from '../ChannelMessageHandler';
import ChannelSocket from '../ChannelSocket';

class EchoChannelMessageHandler implements ChannelMessageHandler {
    async handle(
        channelMessage: ChannelMessage,
        channelSocket: ChannelSocket,
        channelManager: ChannelManager,
    ): Promise<void> {
        await this.sleep(3000);
        channelSocket.send(
            channelMessage.clientInfo,
            channelMessage.channelId,
            channelMessage.payload,
        );
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export default EchoChannelMessageHandler;
