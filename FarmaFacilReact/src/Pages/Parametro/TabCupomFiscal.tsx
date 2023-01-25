import { CheckboxCustom } from "./../../Components/Others/CheckboxCustom/index";
import { CustomInput } from "./../../Components/Inputs/CustomInput";

export const TabCuspomFiscal = () => {
  return (
    <>
      <div className="row">
        <div className="col-2">
          <CheckboxCustom options={["Imprime confissão de dívida"]} />
        </div>
        <div className="col-2">
          <CheckboxCustom options={["Habilita CAT-52"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom options={["Imprime comprovante de recebimento "]} />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CustomInput label="Linha 1" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Linha 2" required={false} type="string" />
        </div>
        <div className="col-3">
          <CustomInput label="Wb Fisco" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Habilita NFC-e"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom options={["Emitir NFC-e em contingência"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom
            options={["Enviar descrição completa(NFCe)max. 120"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Imprime confissão de dívida"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom options={["Emitir NFC-e em contingência off-line"]} />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Imprime comprovante de recebimento"]} />
        </div>
        <div className="col-3">
          <CheckboxCustom
            options={["Emitir NFC-e em contingência automática"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Opção Prisma5 DLL NFCe"]} />
        </div>
        <div className="col-1">
          <CustomInput label="ID Token01" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Protocolo TLSv1.2"]} />
        </div>
        <div className="col-1">
          <CustomInput label="ID Token02" required={false} type="string" />
        </div>
        <div className="col-3">
          <CheckboxCustom
            options={["Enviar descrição completa(SAT)max. 120"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <CheckboxCustom options={["Exibe desconto item NFCe"]} />
        </div>
        <div className="col-1">
          <CustomInput label="CSC qrCode" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          <CustomInput label="Alíquota de ISS" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CheckboxCustom
            titleComponet="SAT/MFE"
            options={["Habilitar SAT", "Habilitar MFE"]}
          />
        </div>
        <div className="col-2">
          <CheckboxCustom
            titleComponet="Ambiente"
            options={["Homologação", "Produção"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput
            label="Chave de ativação"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CustomInput label="Assinatura soft" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="Versão SAT" required={false} type="string" />
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <CustomInput label="MFE Entrada" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput label="MFE Saída" required={false} type="string" />
        </div>
        <div className="col-2">
          <CustomInput
            label="MFE Chave de acesso Validador"
            required={false}
            type="string"
          />
        </div>
        <div className="col-2">
          <CustomInput
            label="MFE Chave de acesso Requisição"
            required={false}
            type="string"
          />
        </div>
      </div>
    </>
  );
};
