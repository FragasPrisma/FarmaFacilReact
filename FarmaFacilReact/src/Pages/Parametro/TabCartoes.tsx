import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "./../../Components/Others/CheckboxCustom/index";

export const TabCartoes = () => {
  return (
    <>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="TEF(Visa/RedeCard/Amex)"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
        <div className="col-2">
          <CustomInput label="UC" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="TEF(BanriCompras)"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
        <div className="col-2">
          <CustomInput label="Funcional Card" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="TEF(Hipercard)" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
        <div className="col-2">
          <CustomInput label="VidaLink" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput label="EDM Card" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
        <div className="col-2">
          <CustomInput label="E-Pharma" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <CustomInput label="Vias Cupom" required={false} type="string" />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput label="Integrações4S" required={false} type="string" />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>

        <div className="col-2">
          <CustomInput
            label="Integrações Afdar"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilitar"]} />
        </div>
      </div>
    </>
  );
};
