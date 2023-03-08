export interface IFiltroCompras {
    tipoCompra: number,                                     // Tipo
    tipoDemanda: number | null,                             // EstoqueMáximo e Minimo
    vendaDe: string | null,                                 // DataInicial
    vendaAte: string | null,                                // DataFinal
    curvaAbc: number,                                       // CurvaAbc
    consideraEncomendaFaltas: boolean,                      // Encomenda
    tempoDeReposicao: number,                               // TempoReposicao
    quantidadeDias: number,                                 // PedidoPara
    tipoValor: number,                                      // TipoValor
    aPartirDe: string | null,                               // DataReferencia
    saldoQuantidadeComprometida: boolean,                   // Somente na tela
    laboratorioId: number | null,                                  // Laboratorio
    fornecedoresIds: number[],                              // Fornecedor
    gruposIds: number[],                                    // Grupo
    produtosIds: number[],                                  // Produto
    empresaId: number | null,                               // CodigoFilial
    considerarApenasEmpresaSelecionada: boolean,            // Somente na tela
}