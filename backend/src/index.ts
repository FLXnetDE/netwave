import express from 'express';
import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());

const PORT = 3000;

// Start the Express server and get the returned HTTP server instance implicitly
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Initialize socket.io on top of the httpServer
const io = new Server(httpServer, {
    cors: {
        origin: '*', // loosen CORS for dev
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('audio-data', (data: ArrayBuffer) => {
        socket.broadcast.emit('audio-data', data);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});
