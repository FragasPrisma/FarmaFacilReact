import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams, useNavigate } from 'react-router-dom';

export function BairroEdit() {

  const navigate = useNavigate();
  const [erroNome,setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [bairroId, setBairroId] = useState(0);
  const { id } = useParams();
  const[data] = useState({id:0,nome:""});

  useEffect(() =>{
    
    async function Init() {
      const response = await GetId("RetornaBairroPorId", id?.toString());
      setBairroId(response.data.id);
      setNome(response.data.nome);
    }

    Init()
  },[])
    
  async function submit() {

    setErroNome("");

    if(!nome.trim()){
      setErroNome("Campo nome é obrigatório !")
      return;
    }

    data.id = bairroId;
    data.nome = nome;
    const resp = await postFormAll("EditarBairro", data);

    if(resp.status == 200){
      navigate("/bairro")
    }else{
      setErroNome(resp.request.response)
      return;
    }
  }

  return (
    <>
      <HeaderMainContent title="EDITAR BAIRRO" IncludeButton={false} ReturnButton={false}/>
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
