import BackendService from './services/BackendService';
import UDPAudioStreamService from './services/UDPAudioStreamService';
import Service from './services/Service';
import ChannelService from './services/ChannelService';

const PORT = process.env.PORT || 3000;

const channelService: ChannelService = new ChannelService();
const backendService: BackendService = new BackendService(
    PORT as number,
    channelService,
);
const audioStreamService: UDPAudioStreamService = new UDPAudioStreamService(
    5005,
    channelService,
);

const services: Service[] = [
    channelService,
    backendService,
    audioStreamService,
];

const main = (): void => {
    services.forEach((service) => service.start());
};

main();
