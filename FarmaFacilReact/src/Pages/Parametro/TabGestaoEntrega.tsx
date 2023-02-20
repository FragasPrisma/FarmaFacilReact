import { useState } from "react";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
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
            <RadioCustom
              options={["Jato de Tinta/Laser", "60 Colunas"]}
              name="romaneio"
              value={romaneio}
              onClickOptions={(value, label) => setRomaneio(value)}
            />
          </div>
        </FieldsetCustom>
      </div>
    </>
  );
};
