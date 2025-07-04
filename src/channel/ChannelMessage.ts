import { ClientInfo, clientInfoString } from './ClientInfo';

type ChannelMessage = {
    channelId: number;
    clientInfo: ClientInfo;
    payload: Buffer;
};

/**
 *
 * @param channelMessage
 * @returns
 */
const channelMessageInfoString = (channelMessage: ChannelMessage): string => {
    return `${clientInfoString(channelMessage.clientInfo)} @ [${
        channelMessage.channelId
    }] => ${channelMessage.payload.length} bytes`;
};

export { ChannelMessage, channelMessageInfoString };
