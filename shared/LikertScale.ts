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
			label: "sofort",
		},
		{
			value: 2,
			label: "sehr kurz",
		},
		{
			value: 3,
			label: "kurz",
		},
		{
			value: 4,
			label: "mittel",
		},
		{
			value: 5,
			label: "lang",
		},
		{
			value: 6,
			label: "sehr lang",
		},
		{
			value: 7,
			label: "unendlich lang",
		},
	],
};
