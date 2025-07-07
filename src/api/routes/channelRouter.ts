import { Router } from 'express';
import ChannelManager from '../../channel/ChannelManager';
import { index } from '../controllers/channelController';

const channelRouter = (channelManager: ChannelManager): Router => {
    const channelRouter: Router = Router();

    channelRouter.get('/', index(channelManager));

    return channelRouter;
};

export { channelRouter };
