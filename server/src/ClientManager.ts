import { Server, Socket } from "socket.io";
import http from "http";
import { Connection, ConnectionPool } from "./ConnectionPool";
import { SocketEvent } from "../../shared/SocketEvent";
import { RunManager } from "./RunManager";
import { TaskAnswer } from "../../shared/TaskAnswer";
import { Platform } from "../../shared/Platform";

export class ClientManager {
	private readonly socket: Server;
	private readonly connectionPool: ConnectionPool;
	private readonly runManager: RunManager;

	constructor(server: http.Server, runManager: RunManager) {
		this.socket = new Server(server);
		this.runManager = runManager;
		this.connectionPool = new ConnectionPool();

		this.socket.on(SocketEvent.Connect, (socket) => {
			console.log("a user connected");
			this.listen(socket, SocketEvent.Disconnect, this.onDisconnect);
			this.listen(socket, SocketEvent.SendAuth, this.onSendAuth);
			this.listen(socket, SocketEvent.SendCreateAuth, this.onCreateAuth);
			this.listen(socket, SocketEvent.Test, this.onTest);
			this.listen(socket, SocketEvent.PostAnswer, this.onPostAnswer);
			this.listen(socket, SocketEvent.DeleteSession, this.onDeleteSession);
			this.listen(socket, SocketEvent.SendGiveConsent, this.onGiveConsent);
			this.listen(
				socket,
				SocketEvent.SendReadInstructions,
				this.onReadInstructions
			);
		});
	}

	public async init() {
		await this.runManager.init();
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
			console.log("run found", auth.runId);
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
			console.log("run not found", auth.runId);
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
		// TODO: remove run as well
		const runId = this.connectionPool.getRunId(socket.id);
		if (runId) {
			this.connectionPool.removeConnection(runId);
		} else {
			console.log("run not found");
			socket.emit(SocketEvent.DeletedSession);
		}
	};

	private onGiveConsent = (socket: Socket) => {
		const runId = this.connectionPool.getRunId(socket.id);
		if (runId) {
			const connection = this.connectionPool.getConnection(runId),
				senderPlatform = this.connectionPool.getPlatform(socket.id, runId);
			if (connection) {
				if (senderPlatform === Platform.mobile)
					connection.desktop?.emit(SocketEvent.ReceiveGiveConsent);
				else connection.mobile?.emit(SocketEvent.ReceiveGiveConsent);
			}
		}
	};

	private onReadInstructions = (socket: Socket) => {
		const runId = this.connectionPool.getRunId(socket.id);
		if (runId) {
			const connection = this.connectionPool.getConnection(runId),
				senderPlatform = this.connectionPool.getPlatform(socket.id, runId);
			if (connection) {
				if (senderPlatform === Platform.mobile)
					connection.desktop?.emit(SocketEvent.ReceiveReadInstructions);
				else connection.mobile?.emit(SocketEvent.ReceiveReadInstructions);
			}
		}
	};

	private onTest = (socket: Socket, msg: string) => {
		console.log(msg);
	};
}
