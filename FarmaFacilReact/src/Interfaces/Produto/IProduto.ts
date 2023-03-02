export interface IProduto {
    id: number;                            // codigoProduto                 (Required)
    grupoId: number                        // codigoGrupo                   (Required)
    descricao: string;                     // descricaoProduto              (Required)
    unidadeManipulacao: string;            // siglaUnidade                  (Required)
    unidadeEstoque: string;                // siglaUnidadeEstoque           (Required)
    valorCusto: number;                    // valorCustoProduto        
    valorCustoMedio: number;               // custoMedioProduto
    valorVenda: number;                    // valorVendaProduto 
    estoqueMinimo: number;                 // estoqueMinimoProduto
    estoqueMaximo: number;                 // estoqueMaximoProduto
    fornecedorId: number;                  // codigoFornecedor
    dataUltimaCompra: string;              // ultimaCompraProduto
    curvaAbc: string;                      // curvaAbcProduto
    aliquotaIcms: number;                  // aliquotaIcmsProduto           (Required)
    calculo: string;                       // calculoProduto                (Required)
    produtoInativo: boolean                // inativoProduto                (Required)
    situacaoTributaria: string;            // situacaoTributariaProduto     (Required)
}