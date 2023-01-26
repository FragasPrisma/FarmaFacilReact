import { CustomInput } from "./../../Components/Inputs/CustomInput";

export const TabConvenios = () => {
  return (
    <>
      <div className="row">
        <div className="col-2">
          <CustomInput label="Convênio" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Host" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomInput label="Login" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Senha" required={false} type="string" />
        </div>
        <div className="col-1">
          <CustomInput label="N° Vias" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="Convênio" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <CustomInput label="WebService" required={false} type="string" />
        </div>
        <div className="col-1">
          <CustomInput label="Senha" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="Convênio" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="Convênio" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Barras" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Código Integração"
            required={false}
            type="string"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <CustomInput label="Autenticação" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Login" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Senha" required={false} type="string" />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <CustomInput label="Host" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Login" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Senha" required={false} type="string" />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <CustomInput label="Convênio" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Endereço" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Cod. Acesso" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Senha" required={false} type="string" />
        </div>
        <div className="row">
          <div className="col-2">
            <CustomInput label="Vias Cupom" required={false} type="string" />
          </div>
          <div className="col-2">
            <CustomInput label="IFarma" required={false} type="string" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="Convênio" required={false} type="string" />
        </div>
      </div>
    </>
  );
};
