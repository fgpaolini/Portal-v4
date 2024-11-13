import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";


class FacturasModule extends FetchFactory {
    private readonly RESOURCE = Routes.Facturas;

    async getFacturas(
        OPTIONS: TableOptions,
        fetchOptions?: AsyncDataOptions<TableResult<FacturaContrato>>,
    ) {
        const asyncData = await useAsyncData(
            "Facturas",
            () => {
                return this.call<TableResult<FacturaContrato>>(
                    "GET",
                    `${this.RESOURCE.GetFacturas(
                        OPTIONS.PageIndex,
                        OPTIONS.PageSize,
                        OPTIONS.SortColumn,
                        OPTIONS.SortOrder,
                        OPTIONS.FilterColumns,
                        OPTIONS.FilterQueries ?? []
                    )}`,
                    undefined
                );
            },
            fetchOptions
        );
    
        // Agregamos el status transformer
        const statusFeedback = useStatusTransformer(asyncData.status);
        const toastOptions = useFeedbackHelper(asyncData.status, { summary: "Facturas", successMessage: "Listado obtenido correctamente.", errorMessage: "No se han podido obtener los datos." })
        // Retornamos asyncData + feedback
        return { ...asyncData, ...statusFeedback, toastOptions };
    }
    

    async exportFacturas(
        OPTIONS: TableOptions,
        fetchOptions?: AsyncDataOptions<Blob>
    ) {
        const asyncData = await useAsyncData(
            "ExportContratos",
            () => {
            return this.call<Blob>(
                "GET",
                `${this.RESOURCE.ExportFacturas(OPTIONS.PageIndex, -1, OPTIONS.SortColumn, OPTIONS.SortOrder, OPTIONS.FilterColumns, OPTIONS.FilterQueries ?? [])}`,
                undefined
            );
            },
            fetchOptions
        );

        // Agregamos el status transformer
        const statusFeedback = useStatusTransformer(asyncData.status);
        const toastOptions = useFeedbackHelper(asyncData.status, { summary: "Facturas", successMessage: "Descarga de datos completada.", errorMessage: "Error al exportar los datos." })
        // Retornamos asyncData + feedback
        return { ...asyncData, ...statusFeedback, toastOptions };
    }

    async getContratoFacturas(
        codigoContrato: number,
        fetchOptions?: AsyncDataOptions<FacturaContrato[]>
    ) {
    const asyncData = useAsyncData(
        "DocumentosFacturas",
            () => {
            return this.call<FacturaContrato[]>(
                "GET",
                `${this.RESOURCE.GetFacturasPorContrato(codigoContrato)}`,
                undefined
            );
            },
            fetchOptions
        );
        const statusFeedback = useStatusTransformer(asyncData.status);
        return { ...asyncData, ...statusFeedback };
    }
}

export default FacturasModule;