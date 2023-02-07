export interface ITabelaFloral {
    id: number,
    VolumeTabelaFloralId: number,
    quantidadeInicial: number,
    quantidadeFinal: number,
    valorVenda: number
}

export interface ITabelaFloralVolume {
    id: number,
    volume: number,
    tabelasFlorais: ITabelaFloral[]
}