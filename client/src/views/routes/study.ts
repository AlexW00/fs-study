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
			const i = state.run.current.taskIndex,
				t = state.run.tasks[i];

			if (doShowTask(t)) {
				console.log("show task");
				return html`${() =>
					taskView(i, (answer) => {
						SocketManager.getInstance().emit(SocketEvent.PostAnswer, answer);
					})}`;
			} else return switchDeviceView();
		}}
	</div>
`;
