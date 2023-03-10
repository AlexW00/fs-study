import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state from "../../classes/State";
import { emitSocketEvent } from "../../Socket";
import { doShowTask, getPlatform } from "../../util";
import { switchDeviceView } from "../views/switchDevice";
import { taskView } from "../views/task";

const platform = getPlatform();
export const $study = html`
	<div>
		<h1>Study</h1>
		<p>Run ID: ${() => state.run?.id}</p>
		<p>Current: ${() => state.run?.current.taskIndex}</p>
		<p>Paired: ${() => state.isPaired.toString()}</p>
		<p>Current Platform: ${() => platform}</p>
		${() => {
			const t = state.run.tasks[state.run.current.taskIndex];
			if (doShowTask(t))
				return taskView(
					state.run.tasks[state.run.current.taskIndex],
					(answer) => {
						emitSocketEvent(SocketEvent.PostAnswer, answer);
					}
				);
			else return switchDeviceView();
		}}
	</div>
`;
