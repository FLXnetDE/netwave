import ChannelPipeRack from './channel/ChannelPipeRack';
import ChannelPipeRackOptions from './channel/ChannelPipeRackOptions';

const main = () => {
    const channelPipeRackOptions: ChannelPipeRackOptions = {
        udpPort: 5000,
    };

    const channelPipeRack: ChannelPipeRack = new ChannelPipeRack(
        channelPipeRackOptions,
    );
};

main();
