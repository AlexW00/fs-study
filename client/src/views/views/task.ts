import { html, reactive } from "@arrow-js/core";
import { Task } from "../../../../shared/Task";
import { TaskAnswer } from "../../../../shared/TaskAnswer";
import {
	showLoadingBar,
	showWebsiteResultView,
} from "../../TaskViewController";
import { preTaskView } from "./preTask";

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
			${() => {
				if (!loadStates.isReady) {
					return preTaskView(() => {
						loadStates.isReady = true;
						showLoadingBar(task.duration, () =>
							showWebsiteResultView(task.id, onTaskComplete)
						);
					});
				} else return "";
			}}
			<div id="task-container"></div>
		</div>
	`;
};
