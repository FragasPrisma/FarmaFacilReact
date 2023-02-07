import { IDuplicatasContasAPagar } from "../DuplicatasContasAPagar/IDuplicatasContasAPagar";

export interface IContasAPagar {
    id: number,
    observacao: string,
    dataEmissao: string,
    valor: number,
    numeroFatura: number,
    quantidadeParcela: number,
    fornecedorId: number,
    planoDeContaId: number,
    bancoId: number,
    portadorId: number,
    duplicatasContasAPagar: IDuplicatasContasAPagar[]
}