declare global {
	type PrecioFijo = {
		[key: `PrecioP${number}`]: number | null;
		FechaInicio?: Date;
		FechaFin?: Date;
		PrecioP1?: number;
		PrecioP2?: number;
		PrecioP3?: number;
		PrecioP4?: number;
		PrecioP5?: number;
		PrecioP6?: number;
		Tarifa?: Tarifa;
	};
}
export { PrecioFijo };

