import { Duration } from "./Duration";
import { Platform } from "./Platform";

export interface Task {
	id: string;
	website: string;
	platform: Platform;
	duration: Duration;
}

export const TASKS: Task[] = [
	{
		id: "1",
		website: "1",
		platform: Platform.desktop,
		duration: Duration.short,
	},
];

export function getTaskById(id: string): Task | undefined {
	return TASKS.find((task) => task.id === id);
}
