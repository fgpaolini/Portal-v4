import FetchFactory from "../factory";
import Routes from "../routes.client";

class ContratosByFetchModule extends FetchFactory {
	private readonly RESOURCE = Routes.ContratosByFetch;
	async InsertContrato(data:ContratoAlta) {
		console.log("INSERT");
		try {
			return this.call<AltaContratoResponse>("POST", `${this.RESOURCE.InsertContrato}`, data, undefined);
		} catch (error) {
			return [];
		}
	}
}
export default ContratosByFetchModule;
