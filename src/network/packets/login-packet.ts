import Packet from '../packet';
import PacketType from '../packet-types';

class LoginPacket extends Packet {
    packetType: PacketType = PacketType.Login;

    serialize(): Buffer {
        return Buffer.from([this.packetType]);
    }

    static deserialize(buffer: Buffer): LoginPacket {
        return new LoginPacket();
    }
}

export default LoginPacket;
