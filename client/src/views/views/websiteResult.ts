import { html, reactive } from "@arrow-js/core";
import {
	ESTIMATED_DURATION_LIKERT_SCALE,
	LikertScaleOption,
	UNCHECKED_LIKERT_SCALE_OPTION,
} from "../../../../shared/LikertScale";
import { TaskAnswer } from "../../../../shared/TaskAnswer";
import { likertScaleView } from "./likertScale";

export const websiteResultView = (
	taskId: string,
	onAnswer: (answer: TaskAnswer) => void
) => {
	const checkedOption = reactive<LikertScaleOption>(
		UNCHECKED_LIKERT_SCALE_OPTION()
	);

	const isValid = () =>
		checkedOption.value !== UNCHECKED_LIKERT_SCALE_OPTION().value;

	const getAnswer = () => {
		const answer: TaskAnswer = {
			taskId,
			estimatedDuration: checkedOption,
		};
		return answer;
	};

	return html`
		<div class="website-result">
			<h1>Website Result</h1>
			<p>Current answer: ${() => JSON.stringify(checkedOption.value)}</p>
			${likertScaleView(ESTIMATED_DURATION_LIKERT_SCALE, (option) => {
				Object.assign(checkedOption, option);
			})}
			<button
				disabled="${() => !isValid()}"
				@click="${() => onAnswer(getAnswer())}"
			>
				Submit
			</button>
		</div>
	`;
};
