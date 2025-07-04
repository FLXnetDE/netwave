import express from 'express';
import ChannelPipe from '../channel/ChannelPipe';
import logger from '../util/logger';
import { channelRouter } from './routes/channelRouter';

const startApiServer = (
    port: number = 3000,
    channelPipe: ChannelPipe,
): void => {
    const app = express();

    app.get('/', (_req, res) => {
        res.send('netwave api server');
    });

    app.use('/api/channel', channelRouter(channelPipe.getChannelManager()));

    app.listen(port, () => {
        logger.info(`API server running on port ${port}`);
    });
};

export { startApiServer };
