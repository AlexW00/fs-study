import { State } from "./classes/State";

export enum AppRoute {
	Setup = "setup",
	Unpaired = "unpaired",
	PreStudy = "pre-study",
	Study = "study",
	PostStudy = "post-study",
}

export const getAppRoute = (state: State): AppRoute => {
	if (!state.didGiveConsent && !state.isPaired) return AppRoute.Setup;
	else if (state.didGiveConsent && !state.isPaired) return AppRoute.Unpaired;
	else if (!state.didGiveConsent && state.isPaired) return AppRoute.PreStudy;
	else if (state.run.tasks.length === state.run.current.taskIndex + 1)
		return AppRoute.PostStudy;
	else return AppRoute.Study;
};
