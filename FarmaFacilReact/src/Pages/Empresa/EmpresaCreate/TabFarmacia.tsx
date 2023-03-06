import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom";
import { Container } from "../styles";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { Farmacia, IFarmacia } from "../../../Interfaces/Empresa/IFarmacia";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll } from "../../../Services/Api";
import { IBairro } from "../../../Interfaces/Bairro/IBairro";
import { ICidade } from "../../../Interfaces/Cidade/ICidade";
import { IEstado } from "../../../Interfaces/Estado/IEstado";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { MaskCep, MaskCnpj, MaskCpf, MaskIe, MaskIm, MaskTelefone } from "../../../Mask/Mask";
import { useParams } from "react-router-dom";
import { ViaCep } from "../../../helper/ViaCep";

export let sigla = "";

interface IData {
  erros: {
    erro: boolean;
    erroNome: string;
    index: number;
  },
  textParameter: string;
}

export const TabFarmacia = ({ erros, textParameter }: IData) => {
  useEffect(() => {
    setErrosParameters(erros);
  }, [erros]);

  useEffect(() => {
    setRazaoSocial("");
    setNomeFantasia("");
    setCnpj("");
    setCnpj("");
    setInscricaoEstadual("");
    setInscricaoMunicipal("");
    setRegimeTributario(0);
    setDdd("");
    setTelefone("");
    setcelular("");
    setEmail("");
    setDddWhatsApp("");
    setDddCelular("");
    setWhatsApp("");
    setCep("");
    setLogradouro("");
    setNumero("");
    setComplemento("");
    setCidadeId(0);
    setEstadoId(0);
    setBairroId(0);
    setNomeFarmaceutico("");
    setCRF(0);
    setCpfRespSNGPC("");
    setUsuarioSNGPC("");
    setSenhaSNGPC("");
    setLicencaFunc("");
    setAutoridadeSanitaria("");
    setLicencaMapa("");
    setFornecedorInternoId(0);
    setNomeEstado("Selecione o Estado")
    setNomeCidade("Selecione a Cidade")
    setNomeBairro("Selecione o Bairro")
    setNomeFornecedorInterno("Selecione um Fornecedor")
    setErroBairroId("");
    setErroEstadoId("");
    setErroCidadeId("");
    setErroFornecedorInternoId("");
    setSiglaEstado("");

  }, [textParameter])

  const [razaoSocial, setRazaoSocial] = useState(textParameter);
  const [nomeFantasia, setNomeFantasia] = useState(textParameter);
  const [cnpj, setCnpj] = useState(textParameter);
  const [inscricaoEstadual, setInscricaoEstadual] = useState(textParameter);
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState(textParameter);
  const [regimeTributario, setRegimeTributario] = useState(0);
  const [ddd, setDdd] = useState(textParameter);
  const [telefone, setTelefone] = useState(textParameter);
  const [celular, setcelular] = useState(textParameter);
  const [email, setEmail] = useState(textParameter);
  const [dddWhatsApp, setDddWhatsApp] = useState(textParameter);
  const [dddCelular, setDddCelular] = useState(textParameter);
  const [whatsApp, setWhatsApp] = useState(textParameter);
  const [cep, setCep] = useState(textParameter);
  const [logradouro, setLogradouro] = useState(textParameter);
  const [numero, setNumero] = useState(textParameter);
  const [complemento, setComplemento] = useState(textParameter);
  const [cidadeId, setCidadeId] = useState(0);
  const [estadoId, setEstadoId] = useState(0);
  const [bairroId, setBairroId] = useState(0);
  const [nomeFarmaceutico, setNomeFarmaceutico] = useState(textParameter);
  const [crf, setCRF] = useState(0);
  const [cpfRespSNGPC, setCpfRespSNGPC] = useState(textParameter);
  const [usuarioSNGPC, setUsuarioSNGPC] = useState(textParameter);
  const [senhaSNGPC, setSenhaSNGPC] = useState(textParameter);
  const [ativo, setAtivo] = useState(true);
  const [licencaFunc, setLicencaFunc] = useState("");
  const [autoridadeSanitaria, setAutoridadeSanitaria] = useState("");
  const [licencaMapa, setLicencaMapa] = useState("");
  const [fornecedorInternoId, setFornecedorInternoId] = useState(0);
  const [siglaEstado, setSiglaEstado] = useState(textParameter);

  const [nomeEstado, setNomeEstado] = useState("Selecione o Estado");
  const [nomeCidade, setNomeCidade] = useState("Selecione a Cidade");
  const [nomeBairro, setNomeBairro] = useState("Selecione o Bairro");
  const [nomeFornecedorInterno, setNomeFornecedorInterno] = useState("Selecione um Fornecedor");

  const [bairros, setBairros] = useState([] as IBairro[]);
  const [cidades, setCidades] = useState([] as ICidade[]);
  const [estados, setEstados] = useState([] as IEstado[]);
  const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);

  const [errosParameter, setErrosParameters] = useState(erros);

  const [erroEstadoId, setErroEstadoId] = useState(textParameter);
  const [erroCidadeId, setErroCidadeId] = useState(textParameter);
  const [erroBairroId, setErroBairroId] = useState(textParameter);
  const [erroFornecedorInternoId, setErroFornecedorInternoId] = useState(textParameter);

  sigla = siglaEstado;

  Farmacia.Id = 0;
  Farmacia.razaoSocial = razaoSocial;
  Farmacia.nomeFantasia = nomeFantasia;
  Farmacia.cnpj = cnpj.replace(/[-/.]/g, "");
  Farmacia.inscricaoEstadual = inscricaoEstadual.replace(/\.|-/gm, "");
  Farmacia.inscricaoMunicipal = inscricaoMunicipal;
  Farmacia.regimeTributario = regimeTributario;
  Farmacia.ddd = ddd;
  Farmacia.dddCelular = dddCelular;
  Farmacia.dddWhatsApp = dddWhatsApp;
  Farmacia.telefone = telefone;
  Farmacia.celular = celular;
  Farmacia.email = email;
  Farmacia.whatsApp = whatsApp;
  Farmacia.cep = cep.replace(/\.|-/gm, "");
  Farmacia.logradouro = logradouro;
  Farmacia.numero = numero;
  Farmacia.complemento = complemento;
  Farmacia.cidadeId = cidadeId;
  Farmacia.estadoId = estadoId;
  Farmacia.bairroId = bairroId;
  Farmacia.nomeFarmaceutico = nomeFarmaceutico;
  Farmacia.crf = crf;
  Farmacia.cpfRespSNGPC = cpfRespSNGPC;
  Farmacia.usuarioSNGPC = usuarioSNGPC;
  Farmacia.senhaSNGPC = senhaSNGPC;
  Farmacia.ativo = true;
  Farmacia.licencaFunc = licencaFunc;
  Farmacia.autoridadeSanitaria = autoridadeSanitaria;
  Farmacia.licencaMapa = licencaMapa;
  Farmacia.fornecedorInternoId = fornecedorInternoId;

  useEffect(() => {
    async function PesquisaCep() {
      if (cep.length == 9) {
        const request = await ViaCep(cep.replace(/\.|-/gm, ""));

        setLogradouro(request.logradouro);
        setComplemento(request.complemento);
        setDdd(request.ddd);
        setDddCelular(request.ddd);
        setDddWhatsApp(request.ddd);

        const estado = estados.filter((x) => x.sigla == request.uf);

        if (estado.length > 0) {
          setNomeEstado(request.uf);
          setSiglaEstado(request.uf)
          setEstadoId(estado[0].id);
        }

        const cidade = cidades.filter((x) => x.nome == request.localidade);

        if (cidade.length > 0) {
          setNomeCidade(request.localidade);
          setCidadeId(cidade[0].id);
        }

        const bairro = bairros.filter((x) => x.nome == request.bairro);

        if (bairro.length > 0) {
          setNomeBairro(request.bairro);
          setBairroId(bairro[0].id);
        }
      }
    }
    PesquisaCep();
  }, [cep]);

  useEffect(() => {
    const loadDataBairros = async () => {
      const response = await getAll("ListaBairro");
      setBairros(response.data);
    };

    const loadDataCidades = async () => {
      const response = await getAll("ListaCidade");
      setCidades(response.data);
    };

    const loadDataEstados = async () => {
      const response = await getAll("ListaEstado");
      setEstados(response.data);
    };

    const loadDataFornecedores = async () => {
      const response = await getAll("ListaFornecedor");
      setFornecedores(response.data);
    };

    loadDataBairros();
    loadDataCidades();
    loadDataEstados();
    loadDataFornecedores();
  }, []);

  useEffect(() => {

    if (erros.index == 20) {
      setErroEstadoId("Campo de preenchimento obrigatório.");
    } else {
      setErroEstadoId("");
    }

    if (erros.index == 21) {
      setErroCidadeId("Campo de preenchimento obrigatório.");
    } else {
      setErroCidadeId("");
    }

    if (erros.index == 22) {
      setErroBairroId("Campo de preenchimento obrigatório.");
    } else {
      setErroBairroId("");
    }

    if (erros.index == 23) {
      setErroFornecedorInternoId("Campo de preenchimento obrigatório.");
    } else {
      setErroFornecedorInternoId("");
    }
  }, [erros])

  return (
    <Container>
      <div className="row">
        <div className="col-4 mt-4">
          <CustomInput
            label="Razão social"
            type="text"
            maxLength={50}
            value={razaoSocial}
            placeholder="Prismafive Tecnologia"
            erros={errosParameter}
            index={1}
            required={true}
            focusParam={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRazaoSocial(e.target.value)
            }
          />
        </div>
        <div className="col-4 mt-4">
          <CustomInput
            label="Nome Fantasia"
            type="text"
            maxLength={50}
            value={nomeFantasia}
            placeholder="Prisma5"
            erros={errosParameter}
            index={2}
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNomeFantasia(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <RadioCustom
            options={[
              "Simples nacional",
              "Simples nac. SubLimite",
              "Regime Normal",
            ]}
            name={"Regime Tributário"}
            titleComponet="Regime Tributário"
            onClickOptions={(regimeTributario) =>
              setRegimeTributario(regimeTributario)
            }
            value={regimeTributario}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Cnpj"
            type="text"
            maxLength={18}
            value={MaskCnpj(cnpj)}
            required={true}
            index={3}
            erros={errosParameter}
            placeholder="00.000.000/0000-00"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCnpj(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Est."
            type="text"
            maxLength={20}
            index={24}
            erros={errosParameter}
            value={MaskIe(inscricaoEstadual)}
            placeholder="000.000.000000000-00"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInscricaoEstadual(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Mun."
            type="text"
            maxLength={20}
            value={MaskIm(inscricaoMunicipal)}
            placeholder="000/000-000000000000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInscricaoMunicipal(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomDropDown
            data={fornecedores}
            title="Selecione um Fornecedor"
            filter="nomeFornecedor"
            label="Fornecedor Interno"
            required={true}
            error={erroFornecedorInternoId}
            Select={(fornecedorInternoId, select) => {
              if (fornecedorInternoId != null) {
                setFornecedorInternoId(fornecedorInternoId)
                setNomeFornecedorInterno(select)
              }
            }
            }
            RemoveSelect={() => {
              setFornecedorInternoId(0)
              setNomeFornecedorInterno("Selecione um Fornecedor")
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Endereço"
            type="text"
            value={logradouro}
            required={true}
            index={4}
            erros={errosParameter}
            placeholder="Digite um valor para o endereço"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLogradouro(e.target.value)
            }
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="Numero"
            type="text"
            maxLength={7}
            value={numero}
            index={5}
            required={true}
            erros={errosParameter}
            placeholder={"000"}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNumero(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Cep"
            type="text"
            maxLength={9}
            value={MaskCep(cep)}
            required={true}
            index={6}
            erros={errosParameter}
            placeholder={"00000-000"}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCep(e.target.value)
            }
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Complemento"
            type="text"
            maxLength={20}
            value={complemento}
            placeholder="Digite um valor para o complemento"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setComplemento(e.target.value)
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomDropDown
            data={bairros}
            title={nomeBairro}
            filter="nome"
            label="Bairro"
            required={true}
            error={erroBairroId}
            Select={(bairroId, select) => {
              if (bairroId != null) {
                setBairroId(bairroId)
                setNomeEstado(select)
              }
            }}
            RemoveSelect={() => {
              setBairroId(0);
              setNomeBairro("Selecione o bairro")
            }}
          />
        </div>
        <div className="col-3">
          <CustomDropDown
            data={cidades}
            title={nomeCidade}
            filter="nome"
            label="Cidade"
            required={true}
            error={erroCidadeId}
            Select={(cidadeId, select) => {
              if (cidadeId != null) {
                setCidadeId(cidadeId)
                setNomeCidade(select)
              }
            }
            }
            RemoveSelect={() => {
              setCidadeId(0)
              setNomeCidade("Selecione a cidade")
            }}
          />
        </div>
        <div className="col-3">
          <CustomDropDown
            data={estados}
            title={nomeEstado}
            filter="nome"
            label="Estado"
            required={true}
            error={erroEstadoId}
            Select={(estadoId, select) => {
              if (estadoId != null) {
                setEstadoId(estadoId)
                setSiglaEstado(select)
                setNomeEstado(select)
              }
            }}
            RemoveSelect={() => {
              setEstadoId(0)
              setSiglaEstado("")
              setNomeEstado("Selecione o estado")
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={ddd}
            required={true}
            index={7}
            erros={errosParameter}
            placeholder="47"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDdd(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Telefone"
            type="text"
            maxLength={20}
            value={MaskTelefone(telefone)}
            required={true}
            index={8}
            erros={errosParameter}
            placeholder="00000-0000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTelefone(e.target.value)
            }
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={dddCelular}
            placeholder="47"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDddCelular(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Celular"
            type="text"
            maxLength={20}
            value={MaskTelefone(celular)}
            placeholder="00000-0000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setcelular(e.target.value)
            }
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            required={true}
            value={dddWhatsApp}
            index={9}
            erros={errosParameter}
            placeholder="47"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDddWhatsApp(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="WhatsApp"
            type="text"
            maxLength={20}
            value={MaskTelefone(whatsApp)}
            index={10}
            erros={errosParameter}
            required={true}
            placeholder="00000-0000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setWhatsApp(e.target.value)
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomInput
            label="Email"
            type="text"
            maxLength={60}
            value={email}
            required={true}
            index={11}
            erros={errosParameter}
            placeholder="prismafive@prismafive.com.br"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Nome do Farmaceutico"
            type="text"
            maxLength={50}
            value={nomeFarmaceutico}
            required={true}
            index={12}
            erros={errosParameter}
            placeholder="Digite um valor para o nome do farmaceutico"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNomeFarmaceutico(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="CRF"
            type="number"
            value={crf}
            required={true}
            index={13}
            erros={errosParameter}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCRF(parseFloat(e.target.value))
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="CPF Resp. SNGPC"
            type="text"
            maxLength={14}
            value={MaskCpf(cpfRespSNGPC)}
            required={true}
            index={14}
            erros={errosParameter}
            placeholder="000.000.000-00"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCpfRespSNGPC(e.target.value)
            }
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Usuário SNGPC"
            type="text"
            maxLength={100}
            value={usuarioSNGPC}
            index={15}
            erros={errosParameter}
            required={true}
            placeholder="Digite um valor para o usuario"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsuarioSNGPC(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Senha SNGPC"
            type="password"
            maxLength={50}
            value={senhaSNGPC}
            index={16}
            erros={errosParameter}
            required={true}
            placeholder="Digite um valor para a senha"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSenhaSNGPC(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Func"
            type="text"
            maxLength={50}
            value={licencaFunc}
            index={17}
            erros={errosParameter}
            required={true}
            placeholder="Digite um valor para a licença"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLicencaFunc(e.target.value)
            }
          />
        </div>
      </div>

      <div className="row">
        <div className="col-5">
          <CustomInput
            label="Autoridade Sanitária"
            type="text"
            maxLength={50}
            value={autoridadeSanitaria}
            required={true}
            index={18}
            erros={errosParameter}
            placeholder="Digite um valor para a autoridade sanitária"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAutoridadeSanitaria(e.target.value)
            }
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Mapa"
            type="text"
            maxLength={50}
            value={licencaMapa}
            required={true}
            index={19}
            erros={errosParameter}
            placeholder="Digite um valor para a licença do mapa"
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLicencaMapa(e.target.value)
            }
          />
        </div>
      </div>
    </Container>
  );
};
