declare global {
	interface MenuItem {
		label: string;
		dev?: boolean;
		icon?: string;
		to?: string;
		url?: string;
		target?: string;
		items?: MenuItem[];
		class?: string;
		visible?: boolean;
		disabled?: boolean;
		command?: Function
	}

	interface LayoutConfig {
		ripple: boolean;
		darkTheme: boolean;
		inputStyle: "filled" | "outlined";
		menuMode: string;
		theme: string;
		scale: number;
		activeMenuItem: string;
		//
		preset: string;
		primary: string;
		surface: string | null;

	}

	interface LayoutState {
		staticMenuDesktopInactive: boolean;
		overlayMenuActive: boolean;
		profileSidebarVisible: boolean;
		configSidebarVisible: boolean;
		staticMenuMobileActive: boolean;
		menuHoverActive: boolean;
		//activeMenuItem: string | null;
	}

	type Client = {
		Agente: string;
		CUPS: string;
		ConsumoEstimado: number;
		DNI: string;
		Direccion: string;
		Email: string;
		Estado: string;
		FechaContrato: string;
		FechaInicial: string;
		Incidencias: Array<string>;
		Nombre: string;
		Poblacion: string;
		Progreso: number;
		Tarifa: number;
		Telefono: string;
	};



	type TableOptions = {
		SortColumn?: string;
		SortOrder?: string;
		FilterColumns?: string[];
		FilterQueries?: string[];
		PageIndex: number;
		PageSize: number;
		TotalCount: number;
		TotalPages: number;
	};

	type TableResult<T> = {
		Data: T[];
		Options: TableOptions;
	};

	type ExpedienteComparativa = {
		expediente: string;
		creadoPorUser: string;
		asignadoAUser: string;
		cantidadDeRevisiones: number;
		cliente: string;
		cups: string;
		tarifa: string;
		gOp: number;
		gOpGenesis: number;
		fechaCreacion: string;
		fechaModificacion?: string;
		revisiones: RevisionComparativa[];
	};
	type RevisionComparativa = {
		ahorroDiario: number;
		ahorroMes: number;
		ahorroAnio: number;
		porcentajeAhorro: number;
		numeroRevision: number;
		cliente: string;
		cif: string;
		tarifa: number;
		consumoAnual: number;
		modalidad: number;
		topeGas: boolean;
		precioFijo: boolean;
		fechaRevision: string;
		fechaInicio: string;
		fechaFin: string;
		rangoDias: number;
		gOp: number;
		gOpGenesis: number;
		comision: {
			comisionEnergia: number;
			comisionPotencia: number;
			totalComision: number;
		};
		fechaRevisionFormatted: string;
		fechaInicioDateTime: string;
		fechaFinDateTime: string;
	};
	type CNAEInfo = {
		CodigoCNAE: string;
		TextoCNAE: string;
	};

	type Tarifa = {
		Id: number;
		Nombre: string;
	};

	type Direccion = {
		Id?: number;
		Municipio?: string;
		Poblacion?: string;
		ProvinciaId?: number;
		Provincia?: string;
		Calle?: string;
		Numero?: number;
		CodigoPostal?: string;
		Aclarador?: string;
	};
	type Comisiones = {
		Id: number;
		Nombre: string;
	};

	type AltaTipoSolicitud = {
		Id: number;
		Descripcion: string;
		Valor: string;
	};

	type TipoImpresion = {
		Id: number;
		Descripcion: string;
		Valor: string;
	};

	type Provincia = {
		Id: number;
		Nombre: string;
	};

	type DashboardData = {
		Data: T;
		DataAdicional: T;
	}


	type TarifaDescription = {
		name: string;
		value: TipoTarifa;
	}

	type TipoModalidad = {
		name: string;
		value: number;
	}

	type Colectivo = {
		Id: number;
		TextoColectivo: string;
	}


	type CierreDataDTO = {
		Periodos: string[]
		Data: Record<string, Record<string, number>>
		Media: Record<TipoPeriodo, number>
		DaysData: Record<string, number>
		MediaActual: Record<TipoPeriodo, number>
	}

	type OmieDataDTO = {
		Data: Record<string, number>
		DaysData: Record<string, number>
	}


	type CustomAppDefault = {
		Domain: TipoSubdomain;
		Name: string;
		Theme: string;
		Icon: {
			Light: string;
			Dark: string;
		};
		LogoIdentidad: {
			Light: string;
			Dark: string;
		};
		Favicon: string;
	}

}

export {
	LayoutConfig,
	LayoutState,
	MenuItem,
	Client,
	SipsInfo,
	IPost,
	IUser,
	AltaTipoSolicitud,
	ConsumoCups,
	ExpedienteComparativa,
	RevisionComparativa,
	CNAEInfo,
	Tarifa,
	TableResult,
	TableOptions,
	TipoImpresion,
	Provincia,
	DashboardData,
	TipoTarifa,
	TarifaDescription,
	TipoModalidad,
	CierreDataDTO,
	OmieDataDTO,
	CustomAppDefault,
	Colectivo
};
