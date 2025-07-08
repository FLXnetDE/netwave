import { RemoteInfo } from 'dgram';
import Packet from './packet';

abstract class PacketHandler<T extends Packet = Packet> {
    abstract handle(packet: T, remoteInfo: RemoteInfo): void;
}

export default PacketHandler;
