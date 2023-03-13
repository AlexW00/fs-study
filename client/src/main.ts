import "./style.css";
import { emitSocketEvent, onSocketEvent } from "./Socket";
import { SocketEvent } from "../../shared/SocketEvent";
import state, { setPairingCode } from "./classes/State";
import { CurrentTaskInfo } from "../../shared/CurrentTaskInfo";
import { getPlatform } from "./util";
import { $router } from "./views/router";
import { importImages, loadImages } from "./img/ImageManager";

async function main() {
	await importImages();
	await loadImages();

	const app = document.getElementById("app")!;
	$router(app);
}

onSocketEvent(SocketEvent.Connect, () => {
	if (state.pairingCode !== "") {
		emitSocketEvent(SocketEvent.SendAuth, {
			platform: getPlatform(),
			runId: state.pairingCode,
		});
	}
});

onSocketEvent(SocketEvent.ReceiveAuth, (auth) => {
	setPairingCode(auth.run.id);
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

main();
