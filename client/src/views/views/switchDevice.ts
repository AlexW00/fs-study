import { html } from "@arrow-js/core";
import { getOtherPlatform } from "../../util";

export const switchDeviceView = () => html`
	<div class="switch-device">
		<h1>Gerätewechsel</h1>
		<p>
			Bitte fahren Sie auf dem
			${getOtherPlatform() === "mobile" ? "mobilen" : "Desktop -"} Gerät fort.
		</p>
	</div>
`;
