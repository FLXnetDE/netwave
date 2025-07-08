import { RemoteInfo } from 'dgram';
import PacketType from './packet-types';
import Packet from './packet';
import PacketHandler from './packet-handler';

class PacketDispatcher {
    private handlers = new Map<PacketType, PacketHandler[]>();

    register(packetType: PacketType, handler: PacketHandler) {
        if (!this.handlers.has(packetType)) {
            this.handlers.set(packetType, []);
        }
        this.handlers.get(packetType)!.push(handler);
    }

    dispatch(packet: Packet, rinfo: RemoteInfo) {
        const handlerList = this.handlers.get(packet.packetType);
        if (handlerList) {
            for (const handler of handlerList) {
                handler.handle(packet, rinfo);
            }
        }
    }
}

export default PacketDispatcher;
