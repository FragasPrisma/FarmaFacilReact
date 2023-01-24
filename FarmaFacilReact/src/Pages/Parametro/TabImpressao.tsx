import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export const TabImpressao = () => {
  return (
    <>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Tipo"
            options={[
              "Imprimir sempre",
              "Perguntar se deseja imprimir",
              "Não imprimir",
            ]}
          />
        </div>
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Impressora Recibo Fidelidade"
            options={["paoo", "wfwf", "sdegas", "awfaw"]}
          />
        </div>
        <div className="col-4 mt-4">
          <CheckboxCustom options={["Imprimir quantidade no item"]} />
          <CheckboxCustom options={["Imprimir Etiqueta na Venda"]} />
          <CheckboxCustom options={["Imprimir Farmaceutico na Etiqueta"]} />
          <CheckboxCustom options={["Imprimir Cabeçalho"]} />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Impressora"
            options={["paoo", "wfwf", "sdegas", "awfaw"]}
          />
        </div>

        <div className="col-3 mt-4">
          <CheckboxCustom options={["Lado a Lado"]} />
          <CheckboxCustom options={["Destaca Número Venda"]} />
          <CheckboxCustom options={["Destaca Nome Cliente"]} />
        </div>
      </div>
      <div className="row">
        <div className="col-3 mt-4">
          <CheckboxCustom
            titleComponet="Impressão de itens da venda"
            options={["Detalhado", "Agrupado"]}
          />
        </div>
        <div className="col-3 mt-4">
          <CheckboxCustom
            titleComponet="Confissão de Dívida"
            options={["40 Colunas", "60 Colunas"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <CustomInput type="string" label="Linha 1" required={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <CustomInput type="string" label="Linha 2" required={false} />
        </div>
      </div>
    </>
  );
};
