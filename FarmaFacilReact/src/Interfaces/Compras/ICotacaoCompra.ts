import { IFornecedor } from "../Fornecedor/IFornecedor";

export interface ICotacaoCompra {
    compraId: number;
    dataInicial: string | null;
    dataFinal: string | null;
    fornecedores: number[];
}