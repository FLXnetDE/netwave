export interface Client {
    id: number;
    address: string;
    port: number;
    joinedAt: number;
    lastActivity: number;
}

export default Client;
