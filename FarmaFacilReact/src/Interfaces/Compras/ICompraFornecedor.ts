export interface ICompraFornecedor {
    id: number;                         // ID
    contaId: number;                    // ContaID
    integracaoId: number;               // IntegracaoID
    grupoId: number;                    // CodigoGrupo
    dataGerado: string;                 // dataGerado
    compraId: number;                   // IdCompra
    observacao: string;                 // observacao
    statusCotacao: number;              // statusCotacao
    formaPagamento: string;             // formaPagamento
    frete: string;                      // frete
    dataPrevisaoEntrega: string;        // dataPrevEntrega
    statusPedido: number;               // statusPedido
    numeroNota: number;                 // numeroNota
    serieNota: string;                  // serieNota
    fornecedorId: number;               // fornecedorId
}