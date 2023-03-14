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
	const onFinishLoadingBar = () => showWebsiteResultView();

	const onFinishPreTask = () => {
		showLoadingBar(task.duration, onFinishLoadingBar, {
			taskId: task.id,
			onFinished: onTaskComplete,
		});
	};

	return html`
		<div class="task">
			<div id="pre-task-container">
				${() => {
					return preTaskView(onFinishPreTask);
				}}
			</div>

			<div id="loading-bar-container" class="hidden">
				<div class="loading-bar">
					<div class="loading-bar-progress">LOADING...</div>
				</div>
			</div>
			<div id="website-result-container" class="hidden"></div>
		</div>
	`;
};
