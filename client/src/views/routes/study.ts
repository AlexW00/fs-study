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

const $taskDebug = html`
	<div>
		<h1>Task Debug</h1>
		<p>
			Task ID:
			${() => JSON.stringify(state.run.tasks[state.run.current.taskIndex])}
		</p>
		<p>Task Index: ${() => state.run.current.taskIndex}</p>
		<p>Task Count: ${() => state.run.tasks.length}</p>
		<button @click="${() => onClick()}">Test</button>
	</div>
`;

const platform = getPlatform();
export const $study = html`
	<div>
		<h1>Study</h1>
		<p>Run ID: ${() => state.run?.id}</p>
		<p>Current: ${() => state.run?.current.taskIndex}</p>
		<p>Paired: ${() => state.isPaired.toString()}</p>
		<p>Current Platform: ${() => platform}</p>
		${() =>
			state.run.tasks[state.run.current.taskIndex].platform == getPlatform()
				? $taskDebug
				: ""}
	</div>
`;
