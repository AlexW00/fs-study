import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { TaskAnswer } from "../../../../shared/TaskAnswer";
import state from "../../classes/State";
import { emitSocketEvent } from "../../Socket";
import { getPlatform } from "../../util";

const onClick = () => {
	console.log("click");
	const i = state.run.current.taskIndex,
		id = state.run.tasks[i].id;

	const taskAnswer: TaskAnswer = {
		taskId: id,
		estimatedDuration: 100,
	};

	console.log(taskAnswer);
	emitSocketEvent(SocketEvent.PostAnswer, taskAnswer);
};

const platform = getPlatform();
export const $study = html`
	<div>
		<h1>Study</h1>
		<p>Run ID: ${() => state.run?.id}</p>
		<p>Current: ${() => state.run?.current.taskIndex}</p>
		<p>Paired: ${() => state.isPaired.toString()}</p>
		<p>Platform: ${() => platform}</p>
		<button @click="${() => onClick()}">Test</button>
	</div>
`;
