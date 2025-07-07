import { Request, Response } from 'express';
import ChannelManager from '../../channel/ChannelManager';
import Channel from '../../channel/Channel';

const getChannels =
    (channelManager: ChannelManager) =>
    (req: Request, res: Response): void => {
        const channelRegistry: Map<number, Channel> =
            channelManager.getChannelRegistry();

        const channels: Channel[] = Array.from(channelRegistry.values());

        res.json(channels);
    };

export { getChannels };
