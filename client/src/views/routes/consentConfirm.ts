import { html, reactive } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidGiveConsent } from "../../classes/State";
import { SocketManager } from "../../Socket";

const didCheckConsent = reactive({
	value: false,
});

const doShowCheckConsentError = reactive({
	value: false,
});

const onConsent = () => {
    setDidGiveConsent(true);
    SocketManager.getInstance().emit(SocketEvent.SendGiveConsent, undefined);
}


// const onCheckConsent = () => {
// 	didCheckConsent.value = !didCheckConsent.value;
// 	if (didCheckConsent.value) {
// 		doShowCheckConsentError.value = false;
// 	}
// };

const onClickConsent = () => {
	console.log("onClickConsent");
	if (!didCheckConsent.value) {
		doShowCheckConsentError.value = true;
	} else {
		doShowCheckConsentError.value = false;
		onConsent();
	}
};

// const $checkConsentError = html`
// 	<div id="check-consent-error">
// 		Bitte bestätigen Sie, dass Sie die Einverständniserklärung zur Aufklärung
// 		über die Teilnahme gelesen habe^n.
// 	</div>
// `;

export const $consentConfirm = html`

    <button @click="${onClickConsent}">Verstanden</button>
`;