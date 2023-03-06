import { IFornecedor } from "./../Fornecedor/IFornecedor";
import { IBairro } from "./../Bairro/IBairro";
import { ICidade } from "./../Cidade/ICidade";
import { IEstado } from "./../Estado/IEstado";
export interface IFarmacia {
  Id: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  inscricaoMunicipal: string;
  regimeTributario: number;
  ddd: string;
  telefone: string;
  dddCelular: string;
  celular: string;
  dddWhatsApp: string;
  whatsApp: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cidadeId: number;
  estadoId: number;
  bairroId: number;
  nomeFarmaceutico: string;
  crf: number;
  cpfRespSNGPC: string;
  usuarioSNGPC: string;
  senhaSNGPC: string;
  ativo: boolean;
  licencaFunc: string;
  autoridadeSanitaria: string;
  licencaMapa: string;
  fornecedorInternoId: number;

  // fornecedorInterno: IFornecedor;
  // bairro: IBairro;
  // cidade: ICidade;
  // estado: IEstado;

  //FarmaceuticosAutorizados: number;
  //FilialPagamentoId: number;
}

export let Farmacia = {
  Id: 0,
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  inscricaoEstadual: "",
  inscricaoMunicipal: "",
  regimeTributario: 0,
  ddd: "",
  telefone: "",
  dddCelular: "",
  celular: "",
  email: "",
  dddWhatsApp: "",
  whatsApp: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  cidadeId: 0,
  estadoId: 0,
  bairroId: 0,
  nomeFarmaceutico: "",
  crf: 0,
  cpfRespSNGPC: "",
  usuarioSNGPC: "",
  senhaSNGPC: "",
  ativo: true,
  licencaFunc: "",
  autoridadeSanitaria: "",
  licencaMapa: "",
  fornecedorInternoId: 0,
};
