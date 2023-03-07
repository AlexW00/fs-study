import { reactive } from "@arrow-js/core";
import { Run } from "../../../shared/Run";
import { TaskProgress } from "../../../shared/TaskProgress";
import StorageManager from "../StorageManager";

export interface State {
	run: Run;
	isPaired: boolean;
	pairingCode: string;
	didGiveConsent: boolean;
}

const initialState: State = {
	isPaired: false,
	pairingCode: StorageManager.getPairingCode(),
	didGiveConsent: StorageManager.getDidGiveConsent(),
	run: {
		id: "",
		tasks: [],
		answers: [],
		current: {
			taskIndex: -1,
			taskProgress: TaskProgress.loading,
		},
	},
};

export const setDidGiveConsent = (didGiveConsent: boolean): void => {
	state.didGiveConsent = didGiveConsent;
	StorageManager.setDidGiveConsent(didGiveConsent);
};

export const setPairingCode = (pairingCode: string): void => {
	state.pairingCode = pairingCode;
	StorageManager.setPairingCode(pairingCode);
};

const state = reactive<State>(initialState);

export default state;
