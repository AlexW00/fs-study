import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { getAppRoute } from "../../AppRoute";
import state from "../../classes/State";
import { SocketManager } from "../../Socket";
import { qrCodeView } from "../views/qrCode";

const onLeaveSession = () => {
	SocketManager.getInstance().emit(SocketEvent.DeleteSession, undefined);
};

export const $unpaired = html`
	<div>
		<h1>Nicht Verbunden</h1>
		${() => qrCodeView(state.pairingCode, getAppRoute(state))}
		<p class="end-text">
			Ihr Pairing code ist: <span id="participant-id">${() => state.pairingCode}</span>
		</p>
		<p class="end-text">
			Geben Sie ihn auf Ihren anderen Gerät ein oder scannen Sie den QR-Code.<br />
			Achten Sie darauf, dass <b>beide</b> Geräte während der Studie an sind
			(nicht in Standby).
		</p>
		<p id="leave-session-container">
			Um zurück zur Startseite zu gelangen, können Sie auch die
			<a id="leave-session" href="#" @click="${onLeaveSession}"
				>Session verlassen</a
			>
		</p>
	</div>
`;
