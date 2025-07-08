import { RemoteInfo } from 'dgram';
import PacketServer from './packet-server';
import PacketDispatcher from './packet-dispatcher';
import PacketRegistry from './packet-registry';
import Packet from './packet';
import LoginPacket from './packets/login-packet';
import PacketType from './packet-types';
import AudioPacket from './packets/audio-packet';
import AudioPacketEchoHandler from './handlers/audio-packet-echo-handler';
import AudioPacketLoggerHandler from './handlers/audio-packet-logger-handler';
import LoginPacketHandler from './handlers/login-packet-handler';
import PacketServerOptions from './packet-server-options';

const startPacketServer = (options: PacketServerOptions) => {
    const server: PacketServer = new PacketServer('127.0.0.1', 5000);
    const dispatcher: PacketDispatcher = new PacketDispatcher();

    setupPacketListener(server, dispatcher);
    setupPacketRegistry();

    server.on('message', onMessage(dispatcher));
};

const onMessage =
    (dispatcher: PacketDispatcher) =>
    (message: Buffer, remoteInfo: RemoteInfo): void => {
        const packet: Packet | null = PacketRegistry.deserialize(message);
        if (!packet) return;
        dispatcher.dispatch(packet, remoteInfo);
    };

const setupPacketRegistry = (): void => {
    PacketRegistry.register(PacketType.Login, LoginPacket.deserialize);
    PacketRegistry.register(PacketType.Audio, AudioPacket.deserialize);
};

const setupPacketListener = (
    server: PacketServer,
    dispatcher: PacketDispatcher,
): void => {
    dispatcher.register(PacketType.Login, new LoginPacketHandler(server));
    dispatcher.register(PacketType.Audio, new AudioPacketLoggerHandler());
    dispatcher.register(PacketType.Audio, new AudioPacketEchoHandler(server));
};

export { startPacketServer };
