import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

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
            options={[
              "Matricial",
              "Relátorio Gerencial ECF",
              "40 Colunas",
              "60 Colunas",
            ]}
          />
        </div>
        <div className="col-3 mt-4">
          <CheckboxCustom options={["Imprimir quantidade no item"]} />
          <CheckboxCustom options={["Imprimir Etiqueta na Venda"]} />
          <CheckboxCustom options={["Imprimir Farmaceutico na Etiqueta"]} />
          <CheckboxCustom options={["Imprimir Cabeçalho"]} />
          <div className="col-5 ">
              <CustomInput
                label="Linhas Cupons"
                required={false}
                type="string"
              />
              <CustomInput label="Número Vias" required={false} type="string" />
              
            </div>

            <div className="col-12 ">
            <CheckboxCustom options={["Imprimir Comprovante de Débito"]} />
              <CustomInput label="Número Vias" required={false} type="string" />
            <CheckboxCustom options={["Bloquear Reimpressão Venda/Ordem"]} />
            </div>
          
        </div>
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
          
              {/* <div className="col-1">
           
              </div> */}
        
          </FieldsetCustom>

          <FieldsetCustom numberCols={2}>
            <div className="col-12 mt-4">
              <CheckboxCustom options={["Lado a Lado"]} />
              <CheckboxCustom options={["Destaca Número Venda"]} />
              <CheckboxCustom options={["Destaca Nome Cliente"]} />
            </div>
          </FieldsetCustom>



        <FieldsetCustom legend="Test" numberCols={3}>

          <div className="col-10 mt-4">
            <CheckboxCustom
              titleComponet="Impressão de itens da venda"
              options={["Detalhado", "Agrupado"]}
              />
          </div>

          </FieldsetCustom>

          <FieldsetCustom legend="test sfs" numberCols={3}>

          <div className="col-10 mt-4">
            <CheckboxCustom
              titleComponet="Confissão de Dívida"
              options={["40 Colunas", "60 Colunas"]}
              />
          </div>

          </FieldsetCustom>

          


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
