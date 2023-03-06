import { TaskProgress } from "./TaskProgress";

export interface CurrentTaskInfo {
	taskIndex: number;
	taskProgress: TaskProgress;
}

export const newCurrentTaskInfo = (): CurrentTaskInfo => {
	return {
		taskIndex: 0,
		taskProgress: TaskProgress.loading,
	};
};
