import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state from "../../classes/State";
import { SocketManager } from "../../Socket";

const onLeaveSession = () => {
	SocketManager.getInstance().emit(SocketEvent.DeleteSession, undefined);
};

export const $unpaired = html`
	<div>
		<h1>Nicht Verbunden</h1>
		<p>Pairing code: ${() => state.pairingCode}</p>
		<a href="#" @click="${onLeaveSession}">Verlasse Session</a>
	</div>
`;
