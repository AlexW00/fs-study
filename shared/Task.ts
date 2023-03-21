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

//original:
// const LATIN_SQUARE_TASK_IDs = [
// [1, 2, 0, 4, 5, 3],
// [2, 4, 1, 3, 0, 5],
// [4, 3, 2, 5, 1, 0],
// [3, 5, 4, 0, 2, 1],
// [5, 0, 3, 1, 4, 2],
// [0, 1, 5, 2, 3, 4]
// ];

//new starting with mobile 3
const LATIN_SQUARE_TASK_IDs = [
	[4, 5, 3, 1, 2, 0],
	[5, 4, 4, 0, 0, 2],
	[4, 3, 5, 2, 1, 0],
	[3, 5, 4, 0, 2, 1],
	[5, 3, 3, 1, 1, 2],
	[3, 4, 5, 2, 0, 1]
];

//new starting with desktop 3
const LATIN_SQUARE_TASK_IDs2 = [
	[1, 2, 0, 4, 5, 3],
	[2, 1, 1, 3, 3, 5],
	[1, 0, 2, 5, 4, 3],
	[0, 2, 1, 3, 5, 4],
	[2, 0, 0, 4, 4, 5],
	[0, 1, 2, 5, 3, 4]
];

const getRow = (index: number): number => {

	return index % LATIN_SQUARE_TASK_IDs.length; //here ok, both LS have same length
};

export function getTaskById(id: string): Task | undefined {
	return TASKS.find((task) => task.id === id);
}

//get current starting LS by run id 
const getLS3 = (id: string): boolean => {
	var s = id;
	while (s.charAt(0) === '0') {
		s = s.substring(1);
	}
	s = (s.length == 0) ? "0" : s;
	var n = parseInt(s);
	return (n % 2 == 0);
};

export function getLatinSquaredTasks(index: number, id:string): Task[] {
	// TODO: Latin square here
	const TASKS: Task[] = [];
	var currentIDs = LATIN_SQUARE_TASK_IDs;

	if (getLS3(id)) {
		currentIDs = LATIN_SQUARE_TASK_IDs2;
	}
	
	console.log(id, "id ------------------------------------------------------------------------------------");
	console.log(currentIDs);
	console.log("is desktop");
	console.log(getLS3(id));
	for (let i = getRow(index); i < currentIDs.length; i++) {
		const taskIds = currentIDs[i];
		taskIds.forEach((taskId) => {
			const task = getTaskById(taskId.toString());
			if (task) TASKS.push(task);
		});
	}

	return TASKS;
}
