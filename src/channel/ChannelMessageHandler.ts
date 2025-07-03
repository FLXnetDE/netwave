import ChannelManager from './ChannelManager';
import { ChannelMessage } from './ChannelMessage';
import ChannelSocket from './ChannelSocket';

interface ChannelMessageHandler {
    handle(
        channelMessage: ChannelMessage,
        channelSocket: ChannelSocket,
        channelManager: ChannelManager,
    ): void;
}

export default ChannelMessageHandler;
