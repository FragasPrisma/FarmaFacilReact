// export interface IItemsCompra {
//     id: number;                                             // Id
//     //contaId: number;                                      // ContaId (Será avaliado) 
//     //integracaoId: number;                                 // IntegracaoId (Será avaliado)
//     grupoId: number;                                        // CódigoGrupo
//     laboratorioId: number;                                  // CódigoLaboratorio
//     produtoId: number;                                      // CódigoProduto
//     comprar: boolean;                                       // Comprar
//     curva: string;                                          // Curva
//     //encomenda: boolean;                                   // Encomenda (Não tem no front porém tem no back)
//     estoque: number;                                        // Estoque
//     estoqueMinimo: number;                                  // EstoqueMinimo
//     compraId: number;                                       // IdCompra (Será o id de ICompra)
//     quantidadeCompra: number;                               // QtdeCompra
//     quantidadeVendida: number;                              // QtdeVendida
//     siglaUnidade: string;                                   // SiglaUnidade
//     quantidadeTotal: number;                                // TotalParaDias (Mostrado apenas em Consumo)
//     valorTotal: number;                                     // ValorTotal
//     valorUnitario: number;                                  // ValorUnitario
//     valorVendido: number;                                   // ValorVendido
//     //selecionadoGerar: string;                             // selecionadoGerar (É utilizado em outra tela  e salvo no banco)
//     consumoDiario: number;                                  // consumoDiario
//     estoqueMaximo: number;                                  // EstoqueMaximo
//     //quantidadeCompraMaxima: number;                       // quantidadeCompraMaxima (Não aparece no grid, é feito calculo baseado no tipo da compra)
// }

export interface IItemsCompra {
    id: number;
    codigogrupo: number;
    estoque: number;
    descricaoproduto: string;
    nomelaboratorio: string;
    curvaabcproduto: string;
    estoqueminimoproduto: number;
    estoquemaximoproduto: number;
}


