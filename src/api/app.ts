import express, { Request, Response } from 'express';
import ChannelPipe from '../channel/ChannelPipe';
import logger from '../util/logger';
import { channelRouter } from './routes/channelRouter';

const startApiServer = (
    port: number = 3000,
    channelPipe: ChannelPipe,
): void => {
    const app = express();

    app.get('/', index);

    app.use('/api/channel', channelRouter(channelPipe.getChannelManager()));

    app.listen(port, listen(port));
};

const listen =
    (port: number) =>
    (err?: Error | undefined): void => {
        if (err) {
            logger.error(err);
        } else {
            logger.info(`API server running on port ${port}`);
        }
    };

const index = (req: Request, res: Response): void => {
    res.send('netwave api server');
};

export { startApiServer };
