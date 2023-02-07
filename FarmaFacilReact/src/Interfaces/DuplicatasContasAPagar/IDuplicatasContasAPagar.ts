export interface IDuplicatasContasAPagar {
    id: number,
    observacao: string,
    dataVencimento: string,
    dataPagamento: string,
    valor: number,
    valorPago: number,
    numeroFatura: number,
    numeroParcela: number
}