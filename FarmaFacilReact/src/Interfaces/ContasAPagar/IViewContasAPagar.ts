export interface IViewContasAPagas {
    id: number,
    observacao: string,
    dataVencimento: string,
    dataPagamento: string | null,
    valor: number,
    valorPago: number,
    numeroFatura: string,
    numeroParcela: number,
    ContasAPagarId: number,
    nomeFornecedor: string
}