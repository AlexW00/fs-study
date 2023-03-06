import { Duration } from "./Duration";
import { Platform } from "./Platform";

export interface Task {
	id: string;
	website: string; // TODO: maybe just pick randomly for each task?
	platform: Platform;
	duration: Duration;
}

export const TASKS: Task[] = [
	{
		id: "0",
		website: "0",
		platform: Platform.desktop,
		duration: Duration.short,
	},
	{
		id: "1",
		website: "1",
		platform: Platform.desktop,
		duration: Duration.medium,
	},
	{
		id: "2",
		website: "2",
		platform: Platform.desktop,
		duration: Duration.long,
	},
	{
		id: "3",
		website: "3",
		platform: Platform.mobile,
		duration: Duration.short,
	},
	{
		id: "4",
		website: "4",
		platform: Platform.mobile,
		duration: Duration.medium,
	},
	{
		id: "3",
		website: "5",
		platform: Platform.mobile,
		duration: Duration.long,
	},
];

export function getTaskById(id: string): Task | undefined {
	return TASKS.find((task) => task.id === id);
}

export function getLatinSquaredTasks(index: number): Task[] {
	// TODO: Latin square here
	return TASKS;
}
