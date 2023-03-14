import { html } from "@arrow-js/core";
import qrcode from "qrcode-generator";
import { AppRoute } from "../../AppRoute";
import { generatePairingUrl } from "../../util";

const doShowQrCode = (pairingCode: string, route: AppRoute) => {
	return pairingCode !== "" && route === AppRoute.Unpaired;
};

export const qrCodeView = (pairingCode: string, route: AppRoute) => html`
	<div class="${() => (doShowQrCode(pairingCode, route) ? "" : "hidden")}">
		${() => {
			const qr = qrcode(4, "L");
			qr.addData(generatePairingUrl(pairingCode));
			qr.make();
			const qrCode = qr.createImgTag(4);
			return html`${qrCode}`;
		}}
	</div>
`;
