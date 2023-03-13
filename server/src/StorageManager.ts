import { Run } from "../../shared/Run";
import path from "path";
import fs from "fs";
import axios from "axios";

const RUNS_DIR = path.join(__dirname, "../../../../runs");
const IN_PROGRESS_RUNS_DIR = path.join(RUNS_DIR, "in-progress");
const COMPLETED_RUNS_DIR = path.join(RUNS_DIR, "completed");

export class StorageManager {
	constructor() {
		// check if dirs exist, otehrwise create them
		if (!fs.existsSync(RUNS_DIR)) {
			fs.mkdirSync(RUNS_DIR);
		}

		if (!fs.existsSync(IN_PROGRESS_RUNS_DIR)) {
			fs.mkdirSync(IN_PROGRESS_RUNS_DIR);
		}

		if (!fs.existsSync(COMPLETED_RUNS_DIR)) {
			fs.mkdirSync(COMPLETED_RUNS_DIR);
		}
	}

	getRunFilepath(runId: string, isCompleted: boolean): string {
		const dir = isCompleted ? COMPLETED_RUNS_DIR : IN_PROGRESS_RUNS_DIR;
		return path.join(dir, `${runId}.json`);
	}

	saveRun(run: Run) {
		const runId = run.id,
			runPath = this.getRunFilepath(runId, false),
			runJson = JSON.stringify(run);

		fs.writeFileSync(runPath, runJson);
	}

	loadRun(runId: string, isCompleted: boolean): Promise<Run | undefined> {
		const runPath = this.getRunFilepath(runId, isCompleted);

		return new Promise((resolve, reject) => {
			fs.readFile(runPath, "utf8", (error, data) => {
				if (error) {
					if (error.code === "ENOENT") {
						resolve(undefined);
					} else {
						reject(error);
					}
				} else {
					const run = JSON.parse(data) as Run;
					resolve(run);
				}
			});
		});
	}

	loadRuns(areComplete: boolean): Promise<Run[]> {
		const dir = areComplete ? COMPLETED_RUNS_DIR : IN_PROGRESS_RUNS_DIR;

		return new Promise((resolve, reject) => {
			fs.readdir(dir, (error, files) => {
				if (error) {
					reject(error);
				} else {
					const runs: Promise<Run | undefined>[] = [];
					for (const file of files) {
						const runId = file.split(".")[0];
						runs.push(this.loadRun(runId, areComplete));
					}
					Promise.all(runs).then((runs) => {
						resolve(runs.filter((run) => run !== undefined) as Run[]);
					});
				}
			});
		});
	}

	loadAllRuns(): Promise<Run[]> {
		return new Promise((resolve, reject) => {
			this.loadRuns(false)
				.then((inProgressRuns) => {
					this.loadRuns(true)
						.then((completedRuns) => {
							console.log(inProgressRuns.length, completedRuns.length);
							resolve(inProgressRuns.concat(completedRuns));
						})
						.catch((error) => {
							reject(error);
						});
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	// sends the run to discord via webhook
	postRunToDiscord(runId: string) {
		// get from env
		const WEBHOOK_URL = process.env.WEBHOOK_URL;
		if (!WEBHOOK_URL) {
			console.error("WEBHOOK_URL not set, cant send to discord");
			return;
		}

		const runPath = this.getRunFilepath(runId, true),
			runFile = fs.readFileSync(runPath),
			fileBlob = new Blob([runFile], { type: "application/json" }),
			payload_json = { content: "Run completed: " + runId },
			formData = new FormData();

		formData.append("payload_json", JSON.stringify(payload_json));
		formData.append("file", fileBlob, "run.json");

		// send json as a file to discord via webhook
		axios
			.post(WEBHOOK_URL, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error.response);
			});
	}

	completeRun(run: Run) {
		const runId = run.id,
			runPath = this.getRunFilepath(runId, false);

		fs.renameSync(runPath, path.join(COMPLETED_RUNS_DIR, runId + ".json"));
		this.postRunToDiscord(run.id);
	}

	getNumberOfTotalRuns(): Promise<number> {
		return new Promise((resolve, reject) => {
			fs.readdir(IN_PROGRESS_RUNS_DIR, (error, files) => {
				if (error) {
					reject(error);
				} else {
					const numberOfRuns = files.length;
					fs.readdir(COMPLETED_RUNS_DIR, (error, files) => {
						if (error) {
							reject(error);
						} else {
							resolve(numberOfRuns + files.length);
						}
					});
				}
			});
		});
	}
}

export const storageManager = new StorageManager();
