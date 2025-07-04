import { startApiServer } from './api/app';
import ChannelPipe from './channel/ChannelPipe';
import ChannelPipeOptions from './channel/ChannelPipeOptions';

const main = () => {
    const channelPipeOptions: ChannelPipeOptions = {
        udpPort: 5000,
    };

    const channelPipe: ChannelPipe = new ChannelPipe(channelPipeOptions);

    startApiServer(3000, channelPipe);
};

main();
