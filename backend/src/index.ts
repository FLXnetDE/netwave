import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('audio-data', (chunk: ArrayBuffer) => {
        console.log(`Received audio chunk of ${chunk.byteLength} bytes`);
        // Here you can save/process/playback the chunk
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
