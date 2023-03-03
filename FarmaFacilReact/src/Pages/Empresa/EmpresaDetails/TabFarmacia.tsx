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
import { MaskCep, MaskCnpj, MaskIe, MaskIm, MaskTelefone } from "../../../Mask/Mask";
import { useParams } from "react-router-dom";

interface IData {
  erros: {
    erro: boolean,
    erroNome: string,
    index: number
  }
}


export const TabFarmacia = ({ erros }: IData) => {

  const [tabFarmaciaModel, setTabFarmaciaModel] = useState({} as IFarmacia);
 
  const [cnpj, setCnpj] = useState('');
  const [inscEst, setInscEst] = useState('');
  const [inscMun, setInscMun] = useState('');
  const [cep, setCep] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');

  const { id } = useParams();

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {

    async function loadFarmacia() {
      const response = await GetId("RetornaEmpresaPorId", idParams);
      if (response.status == 200) {
        setTabFarmaciaModel(response.data.farmacia);
        setCnpj(MaskCnpj(response.data.farmacia.cnpj))
        setInscEst(MaskIe(response.data.farmacia.inscricaoEstadual))
        setInscMun(MaskIm(response.data.farmacia.inscricaoMunicipal))
        setCep(MaskCep(response.data.farmacia.cep))
        setWhatsApp(MaskTelefone(response.data.farmacia.whatsApp))
        setTelefone(MaskTelefone(response.data.farmacia.telefone))
        setCelular(MaskTelefone(response.data.farmacia.celular))
      }
    }

    loadFarmacia()
  }, [])

  return (
    <Container>
      <div className="row">
        <div className="col-4 mt-4">
          <CustomInput
            label="Razão social"
            type="text"
            maxLength={50}
            value={tabFarmaciaModel.razaoSocial}
            index={1}
            readonly={true}
          />
        </div>
        <div className="col-4 mt-4">
          <CustomInput
            label="Nome Fantasia"
            type="text"
            maxLength={50}
            value={tabFarmaciaModel.nomeFantasia}
            index={2}
            readonly={true}
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
            value={tabFarmaciaModel.regimeTributario}
            readonly={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Cnpj"
            type="text"
            maxLength={18}
            value={cnpj}
            index={3}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Est."
            type="text"
            maxLength={20}
           value={inscEst}
           readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Inc. Mun."
            type="text"
            maxLength={20}
            value={inscMun}
            readonly={true}
          />
        </div>
        <div className="col-2">
        <CustomInput // nao to achando fornecedor
           label="Fornecedor"
           type="text"
           value={tabFarmaciaModel.fornecedorInterno?.nomeFornecedor}
           readonly={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <CustomInput
            label="Endereço"
            type="text"
            value={tabFarmaciaModel.logradouro}
            index={4}
            readonly={true}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="Numero"
            type="text"
            maxLength={7}
            value={tabFarmaciaModel.numero}
            index={5}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Cep"
            type="text"
            maxLength={9}
            value={cep}
            index={6}
            readonly={true}
          />
        </div>
        <div className="col-3">
        {tabFarmaciaModel.complemento &&
          <CustomInput
            label="Complemento"
            type="text"
            maxLength={20}
            value={tabFarmaciaModel.complemento}
            readonly={true}
          />}
        </div>
      </div>
      <div className="row">
        <div className="col-3">
        <CustomInput //ver
           label="Bairro"
           type="text"
           value={tabFarmaciaModel.bairro?.nome}
           readonly={true}
          />
        </div>
        <div className="col-3">
        <CustomInput //ver
           label="Cidade"
           type="text"
           value={tabFarmaciaModel.cidade?.nome}
           readonly={true}
          />
        </div>
        <div className="col-3">
          <CustomInput //ver
           label="Estados"
           type="text"
           value={tabFarmaciaModel.estado?.sigla}
           readonly={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={tabFarmaciaModel.ddd}
            index={7}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Telefone"
            type="text"
            maxLength={20}
            value={telefone}
            index={8}
            readonly={true}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={tabFarmaciaModel.dddCelular}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Celular"
            type="text"
            maxLength={20}
            value={celular}
            readonly={true}
          />
        </div>
        <div className="col-1">
          <CustomInput
            label="DDD"
            type="text"
            maxLength={4}
            value={tabFarmaciaModel.dddWhatsApp}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="WhatsApp"
            type="text"
            maxLength={20}
            value={whatsApp}
            index={9}
            readonly={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomInput
            label="Email"
            type="text"
            maxLength={60}
            value={tabFarmaciaModel.email}
            index={10}
            readonly={true}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Nome do Farmaceutico"
            type="text"
            maxLength={50}
            value={tabFarmaciaModel.nomeFarmaceutico}
            index={11}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="CRF"
            type="number"
            value={tabFarmaciaModel.crf}
            index={12}
            readonly={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="CPF Resp. SNGPC"
            type="text"
            maxLength={14}
            value={tabFarmaciaModel.cpfRespSNGPC}
            index={13}
            readonly={true}
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Usuário SNGPC"
            type="text"
            maxLength={100}
            value={tabFarmaciaModel.usuarioSNGPC}
            index={14}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Senha SNGPC"
            type="password"
            maxLength={50}
            value={tabFarmaciaModel.senhaSNGPC}
            index={15}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Func"
            type="text"
            maxLength={50}
            value={tabFarmaciaModel.licencaFunc}
            index={16}
            readonly={true}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-5">
          <CustomInput
            label="Autoridade Sanitária"
            type="text"
            maxLength={50}
            value={tabFarmaciaModel.autoridadeSanitaria}
            index={17}
            readonly={true}
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Licença Mapa"
            type="text"
            maxLength={50}
            value={tabFarmaciaModel.licencaMapa}
            index={18}
            readonly={true}
          />
        </div>
      </div>
    </Container>
  );
};
