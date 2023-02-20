export interface IVisitador {
    id: number,
    nome: string,
    cep: string,
    endereco: string,
    numero: string,
    complemento: string,
    bairroId: number | null,
    cidadeId: number | null,
    estadoId: number | null,
    ddd: string,
    telefone: string,
    celular: string,
    comissao: number
}