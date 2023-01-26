import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";
import { CheckboxCustom } from "./../../Components/Others/CheckboxCustom/index";
import { CustomInput } from "./../../Components/Inputs/CustomInput/index";

export const TabGeral = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Arredondamento" numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom options={["Arredendar", "Truncar(Cortar)"]} />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Decimais" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Duplicatas" numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Taxas Juros(% ao mês)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row mt-4">
        <FieldsetCustom legend="Financeiro" numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Multa Atraso(%)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Jutos Atraso(%)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Tolerância(dias)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Lim. Desc.(Caixa)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
      </div>



      <div className="row mt-4">
        <FieldsetCustom legend="Alterar Valor Venda Recebida" numberCols={2}>
          <div className="col-12 mt-3">
          <CheckboxCustom options={["Não Permitir", "Permitir", "Pedir Senha"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
          <CheckboxCustom options={["Padrão Orçamento"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Integração Matriz Filial" numberCols={2}>
          <div className="col-12 mt-3">
          <CheckboxCustom options={["Sem Integração", "Integração Venda", "Integração Estoque", "Integração On-line"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Mensagem Cliente Em Débito" numberCols={2}>
          <div className="col-12 mt-3">
          <CheckboxCustom options={["Não mostrar", "Apenas Avisar", "Avisar e Pedir Senha", "Bloquear Venda"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
          <CheckboxCustom options={["Plano de contas Obrigatório"]} />
          </div>
          <div className="col-12">
          <CheckboxCustom options={["Permitir Receb. Outra Filial"]} />
          </div>
          </FieldsetCustom>


      </div>
    </>
  );
};
