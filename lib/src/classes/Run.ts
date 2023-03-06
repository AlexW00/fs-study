import { CurrentTaskInfo } from "./CurrentTaskInfo";
import { Task } from "./Task";
import { TaskAnswer } from "./TaskAnswer";

export interface Run {
	id: string;
	tasks: Task[];
	answers: TaskAnswer[];
	current: CurrentTaskInfo;
}
