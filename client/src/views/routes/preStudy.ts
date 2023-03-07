import { html } from "@arrow-js/core";
import { setDidGiveConsent } from "../../classes/State";

// call this when the user clicks the consent button
const giveConsent = () => {
	setDidGiveConsent(true);
};

export const $preStudy = html`
	<div>
		<h1>Pre Study</h1>
		<button @click="${giveConsent}">Consent</button>
	</div>
`;
