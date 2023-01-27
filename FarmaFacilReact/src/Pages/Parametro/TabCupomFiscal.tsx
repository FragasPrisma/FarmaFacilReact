import { CheckboxCustom } from "./../../Components/Others/CheckboxCustom/index";
import { CustomInput } from "./../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "./../../Components/Others/FieldsetCustom/index";

export const TabCuspomFiscal = () => {
  return (
    <>
      <div className="row mt-4">
        <FieldsetCustom legend="Cupom Fiscal" numberCols={2}>
          <div className="col-12">
            <CheckboxCustom options={["Imprime confissão de dívida"]} />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CheckboxCustom options={["Habilita CAT-52"]} />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CheckboxCustom options={["Imprime comprovante de recebimento "]} />
          </div>
        </FieldsetCustom>
      </div>
      <div className="row">
        <FieldsetCustom legend="Mensagem Cupom" numberCols={3}>
          <div className="col-12">
            <CustomInput label="Linha 1" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CustomInput label="Linha 2" required={false} type="string" />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="Wb Fisco" required={false} type="string" />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="NFC-e" numberCols={3}>
          <div className="col-12">
            <CheckboxCustom options={["Habilita NFC-e"]} />
            <CheckboxCustom options={["Imprime confissão de dívida"]} />
            <CheckboxCustom options={["Imprime comprovante de recebimento"]} />
            <CheckboxCustom options={["Opção Prisma5 DLL NFCe"]} />
            <CheckboxCustom options={["Protocolo TLSv1.2"]} />
            <CheckboxCustom options={["Exibe desconto item NFCe"]} />
            <CustomInput
              label="Alíquota de ISS"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CheckboxCustom options={["Emitir NFC-e em contingência"]} />
            <CheckboxCustom
              options={["Emitir NFC-e em contingência off-line"]}
            />
            <CheckboxCustom options={["NFC-e em contingência automática"]} />
            <CustomInput label="ID Token01" required={false} type="string" />
            <CustomInput label="ID Token02" required={false} type="string" />
            <CustomInput label="CSC qrCode" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={3}>
          <div className="col-12">
            <CheckboxCustom
              options={["Enviar descrição completa(NFCe) max. 120"]}
            />
            <p>Falta um Text area</p>
            <CheckboxCustom
              options={["Enviar descrição completa(SAT) max. 120"]}
            />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="SAT/MFE" numberCols={2}>
          <div className="col-12">
            <CheckboxCustom options={["Habilitar SAT", "Habilitar MFE"]} />
            <CheckboxCustom
              titleComponet="Ambiente"
              options={["Homologação", "Produção"]}
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="Chave de ativação"
              required={false}
              type="string"
            />
            <CustomInput
              label="Assinatura soft"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="MFE Entrada" required={false} type="string" />
            <p>falta um botao exec</p>
            <CustomInput label="Funções SAT" required={false} type="string" />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput label="MFE Saída" required={false} type="string" />
            <CustomInput label="Versão SAT" required={false} type="string" />
          </div>
        </FieldsetCustom>
      </div>

      <div className="row">
        <FieldsetCustom legend="Impressão NFCe/SAT" numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="MFE Chave de acesso Validador"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>
        <FieldsetCustom numberCols={2}>
          <div className="col-12">
            <CustomInput
              label="MFE Chave de acesso Requisição"
              required={false}
              type="string"
            />
          </div>
        </FieldsetCustom>

        <FieldsetCustom numberCols={2}>
          <p>falta um select</p>
        </FieldsetCustom>
      </div>
    </>
  );
};
