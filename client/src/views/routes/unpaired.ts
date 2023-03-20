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
		<p>Dein Pairing code ist: <b>${() => state.pairingCode}</b> <br> Gib ihn auf deinem anderen Gerät ein oder</p>
		<a href="#" @click="${onLeaveSession}">Verlasse die Session</a>
		<p>Zum Verbinden kannst du auch diesen QR-Code benutzen:</p>
	</div>
`;
