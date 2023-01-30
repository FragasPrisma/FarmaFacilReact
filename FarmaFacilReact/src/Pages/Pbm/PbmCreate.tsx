import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";

export function PbmCreate() {
  const navigate = useNavigate();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [erroNome, setErroNome] = useState("");
  

  const data = {
    id: 0, //id 0 é default
    nome: nome.trim(),
    observacao: observacao.trim(),
  };

  async function submit() {
    setErroNome("")
    setIsLoading(true)
    if (!nome.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo nome é obrigatório !")
      }, 2000)
      return;
    }
    const response = await postFormAll("AdicionarPbm", data);

    if (response.status === 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/pbm");
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
      <HeaderMainContent title="ADICIONAR PBM" IncludeButton={false} ReturnButton={false}/>
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do Pbm"
                value={nome}
                maxLength={50}
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Observação"
                type="textarea"
                placeholder="Digite uma descrição para o Pbm"
                value={observacao}
                maxLength={150}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setObservacao(e.target.value)
                }
                required={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-2">
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="pbm" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
