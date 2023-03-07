import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state, { initialState, setPairingCode } from "../../classes/State";
import { emitSocketEvent, onSocketEvent } from "../../Socket";
import StorageManager from "../../StorageManager";

const onLeaveSession = () => {
	setPairingCode("");
	state.isPaired = false;
	emitSocketEvent(SocketEvent.DeleteSession, undefined);
};

onSocketEvent(SocketEvent.DeletedSession, () => {
	StorageManager.reset();
	Object.assign(state, initialState());
});

export const $unpaired = html`
	<div>
		<h1>Unpaired</h1>
		<p>Pairing code: ${() => state.pairingCode}</p>
		<a href="#" @click="${onLeaveSession}">Leave session</a>
	</div>
`;
