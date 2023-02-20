import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IClasse } from "../../Interfaces/Classe/IClasse";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";

export function ClasseCreate() {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [validadeDias, setValidadeDias] = useState(0)
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const data: IClasse = {
    id: 0,
    descricao: descricao.trim(),
    validadeDias: validadeDias
  };

  async function submit() {

    setErro("")
    setIsLoading(true);

    if (!descricao.trim()) {
      setErro("Campo de preenchimento obrigatório.")
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("AdicionarClasse", data);

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
      }, 2000)
    }
  }

  return (
    <>
      <HeaderMainContent title="Incluir Classe" IncludeButton={false} ReturnButton={false} />
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
        <SuccessModal show={isOpenSuccess} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
