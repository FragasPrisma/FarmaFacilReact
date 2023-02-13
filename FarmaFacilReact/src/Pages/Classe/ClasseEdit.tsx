import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IClasse } from "../../Interfaces/Classe/IClasse";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";

export function ClasseEdit() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const navigate = useNavigate();
  const [erro, setErro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [validadeDias, setValidadeDias] = useState(0)
  const [classeId, setClasseId] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  let idParams = !id ? "0" : id.toString();

  let data: IClasse = {
    id: classeId,
    descricao: descricao,
    validadeDias: validadeDias
  }

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaClassePorId", idParams);
      setClasseId(response.data.id);
      setDescricao(response.data.descricao);
      setValidadeDias(response.data.validadeDias);
    }

    Init();
  }, []);

  async function submit() {

    setIsLoading(true);

    if (!descricao.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErro("Campo de preenchimento obrigatório.");
      }, 2000)
      return;
    }

    const resp = await postFormAll("EditarClasse", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/classe");
      }, 2000)
    } else {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErro(resp.request.response)
      }, 2000)
    }
  }

  return (
    <>
      <HeaderMainContent
        title="Editar Classe"
        IncludeButton={false}
        ReturnButton={false}
      />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Descrição"
                type="text"
                placeholder="Digite a descrição da Classe"
                value={descricao}
                maxLength={50}
                erro={erro}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescricao(e.target.value)
                }
                required={true}
              />
            </div>
            <div className="col-3">
              <CustomInput
                label="Validade Fcia. Popular (dias)"
                type="number"
                placeholder="Digite a validade Fcia. popular"
                value={validadeDias}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValidadeDias(parseInt(e.target.value))
                }
              />
            </div>
          </div>
          <LabelObrigatorio />
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="classe" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Registro editado com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
