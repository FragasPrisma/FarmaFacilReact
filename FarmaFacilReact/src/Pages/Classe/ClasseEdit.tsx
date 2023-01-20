import { ButtonCancel } from "../../Components/ButtonCancel";
import { ButtonConfirm } from "../../Components/ButtonConfirm";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function ClasseEdit() {

  const navigate = useNavigate();
  const [erro,setErro] = useState("");
  const [descricao, setDescricao] = useState("");
  const [classeId, setClasseId] = useState(0);
  const { id } = useParams();
  const url = `RetornarClassePorId/${id}`
  const[data] = useState({id:0,descricao:""});

  useEffect(() =>{
    
    async function Init() {
      const response = await GetId(url);
      setClasseId(response.data.id);
      setDescricao(response.data.descricao);
    }

    Init()
  },[])
    
  async function submit() {
    data.id = classeId;
    data.descricao = descricao.trim();

    if(!descricao.trim()){
      setErro("Campo descrição é obrigatório !")
      return;
    }

    const resp = await postFormAll("EditarClasse", data);

    if(resp.status == 200){
      navigate("/classe");
    }else{
      setErro(resp.request.response)
      return;
    }
  }

  return (
    <>
      <HeaderMainContent title="EDITAR CLASSE" IncludeButton={false} />
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
              <ButtonConfirm onCLick={submit}/>
              <ButtonCancel to="classe" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
