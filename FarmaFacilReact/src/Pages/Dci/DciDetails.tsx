import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function DciDetails() {
    const [codigoDci, setCodigoDci] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dciId, setDciId] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();
    
    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaDciPorId", idParams);
          if(response.status == 200){
            setDciId(response.data.id);
            setCodigoDci(response.data.codigoDci);
            setDescricao(response.data.descricao)
          }
        }
    
        Init()
      },[])

    return (
        <>
            <HeaderMainContent title="DETALHES DCI" IncludeButton={false} ReturnButton={true} to={"dci"} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-3">
              <CustomInput
                label="Código Dci"
                type="text"
                value={codigoDci}
                required={true}
                readonly={true}
              />
            </div>
          </div>
          <div className="row">
              <div className="col-7">
                <CustomInput
                  label="Descrição"
                  type="textarea"
                  value={descricao}
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