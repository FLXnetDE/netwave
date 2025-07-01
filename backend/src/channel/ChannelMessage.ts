type ChannelMessage = {
    channelId: number;
    value: number;
};

function parseChannelPacket(buffer: Buffer): ChannelMessage {
    if (buffer.length < 7) {
        throw new Error('Packet too short. Expected at least 7 bytes.');
    }

    const channelId = buffer.readUInt8(0);
    const value = buffer.readInt16BE(1);

    return { channelId, value };
}

export { ChannelMessage, parseChannelPacket };
