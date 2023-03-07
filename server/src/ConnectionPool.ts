import { Socket } from "socket.io";
import { Platform } from "../../shared/Platform";
import { SocketEvent } from "../../shared/SocketEvent";

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

	private notifyPaired(connection: Connection) {
		connection.mobile?.emit(SocketEvent.Paired);
		connection.desktop?.emit(SocketEvent.Paired);
	}

	private notifyUnpaired(connection: Connection) {
		connection.mobile?.emit(SocketEvent.Unpaired);
		connection.desktop?.emit(SocketEvent.Unpaired);
	}

	public addSocket(runId: string, socket: Socket, platform: Platform) {
		const connection = this.connections.get(runId);
		if (connection) {
			if (platform === Platform.mobile) connection.mobile = socket;
			else connection.desktop = socket;
			this.notifyPaired(connection);
		}
	}

	public removeSocket(socket: Socket) {
		for (const [runId, connection] of this.connections) {
			if (connection.mobile?.id === socket.id) {
				connection.mobile = undefined;
				this.notifyUnpaired(connection);
			} else if (connection.desktop?.id === socket.id) {
				connection.desktop = undefined;
				this.notifyUnpaired(connection);
			}
		}
	}
}
