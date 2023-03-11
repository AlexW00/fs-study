import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidGiveConsent } from "../../classes/State";
import { emitSocketEvent, onSocketEvent } from "../../Socket";

const giveConsent = () => {
	setDidGiveConsent(true);
};

const onClickConsent = () => {
	giveConsent();
	emitSocketEvent(SocketEvent.SendGiveConsent, undefined);
};

onSocketEvent(SocketEvent.ReceiveGiveConsent, giveConsent);

export const $preStudy = html`
	<div>
		<h1>Pre Study</h1>
		<button @click="${onClickConsent}">Consent</button>
	</div>
`;
