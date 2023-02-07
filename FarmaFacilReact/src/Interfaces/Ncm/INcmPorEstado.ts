export interface INcmPorEstado {
    id: number,
    estadoOrigemId: number | string,
    nomeEstadoOrigem?: string,
    estadoDestinoId: number | string,
    nomeEstadoDestino?: string,
    tributoCstId: number | string,
    descricaoTributoCst?: string,
    tributoCsosnId: number | string,
    descricaoTributoCsosn?: string,
    aliquotaIcms: number,
    aliquotaIcmsInterna: number,
    percentualMva: number,
    percentualFcp: number,
    ncmId: number
}

export let NcmPorEstado : INcmPorEstado = {
    id: 0,
    estadoOrigemId: 0,
    estadoDestinoId: 0,
    tributoCstId: 0,
    tributoCsosnId: 0,
    aliquotaIcms: 0,
    aliquotaIcmsInterna: 0,
    percentualMva: 0,
    percentualFcp: 0,
    ncmId: 0
}