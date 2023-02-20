import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IDci } from "../../Interfaces/Dci/IDci";

export function DciDetails() {

  const [dciModel, setDciModel] = useState({} as IDci);
  const { id } = useParams();

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {

    async function Init() {
      const response = await GetId("RetornaDciPorId", idParams);
      if (response.status == 200) {
        setDciModel(response.data);
      }
    }

    Init()
  }, [])

  return (
    <>
      <HeaderMainContent title="Visualizar DCI" IncludeButton={false} ReturnButton={true} to={"dci"} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-3">
              <CustomInput
                label="Código Dci"
                type="text"
                value={dciModel.codigoDci}
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
                value={dciModel.descricao}
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