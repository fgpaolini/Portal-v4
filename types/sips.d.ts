import type { array } from "yup";

declare global {
  type SipsInfo = {
    Cups: string;
    ConsumoEstimado: number;
    Tension: number;
    TensionFriendlyName: string;
    Fases: number;
    CodigoCNAE: string;
    TipoTarifa: number;
    PotenciaContratada: { [key: string]: number }[];
    ConsumoPeriodos: {
      P1: number,
			P2: number,
			P3: number,
			P4: number,
			P5: number,
			P6: number,
    };
  };

  type ConsumoCups = {
    Fecha: string;
    P1?: number;
    P2?: number;
    P3?: number;
    P4?: number;
    P5?: number;
    P6?: number;
  };



  type ClientesSips = {
    CodigoCUPS: string;
    CodigoEmpresaDistribuidora: string;
    NombreEmpresaDistribuidora: string;
    CodigoPostalPS: string;
    MunicipioPS: string;
    CodigoProvinciaPS: string;
    FechaAltaSuministro: string;
    CodigoTarifaATREnVigor: string;
    CodigoTensionV: string;
    PotenciaMaximaBIEW: number;
    PotenciaMaximaAPMW: number;
    CodigoClasificacionPS: string;
    CodigoDisponibilidadICP: string;
    TipoPerfilConsumo: string;
    ValorDerechosExtensionW: string;
    ValorDerechosAccesoW: string;
    CodigoPropiedadEquipoMedida: string;
    CodigoPropiedadICP: string;
    PotenciasContratadasEnWP1: number;
    PotenciasContratadasEnWP2: number;
    PotenciasContratadasEnWP3: number;
    PotenciasContratadasEnWP4: number;
    PotenciasContratadasEnWP5: number;
    PotenciasContratadasEnWP6: number;
    FechaUltimoMovimientoContrato: string;
    FechaUltimoCambioComercializador: string;
    FechaLimiteDerechosReconocidos: string;
    FechaUltimaLectura: string;
    InformacionImpagos: string;
    ImporteDepositoGarantiaEuros: string;
    TipoIdTitular: string;
    EsViviendaHabitual: string;
    CodigoTelegestion: string;
    CodigoFasesEquipoMedida: string;
    CodigoAutoconsumo: string;
    CodigoTipoContrato: string;
    CodigoPeriodicidadFacturacion: string;
    CodigoBIE: string;
    FechaEmisionBIE: string;
    FechaEmisionAPM?: string;
    FechaCaducidadBIE: string;
    Cnae: string;
    CodigoModoControlPotencia: string;
    PotenciaCGPW: string;
    CodigoDHEquipoDeMedida: string;
    CodigoPSContratable: string;
    CodigoTipoSuministro: string;
    AplicacionBonoSocial: string;
    DesProvinciaTitular?: string;
    DesProvinciaPS: string;
    DesMunicipioPS: string;
    DistriTarifaCP: string;
    DistriTarifa: string;
    DistriCP: string;
    TarifaCP: string;
    DistriCiudad: string;
    TarifaCiudad: string;
    CpCiudad: string;
    DistriProvincia: string;
    TarifaProvincia: string;
    CpProvincia: string;
  };

  type ConsumosSips = {
    CodigoCUPS: string;
    FechaInicio: string;
    FechaFin: string;
    CodigoTarifaATR: string;
    Activa1: number;
    Activa2: number;
    Activa3: number;
    Activa4: number;
    Activa5: number;
    Activa6: number;
    Reactiva1: number;
    Reactiva2: number;
    Reactiva3: number;
    Reactiva4: number;
    Reactiva5: number;
    Reactiva6: number;
    Potencia1: number;
    Potencia2: number;
    Potencia3: number;
    Potencia4: number;
    Potencia5: number;
    Potencia6: number;
    CodigoDHEquipoDeMedida: string;
};


  type CupsInfoRAW = {
    ClientesSips: ClientesSips[]
    ConsumosSips: ConsumosSips[]
  }
}

export {
  SipsInfo, ConsumoCups, CupsInfoRAW, ClientesSips
};
