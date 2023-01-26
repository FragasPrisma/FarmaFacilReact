import { CustomInput } from "../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabIntegracaoWeb = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Configuração whatsapp" numberCols={2}>
          <div className="col-12">
            <CustomInput label="Vendedor" required={false} type="string" />
            <p>select</p>
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Host" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Host Gráficos" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="Prazo orçamentos"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
      </div>



      <div className="row mt-4">
        <FieldsetCustom legend="Receituário" numberCols={3}>
          <div className="col-12">
          <CustomInput label="Host" required={false} type="string" />
             </div>
        </FieldsetCustom>
        </div>
    </>
  );
};
