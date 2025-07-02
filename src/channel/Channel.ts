import ChannelMessageHandler from './ChannelMessageHandler';
import { ClientInfo } from './ClientInfo';

type Channel = {
    channelId: number;
    channelClientRegistry: ClientInfo[];
    channelMessageHandlers: ChannelMessageHandler[];
};

export default Channel;
