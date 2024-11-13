import type {UserAsociable} from "~/types/usuarios";

declare global {
    type Agente = {
        Id: number;
        Nombre: string;
        Referencia: string;
        Email?: string;
        Movil?: string;
        UserAsociado?: UserAsociable;
        TipoAgente?: string;
        Ciudad?: string;
        Direccion?: string;
        CodigoPostal?: string;
        Telefono?: string;
        Web?: string;
        Notas?: string;
    };
}

export {Agente};

