import { Duration } from "../../shared/Duration";
import { awaitDuration } from "./views/views/loadingBar";
import {
	websiteResultView,
	WebsiteResultViewProps,
} from "./views/views/websiteResult";

const $loadingBarContainer = () =>
	document.getElementById("loading-bar-container")!;
const $websiteResultContainer = () =>
	document.getElementById("website-result-container")!;
const $preTaskViewContainer = () =>
	document.getElementById("pre-task-container")!;

const $hideContainer = (container: HTMLElement) => {
	container.classList.add("hidden");
};

const $showContainer = (container: HTMLElement) => {
	container.classList.remove("hidden");
};

export const showLoadingBar = (
	duration: Duration,
	onFinished: () => void,
	resultViewProps: WebsiteResultViewProps
) => {
	const lodaingBarContainer = $loadingBarContainer(),
		preTaskViewContainer = $preTaskViewContainer();
	console.log("show load");
	$hideContainer(preTaskViewContainer);
	$showContainer(lodaingBarContainer);
	awaitDuration(duration, () => {
		$hideContainer(lodaingBarContainer);
		onFinished();
	});
	setWebsiteResultView(resultViewProps);
};

const setWebsiteResultView = (props: WebsiteResultViewProps) => {
	const container = $websiteResultContainer();
	websiteResultView(props.taskId, (answer) => {
		$hideContainer(container);
		props.onFinished(answer);
	})(container);
};

export const showWebsiteResultView = () => {
	const container = $websiteResultContainer();
	$showContainer(container);
};
