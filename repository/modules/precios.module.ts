import Routes from "../routes.client";
// 3rd's
import type { FetchOptions } from 'ofetch';

// locals
import FetchFactory from '../factory';


class PreciosModule extends FetchFactory {
	private readonly RESOURCE = Routes.Precios;

	async getPrecioFijo_Fetch(tarifa: Ref<Tarifa>, fetchOptions?: FetchOptions<'json'>): Promise<PrecioFijo | null> {
		return this.call<PrecioFijo>(
			"GET",
			`${this.RESOURCE.GetPrecioFijo(tarifa)}`,
			undefined,
			fetchOptions);
	}	
}

export default PreciosModule