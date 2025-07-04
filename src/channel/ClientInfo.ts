import { RemoteInfo } from 'dgram';

type ClientInfo = {
    clientId: number;
    address: string;
    port: number;
};

const fromRemoteInfo = (
    remoteInfo: RemoteInfo,
): Omit<ClientInfo, 'clientId'> => {
    return {
        address: remoteInfo.address,
        port: remoteInfo.port,
    };
};

const clientInfoString = (clientInfo: ClientInfo) => {
    return `[${clientInfo.address}:${clientInfo.port}, ID = ${clientInfo.clientId}]`;
};

export { ClientInfo, fromRemoteInfo, clientInfoString };
