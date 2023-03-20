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

const onCheckConsent = () => {
	console.log("onCheckConsent");
	didCheckConsent.value = !didCheckConsent.value;
	if (didCheckConsent.value) {
		doShowCheckConsentError.value = false;
	}
};

const onClickConsent = () => {
	console.log("onClickConsent");
	if (!didCheckConsent.value) {
		doShowCheckConsentError.value = true;
	} else {
		doShowCheckConsentError.value = false;
		setDidGiveConsent(true);
		SocketManager.getInstance().emit(SocketEvent.SendGiveConsent, undefined);
	}
};

const $checkConsentError = html`
	<div id="check-consent-error">
		Bitte bestätigen Sie, dass Sie die Einverständniserklärung zur Aufklärung
		über die Teilnahme gelesen habe^n.
	</div>
`;
export const $consentConfirm = html`
<div class="consent-check" >
    <input type="checkbox" name="Einverständniserklärung" @input="${onCheckConsent} value="${didCheckConsent.value}"/>
    <label for="0">Ich habe die Einverständniserklärung zur Aufklärung über die Teilnahme sorgfältig durchgelesen und stimme dieser zu.</label>
</div>
</div>
    ${() => (doShowCheckConsentError.value ? $checkConsentError : "")}
    <button @click="${onClickConsent}">Weiter</button>
</div>
`;