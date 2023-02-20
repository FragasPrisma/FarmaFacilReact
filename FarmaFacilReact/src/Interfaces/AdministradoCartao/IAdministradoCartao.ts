export interface IAdministradoCartao{
    id: number,
    nome: string,
    prazoRecebimento: number,
    desconto: number,
    gerenciador: number,
    cieloPremia: number,
    modalidade: number,
    ativo: boolean,
    fornecedorId: number | null,
    planoDeContaId: number | null,
    parcelaTaxaAdm: boolean
  }