import { CustomInput } from "../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabPrismaSync = () => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-4 mb-4">
        <CustomInput label="Intervalo orçamento (Dias)" required={false} type="string"/>
        </div>
      </div>

    </>
  );
};
