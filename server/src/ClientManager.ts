import { Server } from "socket.io";
import http from "http";
import { ConnectionPool } from "./ConnectionPool";
import { SocketEvent } from "../../shared/SocketEvent";

export class ClientManager {
	private readonly socket: Server;
	private readonly connectionPool: ConnectionPool;

	constructor(server: http.Server) {
		this.socket = new Server(server);
		this.connectionPool = new ConnectionPool();
		this.socket.on(SocketEvent.Connect, (socket) => {
			console.log("a user connected");

			socket.on(SocketEvent.Disconnect, this.onDisconnect);
			socket.on(SocketEvent.GetRun, this.onGetRun);
			socket.on(SocketEvent.Test, this.onTest);
		});
	}

	private onDisconnect = () => {
		console.log("user disconnected");
	};

	private onGetRun = (runId: string) => {
		console.log(runId);
		// runId might be undefined if the client doesn't have a runId yet
	};

	private onTest = (msg: string) => {
		console.log(msg);
	};
}
