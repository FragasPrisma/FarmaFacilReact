// import { IItemsCompra } from "./IItemsCompra";

import { IItemsCompra } from "./IItemsCompra"

// export interface ICompra {
//     id: number;                                             // CompraId 
//     // integracaoid: number;                                // IntegracaoId (Será avaliado)
//     // contaId: number;                                     // ContaId (Será avaliado)
//     dataCadastro: string | null;                                           // Data
//     listaItems: IItemsCompra[];                             // Criado para melhoria
//     totalCompra: number;                                    // TotalCompra
//     statusCompra: number;                                         // Status (É uma condição da compra que pode ser observado no pedido de Compra)
//     tempoReposicaoMaximo: number;                           // tempoReposicaoMaximo (É utilizado em outra tela  e salvo no banco)
//     // Parte de IFiltroCompra
//     tipo: number,                                           // Tipo
//     tipoDemanda: number | null,                             // EstoqueMáximo e Minimo
//     vendaDe: string | null,                                        // DataInicial
//     vendaDeHora: string | null,                                    // HoraInicial
//     vendaAte: string | null,                                       // DataFinal
//     vendaAteHora: string | null,                                   // HoraFinal
//     curvaAbc: number,                                       // CurvaAbc
//     consideraEncomendaFaltas: boolean,                      // Encomenda
//     tempoDeRep: number,                                     // TempoReposicao
//     quantidadeDias: number,                                 // PedidoPara
//     tipoValor: number,                                      // TipoValor
//     aPartirDe: string | null,                                      // DataReferencia
//     saldoQuantidadeComprometida: boolean,                   // Somente na tela
//     laboratorioId: number | null,                                  // Laboratorio
//     fornecedoresIds: number[],                              // Fornecedor
//     gruposIds: number[],                                    // Grupo
//     produtosIds: number[],                                  // Produto
//     empresaId: number | null,                                      // CodigoFilial
//     considerarApenasEmpresaSelecionada: boolean,             // Somente na tela
//     itensCompras: IItemsCompra [],
// }

export interface ICompra{
    
        id: number,
        dataCadastro: string | null,
        //filtroComprasId: 0,
        itensCompras: IItemsCompra [],
        statusCompra: number,
        totalCompra: number,
        tempoDeReposicaoMaxima: number,
        vendaDe: string | null,
        vendaAte: string | null,
        curvaAbc: number,
        fornecedoresIds: number[],
        gruposIds: number[],
        produtosIds: number[],
        empresaId:number | null,
        laboratorioId: number | null,
        tipoCompra: number,
        tipoDemanda: number | null,
        consideraEncomendaFaltas: boolean,
        tempoDeReposicao: number,
        quantidadeDias: number,
        tipoValor: number,
        aPartirDe: string | null,
        saldoQuantidadeComprometida: boolean,
        considerarApenasEmpresaSelecionada: boolean
      
}