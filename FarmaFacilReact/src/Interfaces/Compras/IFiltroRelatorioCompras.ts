export interface IFiltroRelatorioCompras {
    fornecedoresIds: number[],
    contato: string,
    dataLimite: string,
    para: string,
    cc: string,
    tipoEnvio: number,
    modoEnvio: number | null
}