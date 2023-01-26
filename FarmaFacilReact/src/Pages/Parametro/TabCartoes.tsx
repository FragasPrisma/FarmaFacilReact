import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "./../../Components/Others/CheckboxCustom/index";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabCartoes = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Integração Cartões" numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="TEF(Visa/RedeCard/Amex)"
              required={false}
              type="string"
            />

            <CustomInput
              label="TEF(BanriCompras)"
              required={false}
              type="string"
            />

            <CustomInput
              label="TEF(Hipercard)"
              required={false}
              type="string"
            />

            <CustomInput label="EDM Card" required={false} type="string" />

            <CustomInput label="Vias Cupom" required={false} type="string" />

            <CustomInput
              label="Integrações Afdar"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>


        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="UC" required={false} type="string" />
          </div>
          <div className="col-12 mt-3">
            <CustomInput
              label="Funcional Card"
              required={false}
              type="string"
            />
          </div>
          <div className="col-12">
            <CustomInput label="VidaLink" required={false} type="string" />
          </div>
          <div className="col-12">
            <CustomInput label="E-Pharma" required={false} type="string" />
          </div>
          <div className="col-12 ">
            <CustomInput label="Integrações4S" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-5">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Habilitar"]} />
          </div>
        </FieldsetCustom>
      </div>
    </>
  );
};
