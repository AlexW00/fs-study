import {
	CurrentTaskInfo,
	newCurrentTaskInfo,
} from "../../shared/CurrentTaskInfo";
import { Run } from "../../shared/Run";
import { getLatinSquaredTasks } from "../../shared/Task";
import { TaskAnswer } from "../../shared/TaskAnswer";
import { TaskProgress } from "../../shared/TaskProgress";

export class RunManager {
	private readonly runs: Run[];

	constructor() {
		this.runs = []; // TODO: Load json?
	}

	public getTotalNumberOfRuns(): number {
		return this.runs.length;
	}

	public getRun(runId: string): Run | undefined {
		return this.runs.find((run) => run.id === runId);
	}

	public newRun(): Run {
		const index = this.getTotalNumberOfRuns(),
			id = this.generateNextRunId(),
			tasks = getLatinSquaredTasks(index),
			run = {
				id,
				tasks,
				answers: [],
				current: newCurrentTaskInfo(),
			};
		this.runs.push(run);
		return run;
	}

	public completeTask(
		runId: string,
		answer: TaskAnswer
	): CurrentTaskInfo | undefined {
		const run = this.getRun(runId);
		if (run) {
			run.answers.push(answer);
			run.current.taskIndex++;
			run.current.taskProgress = TaskProgress.loading;
			return run.current;
		}
		return undefined;
	}

	public hasRun(runId: string): boolean {
		return this.getRun(runId) !== undefined;
	}

	private generateNextRunId(): string {
		const totalNumberOfRuns = this.getTotalNumberOfRuns();
		const nextRunId = totalNumberOfRuns.toString(36);
		return nextRunId.padStart(5, "0");
	}
}
