import "./style.css";
import { emitSocketEvent, onSocketEvent } from "./Socket";
import { reactive } from "@arrow-js/core";
import { SocketEvent } from "../../shared/SocketEvent";

const state = reactive({
	isConnected: false,
});

console.log(SocketEvent);
onSocketEvent(SocketEvent.Connect, () => {
	state.isConnected = true;

	emitSocketEvent(SocketEvent.Test, "Hello, world!");
	console.log(SocketEvent.Connect);
});

onSocketEvent(SocketEvent.Disconnect, () => {
	state.isConnected = false;
});
