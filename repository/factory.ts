import type { $Fetch } from "ofetch";
import type { FetchOptions } from "ofetch";

/*
    La HttpFactory actúa como un contenedor alrededor de un cliente HTTP. 
    Encapsula la funcionalidad para realizar solicitudes API de forma 
    asíncrona a través de la función call, utilizando el cliente HTTP proporcionado.
    */
class FetchFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  /**
   * El cliente HTTP se utiliza para controlar el proceso de realizar solicitudes API.
   * @param {string} method - El método HTTP (GET, POST, ...)
   * @param {string} url - La URL del endpoint
   * @param {object} data - Los datos del cuerpo
   * @param {object} fetchOptions - Opciones de fetch
   * @returns {Promise<any>} - Retorna una promesa que resuelve la respuesta de la solicitud
   */
  async call<T>(
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<"json">
  ): Promise<T> {
    const { token } = useAuth();
    const headers = {
      ...fetchOptions?.headers,
      Authorization: `${token.value}`,
    };

    return this.$fetch<T>(url, {
      method,
      body: data,
      ...fetchOptions,
      headers,
    });
  }
}

export default FetchFactory;
