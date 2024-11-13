import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";

class UtilityModule extends FetchFactory {
  private readonly RESOURCE = Routes.Utilidades;

  async getCNAEList_Fetch() {
    try {
      return this.call<CNAEInfo[]>(
        "GET",
        `${this.RESOURCE.GetCNAEList()}`,
        undefined
      );
    } catch (error) {
      return [];
    }
  }

  async getCNAEList(fetchOptions?: AsyncDataOptions<CNAEInfo[]>) {
    return useAsyncData(
      "CNAEList",
      (): Promise<CNAEInfo[]> =>
        this.call<CNAEInfo[]>(
          "GET",
          `${this.RESOURCE.GetCNAEList()}`,
          undefined
        ),
      fetchOptions
    );
  }
  async getTarifasList_Fetch() {
    try {
      return this.call<Tarifa[]>(
        "GET",
        `${this.RESOURCE.GetTarifasList()}`,
        undefined
      );
    } catch (error) {
      return [];
    }
  }
  async getTarifasList(fetchOptions?: AsyncDataOptions<Tarifa[]>) {
    return useAsyncData(
      "TarifaList",
      (): Promise<Tarifa[]> =>
        this.call<Tarifa[]>(
          "GET",
          `${this.RESOURCE.GetTarifasList()}`,
          undefined
        ),
      fetchOptions
    );
  }

  async getComisionesList(fetchOptions?: AsyncDataOptions<Comisiones[]>) {
    return useAsyncData(
      "ComisionesList",
      (): Promise<Comisiones[]> =>
        this.call<Comisiones[]>(
          "GET",
          `${this.RESOURCE.GetComisionesList()}`,
          undefined
        ),
      fetchOptions
    );
  }
  async getAltaTipoSolicitudList_Fetch() {
    try {
      return this.call<AltaTipoSolicitud[]>(
        "GET",
        `${this.RESOURCE.GetAltaTipoSolicitudList()}`,
        undefined
      );
    } catch (error) {
      return [];
    }
  }
  async getAltaTipoSolicitudList(
    fetchOptions?: AsyncDataOptions<AltaTipoSolicitud[]>
  ) {
    return useAsyncData(
      "AltaSolicitudTipoList",
      (): Promise<AltaTipoSolicitud[]> =>
        this.call<AltaTipoSolicitud[]>(
          "GET",
          `${this.RESOURCE.GetAltaTipoSolicitudList()}`,
          undefined
        ),
      fetchOptions
    );
  }

  async getImpresionTipoList_Fetch() {
    try {
      return this.call<TipoImpresion[]>(
        "GET",
        `${this.RESOURCE.GetImpresionTipoList()}`,
        undefined
      );
    } catch (error) {
      return [];
    }
  }

  async getImpresionTipoList(fetchOptions?: AsyncDataOptions<TipoImpresion[]>) {
    return useAsyncData(
      "AltaSolicitudTipoList",
      (): Promise<TipoImpresion[]> =>
        this.call<TipoImpresion[]>(
          "GET",
          `${this.RESOURCE.GetImpresionTipoList()}`,
          undefined
        ),
      fetchOptions
    );
  }

  async getProvinciasList_Fetch() {
    try {
      return this.call<Provincia[]>(
        "GET",
        `${this.RESOURCE.GetProvinciaList()}`,
        undefined
      );
    } catch (error) {
      return [];
    }
  }

  async getProvinciasList(fetchOptions?: AsyncDataOptions<Provincia[]>) {
    return useAsyncData(
      "ProvinciasList",
      (): Promise<Provincia[]> =>
        this.call<Provincia[]>(
          "GET",
          `${this.RESOURCE.GetProvinciaList()}`,
          undefined
        )
          // Ordenamos para que siempre salgan por orden alfabetico.
          // Filtramos porque solo queremos las provincias que tengan nombre. Lo hacemos por problemas en las tablas SIGE.
          .then((response) =>
            response
              .filter((item) => item.hasOwnProperty("Nombre"))
              .sort((a, b) =>
                a.Nombre.localeCompare(b.Nombre, "es", {
                  sensitivity: "accent",
                })
              )
          ),
      fetchOptions
    );
  }

  async getContratoEstadosList(
    fetchOptions?: AsyncDataOptions<ContratoEstado[]>
  ) {
    return useAsyncData(
      "ContratoEstadosList",
      (): Promise<ContratoEstado[]> =>
        this.call<ContratoEstado[]>(
          "GET",
          `${this.RESOURCE.GetContratoEstadosList()}`,
          undefined
        ),
      fetchOptions
    );
  }

  async getColectivoList() {
    try {
      return this.call<Colectivo[]>(
        "GET",
        `${this.RESOURCE.GetColectivosList()}`,
        undefined
      );
    } catch (error) {
      return [];
    }
  }

  
  async getResumenDashboard(
    fetchOptions?: AsyncDataOptions<Record<string, number>>
  ) {
    return useAsyncData(
      "ResumenDashboard",
      () =>
        this.call<Record<string, number>>(
          "GET",
          `${this.RESOURCE.GetResumenDashboard()}`,
          undefined
        ),
      fetchOptions
    );
  }
}

export default UtilityModule;
