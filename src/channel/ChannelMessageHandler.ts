import { ChannelMessage } from './ChannelMessage';
import ChannelSocket from './ChannelSocket';

interface ChannelMessageHandler {
    handle(channelSocket: ChannelSocket, channelMessage: ChannelMessage): void;
}

export default ChannelMessageHandler;
