import { ButtonCancel } from "../../Components/ButtonCancel";
import { CustomInput } from "../../Components/CustomInput";
import { HeaderMainContent } from "../../Components/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function PbmDetails() {
  const [nome, setNome] = useState("");
  const [observacao, setObservacao] = useState("");
  const [pbmId, setPbmId] = useState(0);
  const { id } = useParams();
  const url = `RetornaPbmPorId/${id}`

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

  return (
    <>
      <HeaderMainContent title="DETALHES PBM" IncludeButton={false} ReturnButton={true} to={"pbm"} />
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
          <div className="row">
              <div className="col-6">
                <CustomInput
                  label="Observação"
                  type="textarea"
                  value={observacao}
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