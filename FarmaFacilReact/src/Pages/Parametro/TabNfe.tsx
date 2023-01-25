import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export const TabNfe = () => {
  return (
    <>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Caminho salvar NFe"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="Numero Certificado"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CustomInput label="Caminho Logo" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Protocolo TLSv1.2"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom options={["Importar Valor Liquido da Venda"]} />
        </div>
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
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Perfil"
            options={["Perfil A", "Perfil B", "Perfil C"]}
          />
        </div>
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Tipo de atividade"
            options={["Industrial", "Outros"]}
          />
        </div>
        <div className="col-3">
          <CheckboxCustom
            options={[
              "Exclusivamente no regime não-acumulativo",
              "Exclusivamente no regime acumulativo",
              "Regimes não-acumulativo e acumulativo",
            ]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Tipo de contribuição"
            options={["Aliquota Basica", "Aliquotas Especificas"]}
          />
        </div>
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Criterio de Escrituração"
            options={[
              "Reg. de caixa - Escrit. Consolidada",
              "Reg. de Competência - Escrit. Consolidada",
              "Reg. de Competência - Escrit. Detalhada",
            ]}
          />
        </div>
        <div className="col-3">
          <CheckboxCustom
            titleComponet="Metodo de apropriação de credito"
            options={[
              "Apropriação direta",
              "Rateio Proporcional(Receita Bruta)",
            ]}
          />
        </div>
        <div className="col-3">
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
      </div>
    </>
  );
};
