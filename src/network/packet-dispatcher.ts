import { RemoteInfo } from 'dgram';
import PacketType from './packet-types';
import Packet from './packet';
import PacketHandler from './packet-handler';

class PacketDispatcher {
    private handlers = new Map<PacketType, PacketHandler>();

    register(type: PacketType, handler: PacketHandler) {
        this.handlers.set(type, handler);
    }

    dispatch(packet: Packet, rinfo: RemoteInfo) {
        const handler = this.handlers.get(packet.packetType);
        if (handler) handler.handle(packet, rinfo);
    }
}

export default PacketDispatcher;
