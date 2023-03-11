import { TaskProgress } from "../../shared/TaskProgress";
import { State } from "./classes/State";

export enum AppRoute {
	Setup = "setup",
	Unpaired = "unpaired",
	PreStudy = "pre-study",
	Study = "study",
	PostStudy = "post-study",
}

export const getAppRoute = (state: State): AppRoute => {
	console.log(state.didGiveConsent, state.pairingCode, state.isPaired);
	if (!state.didGiveConsent && state.pairingCode === "") return AppRoute.Setup;
	else if (state.pairingCode !== "" && !state.isPaired)
		return AppRoute.Unpaired;
	else if (!state.didGiveConsent && state.isPaired) return AppRoute.PreStudy;
	else if (state.run.current.taskProgress === TaskProgress.finished)
		return AppRoute.PostStudy;
	else return AppRoute.Study;
};
