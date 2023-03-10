import { html, reactive } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state from "../../classes/State";
import { emitSocketEvent, onSocketEvent } from "../../Socket";
import { getPlatform } from "../../util";

let pairCode = reactive({
	value: "",
});

let doShowError = reactive({
	isInvalidAuth: false,
	isInvalidPairCode: false,
});

const hasPairingCode = reactive({
	value: false,
});

const onInputPairCode = (e: any) => {
	pairCode.value = e.target.value;
};

const isValidPairCode = (code: string) => {
	return code.length === 5;
};

const createNewSession = () => {
	emitSocketEvent(SocketEvent.SendCreateAuth, {
		platform: getPlatform(),
	});
};

const joinSession = (code: string) => {
	emitSocketEvent(SocketEvent.SendAuth, {
		platform: getPlatform(),
		runId: code,
	});
};

const onClickPair = (doValidate: boolean) => {
	doShowError.isInvalidPairCode = false;
	doShowError.isInvalidAuth = false;
	if (doValidate && isValidPairCode(pairCode.value)) {
		joinSession(pairCode.value);
	} else if (!doValidate) {
		createNewSession();
	} else {
		doShowError.isInvalidPairCode = true;
	}
};

const togglePairingCodeCategory = () => {
	hasPairingCode.value = !hasPairingCode.value;
};

onSocketEvent(SocketEvent.ReceiveFailedAuth, () => {
	console.log("failed auth");
	doShowError.isInvalidAuth = true;
});

const $noPairingCodeCategory = html`
	<button @click="${() => onClickPair(false)}">Start</button>
	<div>
		Or
		<a href="#" @click="${() => togglePairingCodeCategory()}">
			enter a pairing code
		</a>
	</div>
`;

const $pairingCodeCategory = html`
	<label for="pairCode">Pairing Code:</label>
	<input
		type="text"
		id="pairCode"
		placeholder="12345"
		@input="${(e: any) => onInputPairCode(e)}"
		value="${() => pairCode.value}"
		maxlength="5"
	/>
	<button @click="${() => onClickPair(true)}">Pair</button>
	${() => {
		if (doShowError.isInvalidPairCode) {
			return html`<p>Invalid pair code</p>`;
		} else if (doShowError.isInvalidAuth) {
			return html`<p>Session does not exist!</p>`;
		} else {
			return html``;
		}
	}}
	<div>
		Or
		<a href="#" @click="${() => togglePairingCodeCategory()}">
			start without a pairing code
		</a>
	</div>
`;

export const $setup = html`
	<div>
		<h1>Setup</h1>
		${() => {
			if (hasPairingCode.value) {
				return $pairingCodeCategory;
			} else {
				return $noPairingCodeCategory;
			}
		}}
	</div>
`;
