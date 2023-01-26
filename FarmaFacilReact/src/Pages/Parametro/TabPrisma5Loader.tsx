import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabPrisma5Loader = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Configuração INI" numberCols={4}>
          <></>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="PSERV" numberCols={4}>
          <div className="col-12 mt-3">
            <p>TextArea</p>
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
          <div className="col-2 mt-3 mb-4">
            <CheckboxCustom options={["Pserv.ini"]} />
          </div>
      </div>

      <div className="row">
        <FieldsetCustom legend="C50032" numberCols={4}>
          <div className="col-12 mt-3">
            <p>TextArea</p>
          </div>
        </FieldsetCustom>
      </div>
    </>
  );
};
