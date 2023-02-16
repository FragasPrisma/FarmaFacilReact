import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { Container } from "./styles";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { IFarmacia } from "../../Interfaces/Empresa/IFarmacia";
import { ChangeEvent, useState } from "react";

export const TabFarmacia = () => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");

  const dataFarmacia: IFarmacia = {
    Id: 0,
    RazaoSocial: "",
    NomeFantasia: "",
    Cnpj: "",
    InscricaoEstadual: "",
    InscricaoMunicipal: "",
    RegimeTributario: 0,
    DDD: 0,
    Telefone: 0,
    Fax: 0,
    Email: "",
    WhatsApp: 0,
    Cep: "",
    Logradouro: "",
    Numero: 0,
    Complemento: "",
    CidadeId: 0,
    EstadoId: 0,
    BairroId: 0,
    NomeFarmaceutico: "",
    CRF: 0,
    CpfRespSNGPC: 0,
    UsuarioSNGPC: "",
    SenhaSNGPC: "",
    Ativo: true,
    LicencaFunc: "",
    AutoridadeSanitaria: "",
    LicencaMapa: "",
    FornecedorInternoId: 0
  }

  return (
    <Container>
      <div className="row">
        <div className="col-4">
          <CustomInput 
            label="Razão social"
            type="string" 
            value={razaoSocial}
            OnChange={(e: ChangeEvent<HTMLInputElement>) => setRazaoSocial(e.target.value)}
          />
        </div>
        <div className="col-4">
          <CustomInput 
            label="Nome Fantasia"
            type="string"
            value={nomeFantasia}
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
            name={""}
            value={null}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput
            label="CNPJ"
            type="string"
            required={false}
          />
        </div>
        <div className="col-2">
          <CustomInput label="Inc. Est." type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="Inc. Mun." type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <CustomInput label="Endereço" type="string" required={false} />
        </div>
        <div className="col-1">
          <CustomInput label="Numero" type="string" required={false} />
        </div>
        <div className="col-1">
          <CustomInput label="CEP" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <CustomInput label="Complemento" type="string" required={false} />
        </div>
        <div className="col-3">
          <CustomInput label="Bairro" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <CustomInput label="Cidade" type="string" required={false} />
        </div>
        <div className="col-1">
          <CustomInput label="Estado" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <CustomInput label="DDD" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="Telefone" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="Fax" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <CustomInput label="E-Mail" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="Contato Whats" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <CustomInput label="Farmacêutico(a)" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="CRF" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput label="CPF Resp. SNGPC" type="string" required={false} />
        </div>
        <div className="col-3">
          <CustomInput label="Usuário SNGPC" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="Senha SNGPC" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput label="Licença Func" type="string" required={false} />
        </div>
      </div>

      <div className="row">
        <div className="col-5">
          <CustomInput
            label="Autoridade Sanitária"
            type="string"
            required={false}
          />
        </div>
        <div className="col-2">
          <CustomInput label="Licença Mapa" type="string" required={false} />
        </div>
        <div className="col-2">
          <CustomInput
            label="Fornecedor Interno"
            type="string"
            required={false}
          />
        </div>
      </div>
    </Container>
  );
};
