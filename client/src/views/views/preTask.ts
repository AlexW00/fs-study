import { html } from "@arrow-js/core";

export const preTaskView = (onReady: () => void) => html`
	<div class="pre-task">
		<h1>Pre-Task</h1>
		<button @click="${() => onReady()}">Ready</button>
	</div>
`;
