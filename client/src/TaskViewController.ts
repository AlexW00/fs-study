import { Duration } from "../../shared/Duration";
import { TaskAnswer } from "../../shared/TaskAnswer";
import { loadingBarView } from "./views/views/loadingBar";
import { websiteResultView } from "./views/views/websiteResult";

const $getContainer = () => document.getElementById("task-container")!;

const $clearContainer = () => {
	const container = $getContainer();
	container.innerHTML = "";
};

export const showLoadingBar = (duration: Duration, onFinished: () => void) => {
	const container = $getContainer();
	loadingBarView(duration, () => {
		$clearContainer();
		onFinished();
	})(container);
};

export const showWebsiteResultView = (
	taskId: string,
	onFinished: (answer: TaskAnswer) => void
) => {
	const container = $getContainer();
	$clearContainer();
	websiteResultView(taskId, (answer) => {
		$clearContainer();
		onFinished(answer);
	})(container);
};
