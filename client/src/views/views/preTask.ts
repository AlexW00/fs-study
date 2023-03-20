import { html } from "@arrow-js/core";

export const preTaskView = (onReady: () => void) => html`
	<div class="pre-task">
		<h1 class="hidden">Pre-Task</h1>
		<div class="search-title">Zufalls-Wiki</div>
		<div class="question-bar">
			<div class="question">Zufälliger Wikieintrag...</div>
		</div>
		<button class="luck-button" @click="${() => onReady()}">
			Auf gut Glück!
		</button>
		<p class="hint">Um zu starten, klicken Sie auf "Auf gut Glück!"</p>
	</div>
`;
