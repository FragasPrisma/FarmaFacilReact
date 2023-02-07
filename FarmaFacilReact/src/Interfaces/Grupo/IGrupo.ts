export interface IGrupo {
    id: number,
    descricao: string,
    comissao: number,
    percentualDesconto: number,
    descontoMaximo: number,
    tipo: number,
    ativaPesagemGrupo: boolean,
    ativaControleDeLotesAcabados: boolean,
    fatorReferenciaGrupo: number,
    ativaControleLotesDrogaria: boolean,
    codigoGrupoLp: string,
    grupoEnsaios: IGrupoEnsaios []
}

export interface IGrupoEnsaios {
    id: number,
    descricao: string,
    grupoId: number,
    ensaioId: number
}