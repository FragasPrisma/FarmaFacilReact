export interface IFiltroCompras {
    tipo: number,                                           // Tipo
    tipoDemanda: number | null,                             // EstoqueMáximo e Minimo
    vendaDe: string | null,                                 // DataInicial
    vendaDeHora: string | null,                             // HoraInicial
    vendaAte: string | null,                                // DataFinal
    vendaAteHora: string | null,                            // HoraFinal
    curvaAbc: number,                                       // CurvaAbc
    consideraEncomendaFaltas: boolean,                      // Encomenda
    tempoDeRep: number,                                     // TempoReposicao
    quantidadeDias: number,                                 // PedidoPara
    tipoValor: number,                                      // TipoValor
    aPartirDe: string | null,                               // DataReferencia
    saldoQuantidadeComprometida: boolean,                   // Somente na tela
    laboratorioId: number,                                  // Laboratorio
    fornecedoresIds: number[],                              // Fornecedor
    gruposIds: number[],                                    // Grupo
    produtosIds: number[],                                  // Produto
    empresaId: number | null,                               // CodigoFilial
    considerarApenasEmpresaSelecionada: boolean,            // Somente na tela
}