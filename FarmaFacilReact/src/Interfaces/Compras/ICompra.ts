import { IItemsCompra } from "./IItemsCompra";

export interface ICompra {
    id: number;                                             // CompraId 
    // integracaoid: number;                                // IntegracaoId (Será avaliado)
    // contaId: number;                                     // ContaId (Será avaliado)
    data: string;                                           // Data
    listaItems: IItemsCompra[];                             // Criado para melhoria
    totalCompra: number;                                    // TotalCompra
    status: number;                                         // Status (É uma condição da compra que pode ser observado no pedido de Compra)
    tempoReposicaoMaximo: number;                           // tempoReposicaoMaximo (É utilizado em outra tela  e salvo no banco)
    // Parte de IFiltroCompra
    tipo: number,                                           // Tipo
    tipoDemanda: number | null,                             // EstoqueMáximo e Minimo
    vendaDe: string | null,                                        // DataInicial
    vendaDeHora: string | null,                                    // HoraInicial
    vendaAte: string | null,                                       // DataFinal
    vendaAteHora: string | null,                                   // HoraFinal
    curvaAbc: number,                                       // CurvaAbc
    consideraEncomendaFaltas: boolean,                      // Encomenda
    tempoDeRep: number,                                     // TempoReposicao
    quantidadeDias: number,                                 // PedidoPara
    tipoValor: number,                                      // TipoValor
    aPartirDe: string | null,                                      // DataReferencia
    saldoQuantidadeComprometida: boolean,                   // Somente na tela
    laboratorioId: number | null,                                  // Laboratorio
    fornecedoresIds: number[],                              // Fornecedor
    gruposIds: number[],                                    // Grupo
    produtosIds: number[],                                  // Produto
    empresaId: number | null,                                      // CodigoFilial
    considerarApenasEmpresaSelecionada: boolean,             // Somente na tela
}