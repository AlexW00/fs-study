export interface LikertScaleOption {
	value: number;
	label: string;
}

export const UNCHECKED_LIKERT_SCALE_OPTION = (): LikertScaleOption => {
	return {
		value: -1,
		label: "Not answered",
	};
};

export interface LikertScale {
	id: string;
	title: string;
	options: LikertScaleOption[];
}

// 7 point likert scale ranging from very short to very long
export const ESTIMATED_DURATION_LIKERT_SCALE: LikertScale = {
	id: "estimated-duration",
	title: "Wie lang empfanden Sie die Ladezeit der Webseite?",
	options: [
		{
			value: 1,
			label: "sehr kurz",
		},
		{
			value: 2,
			label: "",
		},
		{
			value: 3,
			label: "",
		},
		{
			value: 4,
			label: "mittel",
		},
		{
			value: 5,
			label: "",
		},
		{
			value: 6,
			label: "",
		},
		{
			value: 7,
			label: "sehr lang",
		},
	],
};
