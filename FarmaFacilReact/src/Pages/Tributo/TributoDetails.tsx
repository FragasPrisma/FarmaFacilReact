import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { ITributo } from "../../Interfaces/Tributo/ITributo";

export function TributoDetails() {

  const [tributoModel, setTributoModel] = useState({} as ITributo);

  const { id } = useParams();

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaTributoPorId", idParams);
      if (response.status == 200) {
        setTributoModel(response.data);
      }
    }

    Init();
  }, []);

  return (
    <>
      <HeaderMainContent
        title="Detalhes Tributo"
        IncludeButton={false}
        ReturnButton={true}
        to={"tributo"}
      />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Código"
                type="text"
                value={tributoModel.codigo}
                maxLength={10}
                required={false}
                readonly={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Descrição"
                type="textarea"
                value={tributoModel.descricao}
                required={false}
                readonly={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <RadioCustom
                titleComponet="Tipo Tributo"
                name="Tipo Tributo"
                options={[
                  "CST",
                  "CSOSN",
                  "SituacaoDocumento",
                  "DocumentosFiscais",
                  "CstPisCofins",
                  "CstIss",
                  "CFPS",
                  "CEST",
                  "CodigoBeneficioFiscal",
                  "CstIpi",
                ]}
                value={tributoModel.tipoTributo}
                readonly={true}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
