import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { Container } from "./styles";

export const TabFarmacia = () => {
  return (
    <Container>
      <div className="row">
        <div className="col-4">
          <CustomInput label="Razão social" type="string" required={false} />
        </div>
        <div className="col-4">
          <CustomInput label="Nome Fantasia" type="string" required={false} />
        </div>

        <div className="col-4 mt-2">
          <CheckboxCustom
            titleComponet="Tipo"
            options={[
              "Simples nacional",
              "Simples nac. Sublimite",
              "Regime Normal",
            ]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput label="CNPJ" type="string" required={false} />
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
