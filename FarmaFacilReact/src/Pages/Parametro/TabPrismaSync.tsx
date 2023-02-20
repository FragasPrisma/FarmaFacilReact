import { ChangeEvent, useState } from "react";
import { CustomInput } from "../../Components/Inputs/CustomInput";

export const TabPrismaSync = () => {
  const [intervaloOrcamentoDias, setIntervaloOrcamentoDias] = useState(Number);
  return (
    <>
      <div className="row mt-4">
        <div className="col-4 mb-4">
          <CustomInput
            label="Intervalo orçamento (Dias)"
            required={false}
            type="number"
            value={intervaloOrcamentoDias}
            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIntervaloOrcamentoDias(Number(e.target.value))
            }
          />
        </div>
      </div>
    </>
  );
};
