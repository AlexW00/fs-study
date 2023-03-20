import { html } from "@arrow-js/core";

import { $consent } from "./consent";
import { $consentConfirm } from "./consentConfirm";


export const $preStudy = html`
<div>
	${$consent}
	${$consentConfirm}
</div>
`;
