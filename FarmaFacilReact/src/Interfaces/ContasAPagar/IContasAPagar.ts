import { IDuplicatasContasAPagar } from "../DuplicatasContasAPagar/IDuplicatasContasAPagar";

export interface IContasAPagar {
    id: number,
    observacao: string,
    dataEmissao: string,
    valor: number,
    numeroFatura: number,
    quantidadeParcela: number,
    fornecedorId: number,
    planoDeContasId: number | null,
    bancoId: number | null,
    portadorId: number | null,
    duplicatasContasAPagar: IDuplicatasContasAPagar[]
}