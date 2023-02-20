import { IConvenioGrupos } from "./IConvenio";

export interface IConvenioComplemento {
    bloqueado: boolean,
    permitirParcelamento: boolean,
    enviarEcommerce: boolean,
    permitirRateio: boolean,
    visitadorId: number | null,
    etiquetaId: number | null,
    enderecoComprovanteVenda: boolean,
    convenioGrupos: IConvenioGrupos[]
}