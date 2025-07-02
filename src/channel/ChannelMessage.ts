import { ClientInfo } from './ClientInfo';

type ChannelMessage = {
    channelId: number;
    clientInfo: ClientInfo;
    payload: Buffer;
};

const toInfoString = (channelMessage: ChannelMessage): string => {
    return `${channelMessage.clientInfo.address}:${channelMessage.clientInfo.port} [${channelMessage.channelId}] => ${channelMessage.payload.length} bytes`;
};

export { ChannelMessage, toInfoString };
