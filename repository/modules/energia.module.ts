import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";

class EnergiaModule extends FetchFactory {
    private readonly RESOURCE = Routes.Energia;

    async getHistoricoCierreIndex(
        desde: Ref<string>,
        hasta: Ref<string>,
        tarifa: Ref<number>,
        modalidad?: Ref<number>,
        fee?: Ref<number>,
        fetchOptions?: AsyncDataOptions<CierreDataDTO>
    ) {
        return useAsyncData(
            "HistoricoIndex",
            () => {
                return this.call<CierreDataDTO> (
                    "GET",
                    `${this.RESOURCE.GetIndexHistoricoCierre(desde.value, hasta.value, tarifa.value, modalidad?.value, fee?.value)}`,
                    undefined,
                );
            },
            fetchOptions
        );
    }

    async getHistoricoCierreExcedentes(
        desde: Ref<string>,
        hasta: Ref<string>,
        tarifa: Ref<number>,
        fetchOptions?: AsyncDataOptions<CierreDataDTO>
    ) {
        return useAsyncData(
            "HistoricoExedentes",
            () => {
                return this.call<CierreDataDTO> (
                    "GET",
                    `${this.RESOURCE.GetExcedentesHistoricoCierre(desde.value, hasta.value, tarifa.value)}`,
                    undefined,
                );
            },
            fetchOptions
        );
    }
    
    async getHistoricoCierreOMIE(
/*         mesInicio: Ref<number>,
        añoInicio: Ref<number>,
        mesFin: Ref<number>,
        añoFin: Ref<number>, */
        desde: Ref<string>,
        hasta: Ref<string>,
        fetchOptions?: AsyncDataOptions<OmieDataDTO>
    ) {
        return useAsyncData(
            "HistoricoOMIE",
            () => {
                return this.call<OmieDataDTO> (
                    "GET",
                    `${this.RESOURCE.GetOMIEHistoricoCierre(desde.value, hasta.value)}`,
                    undefined,
                );
            },
            fetchOptions
        );
    }

    async exportHistoricoCierre(
        desde: Ref<string>, hasta: Ref<string>, tarifa: Ref<number>, modalidad: Ref<number>, fee?: Ref<number>,
        fetchOptions?: AsyncDataOptions<Blob>
    ) {
    return useAsyncData(
        "ExportContratos",
        () => {
        return this.call<Blob>(
            "GET",
            `${this.RESOURCE.ExportHistoricoCierre(desde.value, hasta.value, tarifa.value, modalidad.value, fee?.value)}`,
            undefined
        );
        },
        fetchOptions
    );
    }

}

export default EnergiaModule;