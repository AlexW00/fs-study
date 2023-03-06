import { SocketEvent } from "fs-lib";
import { io } from "socket.io-client";

export type SocketPayload = any;

export type SocketEventHandler = (payload: SocketPayload) => void;

const socket = io();

export const onSocketEvent = (
	event: SocketEvent,
	handler: SocketEventHandler
) => {
	socket.on(event, handler);
};

export const emitSocketEvent = (event: SocketEvent, payload: SocketPayload) => {
	socket.emit(event, payload);
};
