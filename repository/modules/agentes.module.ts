import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";

class AgentesModule extends FetchFactory {
  private readonly RESOURCE = Routes.Agentes;

  async getAgentes(
    OPTIONS: TableOptions,
    fetchOptions?: AsyncDataOptions<TableResult<Agente>>
  ) {
    return useAsyncData(
      "Agentes",
      () => {
        return this.call<TableResult<Agente>>(
          "GET",
          `${this.RESOURCE.GetList(OPTIONS.PageIndex, OPTIONS.PageSize, OPTIONS.SortColumn, OPTIONS.SortOrder, OPTIONS.FilterColumns, OPTIONS.FilterQueries ?? [])}`,
          undefined
        );
      },
      fetchOptions
    );
  }

  async getById(IdAgente: number, fetchOptions?: AsyncDataOptions<Agente>) {
    return useAsyncData(
      "Agentes_ById",
      () => {
        return this.call<Agente>(
          "GET",
          `${this.RESOURCE.GetById(IdAgente)}`,
          undefined
        );
      },
      fetchOptions
    );
  }

  async getJerarquiaById(
    IdAgente: number,
    fetchOptions?: AsyncDataOptions<Agente>
  ) {
    return useAsyncData(
      "Agentes_JerarquiaById",
      () => {
        return this.call<Agente>(
          "GET",
          `${this.RESOURCE.GetJerarquiaById(IdAgente)}`,
          undefined
        );
      },
      fetchOptions
    );
  }

  async getUsersAsociables(
    IdAgente: number,
    fetchOptions?: AsyncDataOptions<UserAsociable[]>
  ) {
    return useAsyncData(
      "Agentes_UsersAsociables",
      () => {
        return this.call<UserAsociable[]>(
          "GET",
          `${this.RESOURCE.GetUsersAsociables(IdAgente)}`,
          undefined
        );
      },
      fetchOptions
    );
  }

  async UpdateUserAsociado(
    IdAgente: number,
    IdUser: string,
    fetchOptions?: AsyncDataOptions<boolean>
  ) {
    return useAsyncData(
      "Agentes_UpdateUserAsociado",
      () => {
        return this.call<boolean>("POST", this.RESOURCE.UpdateUserAsociado(), {
          IdAgente,
          IdUser,
        });
      },
      fetchOptions
    );
  }

  async RemoveUserAsociado(
    IdAgente: number,
    fetchOptions?: AsyncDataOptions<boolean>
  ) {
    return useAsyncData(
      "Agentes_RemoveUserAsociado",
      () => {
        return this.call<boolean>("POST", this.RESOURCE.RemoveUserAsociado(), {
          IdAgente,
        });
      },
      fetchOptions
    );
  }

  async ExportAgentsData(
    OPTIONS: TableOptions,
    fetchOptions?: AsyncDataOptions<Blob>
  ) {
    return useAsyncData(
      "ExportAgents",
      () => {
        return this.call<Blob>(
          "GET",
          `${this.RESOURCE.ExportData(OPTIONS.PageIndex, -1, OPTIONS.SortColumn, OPTIONS.SortOrder, OPTIONS.FilterColumns, OPTIONS.FilterQueries?? [])}`,
          undefined
        );
      },
      fetchOptions
    )
  }

}

export default AgentesModule;
