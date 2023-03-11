export interface IFaltasEncomendas {

    id: number,
    empresaId: number | null,
    clienteId: number | null,
    grupoId: number,
    produtoId: number,
    vendedorId: number,
    dataCadastro: string | null,
    compraId: number | null,
    observacao: string,
    previsaoDeEntrega: string | null,
    quantidade: number,
    status: number | null,
    telefone: string,
    tipo: number
}