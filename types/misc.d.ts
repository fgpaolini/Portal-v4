declare global {
    type IBANValidationResult = {
        IsValid: boolean;
        Iban: string;
        Pais: string;
        PaisISO: string;
    }

    type NIFValidationResult = {
        TipoDocumentoId: number;
        TipoDocumento: TipoDocumento;
        NIF: string;
        NormalizedNIF: string;
        IsValid: boolean;
    }

}

export {
    IBANValidationResult, NIFValidationResult
}