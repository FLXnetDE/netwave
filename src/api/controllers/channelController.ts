import { Request, Response } from 'express';
import ChannelManager from '../../channel/ChannelManager';
import Channel from '../../channel/Channel';

const index =
    (channelManager: ChannelManager) =>
    (req: Request, res: Response): void => {
        const channelRegistry: Map<number, Channel> =
            channelManager.getChannelRegistry();

        const channelIds: number[] = Array.from(channelRegistry.keys());

        res.json(channelIds);
    };

export { index };
