import { useState } from "react";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

// const sipro = {
//     id: 0,
//     mapaReferencia: 0
  
// }

export const TabSiproquim = () => {
  const [mapaReferencia, setMapaReferencia] = useState(Boolean);
 // sipro.mapaReferencia = mapaReferencia

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
