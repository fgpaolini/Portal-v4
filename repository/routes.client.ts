/*
 * Prefix /sips for api server
 */
const prefix: string = "/sips";

const buildQuery = (params: { [key: string]: any }) => {
    let query = "";
    for (const key in params) {
        if (
            params[key] !== null &&
            params[key] !== "" &&
            params[key] !== undefined
        ) {
            if (Array.isArray(params[key])) {
                // Serializar arrays usando índices para cada valor en la lista
                params[key].forEach((value: any, index: number) => {
                    query += `${query ? "&" : "?"}${key}[${index}]=${encodeURIComponent(value)}`;
                });
            } else {
                query += `${query ? "&" : "?"}${key}=${encodeURIComponent(params[key])}`;
            }
        }
    }
    return query;
};

const Sips = {
    GetCupsInfo: (cups: string) => `${prefix}/${cups}`,
    GetCupsInfoRAW: (cups: string) => `${prefix}/raw/${cups}`,
    GetConsumoCups: (cups: string) => `${prefix}/consumo/${cups}`,
    ExportData: (cups: string) => `${prefix}/export?cups=${cups}`,
}

const Contratos = {
    GetContratosList: (
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) => {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        console.log(`api/contract${query}`);
        return `api/contract${query}`;
    },
    ExportContracts: (
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) => {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        console.log(`api/contract/export${query}`);
        return `api/contract/export${query}`;
    }
    ,
    GetContratoById: (codigoContrato: number) => `api/contract/id?codigo=${encodeURIComponent(codigoContrato)}`,
    GetContratoDocumentos: (codigoContrato: number) => `api/contract/documentos?contrato=${encodeURIComponent(codigoContrato)}`,
    GetContratoDocumentoFile: (idDocumento: number) => `api/contract/documento?idDocumento=${encodeURIComponent(idDocumento)}`,
    GetSituacionContratos: () => 'api/contract/situacion-contratos',
    GetCantidadPorMes: (desde: string, hasta?: string) => {
        const query = buildQuery({desde, hasta});
        return `api/contract/cantidad-por-mes${query}`;
    },
    PrintContrato: (codigoContrato: number) => `api/contract/print?codigoContrato=${encodeURIComponent(codigoContrato)}`,
    InsertDocumentos: () => `api/contract/insert-documents`,
    GetIsCupsInContract: (cups: string) => `api/contract/cups-contrato?cups=${encodeURIComponent(cups)}`
}

const Facturas = {
    GetFacturasPorContrato: (codigo: number) => {
        const query = buildQuery({codigo});
        return `/api/facturas/facturas-contrato?codigo=${codigo}`
    },
    GetFacturas: (
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) => {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        console.log(`api/facturas${query}`);
        return `api/facturas${query}`;
    },
    ExportFacturas: (
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) => {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        console.log(`api/facturas/export${query}`);
        return `api/facturas/export${query}`;
    }
}

const Utilidades = {
    GetCNAEList: () => `api/utility/cnaes`,
    GetTarifasList: () => `api/utility/tarifas`,
    GetAltaTipoSolicitudList: () => `api/utility/tipoaltasolicitud`,
    GetImpresionTipoList: () => `api/utility/tipoimpresionfacturas`,
    GetProvinciaList: () => `api/utility/provincias`,
    GetContratoEstadosList: () => `api/utility/contrato/estados`,
    GetResumenDashboard: () => `api/utility/dashboard/resumen`,
    GetComisionesList: () => `api/utility/tipocomision`,
    GetColectivosList: () => `api/utility/colectivos`,
}

const Agentes = {
    GetList: (
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) => {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        console.log(`api/agentes${query}`);
        return `api/agentes${query}`;
    },
    GetById: (IdAgente: number) => {
        return `api/agentes/${encodeURIComponent(IdAgente)}`;
    },
    GetJerarquiaById: (IdAgente: number) => {
        return `api/agentes/jerarquia/${encodeURIComponent(IdAgente)}`;
    },
    GetUsersAsociables: (IdAgente: number) => {
        return `api/agentes/${encodeURIComponent(IdAgente)}/usuarios/asociables`;
    },
    UpdateUserAsociado() {
        return `api/agentes/usuarios/asociar`;
    },
    RemoveUserAsociado() {
        return `api/agentes/usuarios/asociar/remove`;
    },
    ExportData(
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        return `api/agentes/export${query}`;
    }
}

const Usuarios = {
    GetUsuariosList: (
        pageIndex: number = 0,
        pageSize: number = 10,
        sortColumn?: string,
        sortOrder?: string,
        filterColumns?: string[],
        filterQueries?: string[]
    ) => {
        const query = buildQuery({
            pageIndex,
            pageSize,
            sortColumn,
            sortOrder,
            filterColumns,
            filterQueries,
        });
        console.log(`api/usuarios${query}`);
        return `api/usuarios${query}`;
    },
    RegisterUser: () => "api/usuarios/register",
    UpdateUser: (id: string) => `api/usuarios/update?Id=${encodeURIComponent(id)}`,
    DeleteUser: (id: string) => `api/usuarios/delete?Id=${encodeURIComponent(id)}`,
}

const Energia = {
    GetIndexHistoricoCierre: (desde: string, hasta: string, tarifa: number, modalidad?: number, fee?: number) => {
        const query = buildQuery({
            desde,
            hasta,
            tarifa,
            modalidad,
            fee
        })
        return `api/energia/historico-cierre/index${query}`
    },
    GetExcedentesHistoricoCierre: (desde: string, hasta: string, tarifa: number) => {
        const query = buildQuery({
            desde,
            hasta,
            tarifa
        })
        return `api/energia/historico-cierre/excedentes${query}`
    },
    GetOMIEHistoricoCierre: (desde: string, hasta: string) => {
        const query = buildQuery({
            desde, hasta
        })
        return `api/energia/historico-cierre/omie${query}`
    },
    ExportHistoricoCierre: (desde: string, hasta: string, tarifa: number, modalidad: number, fee?: number) => {
        const query = buildQuery({
            desde, hasta, tarifa, modalidad, fee
        })
        console.log(query)
        return `api/energia/historico-cierre/export${query}`
    }
}

const Preferences = {
    GetUserPreferences: () => `api/usuarios/preferences`,
    PostUserPreferences: () => `api/usuarios/preference`,
}

const ContratosByFetch = {
    InsertContrato: `api/contract/insert`
}

const Clientes = {
    GetByIdentificador: (identificador: string) => `api/client?identificador=${identificador}`,
    GetById: (id: number) => `api/client-id?id=${id}`,
}

const Precios = {
    GetPrecioFijo: (tarifa: Ref<Tarifa>) => `api/energia/preciofijo?tarifa=${tarifa.value.Id}`,
}


const Validators = {
    IBAN: (iban: string) => `api/validators/iban?iban=${iban}`,
    NIF: (nif: string) => `api/validators/nif?nif=${nif}`,
    CUPS: (cups: string) => `api/validators/cups?cups=${cups}`,
}

const Routes = {
    Sips: Sips,
    ContratosByFetch: ContratosByFetch,
    Contratos: Contratos,
    Facturas: Facturas,
    Utilidades: Utilidades,
    Agentes: Agentes,
    Usuarios: Usuarios,
    Energia: Energia,
    Preferences: Preferences,
    Clientes: Clientes,
    Precios: Precios,
    Validators: Validators
};

export default Routes;
