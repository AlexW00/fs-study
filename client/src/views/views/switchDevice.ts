import { html } from "@arrow-js/core";
import { getOtherPlatform } from "../../util";

export const switchDeviceView = () => html`
	<div class="switch-device">
		<h1>Switch Device</h1>
		<p>Please continue on your ${getOtherPlatform()} device.</p>
	</div>
`;
