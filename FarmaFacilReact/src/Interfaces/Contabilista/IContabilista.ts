export interface IContabilista {
    id: number,
    bairroId: number | null,
    cidadeId: number | null,
    estadoId: number | null,
    nome: string,
    cnpj: string,
    cpf: string,
    crc: string,
    endereco: string,
    numero: string,
    complemento: string,
    cep: string,
    telefone: string,
    fax: string,
    email: string
}