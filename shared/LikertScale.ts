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
	title: "How long did that loading time feel?",
	options: [
		{
			value: 1,
			label: "Very short",
		},
		{
			value: 2,
			label: "Short",
		},
		{
			value: 3,
			label: "Medium",
		},
		{
			value: 4,
			label: "Long",
		},
		{
			value: 5,
			label: "Very long",
		},
		{
			value: 6,
			label: "Extremely long",
		},
		{
			value: 7,
			label: "Unbearably long",
		},
	],
};
