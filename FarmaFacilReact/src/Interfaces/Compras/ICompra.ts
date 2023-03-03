import { IItemsCompra } from "./IItemsCompra";

export interface ICompra{

    id: number,
    dataCadastro: string | null,
    itensCompras: IItemsCompra [],
    statusCompra: number,
    totalCompra: number,
    tempoDeReposicaoMaxima: number,
    vendaDe: string | null,
    vendaDeHora: string | null,
    vendaAte: string | null,
    vendaAteHora: string | null,
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