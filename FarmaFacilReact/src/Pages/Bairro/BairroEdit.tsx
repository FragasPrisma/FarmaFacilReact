import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IBairro } from "../../Interfaces/Bairro/IBairro";
import { useTranslation } from "react-i18next";

export function BairroEdit() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [erroNome, setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [bairroId, setBairroId] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {

    async function Init() {
      const response = await GetId("RetornaBairroPorId", idParams);
      setBairroId(response.data.id);
      setNome(response.data.nome);
    }

    Init()
  }, [])

  let data: IBairro = {
    id: bairroId,
    nome: nome
  }

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

    const resp = await postFormAll("EditarBairro", data);

    if (resp.status == 200) {

      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/bairro");
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
      <HeaderMainContent title={`${t('bairro.titleEdit')}`} IncludeButton={false} ReturnButton={false} />
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
                focusParam={true}
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="bairro" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom={t('textGeneric.registroEditado').toString()} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
