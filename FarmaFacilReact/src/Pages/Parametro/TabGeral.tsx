import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom/index";
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

        <FieldsetCustom legend="Local Entrega Obrigatorio" numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom options={["Na venda", "No Sync."]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Orçamento rejeitado" numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom
              options={["Não manter", "Solicitar confirmação", "Manter"]}
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
              label="Lim. Desc. Caixa (R$)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row mt-4">
        <FieldsetCustom legend="Alterar Valor Venda Recebida" numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom
              options={["Não Permitir", "Permitir", "Pedir Senha"]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={3}>
          <div className="col-12 mt-3">
            <CheckboxCustom options={["Padrão Orçamento"]} />
          </div>
          <div className="col-12">
            <CheckboxCustom
              options={[
                "Não permitir entrada com valor igual ao total da venda",
              ]}
            />
          </div>
          <div className="col-12">
            <CheckboxCustom options={["Caixa após venda"]} />
          </div>
          <div className="col-12">
            <CheckboxCustom options={["Operador caixa obrig."]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Integração Matriz Filial" numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom
              options={[
                "Sem Integração",
                "Integração Venda",
                "Integração Estoque",
                "Integração On-line",
              ]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Mensagem Cliente Em Débito" numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom
              options={[
                "Não mostrar",
                "Apenas Avisar",
                "Avisar e Pedir Senha",
                "Bloquear Venda",
              ]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom options={["Plano de contas Obrigatório"]} />
          </div>
          <div className="col-12">
            <CheckboxCustom options={["Permitir Receb. Outra Filial"]} />
          </div>

          <CheckboxCustom options={["Ativar novo estoque"]} />

          <CustomInput label="" required={false} type="string" />
        </FieldsetCustom>
      </div>

      <div className="row mt-4">
        <FieldsetCustom legend="Curva ABC" numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Ultima Curva" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={1}>
          <div className="col-12 mt-3">
            <CustomInput label="Data Inicial" required={false} type="string" />
            <CustomInput label="Data Final" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={1}>
          <div className="col-12 mt-3">
            <CustomInput label="A (%)" required={false} type="string" />
          </div>
          <div className="col-12 ">
            <CustomInput label="B (%)" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={1}>
          <div className="col-12 mt-3">
            <CustomInput label="C (%)" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Farmacêuticos Autorizados"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <p>nao sei ao certo oq ta escrito</p>
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput
              label="Data inicial Ultima compra(Dias)"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row mt-4">
        <FieldsetCustom legend="% Recolhimento ICMS" numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Positiva" required={false} type="string" />

            <CustomInput label="Negativa" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Neutra" required={false} type="string" />
            <CustomInput label="Hig. Pessoal" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Filtros (Em dias)" numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Venda(1°)" required={false} type="string" />

            <CustomInput label="Caixa (1°)" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Venda (2°)" required={false} type="string" />
            <CustomInput label="Caixa (2°)" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom
              titleComponet="Baixa Falta/Enc."
              options={["Baixar Sempre", "Solicitar conf.", "Não baixar"]}
            />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Filtros (Em dias)" numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Venda(1°)" required={false} type="string" />

            <CustomInput label="Caixa (1°)" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CustomInput label="Venda (2°)" required={false} type="string" />
            <CustomInput label="Caixa (2°)" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-3">
            <CheckboxCustom
              titleComponet="Baixa Falta/Enc."
              options={["Baixar Sempre", "Solicitar conf.", "Não baixar"]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Exportação de custos" numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Ativar Exportações de Custos"]} />
            <CustomInput
              label="Pasta dos arquivos de envio/Resp."
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom legend="Origem Venda Padrão" numberCols={2}>
          <div className="col-12 mt-4">
            <p>Select</p>
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Obrigar Campos" numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Endereço Cliente"]} />
            <CheckboxCustom options={["Telefone Cliente"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["CPF Cliente"]} />
            <CheckboxCustom options={["E-mail Cliente"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12 mt-4">
            <CheckboxCustom options={["Prescritor"]} />
          </div>
        </FieldsetCustom>
      </div>
    </>
  );
};
