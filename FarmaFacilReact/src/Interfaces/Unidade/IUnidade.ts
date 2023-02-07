import { IUnidadeConversao } from "./IUnidadeConversao";

export interface IUnidade {
    id: number,
    sigla: string,
    descricao: string,
    tipo: number,
    fator: number,
    unidadesConversao: IUnidadeConversao []
}