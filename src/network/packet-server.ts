import { EventEmitter } from 'stream';
import dgram, { RemoteInfo } from 'dgram';
import logger from '../util/logger';
import Packet from './packet';

class PacketServer extends EventEmitter {
    private address: string;
    private port: number;
    private server: dgram.Socket;

    constructor(address: string, port: number) {
        super();

        this.address = address;
        this.port = port;

        this.server = dgram.createSocket('udp4');

        this.server.on('listening', this.onListening.bind(this));
        this.server.on('message', this.onMessage.bind(this));
        this.server.on('error', this.onError.bind(this));

        this.server.bind(this.port, this.address);
    }

    sendBuffer(message: Buffer, port: number, address: string): void {
        this.server.send(message, port, address);
    }

    sendPacket(packet: Packet, remoteInfo: RemoteInfo): void {
        this.server.send(
            packet.serialize(),
            remoteInfo.port,
            remoteInfo.address,
        );
    }

    private onListening(): void {
        const address = this.server.address();
        logger.info(
            `Packet server listening on ${address.address}:${address.port}`,
        );
    }

    private onMessage(message: Buffer, remoteInfo: RemoteInfo): void {
        this.emit<'message'>('message', message, remoteInfo);
    }

    private onError(error: Error): void {
        logger.error(`Packet server error: ${error.message}`);
    }
}

export default PacketServer;
