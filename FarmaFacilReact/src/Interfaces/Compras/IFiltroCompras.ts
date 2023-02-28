export interface IFiltroCompras {
    tipo: string,                                           // Tipo
    tipoDemanda: number | null,                             // EstoqueMáximo e Minimo
    vendaDe: string,                                        // DataInicial
    vendaDeHora: string,                                    // HoraInicial
    vendaAte: string,                                       // DataFinal
    vendaAteHora: string,                                   // HoraFinal
    curvaAbc: string,                                       // CurvaAbc
    consideraEncomendaFaltas: boolean,                      // Encomenda
    tempoDeRep: number,                                     // TempoReposicao
    quantidadeDias: number,                                 // PedidoPara
    tipoValor: number,                                      // TipoValor
    aPartirDe: string,                                      // DataReferencia
    saldoQuantidadeComprometida: boolean,                   // Somente na tela
    laboratorioId: number,                                  // Laboratorio
    fornecedoresIds: number[],                              // Fornecedor
    gruposIds: number[],                                    // Grupo
    produtosIds: number[],                                  // Produto
    filialId: number,                                       // CodigoFilial
    considerarApenasFilialSelecionada: boolean,             // Somente na tela
}