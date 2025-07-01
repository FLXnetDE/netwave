import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { DefaultEventsMap, Socket, Server as SocketIOServer } from 'socket.io';
import Service from './Service';
import ChannelService from './ChannelService';
import ChannelServiceStats from '../channel/ChannelServiceStats';

class BackendService implements Service {
    private port: number;
    private channelService: ChannelService;

    private app: express.Express;
    private server: http.Server;
    private io: SocketIOServer;

    constructor(port: number, channelService: ChannelService) {
        this.port = port;
        this.channelService = channelService;

        this.app = express();
        this.app.use(express.json());
        this.server = http.createServer(this.app);

        this.io = new SocketIOServer(this.server, {
            cors: {
                origin: '*',
            },
        });

        this.io.on('connection', this.onConnection);

        this.app.get('/stats', this.statsRoute.bind(this));
    }

    start(): Promise<void> | void {
        this.server.listen(this.port, () => {
            console.log(
                `📂 Backend API server is listening on port ${this.port}`,
            );
        });
    }

    stop(): Promise<void> | void {
        this.io.close();
        this.server.close();
    }

    private onConnection(
        socket: Socket<
            DefaultEventsMap,
            DefaultEventsMap,
            DefaultEventsMap,
            any
        >,
    ): void {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    }

    private statsRoute(req: Request, res: Response, next: NextFunction) {
        const stats: ChannelServiceStats = this.channelService.getStats();
        res.json(stats);
    }
}

export default BackendService;
