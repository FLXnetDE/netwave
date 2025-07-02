import { RemoteInfo } from 'dgram';

type ClientInfo = {
    address: string;
    port: number;
};

const fromRemoteInfo = (remoteInfo: RemoteInfo): ClientInfo => {
    return {
        address: remoteInfo.address,
        port: remoteInfo.port,
    };
};

export { ClientInfo, fromRemoteInfo };
