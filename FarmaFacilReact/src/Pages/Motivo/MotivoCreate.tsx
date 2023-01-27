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

export function MotivoCreate() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const data = {
    id: 0, 
    descricao: descricao.trim(),
  };

  async function submit() {

    setErro("")
    setIsLoading(true);

    if (!descricao.trim()) {
      setErro("Campo descrição é obrigatório !")
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("AdicionarMotivo", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/motivo");
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
      <HeaderMainContent title="ADICIONAR MOTIVO" IncludeButton={false} ReturnButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5 mb-3">
              <CustomInput
                label="Descrição"
                type="text"
                placeholder="Digite a descrição"
                value={descricao}
                maxLength={50}
                erro={erro}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescricao(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="motivo" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}