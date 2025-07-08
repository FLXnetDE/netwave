import Packet from '../packet';
import PacketType from '../packet-types';

class LoginAckPacket extends Packet {
    packetType: PacketType = PacketType.LoginAck;

    clientId: number;

    constructor(clientId: number) {
        super();
        this.clientId = clientId;
    }

    serialize(): Buffer {
        const buf = Buffer.alloc(5);
        buf[0] = this.packetType;
        buf.writeUInt32BE(this.clientId, 1);
        return buf;
    }

    static deserialize(buffer: Buffer): LoginAckPacket {
        const clientId = buffer.readUInt32BE(1);
        return new LoginAckPacket(clientId);
    }
}

export default LoginAckPacket;
