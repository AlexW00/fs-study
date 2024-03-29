import { html } from "@arrow-js/core";
import { Duration } from "../../../../shared/Duration";

export const loadingBarView = (
	duration: Duration,
	onLoadingComplete: () => void
) => html`
	<div class="loading-bar">
		<div class="loading-bar-progress">LOADING...</div>
		${() => {
			setTimeout(() => {
				onLoadingComplete();
			}, duration);
		}}
	</div>
`;

export const awaitDuration = (duration: Duration, onFinished: () => void) => {
	setTimeout(() => {
		onFinished();
	}, duration);
};
