import { html, reactive } from "@arrow-js/core";
import { TaskAnswer } from "../../../../shared/TaskAnswer";
import state from "../../classes/State";
import {
	showLoadingBar,
	showWebsiteResultView,
} from "../../TaskViewController";
import { preTaskView } from "./preTask";

export const taskView = (
	taskIndex: number,
	onTaskComplete: (answer: TaskAnswer) => void
) => {
	const task = state.run.tasks[taskIndex];
	console.log("RENDER: taskView i:", taskIndex, "t:", task);
	const onFinishLoadingBar = () => showWebsiteResultView();

	return html`
		<div class="task">
			<div id="pre-task-container">
				${() => {
					return preTaskView(() =>
						showLoadingBar(task.duration, onFinishLoadingBar, {
							taskId: task.id,
							onFinished: onTaskComplete,
						})
					);
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
