class ChannelManager {
    private channelMap = new Map<number, Set<number>>();
    private clientMap = new Map<number, number>(); // clientId → channelId

    joinChannel(clientId: number, channelId: number): void {
        if (!this.channelMap.has(channelId)) {
            this.channelMap.set(channelId, new Set());
        }
        this.channelMap.get(channelId)!.add(clientId);
        this.clientMap.set(clientId, channelId);
    }

    leaveChannel(clientId: number): void {
        const channelId = this.clientMap.get(clientId);
        if (channelId !== undefined) {
            const clients = this.channelMap.get(channelId);
            clients?.delete(clientId);
            if (clients?.size === 0) {
                this.channelMap.delete(channelId);
            }
            this.clientMap.delete(clientId);
        }
    }

    getClientsInChannel(channelId: number): Set<number> {
        return this.channelMap.get(channelId) ?? new Set();
    }

    getChannelOfClient(clientId: number): number | undefined {
        return this.clientMap.get(clientId);
    }
}

const channelManager: ChannelManager = new ChannelManager();

export { ChannelManager, channelManager };
