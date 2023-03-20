import { html, reactive } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidGiveConsent } from "../../classes/State";
import { SocketManager } from "../../Socket";

const onConsent = () => {
    setDidGiveConsent(true);
    SocketManager.getInstance().emit(SocketEvent.SendGiveConsent, undefined);
}

export const $instructions = html`
	<div>
		<h1>Erklärungddd der Studie</h1>
		
		<button @click="${onConsent}">Verstanden</button>
	</div>
`;
