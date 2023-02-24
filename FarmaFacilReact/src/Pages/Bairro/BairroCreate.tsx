import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IBairro } from "../../Interfaces/Bairro/IBairro";
import { useTranslation } from "react-i18next";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";

export function BairroCreate() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState(true);
  const { t } = useTranslation();

  const data: IBairro = {
    id: 0,
    nome: nome
  };

  async function submit() {

    setErroNome("");
    setIsLoading(true);
    
    if (!nome.trim()) {
      setIsOpenFail(true);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome(t('erros.campoObrigatorio').toString())
      }, 2000)
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("AdicionarBairro", data);

    if (resp.status == 200) {

      setIsOpenSuccess(true);

      setTimeout(() => {
        setNome("")
        setIsOpenSuccess(false);
        setIsLoading(false);
        setFocus(true);
      }, 2000)

    } else {

      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome(resp.request.response)
      }, 2000)
      
    }
  }

  return (
    <>
      <HeaderMainContent title={`${t('bairro.title')}`} IncludeButton={false} ReturnButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label={t('textGeneric.nome')}
                type="text"
                placeholder={t('textGeneric.digiteNome').toString()}
                value={nome}
                maxLength={50}
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                focusParam={focus}
                required={true}
              />
            </div>
          </div>
          <LabelObrigatorio/>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="bairro" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
