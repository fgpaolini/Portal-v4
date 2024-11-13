import { number, object, string, StringSchema, NumberSchema, ObjectSchema, date } from 'yup';
import { Tarifas } from '#imports';

// Definir el tipo para los campos del esquema Yup
type SchemaField = StringSchema | NumberSchema | ObjectSchema<any>;
type SchemaFields = Record<string, SchemaField>; // Tipo para los campos del esquema

const schemaAltaUsuario = object({
    Name: string()
        .required('Este campo es obligatorio.')
        .min(4, 'El nombre debe contener más de 4 caracteres.')
        .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios.')
        .label('Nombre'),
    LastName: string()
        .required('Este campo es obligatorio.')
        .min(4, 'El apellido debe contener más de 4 caracteres.')
        .label('Apellido'),
    Email: string()
        .email("El email no es válido.")
        .required('Este campo es obligatorio.')
        .label('Email'),
    password: string()
        .required('Este campo es obligatorio.')
        .min(6, 'La contraseña debe contener al menos de 6 caracteres.')
        .label('Contraseña'),
    telefono: number()
        .typeError("No parece un número de teléfono.")
        .positive("El número de teléfono no puede empezar con un menos.")
        .integer("El número de teléfono no puede incluir un decimal.")
        .min(8)
        .label('Teléfono'),
    AgenteAsignado: number().nullable()
});

const schemaEditUsuario = object({

    Name: string()
        .required('Este campo es obligatorio.')
        .min(4, 'El nombre debe contener más de 4 caracteres.')
        .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios.')
        .label('Nombre'),
    LastName: string()
        .required('Este campo es obligatorio.')
        .min(4, 'El apellido debe contener más de 4 caracteres.')
        .label('Apellido'),
    Email: string()
        .email("El email no es válido.")
        .required('Este campo es obligatorio.')
        .label('Email'),
});

const schemaHistoricoCierreForm = object({
    FechaInicio: date()
        .transform(parseAndValidateDate)
        .nullable()
        .typeError('Por favor, introduce una fecha válida.')
        .required('La fecha de inicio es obligatoria.')
        .label('Fecha de inicio'),

        FechaFin: date()
        .transform(parseAndValidateDate)
        .nullable()
        .typeError('Por favor, introduce una fecha válida.')
        .required('La fecha de fin es obligatoria.')
        .label('Fecha fin')
        .test(
            'min-date-difference',
            'La fecha de fin debe ser al menos 60 días posterior a la fecha de inicio.',
            function(value) {
                //console.log(value);
                const { FechaInicio } = this.parent;
                if (FechaInicio && value) {
                    const fechaInicio = new Date(FechaInicio);
                    const fechaFin = new Date(value);
                    return fechaFin > fechaInicio && (fechaFin.getTime() - fechaInicio.getTime()) >= 1 * 24 * 60 * 60 * 1000;
                }
                return true;
            }
        ),

    Tarifa: number().oneOf([202020, 202030, 202061, 202062], `La tarifa debe ser una de las siguientes:  ${Tarifas.map(t => t.name).join(', ')}`)
        .required("Debe seleccionar una tarifa.")
        .label('Tarifa'),
    Modalidad: number().required("Debe seleccionar una modalidad.").label('Modalidad'),
    GOP: number().label('GOP'),
});

// obtener campos con errores en español
const getMissingFields = (
    errors: Record<string, string | undefined>,
    schema: ObjectSchema<any>
): Record<string, string> => {
    const result: Record<string, string> = {};

    // Obtener las claves del esquema de validación como cadenas
    const schemaFields = Object.keys(schema.fields) as Array<string>;

    // Iterar sobre las claves de errores
    schemaFields.forEach(field => {
        if (errors[field]) {
            const fieldSchema = schema.fields[field] as SchemaField;
            const label = fieldSchema && 'spec' in fieldSchema && fieldSchema.spec?.label ? fieldSchema.spec.label : field;
            result[label] = errors[field] ?? field;
        }
    });

    return result;
};

const getLabelForField = (fieldName: keyof typeof schemaAltaUsuario.fields): string => {
    const fieldSchema = schemaAltaUsuario.fields[fieldName] as SchemaField;
    if (fieldSchema && 'spec' in fieldSchema && fieldSchema.spec?.label) {
        return fieldSchema.spec.label;
    } else {
        return fieldName;
    }
};

// Función para validar y transformar una fecha en formato MM-dd-yyyy
function parseAndValidateDate(value: any, originalValue: any){
    if (value instanceof Date && !isNaN(value.getTime())) {
        return value;
    }

    if (!originalValue) {
        return new Date('');
    }

    // Verificar si el valor original coincide con el formato MM-dd-yyyy
    const [month, day, year] = originalValue.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    // Validar que la fecha sea válida
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
        return date;
    }

    // Retorna una fecha inválida si el formato o la fecha no es válida
    return new Date('');
}

export { schemaAltaUsuario, schemaEditUsuario, schemaHistoricoCierreForm, getMissingFields, getLabelForField };
