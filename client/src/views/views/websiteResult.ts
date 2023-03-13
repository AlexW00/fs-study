import { html, reactive } from "@arrow-js/core";
import {
	ESTIMATED_DURATION_LIKERT_SCALE,
	LikertScaleOption,
	UNCHECKED_LIKERT_SCALE_OPTION,
} from "../../../../shared/LikertScale";
import { TaskAnswer } from "../../../../shared/TaskAnswer";
import { getRandomImage } from "../../img/ImageManager";
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

	const getImageSrc = () => {
		const b64 = getRandomImage();
		return b64;
	};

	return html`
		<div class="website-result">
			<img src="${() => getImageSrc()}" class="bg-img" />
			<div id="likert-scale-container">
				${likertScaleView(ESTIMATED_DURATION_LIKERT_SCALE, (option) => {
					Object.assign(checkedOption, option);
				})}
				<button
					id="submit-likert"
					disabled="${() => !isValid()}"
					@click="${() => onAnswer(getAnswer())}"
				>
					Submit
				</button>
			</div>
		</div>
	`;
};
