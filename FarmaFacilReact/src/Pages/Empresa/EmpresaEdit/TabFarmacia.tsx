import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom";
import { Container } from "../styles";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { Farmacia, IFarmacia } from "../../../Interfaces/Empresa/IFarmacia";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, GetId } from "../../../Services/Api";
import { IBairro } from "../../../Interfaces/Bairro/IBairro";
import { ICidade } from "../../../Interfaces/Cidade/ICidade";
import { IEstado } from "../../../Interfaces/Estado/IEstado";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { MaskCep, MaskCnpj, MaskCpf, MaskIe, MaskIm, MaskTelefone } from "../../../Mask/Mask";
import { useParams } from "react-router-dom";
import { ViaCep } from "../../../helper/ViaCep";


interface IData {
  erros: {
    erro: boolean,
    erroNome: string,
    index: number
  }
}

export const TabFarmacia = ({ erros }: IData) => {

  useEffect(() => { setErrosParameters(erros) }, [erros])
  const [idObject, setIdObject] = useState(0);
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  const [dddCelular, setDddCelular] = useState("");
  const [ddd, setDdd] = useState("");
  const [dddWhatsApp, setDddWhatsApp] = useState("");
  const [regimeTributario, setRegimeTributario] = useState(0);
  const [telefone, setTelefone] = useState("");
  const [celular, setcelular] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [nomeFarmaceutico, setNomeFarmaceutico] = useState("");
  const [crf, setCRF] = useState(0);
  const [cpfRespSNGPC, setCpfRespSNGPC] = useState("");
  const [usuarioSNGPC, setUsuarioSNGPC] = useState("");
  const [senhaSNGPC, setSenhaSNGPC] = useState("");
  const [licencaFunc, setLicencaFunc] = useState("");
  const [autoridadeSanitaria, setAutoridadeSanitaria] = useState("");
  const [licencaMapa, setLicencaMapa] = useState("");



  const [cidadeId, setCidadeId] = useState(0);
  const [estadoId, setEstadoId] = useState(0);
  const [bairroId, setBairroId] = useState(0);
  const [ativo, setAtivo] = useState(true);
  const [fornecedorInternoId, setFornecedorInternoId] = useState(0); 
  const [nomeEstado, setNomeEstado] = useState("Selecione o Estado")
  const [nomeCidade, setNomeCidade] = useState("Selecione a Cidade")
  const [nomeBairro, setNomeBairro] = useState("Selecione o Bairro")
  const [bairros, setBairros] = useState([] as IBairro[]);
  const [cidades, setCidades] = useState([] as ICidade[]);
  const [estados, setEstados] = useState([] as IEstado[]);
  const [fornecedores, setFornecedores] = useState([] as IFornecedor[])
  
  
  const [errosParameter, setErrosParameters] = useState(erros)
 
  const [tabFarmaciaModel, setTabFarmaciaModel] = useState({} as IFarmacia);
  const { id } = useParams();

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {

    async function loadFarmacia() {
      const response = await GetId("RetornaEmpresaPorId", idParams);
      if (response.status == 200) {
        setIdObject(response.data.farmacia.id)
        
        setRazaoSocial(response.data.farmacia.razaoSocial)
        setNomeFantasia(response.data.farmacia.nomeFantasia)
        setCnpj(MaskCnpj(response.data.farmacia.cnpj))
        setInscricaoEstadual(MaskIe(response.data.farmacia.inscricaoEstadual))
        setInscricaoMunicipal(MaskIm(response.data.farmacia.inscricaoMunicipal))
        setRegimeTributario(response.data.farmacia.regimeTributario)
        setDddCelular(response.data.farmacia.dddCelular)
        setDdd(response.data.farmacia.ddd)
        setTelefone(MaskTelefone(response.data.farmacia.telefone))
        setcelular(MaskTelefone(response.data.farmacia.celular))
        setEmail(response.data.farmacia.email)
        setWhatsApp(MaskTelefone(response.data.farmacia.whatsApp))
        setDddWhatsApp(response.data.farmacia.dddWhatsApp)
        setCep(MaskCep(response.data.farmacia.cep))
        setLogradouro(response.data.farmacia.logradouro)
        setNumero(response.data.farmacia.numero)
        setComplemento(response.data.farmacia.complemento)
        setNomeFarmaceutico(response.data.farmacia.nomeFarmaceutico)
        setCRF(response.data.farmacia.crf)
        setCpfRespSNGPC(response.data.farmacia.cpfRespSNGPC)
        setUsuarioSNGPC(response.data.farmacia.usuarioSNGPC)
        setSenhaSNGPC(response.data.farmacia.senhaSNGPC)
        setLicencaFunc(response.data.farmacia.licencaFunc)
        setAutoridadeSanitaria(response.data.farmacia.autoridadeSanitaria)
        setLicencaMapa(response.data.farmacia.licencaMapa)



        
        
        
      }
    }

    loadFarmacia()
  }, [])

  

 const dataEdit : typeof Farmacia = {
   Id: idObject,
   razaoSocial: razaoSocial,
   nomeFantasia: nomeFantasia,
   cnpj: cnpj.replace(/[-/.]/g, ""),
   inscricaoEstadual: inscricaoEstadual.replace(/\.|-/gm, ''),
   inscricaoMunicipal: inscricaoMunicipal,
   regimeTributario: regimeTributario,
   ddd: ddd,
   dddCelular: dddCelular,
   dddWhatsApp: dddWhatsApp,
   telefone: telefone,
   celular: celular,
   email: email,
   whatsApp: whatsApp,
   cep: cep.replace(/\.|-/gm, ''),
   logradouro: logradouro,
   numero: numero,
   complemento: complemento,
   cidadeId: cidadeId,
   estadoId: estadoId,
   bairroId: bairroId,
   nomeFarmaceutico: nomeFarmaceutico,
   crf: crf,
   cpfRespSNGPC: cpfRespSNGPC,
   usuarioSNGPC: usuarioSNGPC,
   senhaSNGPC: senhaSNGPC,
   ativo: true,
   licencaFunc: licencaFunc,
   autoridadeSanitaria: autoridadeSanitaria,
   licencaMapa: licencaMapa,
   fornecedorInternoId: fornecedorInternoId,

 }

  
  
  useEffect(() => {
    async function PesquisaCep() {
      
      if (cep.length == 9) {
        
        const request = await ViaCep(cep.replace(/\.|-/gm, ''))
        
        setLogradouro(request.logradouro)
       // setComplemento(request.complemento)
        setDdd(request.ddd)
        setDddCelular(request.ddd)

        const estado = estados.filter(x =>
          x.sigla == request.uf
        )

        if (estado.length > 0) {
          setNomeEstado(request.uf)
          setEstadoId(estado[0].id)
        }

        const cidade = cidades.filter(x =>
          x.nome == request.localidade
        )

        if (cidade.length > 0) {
          setNomeCidade(request.localidade)
          setCidadeId(cidade[0].id)
        }

        const bairro = bairros.filter(x =>
          x.nome == request.bairro
        )

        if (bairro.length > 0) {
          setNomeBairro(request.bairro)
          setBairroId(bairro[0].id)
        }

      }
    }
    PesquisaCep()
  }, [cep])

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
            type="text"
            maxLength={50}
            value={razaoSocial}
            placeholder="Prismafive Tecnologia"
            erros={errosParameter}
            index={1}
            required={true}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setRazaoSocial(e.target.value)}
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
            type="text"
            maxLength={18}
            value={MaskCnpj(cnpj)}
            required={true}
            index={3}
            placeholder="00.000.000/0000-00"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCnpj(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Est."
            type="text"
            maxLength={20}
            value={MaskIe(inscricaoEstadual)}
            placeholder="000.000.000000000-00"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setInscricaoEstadual(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Mun."
            type="text"
            maxLength={20}
            value={MaskIm(inscricaoMunicipal)}
            placeholder="000/000-000000000000"
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
            type="text"
            value={logradouro}
            required={true}
            index={4}
            placeholder="Digite um valor para o endereço"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setLogradouro(e.target.value)}
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
            placeholder={"000"}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setNumero(e.target.value)}
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
            placeholder={"00000-000"}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Complemento"
            type="text"
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
            title={nomeBairro}
            filter="nome"
            label="Bairro"
            required={true}
            Select={(bairroId) => setBairroId(bairroId)}
          />
        </div>
        <div className="col-3">
          <CustomDropDown
            data={cidades}
            title={nomeCidade}
            filter="nome"
            label="Cidade"
            required={true}
            Select={(cidadeId) => setCidadeId(cidadeId)}
          />
        </div>
        <div className="col-3">
          <CustomDropDown
            data={estados}
            title={nomeEstado}
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
            type="text"
            maxLength={4}
            value={ddd}
            required={true}
            index={7}
            placeholder="47"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setDdd(e.target.value)}
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
            placeholder="00000-0000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setTelefone(e.target.value)}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={dddCelular}
            placeholder="47"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setDddCelular(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Celular"
            type="text"
            maxLength={20}
            value={MaskTelefone(celular)}
            placeholder="00000-0000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setcelular(e.target.value)}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={dddWhatsApp}
            placeholder="47"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setDddWhatsApp(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="WhatsApp"
            type="text"
            maxLength={20}
            value={MaskTelefone(whatsApp)}
            index={9}
            required={true}
            placeholder="00000-0000"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setWhatsApp(e.target.value)}
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
            index={10}
            placeholder="prismafive@prismafive.com.br"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Nome do Farmaceutico"
            type="text"
            maxLength={50}
            value={nomeFarmaceutico}
            required={true}
            index={11}
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
            index={12}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCRF(parseFloat(e.target.value))}
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
            index={13}
            placeholder="000.000.000-00"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setCpfRespSNGPC(e.target.value)}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Usuário SNGPC"
            type="text"
            maxLength={100}
            value={usuarioSNGPC}
            index={14}
            required={true}
            placeholder="Digite um valor para o usuario"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setUsuarioSNGPC(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Senha SNGPC"
            type="password"
            maxLength={50}
            value={senhaSNGPC}
            index={15}
            required={true}
            placeholder="Digite um valor para a senha"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setSenhaSNGPC(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Func"
            type="text"
            maxLength={50}
            value={licencaFunc}
            index={16}
            required={true}
            placeholder="Digite um valor para a licença"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setLicencaFunc(e.target.value)}
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
            index={17}
            placeholder="Digite um valor para a autoridade sanitária"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setAutoridadeSanitaria(e.target.value)}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Mapa"
            type="text"
            maxLength={50}
            value={licencaMapa}
            required={true}
            index={18}
            placeholder="Digite um valor para a licença do mapa"
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setLicencaMapa(e.target.value)}
          />
        </div>
      </div>
    </Container>
  );
};
