import { TaskProgress } from "../../shared/TaskProgress";
import { State } from "./classes/State";

export enum AppRoute {
	Setup = "setup",
	Unpaired = "unpaired",
	PreStudy = "pre-study",
	Instructions = "instructions",
	Study = "study",
	PostStudy = "post-study",
}

export const getAppRoute = (state: State): AppRoute => {
	console.log(
		state.didGiveConsent,
		state.pairingCode,
		state.isPaired,
		state.run.tasks.length,
		state.run.current.taskProgress
	);
	if (
		(!state.didGiveConsent && state.pairingCode === "") ||
		state.run.tasks.length === 0
	)
		return AppRoute.Setup;
	else if (state.pairingCode !== "" && !state.isPaired)
		return AppRoute.Unpaired;
	else if (!state.didGiveConsent && state.isPaired) return AppRoute.PreStudy;
	else if (!state.didReadInstructions && state.isPaired)
		return AppRoute.Instructions;
	else if (state.run.current.taskProgress === TaskProgress.finished)
		return AppRoute.PostStudy;
	else return AppRoute.Study;
};
