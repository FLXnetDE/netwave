import { RemoteInfo } from 'dgram';
import PacketHandler from '../packet-handler';
import AudioPacket from '../packets/audio-packet';
import logger from '../../util/logger';

class AudioPacketLoggerHandler extends PacketHandler<AudioPacket> {
    handle(packet: AudioPacket, remoteInfo: RemoteInfo): void {
        logger.debug(
            `Received ${packet.serialize().length} bytes from ${
                remoteInfo.address
            }:${remoteInfo.port}`,
        );
    }
}

export default AudioPacketLoggerHandler;
