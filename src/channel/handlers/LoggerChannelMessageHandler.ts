import logger from '../../util/logger';
import ChannelManager from '../ChannelManager';
import { ChannelMessage, toInfoString } from '../ChannelMessage';
import ChannelMessageHandler from '../ChannelMessageHandler';
import ChannelSocket from '../ChannelSocket';

class LoggerChannelMessageHandler implements ChannelMessageHandler {
    handle(
        channelMessage: ChannelMessage,
        channelSocket: ChannelSocket,
        channelManager: ChannelManager,
    ): void {
        logger.info(toInfoString(channelMessage));
    }
}

export default LoggerChannelMessageHandler;
