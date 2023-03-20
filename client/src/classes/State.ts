import { reactive } from "@arrow-js/core";
import { Run } from "../../../shared/Run";
import { TaskProgress } from "../../../shared/TaskProgress";
import StorageManager from "../StorageManager";

export interface State {
	run: Run;
	isPaired: boolean;
	pairingCode: string;
	didGiveConsent: boolean;
	didReadInstructions: boolean;
}

export const initialState = (): State => {
	return {
		isPaired: false,
		pairingCode: StorageManager.getPairingCode(),
		didGiveConsent: StorageManager.getDidGiveConsent(),
		didReadInstructions: StorageManager.getDidReadInstructions(),
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
};

export const setDidGiveConsent = (didGiveConsent: boolean): void => {
	state.didGiveConsent = didGiveConsent;
	StorageManager.setDidGiveConsent(didGiveConsent);
};

export const setDidReadInstructions = (didReadInstructions: boolean): void => {
	state.didReadInstructions = didReadInstructions;
	StorageManager.setDidReadInstructions(didReadInstructions);
};

export const setPairingCode = (pairingCode: string): void => {
	state.pairingCode = pairingCode;
	StorageManager.setPairingCode(pairingCode);
};

const state = reactive<State>(initialState());

export default state;
