import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabNfe = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="NFe" numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="Caminho salvar NFe"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="Numero Certificado"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Caminho Logo" required={false} type="string" />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CheckboxCustom options={["Protocolo TLSv1.2"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CheckboxCustom options={["Importar Valor Liquido da Venda"]} />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <div className="col-2">
          <CheckboxCustom options={["Homologação", "Produção"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom
            options={["Emitir NFC-e em contingência automática"]}
          />
        </div>
        <div className="col-3">
          <CheckboxCustom options={["Enviar Descrição completa(NFe)max.120"]} />
        </div>
        <div className="col-2">
          <CustomInput
            label="Docto Fiscal Padrão"
            required={false}
            type="string"
          />
        </div>
        <div className="col-3">
          <CustomInput
            label="Possivelmente um select"
            required={false}
            type="string"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="ID CNAE" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput
            label="% Partilha de ICMS"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CheckboxCustom
            titleComponet="Tipo de nota"
            options={["Ambos", "Fatura", "Serviço"]}
          />
        </div>
      </div>

      <div className="row">
        <FieldsetCustom legend="Sped Fiscal" numberCols={2}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Perfil"
              options={["Perfil A", "Perfil B", "Perfil C"]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Tipo de atividade"
              options={["Industrial", "Outros"]}
            />
          </div>
        </FieldsetCustom>
      </div>
      <div className="row">
        <FieldsetCustom legend="Sped Pis/Cofins" numberCols={2}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Tipo de contribuição"
              options={["Aliquota Basica", "Aliquotas Especificas"]}
            />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Criterio de Escrituração"
              options={[
                "Reg. de caixa - Escrit. Consolidada",
                "Reg. de Competência - Escrit. Consolidada",
                "Reg. de Competência - Escrit. Detalhada",
              ]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Metodo de apropriação de credito"
              options={[
                "Apropriação direta",
                "Rateio Proporcional(Receita Bruta)",
              ]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Tipo de atividade"
              options={[
                "Industrial ou equiparada",
                "Prestador de serviços",
                "Atividade de comercio",
                "Atividade financeira",
                "Atividade imobiliaria",
                "Outros",
              ]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CheckboxCustom
              titleComponet="Incidência Tributária no Período"
              options={[
                "Exclusivamente no regime não-acumulativo",
                "Exclusivamente no regime acumulativo",
                "Regimes não-acumulativo e acumulativo",
              ]}
            />
          </div>
        </FieldsetCustom>
      </div>
    </>
  );
};
