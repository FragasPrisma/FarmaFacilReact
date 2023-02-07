import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom/index";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function MaquinaPosCreate() {
  const navigate = useNavigate();
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erroNome, setErroNome] = useState("");

  const [serialPos, setSerialPos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [adquirenteId, setAdquirenteId] = useState();
  const [adquirente, setAdquirente] = useState([]);

  const data = {
    id: 0,
    descricao: descricao.trim(),
    serialPos: serialPos.trim(),
    adquirentePosId: adquirenteId,
    // adquirentePos: {
    //   id: 0,
    //   descricao: "",
    //   chaveRequisicao: "",
    // },
  };

  useEffect(() => {
    const loadDataAdquirente = async () => {
      const response = await getAll("ListaPosAdquirente");
      setAdquirente(response.data);
    };

    loadDataAdquirente();
  }, []);

  async function submit() {
    setErroNome("");
    setIsLoading(true);
    if (!serialPos.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroNome("Campo Serial é obrigatório!");
      }, 2000);
      return;
    }

    console.log(data);
    const response = await postFormAll("AdicionarMaquinaPos", data);
    if (response.status === 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/maquinapos");
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
        title="Adicionar Máquina Pós"
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
        <SuccessModal show={isOpenSuccess} textCustom="Máquina Pós adicionada com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
