import dgram from 'node:dgram';

const PORT = 5005;
const socket = dgram.createSocket('udp4');

socket.on('listening', () => {
    const address = socket.address();
    console.log(
        `UDP Receiver is listening on ${address.address}:${address.port}`,
    );
});

socket.on('message', (msg, rinfo) => {
    console.log(
        `Received ${msg.length} bytes from ${rinfo.address}:${rinfo.port}`,
    );
    // You could process or forward this buffer here
});

socket.bind(PORT);
