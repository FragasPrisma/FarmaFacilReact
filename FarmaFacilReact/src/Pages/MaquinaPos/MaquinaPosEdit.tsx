import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { IMaquinaPos } from "../../Interfaces/MaquinaPos/IMaquinaPos";
import { IPosAdquirente } from "../../Interfaces/PosAdquirente/IPosAdquirente";

export function MaquinaPosEdit() {
  const navigate = useNavigate();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erroDescricao, setErroDescricao] = useState("");
  const [erroSerialPos, setErroSerialPos] = useState("");

  const [adquirentePosDescricao, setAdquirentePosDescricao] = useState("");
  const { id } = useParams();
  const [idMaquina, setId] = useState(0);
  const [serialPos, setSerialPos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [adquirenteId, setAdquirenteId] = useState(null);
  const [adquirente, setAdquirente] = useState([] as IPosAdquirente []);

  let data: IMaquinaPos = {
    id: idMaquina,
    descricao: descricao.trim(),
    serialPos: serialPos.trim(),
    adquirentePosId: adquirenteId
  }

  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaMaquinaPosPorId", idParams);
      if (response.status == 200) {
        setId(response.data.id)
        setDescricao(response.data.descricao);
        setSerialPos(response.data.serialPos);
        setAdquirentePosDescricao(response.data.adquirentePos.descricao);
      }
    }

    const loadDataAdquirente = async () => {
      const response = await getAll("ListaPosAdquirente");
      setAdquirente(response.data);
    };

    loadDataAdquirente();
    Init();
  }, []);

  async function submit() {
    
    setErroSerialPos("");
    setErroDescricao("");
    setIsLoading(false);

    if (!descricao.trim()) {
      setErroDescricao("Campo descrição obrigatório !")
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    if (!serialPos.trim()) {
      setErroSerialPos("Campo serial pós obrigatório !")
      setIsLoading(false);
      return;
    }

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
                erro={erroDescricao}
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
                erro={erroSerialPos}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSerialPos(e.target.value)
                }
                required={true}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-3">
              {
                <CustomDropDown
                  data={adquirente}
                  title={
                    !adquirentePosDescricao
                      ? "Selecione um Adquirente"
                      : adquirentePosDescricao
                  }
                  filter="descricao"
                  label="Adquirente"
                  Select={(id) => setAdquirenteId(id)}
                />
              }
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-2">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="maquinapos" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Máquina Pós editada com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
