export interface IFormaPagamento {
    id: number,
    descricao: string,
    tipoPagamento: number,
    autorizarDescontos: number,
    conciliacao: boolean,
    planoDeContaId: number | null
}