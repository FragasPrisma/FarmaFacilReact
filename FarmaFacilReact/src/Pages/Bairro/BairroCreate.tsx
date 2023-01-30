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

export function BairroCreate() {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const data = {
    id: 0, //id 0 é default
    nome: nome,
  };

  async function submit() {

    setErroNome("");
    setIsLoading(true);

    if(!nome.trim()){
      setIsOpenFail(true);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo nome é obrigatório !")
      }, 2000)
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("AdicionarBairro", data);

    if(resp.status == 200){
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/bairro");
      }, 2000)
    }else{
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
      <HeaderMainContent title="ADICIONAR BAIRRO" IncludeButton={false} ReturnButton={false}/>
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome do Bairro"
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
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="bairro" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Bairro adicionado com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
