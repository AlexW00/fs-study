import "./style.css";
import { emitSocketEvent, onSocketEvent } from "./Socket";
import { SocketEvent } from "../../shared/SocketEvent";
import state from "./classes/State";
import { CurrentTaskInfo } from "../../shared/CurrentTaskInfo";
import { getPlatform } from "./util";
import StorageManager from "./StorageManager";
import { $router } from "./views/router";

state.pairingCode = StorageManager.getPairingCode() ?? "";
if (state.pairingCode === "") {
	// show input popup	and request pairing code
	const code = prompt("Enter pairing code");
	if (code) {
		StorageManager.setPairingCode(code);
		state.pairingCode = code;
	}
}

const platform = getPlatform();
console.log(state.isPaired);
onSocketEvent(SocketEvent.Connect, () => {
	console.log("connected");
	emitSocketEvent(SocketEvent.SendAuth, {
		platform: platform,
		runId: state.pairingCode,
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
$router(app);
