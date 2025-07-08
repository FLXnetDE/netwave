import PacketType from './packet-types';

abstract class Packet {
    abstract packetType: PacketType;
    abstract serialize(): Buffer;

    static registry = new Map<PacketType, typeof Packet>();

    static register(type: PacketType, packetClass: typeof Packet) {
        this.registry.set(type, packetClass);
    }

    static deserializeFrom(buffer: Buffer): Packet | null {
        const type = buffer[0] as PacketType;
        const cls = this.registry.get(type);
        return cls ? (cls as any).deserialize(buffer) : null;
    }
}

export default Packet;
