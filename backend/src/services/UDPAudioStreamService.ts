import dgram from 'dgram';
import { parseChannelPacket } from '../channel/ChannelMessage';
import Service from './Service';
import ChannelService from './ChannelService';

class UDPAudioStreamService implements Service {
    private port: number;
    private channelService: ChannelService;
    private socket: dgram.Socket;

    constructor(port: number, channelService: ChannelService) {
        this.port = port;
        this.channelService = channelService;
        this.socket = dgram.createSocket('udp4');
        this.socket.on('listening', this.onListening.bind(this));
        this.socket.on('message', this.onMessage.bind(this));
    }

    start(): Promise<void> | void {
        this.socket.bind(this.port);
    }

    stop(): Promise<void> | void {
        this.socket.close();
    }

    private onListening() {
        const address = this.socket.address();
        console.log(
            `🔊 UDPAudioStreamService is listening on ${address.address}:${address.port}`,
        );
    }

    private onMessage(msg: Buffer, rinfo: dgram.RemoteInfo) {
        try {
            const message = parseChannelPacket(msg);
            this.channelService.submit(message);
            // console.log(
            //     `Queued message for channel ${message.channelId}: value=${message.value}`,
            // );
        } catch (err) {
            console.error(`Error parsing message: ${(err as Error).message}`);
        }
    }
}

export default UDPAudioStreamService;
