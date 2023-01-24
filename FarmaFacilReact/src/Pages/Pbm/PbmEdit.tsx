import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams,useNavigate } from 'react-router-dom';

export function PbmEdit() {

  const navigate = useNavigate();
  const [erroNome,setErroNome] = useState("");
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pbmId, setPbmId] = useState(0);
  const { id } = useParams();
  const url = `RetornaPbmPorId/${id}`
  const[data] = useState({id:0,nome:"",observacao:""});

  useEffect(() =>{
    
    async function Init() {
      const response = await GetId(url);
      if(response.status == 200){
        setPbmId(response.data.id);
        setNome(response.data.nome);
        setObservacao(response.data.observacao)
      }
    }

    Init()
  },[])
    
  async function submit() {

    setErroNome("");

    if(!nome.trim()){
      setErroNome("Campo nome é obrigatório !")
      return;
    }

    data.id = pbmId;
    data.nome = nome.trim();
    data.observacao = observacao.trim();
    
    const resp = await postFormAll("EditarPbm", data);

    if(resp.status == 200){
      navigate("/pbm")
    }else{
      setErroNome(resp.request.response)
      return;
    }

  }

  return (
    <>
      <HeaderMainContent title="EDITAR PBM" IncludeButton={false} ReturnButton={false}/>
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
              <ButtonConfirm onCLick={submit}/>
              <ButtonCancel to="pbm" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
