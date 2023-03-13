import { Duration } from "./Duration";
import { Platform } from "./Platform";

export interface Task {
	id: string;
	platform: Platform;
	duration: Duration;
}

export const TASKS: Task[] = [
	{
		id: "0",
		platform: Platform.desktop,
		duration: Duration.short,
	},
	{
		id: "1",
		platform: Platform.desktop,
		duration: Duration.medium,
	},
	{
		id: "2",
		platform: Platform.desktop,
		duration: Duration.long,
	},
	{
		id: "3",
		platform: Platform.mobile,
		duration: Duration.short,
	},
	{
		id: "4",
		platform: Platform.mobile,
		duration: Duration.medium,
	},
	{
		id: "5",
		platform: Platform.mobile,
		duration: Duration.long,
	},
];

const LATIN_SQUARE_TASK_IDs = [
	[0, 2, 5, 4, 5, 3],
	[2, 4, 0, 3, 5, 5],
	[4, 3, 2, 5, 0, 5],
	[3, 5, 4, 5, 2, 0],
	[5, 5, 3, 0, 4, 2],
	[5, 0, 5, 2, 3, 4],
];

const getRow = (index: number): number => {
	return index % LATIN_SQUARE_TASK_IDs.length;
};

export function getTaskById(id: string): Task | undefined {
	return TASKS.find((task) => task.id === id);
}

export function getLatinSquaredTasks(index: number): Task[] {
	// TODO: Latin square here
	const TASKS: Task[] = [];

	for (let i = getRow(index); i < LATIN_SQUARE_TASK_IDs.length; i++) {
		const taskIds = LATIN_SQUARE_TASK_IDs[i];
		taskIds.forEach((taskId) => {
			const task = getTaskById(taskId.toString());
			if (task) TASKS.push(task);
		});
	}

	return TASKS;
}
