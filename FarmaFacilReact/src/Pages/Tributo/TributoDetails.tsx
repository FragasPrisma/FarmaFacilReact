import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export function TributoDetails() {
  const [descricao, setDescricao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tipoTributo, setTipoTributo] = useState(0);
  const [tipoTributoLabel, setTipoTributoLabel] = useState("");
  const { id } = useParams();

  let idParams = !id ? "0" : id.toString();

  function setOptions(value: number, label: string) {
    setTipoTributo(value);
    setTipoTributoLabel(label);
  }

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaTributoPorId", idParams);
      if (response.status == 200) {
        setCodigo(response.data.codigo);
        setDescricao(response.data.descricao);
        setTipoTributo(response.data.tipoTributo);
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
                value={codigo}
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
                value={descricao}
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
                value={tipoTributo}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
