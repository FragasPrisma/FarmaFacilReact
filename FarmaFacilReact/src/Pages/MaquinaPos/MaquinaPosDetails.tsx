import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IMaquinaPos } from "../../Interfaces/MaquinaPos/IMaquinaPos";

export function MaquinaPosDetails() {
  const { id } = useParams();

  const [maquinaModel, setMaquinaModel] = useState({} as IMaquinaPos);
  const [adquirente, setAdquirente] = useState("")

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaMaquinaPosPorId", idParams);
      
      if (response.status == 200) {
        setMaquinaModel(response.data);
        if (response.data.adquirentePos) {
          setAdquirente(response.data.adquirentePos.descricao)
        }
      }
    }

    Init();
  }, []);

  return (
    <>
      <HeaderMainContent
        title="Detalhes Máquina Pós"
        IncludeButton={false}
        ReturnButton={true}
        to={"maquinapos"}
      />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Descrição"
                type="text"
                value={maquinaModel.descricao}
                readonly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Serial"
                type="textarea"
                value={maquinaModel.serialPos}
                readonly
              />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <CustomInput
                label="Adquirente"
                type="textarea"
                value={adquirente}
                readonly
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
