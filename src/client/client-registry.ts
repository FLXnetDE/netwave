import { channelManager } from '../channel/channel-manager';
import logger from '../util/logger';
import { Client } from './client';

const INACTIVITY_TIMEOUT: number = 30_000; // 30 seconds

class ClientRegistry {
    private clients = new Map<number, Client>();
    private nextClientId = 1;

    constructor() {
        setInterval(this.cleanupInactiveClients.bind(this), 10_000);
    }

    cleanupInactiveClients(): void {
        const now = Date.now();
        for (const [clientId, client] of this.clients.entries()) {
            if (now - client.lastActivity > INACTIVITY_TIMEOUT) {
                console.log(`[Cleanup] Removing inactive client ${clientId}`);
                this.clients.delete(clientId);
                channelManager.leaveChannel(clientId);
            }
        }
    }

    getClients(): Client[] {
        return Array.from(this.clients.values());
    }

    generateId(): number {
        return this.nextClientId++;
    }

    add(client: Client): void {
        this.clients.set(client.id, client);
    }

    getById(id: number): Client | undefined {
        return this.clients.get(id);
    }

    remove(id: number): void {
        this.clients.delete(id);
    }
}

const clientRegistry = new ClientRegistry();

export { ClientRegistry, clientRegistry };
