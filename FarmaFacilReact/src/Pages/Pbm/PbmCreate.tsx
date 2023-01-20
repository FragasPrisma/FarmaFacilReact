import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/SuccessModal";
import { FailModal } from "../../Components/FailModal";
import { useNavigate } from "react-router-dom";

export function PbmCreate() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [isOpenSuccess, setIsOpenSuccess] = useState(false)
  const [isOpenFail, setIsOpenFail] = useState(false);

  const data = {
    id: 0, //id 0 é default
    nome: nome,
    observacao: observacao,
  };

  async function submit() {
    const response = await postFormAll("AdicionarPbm", data);
    if(response.status === 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/pbm");
      },3000)
    } else {
      setIsOpenFail(true);
      setTimeout(() => {
        setIsOpenFail(false);
      },2000)
    }
  }

  return (
    <>
      <HeaderMainContent title="ADICIONAR PBM" IncludeButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do Pbm"
                value={nome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                required={true}
                name="nome"
              />
            </div>
            <div className="col-5">
              <CustomInput
                label="Observação"
                type="text"
                placeholder="Digite uma descrição para o Pbm"
                value={observacao}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setObservacao(e.target.value)
                }
                required={false}
                name="observacao"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <ButtonConfirm onCLick={submit}/>
              <ButtonCancel to="pbm" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess}/>
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)}/>
      </div>
    </>
  );
}
