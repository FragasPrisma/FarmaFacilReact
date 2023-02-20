import { useState } from "react";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

const gestaoEntrega = {
  id: 0,
  romaneioImpressao: 0,
};

export const TabGestaoEntrega = () => {
  const [romaneio, setRomaneio] = useState(0);

  gestaoEntrega.romaneioImpressao = romaneio;

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
