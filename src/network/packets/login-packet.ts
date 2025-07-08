import Packet from '../packet';
import PacketType from '../packet-types';

class LoginPacket extends Packet {
    packetType: PacketType = PacketType.Login;

    constructor(public channelId: number) {
        super();
    }

    serialize(): Buffer {
        const buffer = Buffer.alloc(5);
        buffer.writeUInt8(this.packetType, 0);
        buffer.writeUInt32BE(this.channelId, 1);
        return buffer;
    }

    static deserialize(buffer: Buffer): LoginPacket {
        const channelId = buffer.readUInt32BE(1);
        return new LoginPacket(channelId);
    }
}

export default LoginPacket;
