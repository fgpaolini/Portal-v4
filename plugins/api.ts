// 3rd's
import { $fetch } from "ofetch";
import type { FetchOptions } from "ofetch";

import SipsModule from "~/repository/modules/sips.module";
import ContratosModule from "~/repository/modules/contratos.module";
import ContratosByFetchModule from "~/repository/modules/contratosByFetch.module";
import FacturasModule from "~/repository/modules/facturas.module";
import AgentesModule from "~/repository/modules/agentes.module";
import UsuariosModule from "~/repository/modules/usuarios.module";
import UtilityModule from "~/repository/modules/utility.module";
import EnergiaModule from "~/repository/modules/energia.module";
import PreferencesModule from "~/repository/modules/preferences.module";
import ClientModule from "~/repository/modules/client.module";
import PreciosModule from "~/repository/modules/precios.module";
import ValidatorsModule from "~/repository/modules/validators.module";

interface IApiInstance {
	sips: SipsModule;
	contratos: ContratosModule;
	contratosByFetch: ContratosByFetchModule;
	agentes: AgentesModule;
	utilities: UtilityModule;
	usuarios: UsuariosModule;
	energia: EnergiaModule;
	preferences: PreferencesModule;
	facturas: FacturasModule;
	client: ClientModule;
	precios: PreciosModule;
	validators: ValidatorsModule;
}

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const fetchOptions: FetchOptions = {
		baseURL: config.public.apiBase as string,
	};

	const apiFecther = $fetch.create(fetchOptions);

	const nuxtServerFetcher = $fetch.create({ baseURL: "" });

	const modules: IApiInstance = {
		sips: new SipsModule(apiFecther),
		contratos: new ContratosModule(apiFecther),
		contratosByFetch: new ContratosByFetchModule(apiFecther),
		utilities: new UtilityModule(apiFecther),
		agentes: new AgentesModule(apiFecther),
		usuarios: new UsuariosModule(apiFecther),
		energia: new EnergiaModule(apiFecther),
		preferences: new PreferencesModule(apiFecther),
		facturas: new FacturasModule(apiFecther),
		client: new ClientModule(apiFecther),
		precios: new PreciosModule(apiFecther),
		validators: new ValidatorsModule(apiFecther),
	};

	return {
		provide: {
			api: modules,
		},
	};
});
