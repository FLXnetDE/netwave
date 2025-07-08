import { RemoteInfo } from 'dgram';
import PacketHandler from '../packet-handler';
import AudioPacket from '../packets/audio-packet';
import logger from '../../util/logger';
import { clientRegistry } from '../../client/client-registry';
import Client from '../../client/client';

class AudioPacketLoggerHandler extends PacketHandler<AudioPacket> {
    handle(packet: AudioPacket, remoteInfo: RemoteInfo): void {
        const clientId: number = packet.clientId;

        const client: Client | undefined = clientRegistry.getById(clientId);
        if (client) client.lastActivity = Date.now();

        const packetLength: number = packet.serialize().length;

        logger.debug(
            `Received ${packetLength} bytes from ${remoteInfo.address}:${remoteInfo.port}`,
        );
    }
}

export default AudioPacketLoggerHandler;
