import { html } from "@arrow-js/core";
import { AppRoute, getAppRoute } from "../AppRoute";
import state from "../classes/State";
import { $postStudy } from "./routes/postStudy";
import { $preStudy } from "./routes/preStudy";
import { $setup } from "./routes/setup";
import { $study } from "./routes/study";
import { $unpaired } from "./routes/unpaired";

export const $router = html`
	<div>
		<h1>Router</h1>
		${() => {
			const route = getAppRoute(state);
			if (route === AppRoute.Setup) return $setup;
			else if (route === AppRoute.Unpaired) return $unpaired;
			else if (route === AppRoute.PreStudy) return $preStudy;
			else if (route === AppRoute.PostStudy) return $postStudy;
			else return $study;
		}}
	</div>
`;
