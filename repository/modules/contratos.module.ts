import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";

class ContratosModule extends FetchFactory {
	private readonly RESOURCE = Routes.Contratos;

	async getContratos(
		OPTIONS: TableOptions,
		fetchOptions?: AsyncDataOptions<TableResult<Contrato>>
	) {
		return useAsyncData(
			"Contratos",
			() => {
				return this.call<TableResult<Contrato>>(
					"GET",
					`${this.RESOURCE.GetContratosList(OPTIONS.PageIndex, OPTIONS.PageSize, OPTIONS.SortColumn, OPTIONS.SortOrder, OPTIONS.FilterColumns, OPTIONS.FilterQueries ?? [])}`,
					undefined
				);
			},
			fetchOptions
		);
	}

	async exportContracts(
		OPTIONS: TableOptions,
		fetchOptions?: AsyncDataOptions<Blob>
	) {
		return useAsyncData(
			"ExportContratos",
			() => {
				return this.call<Blob>(
					"GET",
					`${this.RESOURCE.ExportContracts(OPTIONS.PageIndex, -1, OPTIONS.SortColumn, OPTIONS.SortOrder, OPTIONS.FilterColumns, OPTIONS.FilterQueries ?? [])}`,
					undefined
				);
			},
			fetchOptions
		);
	}

	async getContratoById(
		codigoContrato: Ref<number>,
		fetchOptions?: AsyncDataOptions<ContratoInfo>
	) {
		const asyncData = await useAsyncData(
			"CodigoContrato",
			() => {
				return this.call<ContratoInfo>(
					"GET",
					`${this.RESOURCE.GetContratoById(codigoContrato.value)}`,
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

	async getContratoDocuments(
		codigoContrato: number,
		fetchOptions?: AsyncDataOptions<ContratoDocumento[]>
	) {
		return useAsyncData(
			"DocumentosContrato",
			() => {
				return this.call<ContratoDocumento[]>(
					"GET",
					`${this.RESOURCE.GetContratoDocumentos(codigoContrato)}`,
					undefined
				);
			},
			fetchOptions
		);
	}

	async getDocumento(
		IdDocumento: number,
		fetchOptions?: AsyncDataOptions<Blob>
	) {
		return useAsyncData(
			"Documento",
			() => {
				return this.call<Blob>(
					"GET",
					`${this.RESOURCE.GetContratoDocumentoFile(IdDocumento)}`,
					undefined
				);
			},
			fetchOptions
		);
	}
	async printContrato(
		contractNumber: number,
		fetchOptions?: AsyncDataOptions<Blob>
	) {
		return useAsyncData(
			"PrintContrato",
			() => {
				return this.call<Blob>(
					"GET",
					`${this.RESOURCE.PrintContrato(contractNumber)}`,
					undefined
				);
			},
			fetchOptions
		);
	}

	async getSituacionesContratos(fetchOptions?: AsyncDataOptions<DashboardData>) {
		return useAsyncData(
			"SituacionesContratos",
			() => {
				return this.call<DashboardData>(
					"GET",
					`${this.RESOURCE.GetSituacionContratos()}`,
					undefined
				);
			},
			fetchOptions
		);
	}

	async getCantidadPorMes(desde: Ref<string>, hasta?: Ref<string>, fetchOptions?: AsyncDataOptions<DashboardData>) {
		return useAsyncData(
			"CantidadPorMes",
			() => {
				return this.call<DashboardData>(
					"GET",
					`${this.RESOURCE.GetCantidadPorMes(desde.value, hasta?.value)}`,
					undefined
				);
			},
			fetchOptions
		);
	}

	async insertDocumentos(documentos: Ref<DocumentInsert[]>, fetchOptions?: AsyncDataOptions<string>) {
		const asyncData = await useAsyncData(
			"InsertDocumentos",
            () => {
                return this.call<string>(
                    "POST",
                    `${this.RESOURCE.InsertDocumentos()}`,
                    documentos.value
                );
            },
            fetchOptions
		);
		
		const statusFeedback = useStatusTransformer(asyncData.status);
        const toastOptions = useFeedbackHelper(asyncData.status, { summary: "Documentos", successMessage: "Documento insertado correctamente.", errorMessage: "No se han podido subir los documentos." })
        // Retornamos asyncData + feedback
        return { ...asyncData, ...statusFeedback, toastOptions };
	}


	async isCupsInContract(cups: Ref<string>, fetchOptions?: AsyncDataOptions<boolean>) {

		const asyncData = await useAsyncData(
			"IsCupsInContract",
			() => {
				return this.call<boolean>(
					"GET",
					`${this.RESOURCE.GetIsCupsInContract(cups.value)}`,
					undefined
				);
			},
			fetchOptions
		);
		const statusFeedback = useStatusTransformer(asyncData.status);

		return { ...asyncData, ...statusFeedback };
	}

}

export default ContratosModule;
