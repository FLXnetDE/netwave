import { Request, Response } from 'express';
import { ClientRegistry } from '../../client/client-registry';

const getClients =
    (clientRegistry: ClientRegistry) =>
    (req: Request, res: Response): void => {
        res.json(clientRegistry.getClients());
    };

export { getClients };
