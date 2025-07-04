import dgram, { RemoteInfo, Socket } from 'dgram';
import logger from '../util/logger';
import { EventEmitter } from 'stream';
import { ClientInfo, fromRemoteInfo } from './ClientInfo';
import { ChannelMessage } from './ChannelMessage';

class ChannelSocket extends EventEmitter {
    private port: number;
    private server: Socket;

    constructor(port: number) {
        super();

        this.port = port;
        this.server = dgram.createSocket('udp4');

        this.server.on('message', this.listener.bind(this));
        this.server.bind(this.port, this.bind.bind(this));
    }

    send(clientInfo: ClientInfo, channelId: number, payload: Buffer) {
        const packet: Buffer = this.createRawMessage(
            channelId,
            clientInfo.clientId,
            payload,
        );
        this.server.send(packet, clientInfo.port, clientInfo.address);
    }

    private listener(message: Buffer, remoteInfo: RemoteInfo): void {
        if (message.length < 5) return;

        const parsedCannelMessage: ChannelMessage = this.parseMessage(
            message,
            remoteInfo,
        );

        this.emit<ChannelMessage>('message', parsedCannelMessage);
    }

    private bind(): void {
        logger.info(`UDP server listening on port ${this.port}`);
    }

    private parseMessage(
        message: Buffer,
        remoteInfo: RemoteInfo,
    ): ChannelMessage {
        const channelId: number = message.readUInt32BE(0);
        const clientId: number = message.readUInt32BE(4);
        const payload: Buffer = message.subarray(8);

        const channelMessage: ChannelMessage = {
            channelId,
            clientInfo: {
                clientId,
                address: remoteInfo.address,
                port: remoteInfo.port,
            },
            payload,
        };

        return channelMessage;
    }

    private createRawMessage(
        channelId: number,
        clientId: number,
        payload: Buffer,
    ): Buffer {
        const message = Buffer.alloc(8 + payload.length);

        message.writeUInt32BE(channelId, 0);
        message.writeUInt32BE(clientId, 4);
        payload.copy(message, 8);

        return message;
    }
}

export default ChannelSocket;
