export interface IContaCorrente {
    id: number,
    numeroConta: string,
    nome: string,
    limite: number,
    filialId: number | null
}