export interface IReport {
    title: string,
    nomeEmpresa: string,
    perido: { dataInicial: string, dataFinal: string },
    cabecalho:string[],
    widths:string[],
    dados: any[]
}