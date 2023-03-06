import { Socket } from "socket.io";
import { Platform } from "../../shared/Platform";

export interface Connection {
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

	public getConnection(runId: string): Connection | undefined {
		return this.connections.get(runId);
	}

	public getRunId(socketId: string): string | undefined {
		for (const [runId, connection] of this.connections) {
			if (
				connection.mobile?.id === socketId ||
				connection.desktop?.id === socketId
			) {
				return runId;
			}
		}
		return undefined;
	}

	public addSocket(runId: string, socket: Socket, platform: Platform) {
		const connection = this.connections.get(runId);
		if (connection) {
			if (platform === Platform.mobile) {
				connection.mobile = socket;
			} else {
				connection.desktop = socket;
			}
		}
	}
}
