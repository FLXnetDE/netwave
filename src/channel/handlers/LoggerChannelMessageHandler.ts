import logger from '../../util/logger';
import { ChannelMessage, toInfoString } from '../ChannelMessage';
import ChannelMessageHandler from '../ChannelMessageHandler';
import ChannelSocket from '../ChannelSocket';

class LoggerChannelMessageHandler implements ChannelMessageHandler {
    handle(channelSocket: ChannelSocket, channelMessage: ChannelMessage): void {
        logger.info(toInfoString(channelMessage));
    }
}

export default LoggerChannelMessageHandler;
