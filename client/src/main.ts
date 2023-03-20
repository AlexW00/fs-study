import "./style.css";
import { SocketEvent } from "../../shared/SocketEvent";
import state, {
	initialState,
	setDidGiveConsent,
	setDidReadInstructions,
	setPairingCode,
} from "./classes/State";
import { CurrentTaskInfo } from "../../shared/CurrentTaskInfo";
import { getPairingCodeFromUrl, getPlatform } from "./util";
import { $router } from "./views/router";
import { importImages, loadImages } from "./img/ImageManager";
import { SocketManager } from "./Socket";
import StorageManager from "./StorageManager";

async function main() {
	await importImages();
	await loadImages();
	console.log("loaded images");
	await SocketManager.init();
	console.log("socket init");

	const $loadingStart = document.getElementById("loading-start")!;
	$loadingStart.style.display = "none";

	const socketManager = SocketManager.getInstance();

	const pairingCode = getPairingCodeFromUrl();
	if (pairingCode) {
		console.log("pairing code from url", pairingCode);
		setPairingCode(pairingCode);
	}

	if (state.pairingCode !== "") {
		socketManager.emit(SocketEvent.SendAuth, {
			platform: getPlatform(),
			runId: state.pairingCode,
		});
	}

	socketManager.on(SocketEvent.ReceiveAuth, (auth) => {
		setPairingCode(auth.run.id);
		console.log("GOT AUTH");
		const run = auth.run;
		console.log(run);
		state.run = run;
	});

	socketManager.on(
		SocketEvent.ReceiveTaskProgressUpdate,
		(current: CurrentTaskInfo) => {
			console.log("task progress update", current);
			Object.assign(state.run.current, current);
		}
	);

	socketManager.on(SocketEvent.Paired, () => {
		console.log("paired");
		state.isPaired = true;
	});

	socketManager.on(SocketEvent.Unpaired, () => {
		console.log("unpaired");
		state.isPaired = false;
	});

	socketManager.on(SocketEvent.Disconnect, () => {
		state.isPaired = false;
	});

	SocketManager.getInstance().on(SocketEvent.ReceiveGiveConsent, () => {
		console.log("received give consent");
		setDidGiveConsent(true);
	});

	SocketManager.getInstance().on(SocketEvent.ReceiveFailedAuth, () => {
		console.log("failed auth");
		// doShowError.isInvalidAuth = true;
	});

	SocketManager.getInstance().on(SocketEvent.DeletedSession, () => {
		StorageManager.reset();
		Object.assign(state, initialState());
	});

	SocketManager.getInstance().on(SocketEvent.ReceiveReadInstructions, () => {
		setDidReadInstructions(true);
	});

	const app = document.getElementById("app")!;
	$router(app);
}

main();
