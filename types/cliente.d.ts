declare global {
    type ClienteDTO = {
        Identidad: string;
        Nombre: string;
        Apellido1: string;
        Apellido2: string;
        RazonSocial: string;
        TelefonoFijo: string;
        TelefonoMovil: string;
        Email: string;
        NombrePagador: string;
        IBAN: string;
        IdentidadPagador: string;
    };
}

export { Cliente };