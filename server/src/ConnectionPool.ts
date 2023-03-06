import { Socket } from "socket.io";

interface Connection {
	mobile: Socket | undefined;
	desktop: Socket | undefined;
}

export class ConnectionPool {
	private readonly connections: Map<string, Connection> = new Map();

	public hasConnection(runId: string): boolean {
		return this.connections.has(runId);
	}

	public createNewConnection(runId: string, connection: Connection): void {
		this.connections.set(runId, connection);
	}
}
