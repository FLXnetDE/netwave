import Packet from '../packet';
import PacketType from '../packet-types';

class AudioPacket extends Packet {
    packetType: PacketType = PacketType.Audio;

    constructor(
        public readonly clientId: number,
        public readonly channelId: number,
        public readonly data: Buffer,
    ) {
        super();
    }

    serialize(): Buffer {
        const header = Buffer.alloc(9);
        header.writeUInt8(this.packetType, 0);
        header.writeUInt32BE(this.clientId, 1);
        header.writeUInt32BE(this.channelId, 5);
        return Buffer.concat([header, this.data]);
    }

    static deserialize(buffer: Buffer): AudioPacket {
        const clientId = buffer.readUInt32BE(1);
        const channelId = buffer.readUInt32BE(5);
        const data = buffer.subarray(9);

        return new AudioPacket(clientId, channelId, data);
    }
}

export default AudioPacket;
