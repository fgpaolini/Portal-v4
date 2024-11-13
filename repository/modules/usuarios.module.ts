import { $fetch } from 'ofetch';
import type { AsyncDataOptions } from "#app";
import FetchFactory from "../factory";
import Routes from "../routes.client";


class UsuariosModule extends FetchFactory {
  private readonly RESOURCE = Routes.Usuarios;

  async getUsuarios(
    OPTIONS: TableOptions,
    fetchOptions?: AsyncDataOptions<TableResult<ApplicationUser>>
  ) {
    return useAsyncData(
      "Usuarios",
      () => {
        return this.call<TableResult<ApplicationUser>>(
          "GET",
          `${this.RESOURCE.GetUsuariosList(OPTIONS.PageIndex, OPTIONS.PageSize, OPTIONS.SortColumn, OPTIONS.SortOrder, OPTIONS.FilterColumns, OPTIONS.FilterQueries ?? [])}`,
          undefined
        );
      },
      fetchOptions
    );
  }

  async updateUser(Id: string, User: Ref<UserUpdate>, fetchOptions?: AsyncDataOptions<UserUpdate>)
  {
    return useAsyncData(
      "UpdateUser",
      () => {
        return this.call<UserUpdate>(
          "PUT",
          `${this.RESOURCE.UpdateUser(Id)}`,
          User.value
        );
      },
      fetchOptions
    );
  }


  async deleteUser(Id: string, fetchOptions?: AsyncDataOptions<string>) {
    return useAsyncData(
      "DeleteUser",
      () => {
        return this.call<string>(
          "DELETE",
          `${this.RESOURCE.DeleteUser(Id)}`,
          undefined
        );
      },
      fetchOptions
    );
  }


}
export default UsuariosModule;
