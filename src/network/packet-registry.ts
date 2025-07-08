import Packet from './packet';
import PacketDeserializer from './packet-deserializer';
import PacketType from './packet-types';

class PacketRegistry {
    private static deserializers = new Map<PacketType, PacketDeserializer>();

    static register(type: PacketType, fn: PacketDeserializer) {
        this.deserializers.set(type, fn);
    }

    static deserialize(buffer: Buffer): Packet | null {
        const type = buffer[0] as PacketType;
        const fn = this.deserializers.get(type);
        return fn ? fn(buffer) : null;
    }
}

export default PacketRegistry;
