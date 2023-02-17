export interface IFornecedor {
    id: number,
    nomeFornecedor: string,
    nomeFantasia: string,
    cnpj: string,
    cpf: string,
    inscricaoEstadual: string,
    cep: string,
    endereco: string,
    numeroEndereco: string,
    complemento: string,
    bairroId: number | null,
    cidadeId: number | null,
    estadoId: number,
    ddd: string,
    telefone: string,
    celular: string,
    dddCelular: string,
    email: string,
    homePage: string,
    contato: string,
    telefoneContato: string,
    bancoId: number | null,
    agencia: string,
    contaCorrenteFornecedor: string,
    responsavelTecnico: string,
    alvaraSanitario: string,
    autorizacaoFuncionamento: string,
    autorizacaoEspecial: string,
    licencaMapa: string,
    cadastroFarmacia: string,
    planoDeContaId: number | null,
    valorMinimoPedido: number,
    formaPagamento: string,
    previsaoEntrega: number,
    frete: string,
    observacoes: string,
    usuarioFornecedor: string,
    senhaFornecedor: string,
    hostFornecedor: string,
    contribuinte: number | null
}

export interface IFornecedorGeral {
    id: number,
    nomeFornecedor: string,
    nomeFantasia: string,
    cnpj: string,
    cpf: string,
    inscricaoEstadual: string,
    cep: string,
    endereco: string,
    numeroEndereco: string,
    complemento: string,
    bairroId: number | null,
    cidadeId: number | null,
    estadoId: number,
    ddd: string,
    telefone: string,
    celular: string,
    dddCelular: string,
    email: string,
    homePage: string,
    contato: string,
    telefoneContato: string,
    contribuinte: number | null
}

export interface IFornecedorComplemento {

    bancoId: number | null;
    agencia: string;
    contaCorrenteFornecedor: string;
    responsavelTecnico: string;
    alvaraSanitario: string;
    autorizacaoFuncionamento: string;
    autorizacaoEspecial: string;
    licencaMapa: string;
    cadastroFarmacia: string;
    planoDeContaId: number | null;
    valorMinimoPedido: number;
    formaPagamento: string;
    previsaoEntrega: number;
    frete: string;
    observacoes: string;
    usuarioFornecedor: string;
    senhaFornecedor: string;
    hostFornecedor: string
}