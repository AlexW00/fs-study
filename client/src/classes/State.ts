import { Run } from "../../../shared/Run";
import { TaskProgress } from "../../../shared/TaskProgress";

export interface State {
	run: Run;
	isConnected: boolean;
}

export const initialState: State = {
	isConnected: false,
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
