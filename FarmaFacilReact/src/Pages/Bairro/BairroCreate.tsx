import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

export function BairroCreate() {

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState("");

  const data = {
    id: 0, //id 0 é default
    nome: nome,
  };

  async function submit() {

    setErroNome("")

    if(!nome.trim()){
      setErroNome("Campo nome é obrigatório !")
      return;
    }

    const resp = await postFormAll("AdicionarBairro", data);

    if(resp.status == 200){
      navigate("/bairro")
    }else{
      setErroNome(resp.request.response)
      return;
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
              <ButtonConfirm onCLick={submit}/>
              <ButtonCancel to="bairro" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
