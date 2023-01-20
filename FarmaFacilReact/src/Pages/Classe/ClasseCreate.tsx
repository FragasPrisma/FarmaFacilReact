import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

export function ClasseCreate() {

  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const data = {
    id: 0, //id 0 é default
    descricao: descricao.trim(),
  };

  async function submit() {

    setErro("")

    if(!descricao.trim()){
      setErro("Campo descrição é obrigatório !")
      return;
    }

    const resp = await postFormAll("AdicionarClasse", data);

    if(resp.status == 200){
      navigate("/classe")
    }else{
      setErro(resp.request.response)
      return;
    }
  }

  return (
    <>
      <HeaderMainContent title="ADICIONAR CLASSE" IncludeButton={false} />
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
          </div>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} />
              <ButtonCancel to="classe" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
