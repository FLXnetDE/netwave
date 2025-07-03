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

    send(clientInfo: ClientInfo, payload: Buffer) {
        this.server.send(payload, clientInfo.port, clientInfo.address);
    }

    private listener(message: Buffer, remoteInfo: RemoteInfo): void {
        if (message.length < 5) return;

        const parsedCannelMessage: Omit<ChannelMessage, 'clientInfo'> =
            this.parseRawMessage(message);

        const channelMessage: ChannelMessage = {
            ...parsedCannelMessage,
            clientInfo: fromRemoteInfo(remoteInfo),
        };

        this.emit<ChannelMessage>('message', channelMessage);
    }

    private bind(): void {
        logger.info(`UDP server listening on port ${this.port}`);
    }

    private parseRawMessage(
        message: Buffer,
    ): Omit<ChannelMessage, 'clientInfo'> {
        if (message.length < 4) {
            throw new Error('Packet too short');
        }

        // Read channel ID as big-endian unsigned 32-bit int
        const channelId: number = message.readUInt32BE(0);

        // Audio data after the first 4 bytes
        const payload: Buffer = message.subarray(4);

        return {
            channelId,
            payload,
        };
    }
}

export default ChannelSocket;
