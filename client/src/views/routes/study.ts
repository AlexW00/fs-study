import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import state from "../../classes/State";
import { SocketManager } from "../../Socket";
import { doShowTask } from "../../util";
import { switchDeviceView } from "../views/switchDevice";
import { taskView } from "../views/task";

export const $study = html`
	<div>
		${() => {
			const t = state.run.tasks[state.run.current.taskIndex];
			// console.log(state.run.current);
			if (doShowTask(t))
				return taskView(
					state.run.tasks[state.run.current.taskIndex],
					(answer) => {
						SocketManager.getInstance().emit(SocketEvent.PostAnswer, answer);
					}
				);
			else return switchDeviceView();
		}}
	</div>
`;
