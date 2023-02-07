export interface ITransportador {
    id: number,
    bairroId: number | null,
    cidadeId: number | null,
    estadoId: number | null,
    estadoPlacaId: number | null,
    nome: string,
    cpfCnpj: string,
    ie: string,
    cep: string,
    endereco: string,
    numero: string,
    ddd: string,
    telefone: string,
    codigoAntt: string,
    placa: string
}