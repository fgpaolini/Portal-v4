declare global {
	type ContratoAlta = {
		Cups: string;
		Identificador: string;
		Tarifa: Tarifa;
		DireccionSuministro: Direccion;
		DireccionTitular: Direccion;
		DireccionEnvio: Direccion;
		DireccionTitularOpt: boolean;
		DireccionEnvioOpt: boolean;
		CodigoCNAE: string;
		Nombre: string;
		NombreEnvio: string;
		Apellido1: string;
		Apellido2: string;
		RazonSocial: string;
		Email: string;
		TelefonoFijo: string;
		TelefonoMovil: string;
		NombrePagador: string;
		IBAN: string;
		IdentidadPagador: string;
		TipoPrecio: TipoPrecio;
		TipoPrecioProducto: TipoPrecioProducto;
		FeeEnergia: number;
		FeePotencia: number;
		Extras: ContratoAltaExtras[];
		CuotaFija: number | null;
		TipoSolicitud: AltaTipoSolicitud | null;
		TipoImpresionFactura: TipoImpresion | null;
		PotenciaContratada: {
			P1: number,
			P2: number,
			P3: number,
			P4: number,
			P5: number,
			P6: number,
		},
		ConsumoPeriodos: {
			P1: number,
			P2: number,
			P3: number,
			P4: number,
			P5: number,
			P6: number,
		};
		ConsumoEstimado: number | null;
		Observaciones: string | null;
		//Rep
		Representante: string | null;
		IdentificadorRep: string | null;
		EmailRep: string | null;
		SMSRep: string | null;
		IdColectivoRep: number | null;
	};

	type AltaContratoResponse = {
		Contratos: ContratoResponse[];
	}
	type ContratoResponse = {
		CodigoContrato?: number | null;
		CodigoCUPS?: string | null;
		IdCliente?: number | null;
		IdContrato?: number | null;
		IdCUPS?: number | null;
		IdDocumento?: number | null;
		IdEmpresa?: number | null;
		Incidencias?: Incidencia[] | null;
	};

	type Incidencia = {
		Mensaje: string;
		ExceptionMessage: string;
		ExceptionTimestamp: Date;
		CodeAlfa: string;
		ExceptionStackTrace: string;
		IsError: boolean;
		IsExcepcion: boolean;
		InnerException: string;
		Propiedad: string;
		ImageSource: string;
		IsAdvertencia: boolean;
		Code: number;
	};


}

export { ContratoAlta, AltaContratoResponse, Incidencia };
