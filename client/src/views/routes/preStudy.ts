import { html } from "@arrow-js/core";
import { SocketEvent } from "../../../../shared/SocketEvent";
import { setDidGiveConsent } from "../../classes/State";
import { SocketManager } from "../../Socket";

export const giveConsent = () => {
	setDidGiveConsent(true);
};

const onClickConsent = () => {
	giveConsent();
	SocketManager.getInstance().emit(SocketEvent.SendGiveConsent, undefined);
};
export const $preStudy = html`
	<div>
		<h1 class="hidden">Pre Study</h1>
		<h1>
        Wartezeiten beim Laden von Webseiten auf Handy und Desktop/Laptop
    </h1>

    <h2>Einverständniserklärung zur Aufklärung über die Teilnahme</h2>
    <p>
        Sie sind eingeladen an der von Quirin Wittmann, Alexander Weichart, Emma Sophie Reichert und  Dr. Raphael Wimmer initiierten und geleiteten Online-Studie "<b>Wartezeiten beim Laden von Webseiten auf Handy und Desktop/Laptop</b>" teilzunehmen. <br>
        Die Forschung wird von der Universität Regensburg betreut.
    </p>

    <b>Bitte beachten Sie:</b>
    <ul>
        <li>
            Ihre Teilnahme ist komplett freiwillig
        </li>
        <li>
            Die Online-Studie dauert etwa 10-15 Minuten
        </li>
        <li>
            Wir werden persönliche Daten zur Demographie (Alter, Geschlecht, etc.) erheben
        </li>
	<li>
            Als Studierender der Medieninformatik und Informationswissenschaft kann Ihre Teilnahme mit 0,25 Versuchspersonenstunden vergütet werden.
        </li>
    </ul>
    <p>
        Wir können unsere Ergebnisse aus dieser und anderen Sitzungen in unseren Berichten veröffentlichen, aber alle diese Berichte werden vertraulich sein und weder Ihren Namen enthalten noch mit Ihrer Identität in Verbindung gebracht werden können.
    </p>
    <p>
        Wenn Sie Fragen oder Beschwerden zum gesamten Einwilligungsprozess dieser Studie oder Ihren Rechten als
        Forschungsgegenstand haben, wenden Sie sich bitte an Dr. Raphael Wimmer (E-Mail:
        <a href="mailto:raphael.wimmer@informatik.uni-regensburg.de">raphael.wimmer@informatik.uni-regensburg.de</a>).
        Sie sollten die folgenden Informationen sorgfältig lesen. Bitte
        nehmen Sie sich so viel Zeit wie nötig, um das Einwilligungsformular zu lesen.
    </p>

    <b>Zweck und Ziel dieser Studie</b>
    <p>
        Ziel dieser Studie ist es, die Erscheinung von Wartezeiten beim Laden von Webseiten bei mobilen Geräten und Desktop zu untersuchen.
    </p>


    <b>Beteiligung und Vergütung</b>
    <p>
        Ihre Teilnahme an dieser Online-Studie ist völlig freiwillig. Sie werden eine von etwa 20 Personen sein, die
        für diese Forschung befragt werden. Wenn sie ein Student der Medieninformatik oder Informationswissenschaft an
        der Universität Regensburg sind, können sie 0,25 VP erhalten. Sie können die Teilnahme jederzeit ohne Nachteil zurückziehen und einstellen. Wenn Sie
        sich weigern an der Online-Studie teilzunehmen oder sich davon zurückziehen, wird niemand auf dem Campus
        informiert. Sie können sich weigern Fragen zu beantworten, die Sie nicht beantworten möchten.
    </p>

    <b>Verfahren</b>
    <p>
        Nach Bestätigung Ihrer Einwilligung werden Sie:
        <ol>
            <li>Eine Anleitung erhalten, wie sie die Webseite auf ihrem Desktop mit ihrem mobilen Gerät koppeln können.</li>
	    <li>Anweisungen erhalten, auf welchem Gerät Sie die Studie gerade durchführen sollen.</li>
            <li>Jeweils nach dem Laden einer Webseite angeben, wie lange Sie die Wartezeit empfunden haben.</li>
	    <li>Einen Fragebogen zu demographischen Daten und Internetnutzung ausfüllen.</li>
        </ol>
        Das komplette Verfahren dieser Online-Studie dauert etwa 10-15 Minuten.
    </p>

    <b>Risiken und Nutzen</b>
    <p>
        Mit dieser Online-Studie sind keine Risiken verbunden. Unbehagen oder Unannehmlichkeiten sind gering und werden
        wahrscheinlich nicht auftreten. Wenn irgendwelche Unannehmlichkeiten zu einem Problem werden, können Sie Ihre
        Teilnahme einstellen. Sie werden nicht direkt durch die Teilnahme an dieser Online-Studie profitieren. Wir
        hoffen, dass die Informationen aus Ihrer Teilnahme dazu beitragen können, die Forschung in diesem Bereich
        voranzubringen.
    </p>

    <b>Datenschutz und Vertraulichkeit</b>
    <p>
        Personenbezogene Daten (Alter, Geschlecht etc.) werden während der Teilnahme erfasst. Der Forscher wird Sie
        nicht mit Ihrem Namen in Berichten identifizieren und dafür die Informationen aus dieser Online-Studie
        verwenden. Ihre Anonymität als männlicher oder weiblicher Teilnehmer an dieser Online-Studie bleibt sicher und
        verschlüsselt. Alle Daten, die Sie in dieser Online-Studie angeben, werden in Übereinstimmung mit der
        Datenschutz-Grundverordnung (DSGVO) der Europäischen Union (EU) anonymisiert veröffentlicht und vertraulich
        behandelt. In allen Fällen unterliegt die Verwendung von Aufzeichnungen und Daten der DSGVO. Fakultät und
        Administratoren vom Campus haben keinen Zugriff auf Rohdaten oder Transkripte. Diese Vorsichtsmaßnahme
        verhindert, dass Ihre individuellen Kommentare negative Auswirkungen haben. Diese Webseite verwendet Cookies und
        andere Tracking-Technologien, um die Forschung durchzuführen, die Benutzererfahrung zu verbessern, die
        Fähigkeit, mit dem System zu interagieren und zusätzliche Inhalte von Dritten bereitzustellen. Trotz
        sorgfältiger inhaltlicher Kontrolle übernehmen die Forscher keine Haftung für Schäden, die direkt oder indirekt
        aus der Nutzung dieser Online-Anwendung entstehen. Alle Aufzeichnungen können von niemandem außerhalb dieses
        Forschungsprojekts eingesehen werden, es sei denn, Sie haben ein separates Genehmigungsformular unterschrieben,
        das uns die Verwendung erlaubt. Die Aufzeichnungen werden nach dem Ende der Forschung nach Bedarf von der
        Förderorganisation zerstört oder wenn Sie den Forscher kontaktieren, um sie zerstören zu lassen. Wie bei jeder
        Veröffentlichung oder einer Internet-bezogenen-Aktivität, ist das Risiko einer Verletzung der Vertraulichkeit
        immer möglich. Nach der DSGVO informieren die Forscher die Teilnehmer:innen, wenn eine Verletzung vertraulicher
        Daten festgestellt wurde.
    </p>

    <b>Studiengestalter</b>
    <p>
        Wenn Sie Fragen oder Bedenken bezüglich dieser Forschung haben, wenden Sie sich bitte an:
    </p>

    <p>
        Quirin Wittmann:<br>
        <a href="mailto:quirin.wittmann@stud.uni-regensburg.de">quirin.wittmann@stud.uni-regensburg.de</a>
        <br>
        Alexander Weichart:<br>
        <a href="mailto:alexander.weichart@stud.uni-regensburg.de">alexander.weichart@stud.uni-regensburg.de</a>
        <br>
        Emma Sophie Reichert:<br>
        <a href="mailto:emma-sophie.reichert@stud.uni-regensburg.de">emma-sophie.reichert@stud.uni-regensburg.de</a>
        <br>
        Dr. Raphael Wimmer:<br>
        <a href="mailto:raphael.wimmer@informatik.uni-regensburg.de">raphael.wimmer@informatik.uni-regensburg.de</a>
        <br>
    </p>
	<div class="consent-check">
	<input type="checkbox" name="Einverständniserklärung" />
    <label for="0">Ich habe die Einverständniserklärung zur Aufklärung über die Teilnahme sorgfältig durchgelesen und
        stimme dieser zu.</label>
		
		</div>
		<button @click="${onClickConsent}">Consent</button>
	</div>
`;
