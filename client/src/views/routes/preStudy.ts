import { html } from "@arrow-js/core";
import { setDidGiveConsent } from "../../classes/State";

export const $preStudy = html`
	<div>
		<h1>Pre Study</h1>
		<button @click="${() => setDidGiveConsent(true)}">Consent</button>
	</div>
`;
