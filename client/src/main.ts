import "./style.css";
import { emitSocketEvent, onSocketEvent } from "./Socket";
import { html, reactive } from "@arrow-js/core";
import { SocketEvent } from "../../shared/SocketEvent";
import { initialState, State } from "./classes/State";
import { TaskAnswer } from "../../shared/TaskAnswer";
import { CurrentTaskInfo } from "../../shared/CurrentTaskInfo";

const state = reactive<State>(initialState);

// popup input
const pairingCode = "00007";
const platform = localStorage.getItem("platform") || "desktop";
localStorage.setItem("platform", platform);

console.log(state.isPaired);
onSocketEvent(SocketEvent.Connect, () => {
	console.log("connected");
	emitSocketEvent(SocketEvent.SendAuth, {
		platform: platform,
		runId: pairingCode,
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

onSocketEvent(SocketEvent.Paired, () => {
	console.log("paired");
	state.isPaired = true;
});

onSocketEvent(SocketEvent.Unpaired, () => {
	console.log("unpaired");
	state.isPaired = false;
});

onSocketEvent(SocketEvent.Disconnect, () => {
	state.isPaired = false;
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
		<p>Paired: ${() => state.isPaired.toString()}</p>
		<p>Platform: ${() => platform}</p>
		<button @click="${() => onClick()}">Test</button>
	</div>
`;

runTemplate(app);
