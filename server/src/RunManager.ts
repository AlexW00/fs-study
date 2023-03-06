import { Run } from "../../shared/Run";

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

	private generateNextRunId(): string {
		const totalNumberOfRuns = this.getTotalNumberOfRuns();
		const nextRunId = totalNumberOfRuns.toString(36);
		return nextRunId.padStart(5, "0");
	}
}
