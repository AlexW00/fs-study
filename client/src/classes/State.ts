import { Run } from "../../../shared/Run";
import { TaskProgress } from "../../../shared/TaskProgress";

export interface State {
	run: Run;
	isPaired: boolean;
}

export const initialState: State = {
	isPaired: false,
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
