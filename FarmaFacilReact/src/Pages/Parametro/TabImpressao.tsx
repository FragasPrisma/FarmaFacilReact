import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabImpressao = () => {
  return (
    <>
      <div className="row mt-4">

      <FieldsetCustom legend="Tipo" numberCols={2}>
        <div className="col-11 mt-3">
          <CheckboxCustom
            options={[
              "Imprimir sempre",
              "Perguntar se deseja imprimir",
              "Não imprimir",
            ]}
          />
        </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Impressora Recibo Fidelidade" numberCols={3}>
        <div className="col-11 mt-3">
          <CheckboxCustom
            options={[
              "Matricial",
              "Relátorio Gerencial ECF",
              "40 Colunas",
              "60 Colunas",
            ]}
          />
        </div>
        </FieldsetCustom>

      </div>

      <div className="row mt-3">
        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Imprimir quantidade no item"]} />
            <CheckboxCustom options={["Imprimir Etiqueta na Venda"]} />
            <CheckboxCustom options={["Imprimir Farmaceutico na Etiqueta"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Imprimir Cabeçalho"]} />
          </div>
          <FieldsetCustom numberCols={12}>
            <div className="col-12 ">
              <CustomInput label="Número Vias" required={false} type="string" />
              <CustomInput
                label="Linhas Cupons"
                required={false}
                type="string"
              />
            </div>
          </FieldsetCustom>
        </FieldsetCustom>

        <FieldsetCustom numberCols={3}>
          <div className="col-12 mt-4 ">
            <CheckboxCustom options={["Imprimir Comprovante de Débito"]} />
            <CustomInput label="Número Vias" required={false} type="string" />
            <CheckboxCustom options={["Bloquear Reimpressão Venda/Ordem"]} />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Impressora" numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom
              options={[
                "Matricial",
                "Jato de Tinta/Laser",
                "Laser(Especial)",
                "40 Colunas",
                "60 Colunas",
                "Relátorio Gerencial ECF",
                "60 Colunas/Laser",
                "60 Colunas Grande",
              ]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Lado a Lado"]} />
            <CheckboxCustom options={["Destaca Número Venda"]} />
            <CheckboxCustom options={["Destaca Nome Cliente"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Impressão de itens da venda" numberCols={3}>
          <div className="col-10 mt-4">
            <CheckboxCustom options={["Detalhado", "Agrupado"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Confissão de Dívida" numberCols={3}>
          <div className="col-10 mt-4">
            <CheckboxCustom options={["40 Colunas", "60 Colunas"]} />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Mensagem Comprovante" numberCols={3}>
          <div className="col-12">
            <CustomInput type="string" label="Linha 1" required={false} />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CustomInput type="string" label="Linha 2" required={false} />
          </div>
        </FieldsetCustom>
      </div>
    </>
  );
};
