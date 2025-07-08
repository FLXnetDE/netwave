import { Client } from './client';

class ClientRegistry {
    private clients = new Map<number, Client>();
    private nextClientId = 1;

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
