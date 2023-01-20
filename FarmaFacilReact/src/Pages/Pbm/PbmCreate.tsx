import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { useNavigate } from "react-router-dom";

export function PbmCreate() {

  const [erroNome, setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const navigate = useNavigate();

  const data = {
    id: 0, //id 0 é default
    nome: nome.trim(),
    observacao: observacao.trim(),
  };

  async function submit() {

    setErroNome("")

    if(!nome.trim()){
      setErroNome("Campo nome é obrigatório !")
      return;
    }

    const resp = await postFormAll("AdicionarPbm", data);
    
    if(resp.status == 200){
      navigate("/pbm")
    }else{
      setErroNome(resp.request.response)
      return;
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
              <ButtonConfirm onCLick={submit} />
              <ButtonCancel to="pbm" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
