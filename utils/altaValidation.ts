import { number, object, string, boolean, StringSchema, NumberSchema, ObjectSchema, date, Schema } from 'yup';
import { TiposDocumento } from '~/config/enums/TipoDocumento';


/* const cupsRegex = /^[A-Z]{2}(\d{4}\d{12})([A-Z]{2})(\d[FPCRXYZ])?$/i;

const identificadorSchema = string()
	.required('Este campo es obligatorio.')
	.min(9, "NIF debe tener 9 caracteres")
	.label('Identificador');

const cupsSchema = string()
	.required('Este campo es obligatorio.')
	.matches(cupsRegex, "El CUPS debe tener un formato válido.")
	.min(20, "CUPS debe tener al menos 20 caracteres")
	.max(22, "CUPS no puede tener más de 22 caracteres")
	.label('Cups');

const step1Schema = object({
	cups: cupsSchema,
});
 */
const step2Schema = object({
	// DATOS SUMINISTROS
	DireccionSuministroPoblacion: string().required('Este campo es obligatorio').label('Población'),
	DireccionSuministroProvincia: string().required('Selecciona una provincia.'),
	DireccionSuministroCalle: string().required('Este campo es obligatorio.'),
	DireccionSuministroMunicipio: string().required('Este campo es obligatorio.'),
	sinNumero: boolean().required(),
	DireccionSuministroNumero: string()
		.when('sinNumero', {
			is: false,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	DireccionSuministroCodigoPostal: string().required('Este campo es obligatorio.'),
	CodigoCNAE: string().required('Selecciona un grupo de actividad económica.'),

	DireccionTitularOpt: boolean().required(),
	DireccionEnvioOpt: boolean().required(),

	DireccionTitularPoblacion: string()
		.when('DireccionTitularOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	DireccionTitularProvincia: number()
		.when('DireccionTitularOpt', {
			is: true,
			then: (schema: Schema) => string().required('Debe seleccionar una provincia.'),
			otherwise: (schema: Schema) => number().nullable(),
		}),
	DireccionTitularCalle: string()
		.when('DireccionTitularOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	DireccionTitularMunicipio: string()
		.when('DireccionTitularOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),

	cbSinNumeroTitular: boolean().required(),
	TipoDocumento: string()
		.oneOf(
			[TiposDocumento.CIF, TiposDocumento.NIE, TiposDocumento.NIF_DNI],
			"Debe seleccionar un tipo de documento."
		),
	DireccionTitularNumero: string()
		.when(['DireccionTitularOpt', 'cbSinNumeroTitular'], {
			is: (DireccionTitularOpt: boolean, cbSinNumeroTitular: boolean) => DireccionTitularOpt === true && cbSinNumeroTitular === false,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	DireccionTitularCodigoPostal: string()
		.when('cbSinNumeroTitular', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),

	Nombre: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().nullable(),
			otherwise: (schema: Schema) => string().required('Este campo es obligatorio.'),
		})
		.label('Nombre'),

	Apellido1: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().nullable(),
			otherwise: (schema: Schema) => string().required('Este campo es obligatorio.'),
		})
		.label('Primer apellido'),
	
	Apellido2: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().nullable(),
			otherwise: (schema: Schema) => string().required('Este campo es obligatorio.'),
		})
		.label('Segundo apellido'),
	RazonSocial: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	Email: string().email("El email no es válido.").required('Este campo es obligatorio.'),
	TelefonoFijo: string().label('Teléfono fijo'),
	TelefonoMovil: string().required('Este campo es obligatorio.').label('Teléfono móvil'),

	// DATOS REPRESENTANTE
	Representante: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		})
		.label('Representante'),
	IdentificadorRep: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		})
		.label('Identificador representante'),
	EmailRep: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		})
		.label('Email representante'),
	SMSRep: string()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		})
		.label('Móvil representante'),
	IdColectivoRep: number()
		.when('TipoDocumento', {
			is: TiposDocumento.CIF,
			then: (schema: Schema) => number().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => number().nullable(),
		})
		.label('Móvil representante'),

	NombrePagador: string().required('Este campo es obligatorio.').label('Nombre del pagador'),
	/* IBAN: string().required('Este campo es obligatorio.').label('IBAN'), */
	IdentidadPagador: string().required('Este campo es obligatorio.').label('Identidad del pagador'),

	NombreEnvio: string()
		.when('DireccionEnvioOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),

	DireccionEnvioPoblacion: string()
		.when('DireccionEnvioOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),

	DireccionEnvioProvincia: string()
		.when('DireccionEnvioOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),

	DireccionEnvioCalle: string()
		.when('DireccionEnvioOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	DireccionEnvioMunicipio: string()
		.when('DireccionEnvioOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
	DireccionEnvioNumero: string()
		.when(['DireccionEnvioOpt', 'cbSinNumeroEnvio'], {
			is: (DireccionEnvioOpt: boolean, cbSinNumeroEnvio: boolean) => DireccionEnvioOpt === true && cbSinNumeroEnvio === false,
			then: (schema: StringSchema) => schema.required('Este campo es obligatorio.'),
			otherwise: (schema: StringSchema) => schema.nullable(),
		}),
	cbSinNumeroEnvio: boolean().required(),
	DireccionEnvioCodigoPostal: string()
		.when('DireccionEnvioOpt', {
			is: true,
			then: (schema: Schema) => string().required('Este campo es obligatorio.'),
			otherwise: (schema: Schema) => string().nullable(),
		}),
});


const step3Schema = object({
    Tarifa: object()
        .required("Debe seleccionar una tarifa."),

    TipoPrecio: string()
        .oneOf(
            Object.values(TiposPrecio),
            "Debe seleccionar un tipo de precio."
        )
        .required("Debe seleccionar un tipo de precio."),

    TipoPrecioProducto: string()
        .oneOf(
            Object.values(TiposPrecioProducto),
            "Debe seleccionar un tipo de producto."
        )
        .when('TipoPrecio', {
            is: TiposPrecio.Index,
            then: (schema: Schema) => string().required("Debe seleccionar un tipo de precio."),
            otherwise: (schema: Schema) => string().nullable(),
        }),

    TipoSolicitud: object()
        .required("Selecciona un tipo de solicitud."),
    TipoImpresionFactura: object()
        .required("Seleccionar un tipo de impresión."),
    FeeEnergia: number().required("Selecciona un fee."),
    FeePotencia: number().required("Selecciona un fee."),

    P1: number()
		.moreThan(0, "Introduce un valor mayor que 0.")
		.required("Introduce un valor."),

    P2: number()
        .when('Tarifa.Id', {
            is: (id: number) => id !== TipoTarifa.Tarifa20TD,
            then: (schema: Schema) =>
				schema
				.test("incremental", "P2 debe ser igual o mayor que P1", function (this: any, value: number) {
					return value === undefined || value >= this.parent.P1;
				}),
            otherwise: (schema: Schema) => schema.nullable(),
        }),
		
	P3: number().required("Introduce un valor.")
		.when('Tarifa.Id', {
			is: (id: number) => id === TipoTarifa.Tarifa20TD,
			then: (schema) => 
				schema.required("Introduce un valor.").moreThan(0, "Introduce un valor mayor que 0."),
			otherwise: (schema) => 				
				number()
				.required("Introduce un valor.")
				.test("incremental", "P3 debe ser igual o mayor que P2", function (this: any, value: number | null | undefined) {
					return value === undefined || value === null || value >= this.parent.P2;
				}),
	}),

    P4: number()
        .when('Tarifa.Id', {
            is: (id: number) => id !== TipoTarifa.Tarifa20TD,
            then: (schema: Schema) =>
                schema
                    .required("Introduce un valor.")
                    .test("incremental", "P4 debe ser igual o mayor que P3", function (this: any, value: number) {
                        return value === undefined || value >= this.parent.P3;
                    }),
            otherwise: (schema: Schema) => schema.nullable(),
        }),

    P5: number()
        .when('Tarifa.Id', {
            is: (id: number) => id !== TipoTarifa.Tarifa20TD,
            then: (schema: Schema) =>
                schema
                    .required("Introduce un valor.")
                    .test("incremental", "P5 debe ser igual o mayor que P4", function (this: any, value: number) {
                        return value === undefined || value >= this.parent.P4;
                    }),
            otherwise: (schema: Schema) => schema.nullable(),
        }),

    P6: number()
        .when('Tarifa.Id', {
            is: (id: number) => id !== TipoTarifa.Tarifa20TD,
            then: (schema: Schema) =>
                schema
                    .required("Introduce un valor.")
                    .test("incremental", "P6 debe ser igual o mayor que P5", function (this: any, value: number) {
                        return value === undefined || value >= this.parent.P5;
                    }),
            otherwise: (schema: Schema) => schema.nullable(),
        }),
});

const altaSchema = { ...step2Schema }

export { step2Schema, step3Schema, cupsSchema }