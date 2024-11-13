declare global {
    type Contrato = {
        Nombre: string;
        Email: string;
        NIF: string;
        Cups: string;
        Direccion: string;
        Municipio: string;
        ConsumoEstimado: number;
        Estado: string;
        FechaContrato: string;
        FechaActivacion: string;
        FechaPrevistaActivacion: string;
        FechaVencimiento: string;
        FechaBaja: string;
        Tarifa: string;
        Agente: string;
        Referencia: number;
        PotenciaTotal: number;
        Modalidad: string;
        Fee: number;
        TipoComision: string;
    };

    type ContratoObservaciones = {
        Observaciones: string;
        Lista: List<string>;
    };

    type ContratoTarifa = {
        Tarifa: string;
        PerfilFacturacion: string;
        Grupo: string;
    };
    type ContratoRepresentante = {
        Representante: string;
        ColectivoRep: string;
        IdentificadorRep: string;
        EmailRep: string;
        TelefonoRep: string;
        Comentario: string;
    };

    type ContratoPotencia = {
        PotenciaContratada: number;
        TarifaPeriodo: string;
        PotenciaMaxima: number;
        PeriodoHorario: string;
    };
    type ContratoInfo = Contrato & {
        Aclarador: string;
        Ciudad: string;
        Calle: string;
        CNAE: string;
        Agregacion: string;
        Tension: string;
        Colectivo: string;
        CodigoContable: string;
        Idioma: string;
        ModeloContrato: string;
        Distribuidora: string;
        TipoImpuesto: string;
        TipoPeriodo: string;
        RefExt1: string;
        Observaciones: ContratoObservaciones;
        TarifaML: ContratoTarifa;
        TarifaAcceso: ContratoTarifa;
        Representante: ContratoRepresentante;
        Potencias: List<ContratoPotencia>;
        SegmentacionContratos: List<AgrupacionContrato>;
        SegmentacionContratosRenovacion: List<AgrupacionContrato>;
    };

    type AgrupacionContrato = {
        TextoAgrupacion: string;
        CodigoAgrupacion: string;
    };

    type ContratoDocumento = {
        IdDocumento: number;
        CodigoContrato: number;
        Nombre: string;
        FileName: string;
        Comentario: string;
        FileSize: number;
        FechaCreacion: DateTime;
    };

    type ContratoEstado = {
        Id: number;
        Texto: string;
        IsVisible: boolean;
        Severity: string;
    };

    type FacturaContrato = {
        FechaFactura : string;
        LecturaAnterior: string;
        LecturaActual: string;
        Seriefactura: string;
        Numero: number;
        CodigoContrato: number;
        Agente: string;
        Cliente: string;
        NIFCliente: string;
        TipoFactura: string;
        TipoImpuesto: string;
        Tarifa: string;
        IdDocumento: number;
        NombreDocumento: string;
        ImporteBase: number;
        ImporteImpuesto: number;
        ImporteTotal: number;
        PorcentajeImpuesto: number;
        Potencia: number;
        Energia: number;
        Alquiler: number;
        Reactiva: number;
        ExcesosPotencia: number;
        DescuentoPotencia: number;
        DescuentoEnergia: number;
        Productos: number;
    }

    type DocumentInsert = {
        CodigoContrato: number;
        NombreDocumento: string;
        Documento: string;
    }

}

export {
    Contrato,
    AgrupacionContrato,
    ContratoInfo,
    ContratoObservaciones,
    ContratoTarifa,
    ContratoRepresentante,
    ContratoPotencia,
    ContratoEstado,
    FacturaContrato,
    DocumentInsert
};