import Packet from './packet';

type PacketDeserializer = (buffer: Buffer) => Packet | null;

export default PacketDeserializer;
