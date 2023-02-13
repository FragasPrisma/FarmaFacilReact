import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IPbm } from "../../Interfaces/Pbm/IPbm";

export function PbmDetails() {

  const [pbmModel, setPbmModel] = useState({} as IPbm);
  const { id } = useParams();

  let idParams = !id ? "0" : id.toString()
  
  useEffect(() =>{
    
    async function Init() {
      const response = await GetId("RetornaPbmPorId", idParams);
      if(response.status == 200){
        setPbmModel(response.data);
      }
    }

    Init()
  },[])

  return (
    <>
      <HeaderMainContent title="Visualizar PBM" IncludeButton={false} ReturnButton={true} to={"pbm"} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Nome"
                type="text"
                value={pbmModel.nome}
                required={true}
                readonly={true}
              />
            </div>
          </div>
          <div className="row">
              <div className="col-6">
                <CustomInput
                  label="Observação"
                  type="textarea"
                  value={pbmModel.observacao}
                  required={false}
                  readonly={true}
                />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}