export interface IBanner{
    id: number,
    descricao: string,
    link: string,
    acaoLink: number,
    posicao: number,
    dataInicio: string,
    dataFim: string,
    imagemBanner: string,
    imagem: string | ArrayBuffer | null,
    ativo: boolean,
    tipoDadoImagem: string,
    integrados: string,
    bannerMagentoId: number
}