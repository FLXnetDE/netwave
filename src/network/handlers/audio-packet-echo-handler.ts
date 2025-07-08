import { RemoteInfo } from 'dgram';
import PacketHandler from '../packet-handler';
import AudioPacket from '../packets/audio-packet';
import PacketServer from '../packet-server';

class AudioPacketEchoHandler extends PacketHandler<AudioPacket> {
    constructor(private server: PacketServer) {
        super();
    }

    handle(packet: AudioPacket, remoteInfo: RemoteInfo): void {
        this.server.sendPacket(packet, remoteInfo);
    }
}

export default AudioPacketEchoHandler;
