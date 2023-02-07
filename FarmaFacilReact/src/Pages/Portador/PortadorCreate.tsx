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
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IPortador } from "../../Interfaces/Portador/IPortador";

export function PortadorCreate() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [portadorInativo, setPortadorInativo] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const data : IPortador= {
    id: 0,
    nome: nome.trim(),
    portadorInativo: portadorInativo
  };

  async function submit() {

    setErro("")
    setIsLoading(true);

    if (!nome.trim()) {
      setErro("Campo nome é obrigatório !")
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("AdicionarPortador", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/portador");
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
      <HeaderMainContent title="ADICIONAR PORTADOR" IncludeButton={false} ReturnButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5 mb-3">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome"
                value={nome}
                maxLength={50}
                erro={erro}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2 mb-3">
              <CheckboxCustom
                options={["Portador Inativo"]}
                onClickOptions={(e) => setPortadorInativo(e.target.checked)}
                check={portadorInativo}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="portador" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Protador adicionado com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
