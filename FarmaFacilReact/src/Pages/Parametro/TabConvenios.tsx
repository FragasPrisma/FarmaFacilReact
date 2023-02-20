import { CustomInput } from "./../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom/index";

export const TabConvenios = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Convênio Funcional Card" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Convênio" required={false} type="string" />
            <CustomInput label="Login" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Host" required={false} type="string" />
            <CustomInput label="Senha" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <CustomInput label="N° Vias" required={false} type="string" />
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Agemed" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Convênio" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom legend="ABC Farma" numberCols={4}>
          <div className="col-12">
            <CustomInput label="WebService" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Senha" required={false} type="string" />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Convênio E-Pharma" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Convênio" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom legend="VidaLink" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Convênio" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Barras" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom legend="Integração CGM" numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="Código Integração"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Pharma Link" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Autenticação" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Login" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Senha" required={false} type="string" />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="InfoMerc" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Host" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom legend="InfoMerc" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Login" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom legend="InfoMerc" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Senha" required={false} type="string" />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Integração BIG" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Convênio" required={false} type="string" />
            <CustomInput label="Endereço" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Cod. Acesso" required={false} type="string" />
            <CustomInput label="Senha" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Vias Cupom" required={false} type="string" />
            <CustomInput label="IFarma" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <p>falta um botao</p>
          </div>
        </FieldsetCustom>

        <div className="row">
          <FieldsetCustom legend="Convênio Afdar" numberCols={2}>
            <div className="col-12">
              <CustomInput label="Convênio" required={false} type="string" />
            </div>
          </FieldsetCustom>
          <div className="col-2 ">
            <CheckboxCustom options={["Integração Dotz"]} />
          </div>
        </div>
      </div>
    </>
  );
};
