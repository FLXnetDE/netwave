import { Router } from 'express';
import { getClients } from '../controllers/clients-controller';
import { ClientRegistry } from '../../client/client-registry';

const clientsRoute = (clientRegistry: ClientRegistry): Router => {
    const router: Router = Router();

    router.get('/', getClients(clientRegistry));

    return router;
};

export { clientsRoute };
