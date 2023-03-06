import "./style.css";
import { onSocketEvent, SocketEvent } from "./Socket";
import { reactive } from "@arrow-js/core";

const state = reactive({
	isConnected: false,
});

onSocketEvent(SocketEvent.Connect, () => {
	state.isConnected = true;
});

onSocketEvent(SocketEvent.Disconnect, () => {
	state.isConnected = false;
});
