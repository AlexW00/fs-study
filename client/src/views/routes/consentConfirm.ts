import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidGiveConsent } from "../../classes/State";
import { SocketManager } from "../../Socket";


const onConsent = () => {
    setDidGiveConsent(true);
    SocketManager.getInstance().emit(SocketEvent.SendGiveConsent, undefined);
}

export const $consentConfirm = html`
    <button @click="${onConsent}">Akzeptieren</button>
`;