import { html } from "@arrow-js/core";
import state from "../../classes/State";

export const $postStudy = html`
	<div>
		<h1>Post Task Questionnaire</h1>
		<span class="end-text">
			Ihre Teilnehmer-ID ist:
			<span id="participant-id">${() => state.pairingCode}</span>
		</span>
		<br />
		<span class="end-text">
			Bitte kopieren Sie Ihre Teilnehmer-ID und füllen Sie den folgenden
			Fragebogen aus.
		</span>
		<span class="end-text">
			Sie müssen den Fragebogen nur <b>EINMAL</b> ausfüllen, das Gerät (Desktop
			oder Mobil) ist dabei egal.
		</span>
		<span class="end-text">
			Nach dem Ausfüllen des Fragebogens werden Sie weitergeleitet, um die
			Versuchspersonenstunden (VP) erhalten zu können.
		</span>
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://docs.google.com/forms/d/e/1FAIpQLSfI6I48fHAMztpd9KuqbA2FdskhxniM683db1U3CyH5jjNAnw/viewform?usp=sf_link"
		>
			Zum Fragebogen
		</a>
	</div>
`;
