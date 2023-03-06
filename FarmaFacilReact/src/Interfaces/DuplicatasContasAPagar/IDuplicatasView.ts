export interface IDuplicatasView {
    id: number;
    observacao: string;
    dataVencimento: string;
    dataPagamento: string | null;
    valor: string;
    valorPago: string | null;
    numeroFatura: string;
    numeroParcela: number;
    contasAPagarId: number;
    nomeFornecedor: string
}