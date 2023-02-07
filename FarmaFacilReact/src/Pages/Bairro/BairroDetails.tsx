import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IBairro } from "../../Interfaces/Bairro/IBairro";

export function BairroDetails() {
  
    const [bairroModel, setBairroModel] = useState({} as IBairro);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()
    
    useEffect(() =>{
      
      async function Init() {
        const response = await GetId("RetornaBairroPorId", idParams);
        if(response.status == 200){
          setBairroModel(response.data);
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
                value={bairroModel.nome}
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