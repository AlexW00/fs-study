import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state from "../../classes/State";
import { emitSocketEvent } from "../../Socket";
import { doShowTask } from "../../util";
import { switchDeviceView } from "../views/switchDevice";
import { taskView } from "../views/task";

export const $study = html`
	<div>
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
