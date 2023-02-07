import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabGestaoEntrega = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Romaneio" numberCols={4}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Jato de Tinta/Laser", "60 Colunas"]} />
          </div>
        </FieldsetCustom>
      </div>

    </>
  );
};
