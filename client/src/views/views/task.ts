import { html, reactive } from "@arrow-js/core";
import { Task } from "../../../../shared/Task";
import { TaskAnswer } from "../../../../shared/TaskAnswer";
import { loadingBarView } from "./loadingBar";
import { preTaskView } from "./preTask";
import { websiteResultView } from "./websiteResult";

export const taskView = (
	task: Task,
	onTaskComplete: (answer: TaskAnswer) => void
) => {
	const loadStates = reactive({
		isReady: false,
		isLoadingBarFinished: false,
	});
	return html`
		<div class="task">
			<h1>Task</h1>
			<p>Task ID: ${() => task.id}</p>
			${() => {
				if (!loadStates.isReady) {
					return preTaskView(() => {
						loadStates.isReady = true;
					});
				} else if (!loadStates.isLoadingBarFinished) {
					return loadingBarView(task.duration, () => {
						loadStates.isLoadingBarFinished = true;
					});
				} else {
					return websiteResultView(task.id, (answer) => {
						onTaskComplete(answer);
					});
				}
			}}
		</div>
	`;
};
