import { startApiServer } from './api/app';
import { clientRegistry } from './client/client-registry';
import { startPacketServer } from './network/app';

const main = () => {
    startPacketServer({
        address: '127.0.0.1',
        port: 5000,
    });

    startApiServer(
        {
            port: 3000,
        },
        clientRegistry,
    );
};

main();
