import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state, { initialState } from "../../classes/State";
import { SocketManager } from "../../Socket";
import StorageManager from "../../StorageManager";

const onLeaveSession = () => {
	SocketManager.getInstance().emit(SocketEvent.DeleteSession, undefined);
};

export const $unpaired = html`
	<div>
		<h1>Unpaired</h1>
		<p>Pairing code: ${() => state.pairingCode}</p>
		<a href="#" @click="${onLeaveSession}">Leave session</a>
	</div>
`;
