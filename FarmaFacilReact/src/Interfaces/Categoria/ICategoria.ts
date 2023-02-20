export interface ICategoria {
    id: number,
    nome: string,
    categoriaPaiId: number | null,
    categoriaAtivo: boolean,
    categoriaMagentoId: number | null,
    integrados: boolean,
    excluidos: boolean,
    alteradoPais: boolean
}