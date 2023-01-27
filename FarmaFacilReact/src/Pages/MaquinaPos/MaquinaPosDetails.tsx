import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect, ChangeEvent } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";

export function MaquinaPosDetails() {
  const { id } = useParams();

  const [serialPos, setSerialPos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [adquirente, setAdquirente] = useState([]);

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaMaquinaPosPorId", idParams);
      console.log(response);
      if (response.status == 200) {
        setDescricao(response.data.descricao);
        setSerialPos(response.data.serialPos);
        setAdquirente(response.data.adquirentePos.descricao);
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
                value={descricao}
                readonly
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Serial"
                type="textarea"
                value={serialPos}
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
