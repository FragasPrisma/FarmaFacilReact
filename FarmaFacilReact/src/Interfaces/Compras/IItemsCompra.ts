// export interface IItemsCompra {
//     id: number;                                             // Id
//     //contaId: number;                                      // ContaId (Será avaliado) 
//     //integracaoId: number;                                 // IntegracaoId (Será avaliado)
//     grupoId: number;                                        // CódigoGrupo
//     laboratorioId: number;                                  // CódigoLaboratorio
//     nomeLaboratorio: string;                                // Nome do laboratório
//     produtoId: number;                                      // CódigoProduto
//     descricao: string;                                      // Descrição do produto
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
//     fornecedorId: number;
//     nomeFornecedor: string;
//     codigoCas: string;
//     codigoDcb: string;
//     codigoBarra: string;
//     codigoGrupo:string;
//     codigoProduto:string;
// }

export interface IItemsCompra {
    id: number,
    contaId: number,
    integracaoId: number,
    grupoId: number,
    laboratorioId: number,
    produtoId: number,
    comprar: boolean,
    curva: string,
    encomenda: boolean,
    estoque: number,
    estoqueMaximo: number,
    estoqueMinimo: number,
    comprasId: number,
    quantidadeCompra: number,
    quantidadeVendida: number,
    quantidadeTotal: number,
    valorTotal: number,
    valorUnitario: number,
    valorVendido: number,
    selecionadoGerar: string,
    consumoDiario: number,
    siglaUnidade: string,
    quantidadeCompraMaxima: number,
    fornecedorId: number,
    nomeFornecedor: string,
    descricao: string,
    nomeLaboratorio: string,
    codigoCas: string,
    codigoDcb: string,
    codigoBarra: string,
    codigoGrupo: string,
    codigoProduto: string
}