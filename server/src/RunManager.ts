import {
	CurrentTaskInfo,
	newCurrentTaskInfo,
} from "../../shared/CurrentTaskInfo";
import { Run } from "../../shared/Run";
import { getLatinSquaredTasks } from "../../shared/Task";
import { TaskAnswer } from "../../shared/TaskAnswer";
import { TaskProgress } from "../../shared/TaskProgress";
import { storageManager } from "./StorageManager";

export class RunManager {
	private readonly runs: Run[] = [];

	public async init(): Promise<void> {
		this.runs.push(...(await storageManager.loadAllRuns()));
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
			tasks = getLatinSquaredTasks(index, id),
			run = {
				id,
				tasks,
				answers: [],
				current: newCurrentTaskInfo(),
			};
		storageManager.saveRun(run);
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

			if (run.current.taskIndex >= run.tasks.length) {
				run.current.taskProgress = TaskProgress.finished;
			} else run.current.taskProgress = TaskProgress.loading;

			storageManager.saveRun(run);
			if (run.current.taskProgress === TaskProgress.finished) {
				storageManager.completeRun(run);
			}
			return run.current;
		}
		return undefined;
	}

	public completeRun(runId: string): void {
		const run = this.getRun(runId);
		if (run) {
			storageManager.completeRun(run);
		}
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
