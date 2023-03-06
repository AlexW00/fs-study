import "./style.css";
import { emitSocketEvent, onSocketEvent } from "./Socket";
import { html, reactive } from "@arrow-js/core";
import { SocketEvent } from "../../shared/SocketEvent";
import { initialState, State } from "./classes/State";
import { TaskAnswer } from "../../shared/TaskAnswer";
import { Platform } from "../../shared/Platform";
import { CurrentTaskInfo } from "../../shared/CurrentTaskInfo";

const state = reactive<State>(initialState);

console.log(SocketEvent);
onSocketEvent(SocketEvent.Connect, () => {
	state.isConnected = true;
	console.log("connected");
	emitSocketEvent(SocketEvent.SendAuth, {
		platform: Platform.desktop,
		runId: null,
	});
});

onSocketEvent(SocketEvent.ReceiveAuth, (auth) => {
	console.log("GOT AUTH");
	const run = auth.run;
	console.log(run);
	state.run = run;
});

onSocketEvent(
	SocketEvent.ReceiveTaskProgressUpdate,
	(current: CurrentTaskInfo) => {
		console.log(current);
		state.run.current = current as any;
	}
);

onSocketEvent(SocketEvent.Disconnect, () => {
	state.isConnected = false;
});

const app = document.getElementById("app")!;

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

const runTemplate = html`
	<div>
		<h1>Run</h1>
		<p>Run ID: ${() => state.run?.id}</p>
		<p>Current: ${() => state.run?.current.taskIndex}</p>
		<button @click="${() => onClick()}">Test</button>
	</div>
`;

runTemplate(app);
