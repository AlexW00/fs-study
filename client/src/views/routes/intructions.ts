import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidReadInstructions } from "../../classes/State";
import { SocketManager } from "../../Socket";

const onClickStartStudy = () => {
	setDidReadInstructions(true);
	SocketManager.getInstance().emit(SocketEvent.SendReadInstructions, undefined);
};

export const $instructions = html`
	<div>
		<h1>Erklärung der Studie</h1>
		<p class="end-text">
			Diese Studie beschäftigt sich mit Wartezeiten beim Laden von Webseiten.
		</p>
		<p class="end-text">
			Stellen Sie bitte sicher, dass sie an einem ruhigen Ort und wenig
			abgelenkt sind.
		</p>
		<p class="end-text">
			Im Folgenden werden Sie eine Seite angezeigt bekommen, mit der Sie auf gut
			Glück Suchanfragen stellen können. Drücken Sie auf den "Auf gut Glück
			Button" und warten Sie, bis die Webseite geladen hat. Geben Sie bitte
			daraufhin an, wie lange Ihnen die Wartezeit vorgekommen ist.
		</p>
		<p class="end-text">
			Folgen Sie dabei den Anweisungen zum Wechseln zwischen Handy und
			Desktop/Laptop.
		</p>
		<button @click="${onClickStartStudy}">Verstanden</button>
	</div>
`;
