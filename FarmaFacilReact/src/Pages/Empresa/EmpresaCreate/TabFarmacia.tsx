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

export const TabFarmacia = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  const [regimeTributario, setRegimeTributario] = useState(0);
  const [ddd, setDdd] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dddCelular, setDddCelular] = useState("");
  const [celular, setcelular] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidadeId, setCidadeId] = useState(0);
  const [estadoId, setEstadoId] = useState(0);
  const [bairroId, setBairroId] = useState(0);
  const [nomeFarmaceutico, setNomeFarmaceutico] = useState("");
  const [crf, setCRF] = useState(0);
  const [cpfRespSNGPC, setCpfRespSNGPC] = useState("");
  const [usuarioSNGPC, setUsuarioSNGPC] = useState("");
  const [senhaSNGPC, setSenhaSNGPC] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [licencaFunc, setLicencaFunc] = useState("");
  const [autoridadeSanitaria, setAutoridadeSanitaria] = useState("");
  const [licencaMapa, setLicencaMapa] = useState("");
  const [fornecedorInternoId, setFornecedorInternoId] = useState(0);

  const [bairros, setBairros] = useState([] as IBairro[]);
  const [cidades, setCidades] = useState([] as ICidade[]);
  const [estados, setEstados] = useState([] as IEstado[]);
  const [fornecedores, setFornecedores] = useState([] as IFornecedor[])

  Farmacia.RazaoSocial = razaoSocial;
  Farmacia.NomeFantasia = nomeFantasia;
  Farmacia.Cnpj = cnpj;
  Farmacia.InscricaoEstadual = inscricaoEstadual;
  Farmacia.InscricaoMunicipal = inscricaoMunicipal;
  Farmacia.RegimeTributario = regimeTributario;
  Farmacia.DDD = ddd;
  Farmacia.Telefone = telefone;
  Farmacia.Celular = celular;
  Farmacia.Email = email;
  Farmacia.WhatsApp = whatsApp;
  Farmacia.Cep = cep;
  Farmacia.Logradouro = logradouro;
  Farmacia.Numero = numero;
  Farmacia.Complemento = complemento;
  Farmacia.CidadeId = cidadeId;
  Farmacia.EstadoId = estadoId;
  Farmacia.BairroId = bairroId;
  Farmacia.NomeFarmaceutico = nomeFarmaceutico;
  Farmacia.CRF = crf;
  Farmacia.CpfRespSNGPC = cpfRespSNGPC;
  Farmacia.UsuarioSNGPC = usuarioSNGPC;
  Farmacia.SenhaSNGPC = senhaSNGPC;
  Farmacia.Ativo = true;
  Farmacia.LicencaFunc = licencaFunc;
  Farmacia.AutoridadeSanitaria = autoridadeSanitaria;
  Farmacia.LicencaMapa = licencaMapa;
  Farmacia.FornecedorInternoId = fornecedorInternoId;

  useEffect(() => {
    const loadDataBairros = async () => {
      const response = await getAll("ListaBairro");
      setBairros(response.data);
    }

    const loadDataCidades = async () => {
      const response = await getAll("ListaCidade");
      setCidades(response.data);
    }

    const loadDataEstados = async () => {
      const response = await getAll("ListaEstado");
      setEstados(response.data);
    }

    const loadDataFornecedores = async () => {
      const response = await getAll("ListaFornecedor");
      setFornecedores(response.data);
    }

    loadDataBairros();
    loadDataCidades();
    loadDataEstados();
    loadDataFornecedores();
  }, [])

  return (
    <Container>
      <div className="row">
        <div className="col-4 mt-4">
          <CustomInput
            label="Razão social"
            type="string"
            maxLength={50}
            value={razaoSocial}
            placeholder="Digite um valor para a razão social"
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setRazaoSocial(e.target.value)}
          />
        </div>
        <div className="col-4 mt-4">
          <CustomInput
            label="Nome Fantasia"
            type="string"
            maxLength={50}
            value={nomeFantasia}
            placeholder="Digite um valor para o nome fantasia"
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setNomeFantasia(e.target.value)}
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
            onClickOptions={(regimeTributario) => setRegimeTributario(regimeTributario)}
            value={regimeTributario}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Cnpj"
            type="string"
            maxLength={14}
            value={cnpj}
            required={true}
            placeholder="Digite um valor para o Cnpj"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Est."
            type="string"
            maxLength={20}
            value={inscricaoEstadual}
            placeholder="Digite um valor para o Inc. Est."
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setInscricaoEstadual(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Mun."
            type="string"
            maxLength={20}
            value={inscricaoMunicipal}
            placeholder="Digite um valor para o Inc. Mun."
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setInscricaoMunicipal(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomDropDown
            data={fornecedores}
            title="Selecione um Fornecedor"
            filter="nomeFornecedor"
            label="Fornecedor Interno"
            required={true}
            Select={(fornecedorId) => setFornecedorInternoId(fornecedorId)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Endereço"
            type="string"
            value={logradouro}
            required={true}
            placeholder="Digite um valor para o endereço"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setLogradouro(e.target.value)}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="Numero"
            type="string"
            maxLength={7}
            value={numero}
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setNumero(e.target.value)}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="Cep"
            type="string"
            maxLength={8}
            value={cep}
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
          />
        </div>
        <div className="col-4">
          <CustomInput
            label="Complemento"
            type="string"
            maxLength={20}
            value={complemento}
            placeholder="Digite um valor para o complemento"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setComplemento(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomDropDown
            data={bairros}
            title="Selecione um Bairro"
            filter="nome"
            label="Bairro"
            required={true}
            Select={(bairroId) => setBairroId(bairroId)}
          />
        </div>
        <div className="col-4">
          <CustomDropDown
            data={cidades}
            title="Selecione uma Cidade"
            filter="nome"
            label="Cidade"
            required={true}
            Select={(cidadeId) => setCidadeId(cidadeId)}
          />
        </div>
        <div className="col-3">
          <CustomDropDown
            data={estados}
            title="Selecione um Estado"
            filter="nome"
            label="Estado"
            required={true}
            Select={(estadoId) => setEstadoId(estadoId)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="string"
            maxLength={4}
            value={ddd}
            required={true}
            placeholder="047"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setDdd(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Telefone"
            type="string"
            maxLength={20}
            value={telefone}
            required={true}
            placeholder="Digite um valor para o telefone"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="string"
            maxLength={4}
            value={dddCelular}
            required={true}
            placeholder="047"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setDddCelular(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Celular"
            type="string"
            maxLength={20}
            value={celular}
            placeholder="Digite um valor para o celular"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setcelular(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="WhatsApp"
            type="string"
            maxLength={20}
            value={whatsApp}
            required={true}
            placeholder="Digite um valor para o whatsApp"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsApp(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomInput
            label="Email"
            type="string"
            maxLength={60}
            value={email}
            required={true}
            placeholder="Digite um valor para o email"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Nome do Farmaceutico"
            type="string"
            maxLength={50}
            value={nomeFarmaceutico}
            required={true}
            placeholder="Digite um valor para o nome do farmaceutico"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setNomeFarmaceutico(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="CRF"
            type="number"
            value={crf}
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCRF(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="CPF Resp. SNGPC"
            type="string"
            maxLength={11}
            value={cpfRespSNGPC}
            required={true}
            placeholder="Digite um valor para o cpf do resp"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCpfRespSNGPC(e.target.value)}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Usuário SNGPC"
            type="string"
            maxLength={100}
            value={usuarioSNGPC}
            required={true}
            placeholder="Digite um valor para o usuario"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setUsuarioSNGPC(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Senha SNGPC"
            type="string"
            maxLength={50}
            value={senhaSNGPC}
            required={true}
            placeholder="Digite um valor para a senha"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setSenhaSNGPC(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Func"
            type="string"
            maxLength={50}
            value={licencaFunc}
            required={true}
            placeholder="Digite um valor para a licença"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setSenhaSNGPC(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-5">
          <CustomInput
            label="Autoridade Sanitária"
            type="string"
            maxLength={50}
            value={autoridadeSanitaria}
            required={true}
            placeholder="Digite um valor para a autoridade sanitária"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setAutoridadeSanitaria(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Mapa"
            type="string"
            maxLength={50}
            value={licencaMapa}
            required={true}
            placeholder="Digite um valor para a licença do mapa"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setLicencaFunc(e.target.value)}
          />
        </div>
      </div>
    </Container>
  );
};
