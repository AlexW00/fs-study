import { html, reactive } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { SocketManager } from "../../Socket";
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
	return code.length === 3;
};

const createNewSession = () => {
	SocketManager.getInstance().emit(SocketEvent.SendCreateAuth, {
		platform: getPlatform(),
	});
};

const joinSession = (code: string) => {
	SocketManager.getInstance().emit(SocketEvent.SendAuth, {
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

const $noPairingCodeCategory = html`
	<button @click="${() => onClickPair(false)}">Start</button>
	<div>
		Wenn Sie bereits einen Pairing Code haben, geben Sie ihn hier ein:
		<a href="#" @click="${() => togglePairingCodeCategory()}">
			Pairing code eingeben
		</a>
	</div>
`;

const $pairingCodeCategory = html`
	<label for="pairCode">Ihr Pairing Code zum Verbinden:</label>
	<input
		type="text"
		id="pairCode"
		placeholder="123"
		@input="${(e: any) => onInputPairCode(e)}"
		value="${() => pairCode.value}"
		maxlength="5"
	/>
	<button @click="${() => onClickPair(true)}">Verbinden</button>
	${() => {
		if (doShowError.isInvalidPairCode) {
			return html`<p>Ungültiger pair code</p>`;
		} else if (doShowError.isInvalidAuth) {
			return html`<p>Pairing code existiert nicht!</p>`;
		} else {
			return html``;
		}
	}}
	<div>
		Sie Haben noch keinen Pairing Code? Dann erstellen Sie hier einen:
		<a href="#" @click="${() => togglePairingCodeCategory()}">
			Pairing Code erstellen
		</a>
	</div>
`;

export const $setup = html`
	<div>
		<h1>Verbinden Sie Ihre Geräte:</h1>
		${() => {
			if (hasPairingCode.value) {
				return $pairingCodeCategory;
			} else {
				return $noPairingCodeCategory;
			}
		}}
	</div>
`;
