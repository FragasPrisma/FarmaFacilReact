import { IFiltroCompras } from "./IFiltroCompras";
import { IItemsCompra } from "./IItemsCompra";

export interface ICompra {
    id: number;                                             // CompraId 
    // integracaoid: number;                                // IntegracaoId (Será avaliado)
    // contaId: number;                                     // ContaId (Será avaliado)
    data: string;                                           // Data
    filtroCompra: IFiltroCompras;                           // Criado para melhoria
    listaItems: IItemsCompra[];                            // Criado para melhoria
    totalCompra: number;                                    // TotalCompra
    status: string;                                         // Status (É uma condição da compra que pode ser observado no pedido de Compra)
    //tempoReposicaoMaximo: number;                         // tempoReposicaoMaximo (É utilizado em outra tela  e salvo no banco)
}