import { Router, Request, Response } from 'express';
import ChannelManager from '../../channel/ChannelManager';
import Channel from '../../channel/Channel';

const channelRouter = (channelManager: ChannelManager): Router => {
    const channelRouter: Router = Router();

    channelRouter.get('/', (req: Request, res: Response) => {
        const channelRegistry: Map<number, Channel> =
            channelManager.getChannelRegistry();

        const channelIds: number[] = Array.from(channelRegistry.keys());

        res.json(channelIds);
    });

    return channelRouter;
};

export { channelRouter };
