import { Router } from 'express';
import ChannelManager from '../../channel/ChannelManager';
import { getChannels } from '../controllers/channelController';

const channelRouter = (channelManager: ChannelManager): Router => {
    const channelRouter: Router = Router();

    channelRouter.get('/', getChannels(channelManager));

    return channelRouter;
};

export { channelRouter };
