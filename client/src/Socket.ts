import { io, Socket } from "socket.io-client";
import { SocketEvent } from "../../shared/SocketEvent";

export type SocketPayload = any;

export type SocketEventHandler = (payload: SocketPayload) => void;

export class SocketManager {
	private static instance: SocketManager;
	private socket: Socket;

	private static isInitialized = false;

	private constructor() {
		this.socket = io();
	}

	public static async init() {
		return new Promise<void>((resolve) => {
			SocketManager.instance = new SocketManager();
			SocketManager.instance.socket.on(SocketEvent.Connect, () => {
				SocketManager.isInitialized = true;
				resolve();
			});
		});
	}

	public static getInstance(): SocketManager {
		if (!SocketManager.isInitialized) {
			throw new Error("SocketManager not initialized, call init() first");
		}
		return SocketManager.instance;
	}

	public on(event: SocketEvent, handler: SocketEventHandler) {
		this.socket.on(event, handler);
	}

	public emit(event: SocketEvent, payload: SocketPayload) {
		this.socket.emit(event, payload);
	}
}
