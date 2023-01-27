import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState , useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function PaisDetails() {

    const [nome, setNome] = useState("");
  const [codigoIbge,setCodigoIbge] = useState(0);
  const [codigoTelefonico,setCodigoTelefonico] = useState(Number);

  const { id } = useParams();
  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaPaisPorId", idParams);
      setNome(response.data.nome);
      setCodigoIbge(response.data.codigoIbge)
      setCodigoTelefonico(response.data.codigoTelefonico)
    }

    Init();
  }, []);

  return (
    <>
      <HeaderMainContent title="DETALHES DO PAÍS" IncludeButton={false} ReturnButton={true} to="pais" />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-6 mb-3">
              <CustomInput
                label="Nome"
                type="text"
                readonly={true}
                value={nome}
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <CustomInput
                label="Código IBGE"
                type="number"
                value={codigoIbge}
                readonly={true}
                required={true}
              />
            </div>
            <div className="col-3">
              <CustomInput
                label="Código Telefonico"
                type="number"
                value={codigoTelefonico}
                readonly={true}
                required={false}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
