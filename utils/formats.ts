import { useDateFormat } from "@vueuse/core";


export const TarifaFormat = (tarifa: number): string => {
	switch (tarifa) {
		case 202020:
			return "2.0TD";
		case 202030:
			return "3.0TD";
		case 202061:
			return "6.1TD";
		case 202062:
			return "6.2TD";
		default:
			return "No especificado";
	}
};

export const TarifaTipoFormat = (tarifa: number): Tarifa | null => {
	switch (tarifa) {
		case 202020:
			return { Id: 202020, Nombre: "2.0 TD"};
		case 202030:
			return { Id: 202030, Nombre: "3.0 TD"};
		case 202061:
			return { Id: 202061, Nombre: "6.1 TD"};
		case 202062:
			return { Id: 202062, Nombre: "6.2 TD"};
		default:
			return null;
	}
};

export const formatFecha = (Fecha: any) => useDateFormat(Fecha, "DD/MM/YYYY").value;

export const CapitalizeFirstLetter = (s: string): string => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

export const StringToDate = (date: string, format: string): string => {
	const formatted = useDateFormat(date, format);
	return CapitalizeFirstLetter(formatted.value);
};

export const getSeverity = (status: string): string => {
	switch (status) {
		case "Contrato":
			return "success";

		case "Baja":
			return "danger";

		case "Baja por modificación":
			return "secondary";

		case "Cancelado":
			return "warning";

		case "Anulado por distribuidora":
			return "warning";

		case "Registrado":
			return "contrast";

		case "Firmado":
			return "info";

		case "Pendiente de firma":
			return "info";

		case "Trámite":
			return "info";

		default:
			return "";
	}
};

/**
 * Convierte bytes a kilobytes.
 * @param bytes La cantidad de bytes a convertir.
 * @param binary Si es true, utiliza el sistema binario (1 KB = 1024 bytes). Si es false, utiliza el sistema decimal (1 KB = 1000 bytes).
 * @returns La cantidad de kilobytes.
 */
export const convertBytesToKB = (
	bytes: number,
	binary: boolean = false
): number => {
	const conversionFactor = binary ? 1024 : 1000;
	const conversion = bytes / conversionFactor;
	return Math.round(conversion);
};

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	// Verificar si la fecha es válida
	if (!isNaN(date.getTime())) {
		return new Intl.DateTimeFormat("es-ES", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		}).format(date);
	} else {
		return "";
	}
};

export const formatNumber = (
	number: number | undefined,
	IsMoney?: boolean,
	decimals: number = 2 // Por defecto, 2 decimales
): string => {
	if (number === undefined || number === null) return "";
	const options: Intl.NumberFormatOptions = {
		style: IsMoney ? 'currency' : 'decimal',
		useGrouping: true,
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	};

	if (IsMoney) {
		options.currency = 'EUR';
	}

	return Intl.NumberFormat("es-ES", options).format(number);
};


export const GetFileExportTimeName = (): string => {
	return useDateFormat(Date.now(), 'YYYY_MM_DD_HH_mm_ss').value
};



export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // esto es para quitar el prefijo MIME `data:application/pdf;base64,`
            const base64Data = result.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};