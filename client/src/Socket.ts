import { io } from "socket.io-client";

export enum SocketEvent {
	Connect = "connect",
	Disconnect = "disconnect",
}

export type SocketPayload = any;

export type SocketEventHandler = (payload: SocketPayload) => void;

const socket = io();

export const onSocketEvent = (
	event: SocketEvent,
	handler: SocketEventHandler
) => {
	socket.on(event, handler);
};
