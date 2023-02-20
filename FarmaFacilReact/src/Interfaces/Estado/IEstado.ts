export interface IEstado {
    id: number,
    nome: string,
    sigla: string,
    aliquotaIcmsEstado: number,
    aliquotaFcpEstado: number,
    difalComCalculoPorDentro: boolean,
    difalComCalculoDeIsento: boolean,
    checagemContribuinteIsento: boolean,
    paisId: number
}