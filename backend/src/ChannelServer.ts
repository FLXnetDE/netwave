import dgram from 'dgram';
import ChannelMessageQueue from './ChannelMessageQueue';
import { parseChannelPacket } from './ChannelMessage';

class ChannelServer {
    private port: number;
    private messageQueue: ChannelMessageQueue;
    private socket: dgram.Socket;

    constructor(port: number) {
        this.port = port;
        this.messageQueue = new ChannelMessageQueue();
        this.socket = dgram.createSocket('udp4');
        this.socket.on('listening', this.onListening.bind(this));
        this.socket.on('message', this.onMessage.bind(this));
    }

    bind() {
        this.socket.bind(this.port);
    }

    private onListening() {
        const address = this.socket.address();
        console.log(
            `UDP Receiver is listening on ${address.address}:${address.port}`,
        );
    }

    private onMessage(msg: Buffer, rinfo: dgram.RemoteInfo) {
        try {
            const message = parseChannelPacket(msg);
            this.messageQueue.enqueue(message);
            console.log(
                `Queued message for Channel ${message.channelId}: value=${message.value}`,
            );
        } catch (err) {
            console.error(`Error parsing message: ${(err as Error).message}`);
        }
    }
}

export default ChannelServer;
