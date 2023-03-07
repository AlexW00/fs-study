import { html } from "@arrow-js/core";
import state from "../../classes/State";

export const $unpaired = html`
	<div>
		<h1>Unpaired</h1>
		<p>Pairing code: ${() => state.pairingCode}</p>
	</div>
`;
