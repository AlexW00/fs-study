import { html } from "@arrow-js/core";
import { LikertScale, LikertScaleOption } from "../../../../shared/LikertScale";

// a likert scale that consists of radio buttons for each answer option

export const likertScaleView = (
	likertScale: LikertScale,
	onAnswer: (option: LikertScaleOption) => void
) => html`
	<div class="likert-scale">
		<h1>${likertScale.title}</h1>
		<div class="likert-scale-options">
			${likertScale.options.map(
				(option) => html`
					<div class="likert-scale-option">
						<input
							type="radio"
							name="likert-scale"
							id="${option.value}"
							@click="${() => onAnswer(option)}"
						/>
						<label for="${option.value}">${option.label}</label>
					</div>
				`
			)}
		</div>
	</div>
`;
