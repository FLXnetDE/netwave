import express, { Request, Response } from 'express';
import logger from '../util/logger';
import ApiServerOptions from './api-server-options';
import { clientsRoute } from './routes/clients-route';
import { ClientRegistry } from '../client/client-registry';

const startApiServer = (
    options: ApiServerOptions,
    clientRegistry: ClientRegistry,
): void => {
    const app = express();

    app.get('/api', index);

    app.use('/api/clients', clientsRoute(clientRegistry));

    app.listen(options.port, listen(options.port));
};

const listen =
    (port: number) =>
    (err?: Error | undefined): void => {
        if (err) {
            logger.error(err);
        } else {
            logger.info(`API server running on port ${port}`);
        }
    };

const index = (req: Request, res: Response): void => {
    res.send('netwave api server');
};

export { startApiServer };
