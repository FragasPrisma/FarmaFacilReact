import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabSiproquim = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Mapa Referência" numberCols={4}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Comercialização", "Exportação", "Produção", "Transformação", "Utilização", "Fabricação", "Transporte", "Armazenagem"]} />
          </div>
        </FieldsetCustom>
      </div>

    </>
  );
};
