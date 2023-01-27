import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { CheckboxCustom } from "./../../Components/Others/CheckboxCustom/index";
import { CustomDropDown } from "./../../Components/Inputs/CustomDropDown/index";
import { RadioCustom } from "./../../Components/Inputs/RadioCustom/index";

export function TributoCreate() {
  const navigate = useNavigate();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [erroNome, setErroNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [tipoTributo, setTipoTributo] = useState(0);
  const [tipoTributoLabel, setTipoTributoLabel] = useState("");

  const data = {
    id: 0,
    tipoTributo: tipoTributo,
    descricao: descricao.trim(),
    codigo: codigo.trim(),
  };

  function setOptions(value: number, label: string) {
    setTipoTributo(value);
    setTipoTributoLabel(label);
  }

  async function submit() {
    setErroNome("");
    setIsLoading(true);
    if (!descricao.trim() || !codigo.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo é obrigatório!");
      }, 2000);
      return;
    }
    const response = await postFormAll("AdicionarTributo", data);

    if (response.status === 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/tributo");
      }, 2000);
    } else {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome(response.request.response);
      }, 2000);
    }
  }

  return (
    <>
      <HeaderMainContent
        title="Adicionar Tributo"
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
                placeholder="Digite o código do Pbm"
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
                placeholder="Digite uma descrição para o Tributo"
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
        <SuccessModal show={isOpenSuccess} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
