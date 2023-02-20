import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { ITributo } from "../../Interfaces/Tributo/ITributo";

export function TributoEdit() {
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const navigate = useNavigate();
  const [erroNome, setErroNome] = useState("");
  const [tributoId, setTributoId] = useState(0);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tipoTributo, setTipoTributo] = useState(0);
  const [tipoTributoLabel, setTipoTributoLabel] = useState("");

  let data: ITributo = {
    id: tributoId,
    codigo: codigo,
    descricao: descricao,
    tipoTributo: tipoTributo
  }

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

  async function submit() {
    setErroNome("");
    setIsLoading(true);

    if (!descricao.trim() || !codigo.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo nome é obrigatório !");
      }, 2000);
      return;
    }

    data.id = tributoId;
    data.codigo = codigo.trim();
    data.descricao = descricao.trim();
    data.tipoTributo = tipoTributo;

    const resp = await postFormAll("EditarTributo", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/tributo");
      }, 2000);
    } else {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome(resp.request.response);
      }, 2000);
    }
  }

  return (
    <>
      <HeaderMainContent
        title="Editar Tributo"
        IncludeButton={false}
        ReturnButton={false}
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
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCodigo(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Descrição"
                type="textarea"
                value={descricao}
                maxLength={150}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescricao(e.target.value)
                }
                required={true}
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
                onClickOptions={(value, label) => setOptions(value, label)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-2">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="tributo" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Tributo editado com" />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
