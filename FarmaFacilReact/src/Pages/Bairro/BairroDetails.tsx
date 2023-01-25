import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function BairroDetails() {
    const [nome, setNome] = useState("");
    const [observacao, setObservacao] = useState("");
    const [pbmId, setPbmId] = useState(0);
    const { id } = useParams();
    
    useEffect(() =>{
      
      async function Init() {
        const response = await GetId("RetornaBairroPorId", id.toString());
        if(response.status == 200){
          setPbmId(response.data.id);
          setNome(response.data.nome);
          setObservacao(response.data.observacao)
        }
      }
  
      Init()
    },[])
  
    return (
        <>
      <HeaderMainContent title="DETALHES BAIRRO" IncludeButton={false} ReturnButton={true} to={"bairro"}/>
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                value={nome}
                required={true}
                readonly={true}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
    );
}