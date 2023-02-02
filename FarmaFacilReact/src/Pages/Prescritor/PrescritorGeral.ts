export interface IPrescritorGeral {
    id: number,
    nome: string,
    cep: string,
    data_Nascimento:any,
    endereco: string,
    numero: string,
    complemento: string,
    cpfCnpj: string,
    ddd: string,
    dddCelular: string,
    telefone: string,
    celular: string,
    ativo: boolean,
    bairroId: null,
    cidadeId: null,
    estadoId: null,
    genero: number,
    crmNumero: string,
    crmEstado: string,
    crmTipo: string,
    tipoCr: number,
    especialidadePrescritores: any[] 
}

export let PrescritorGeral : IPrescritorGeral = {
    nome : "",
    cep: "",
    data_Nascimento: null,
    endereco: "",
    numero: "",
    complemento: "",
    cpfCnpj: "",
    ddd: "",
    dddCelular: "",
    telefone: "",
    celular: "",
    ativo: true,
    estadoId: null,
    bairroId: null,
    cidadeId: null,
    tipoCr: -1,
    crmEstado: "",
    crmNumero: "",
    crmTipo: "",
    genero: -1,
    especialidadePrescritores: [] as any [],
    id: 0
}
