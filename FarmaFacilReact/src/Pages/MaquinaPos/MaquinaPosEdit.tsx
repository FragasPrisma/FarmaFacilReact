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
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function MaquinaPosEdit() {
  const navigate = useNavigate();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erroNome, setErroNome] = useState("");
  const { id } = useParams();

  const [data] = useState({
    id: 0,
    descricao: "",
    serialPos: "",
    adquirentePosId: 0,
  });
  const [serialPos, setSerialPos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [adquirenteId, setAdquirenteId] = useState();
  const [adquirente, setAdquirente] = useState([]);

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaMaquinaPosPorId", idParams);
      if (response.status == 200) {
        // setAdquirente(response.data);

        setDescricao(response.data.descricao);
        setSerialPos(response.data.serialPos);
        setAdquirente(response.data.adquirentePos.descricao);
        // setTipoTributo(response.data.tipoTributo);
      }
    }

    Init();
  }, []);

  async function submit() {
    setErroNome("");
    setIsLoading(true);

    if (!serialPos.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo Serial é obrigatório !");
      }, 2000);
      return;
    }

    // data.id = adquirenteId;
    // data.descricao = descricao.trim();
    // data.serialPos = serialPos.trim();
    // data.adquirentePosId = adquirentePosId;

    const resp = await postFormAll("EditarMaquinaPos", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/maquinapos");
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
        title="Editar Máquina Pós"
        IncludeButton={false}
        ReturnButton={false}
      />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5">
              <CustomInput
                label="Descrição"
                type="text"
                placeholder="Digite uma descrição do máquina pós"
                value={descricao}
                maxLength={10}
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescricao(e.target.value)
                }
                required={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <CustomInput
                label="Serial"
                type="textarea"
                placeholder="Digite um Serial para máquina pós"
                value={serialPos}
                maxLength={150}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSerialPos(e.target.value)
                }
                required={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              <CustomDropDown
                data={adquirente}
                title="Selecione um Adquirente"
                filter="descricao"
                label="Adquirente"
                Select={(id) => setAdquirenteId(id)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-2">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="maquinapos" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
