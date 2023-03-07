import { Server, Socket } from "socket.io";
import http from "http";
import { Connection, ConnectionPool } from "./ConnectionPool";
import { SocketEvent } from "../../shared/SocketEvent";
import { RunManager } from "./RunManager";
import { TaskAnswer } from "../../shared/TaskAnswer";

export class ClientManager {
	private readonly socket: Server;
	private readonly connectionPool: ConnectionPool;
	private readonly runManager: RunManager;

	constructor(server: http.Server) {
		this.socket = new Server(server);
		this.connectionPool = new ConnectionPool();
		this.runManager = new RunManager();

		this.socket.on(SocketEvent.Connect, (socket) => {
			console.log("a user connected");
			this.listen(socket, SocketEvent.Disconnect, this.onDisconnect);
			this.listen(socket, SocketEvent.SendAuth, this.onSendAuth);
			this.listen(socket, SocketEvent.SendCreateAuth, this.onCreateAuth);
			this.listen(socket, SocketEvent.Test, this.onTest);
			this.listen(socket, SocketEvent.PostAnswer, this.onPostAnswer);
			this.listen(socket, SocketEvent.DeleteSession, this.onDeleteSession);
		});
	}

	private listen(
		socket: Socket,
		eventType: SocketEvent,
		cb: (socket: Socket, payload: any) => void
	) {
		socket.on(eventType, (payload: any) => cb(socket, payload));
	}

	private onDisconnect = (socket: Socket) => {
		console.log("user disconnected");
		this.connectionPool.removeSocket(socket);
	};

	private onSendAuth = (socket: Socket, auth: any) => {
		console.log("auth", auth);
		const platform = auth.platform,
			run = this.runManager.getRun(auth.runId);
		if (run) {
			if (this.connectionPool.hasConnection(run.id)) {
				this.connectionPool.addSocket(run.id, socket, platform);
			} else {
				this.connectionPool.createNewConnection(run.id, {
					mobile: platform === "mobile" ? socket : undefined,
					desktop: platform === "desktop" ? socket : undefined,
				});
			}
			socket.emit(SocketEvent.ReceiveAuth, { run });
		} else {
			socket.emit(SocketEvent.ReceiveFailedAuth);
		}
	};

	private onCreateAuth = (socket: Socket, auth: any) => {
		const platform = auth.platform,
			run = this.runManager.newRun();

		const connection: Connection = {
			mobile: platform === "mobile" ? socket : undefined,
			desktop: platform === "desktop" ? socket : undefined,
		};
		this.connectionPool.createNewConnection(run.id, connection);

		socket.emit(SocketEvent.ReceiveAuth, { run });
	};

	private onPostAnswer = (socket: Socket, answer: TaskAnswer) => {
		const runId = this.connectionPool.getRunId(socket.id);
		console.log("post answer", runId, answer);
		if (runId) {
			const taskProgress = this.runManager.completeTask(runId, answer);
			if (taskProgress) {
				const connection = this.connectionPool.getConnection(runId);
				if (connection) {
					connection.mobile?.emit(
						SocketEvent.ReceiveTaskProgressUpdate,
						taskProgress
					);
					connection.desktop?.emit(
						SocketEvent.ReceiveTaskProgressUpdate,
						taskProgress
					);
				}
			}
		}
	};

	private onDeleteSession = (socket: Socket) => {
		const runId = this.connectionPool.getRunId(socket.id);
		if (runId) {
			this.connectionPool.removeConnection(runId);
		}
	};

	private onTest = (socket: Socket, msg: string) => {
		console.log(msg);
	};
}
