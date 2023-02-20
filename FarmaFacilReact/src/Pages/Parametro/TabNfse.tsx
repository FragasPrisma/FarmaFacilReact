import { CustomInput } from "../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom/index";


export const TabNFSe = () => {
  return (
    <>

      <div className="row">
        <div className="col-3">
          <CustomInput
            label="Caminho Salvar NFSe"
            required={false}
            type="string"
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Enviar descrição completa(NFSe)"
            required={false}
            type="string"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="Login NFSe" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Senha NFSe" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Hash Validador" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <CustomInput label="Identificação" required={false} type="string" />
        </div>
        <div className="col-1">
          <CustomInput label="Alvara" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <CustomInput label="AEDF" required={false} type="string" />
        </div>
        <div className="col-1">
          <CustomInput label="Terminal" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="ID CNAE" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Cupom NFSe"]} />
        </div>
        <div className="col-2">
          <CustomInput
            label="Codigo Tributação Municipio"
            required={false}
            type="string"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Codigo Atividade"
            required={false}
            type="string"
          />
        </div>
        <div className="col-1">
          <CustomInput label="CST / ISS" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CheckboxCustom
            titleComponet="Ambiente"
            options={["Homologação", "Produção"]}
          />
        </div>
        <div className="col-2">
          <CheckboxCustom
            titleComponet="Ambiente"
            options={["Não Optante ISS", "Optante ISS", "Optante Misto"]}
          />
        </div>
      </div>

      <FieldsetCustom legend="Pao" >
        <div className="row">
          <div className="col-1">
            <CustomInput label="Aliquota" required={false} type="string" />
          </div>
          <div className="col-2">
            <CustomInput
              label="Casas Decimais XML"
              required={false}
              type="string"
            />
          </div>
          <div className="col-2">
            <CustomInput label="Aliquota PIS" required={false} type="string" />
          </div>
          <div className="col-2">
            <CustomInput
              label="Aliquota COFINS"
              required={false}
              type="string"
            />
          </div>
          <div className="col-2">
            <CustomInput label="Aliquota IR" required={false} type="string" />
          </div>
          <div className="col-2">
            <CustomInput label="Aliquota CSLL" required={false} type="string" />
          </div>
        </div>
      </FieldsetCustom>
    </>
  );
};
