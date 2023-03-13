import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidGiveConsent } from "../../classes/State";
import { SocketManager } from "../../Socket";

export const giveConsent = () => {
	setDidGiveConsent(true);
};

const onClickConsent = () => {
	giveConsent();
	SocketManager.getInstance().emit(SocketEvent.SendGiveConsent, undefined);
};
export const $preStudy = html`
	<div>
		<h1>Pre Study</h1>
		<button @click="${onClickConsent}">Consent</button>
	</div>
`;
