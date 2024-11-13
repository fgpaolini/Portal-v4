import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";

class ClientModule extends FetchFactory {
    private readonly RESOURCE = Routes.Clientes;

    async getClienteByIdentifier(identificador: Ref<string>, fetchOptions?: AsyncDataOptions<ClienteDTO>)
    {
        const asyncData = await useAsyncData(
            "ClienteId",
            () => {
                return this.call<ClienteDTO>(
                    "GET",
                    `${this.RESOURCE.GetByIdentificador(identificador.value)}`,
                    undefined
                )
            },
            fetchOptions
        )
        const statusFeedback = useStatusTransformer(asyncData.status, 1500);
        const toastOptions = useFeedbackHelper(asyncData.status, { summary: "Cliente", successMessage: "Datos de cliente obtenidos correctamente.", errorMessage: "No se han podido obtener los datos del cliente." })

        return { ...asyncData, ...statusFeedback, toastOptions };
    }

    async getClienteById(id: Ref<number>, fetchOptions?: AsyncDataOptions<ClienteDTO>)
    {
        const asyncData = await useAsyncData(
            "ClienteId",
            () => {
                return this.call<ClienteDTO>(
                    "GET",
                    `${this.RESOURCE.GetById(id.value)}`,
                    undefined
                )
            },
            fetchOptions
        )
        const statusFeedback = useStatusTransformer(asyncData.status, 1500);
        const toastOptions = useFeedbackHelper(asyncData.status, { summary: "Cliente", successMessage: "Datos de cliente obtenidos correctamente.", errorMessage: "No se han podido obtener los datos del cliente." })

        return { ...asyncData, ...statusFeedback, toastOptions };
    }

}

export default ClientModule;