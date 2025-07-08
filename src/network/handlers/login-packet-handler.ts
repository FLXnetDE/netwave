import { RemoteInfo } from 'dgram';
import PacketHandler from '../packet-handler';
import { clientRegistry } from '../../client/client-registry';
import PacketServer from '../packet-server';
import logger from '../../util/logger';
import LoginPacket from '../packets/login-packet';
import LoginAckPacket from '../packets/login-ack-packet';

class LoginPacketHandler extends PacketHandler<LoginPacket> {
    constructor(private server: PacketServer) {
        super();
    }

    handle(packet: LoginPacket, remoteInfo: RemoteInfo): void {
        const clientId = clientRegistry.generateId();

        clientRegistry.add({
            id: clientId,
            address: remoteInfo.address,
            port: remoteInfo.port,
            joinedAt: Date.now(),
        });

        logger.info(
            `Client ${clientId} joined from ${remoteInfo.address}:${remoteInfo.port}`,
        );

        const ackPacket: LoginAckPacket = new LoginAckPacket(clientId);
        this.server.sendPacket(ackPacket, remoteInfo);
    }
}

export default LoginPacketHandler;
