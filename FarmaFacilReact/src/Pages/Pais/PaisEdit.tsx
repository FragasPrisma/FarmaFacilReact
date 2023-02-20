import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState , useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IPais } from "../../Interfaces/Pais/IPais";

export function PaisEdit() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idPais,setId] = useState(0);
  const [nome, setNome] = useState("");
  const [codigoIbge,setCodigoIbge] = useState(0);
  const [codigoTelefonico,setCodigoTelefonico] = useState(Number);
  const [erro, setErro] = useState("");
  const [erroIbge, setErroIbge] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaPaisPorId", idParams);
      setId(response.data.id);
      setNome(response.data.nome);
      setCodigoIbge(response.data.codigoIbge)
      setCodigoTelefonico(response.data.codigoTelefonico)
    }

    Init();
  }, []);

  const data : IPais = {
    id: idPais, 
    nome: nome.trim(),
    codigoIbge:codigoIbge,
    codigoTelefonico:codigoTelefonico
  };

  async function submit() {

    setErro("")
    setIsLoading(true);

    if (!nome.trim()) {
      setErro("Campo nome é obrigatório !")
      setIsLoading(false);
      return;
    }

    if (codigoIbge <= 0) {
        setErroIbge("Código IBGE é obrigatório !")
        setIsLoading(false);
        return;
      }

    const resp = await postFormAll("EditarPais", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/pais");
      }, 2000)
    } else {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
      }, 2000)
    }
  }

  return (
    <>
      <HeaderMainContent title="EDITAR PAÍS" IncludeButton={false} ReturnButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-6 mb-3">
              <CustomInput
                label="Nome"
                type="text"
                placeholder="Digite o nome"
                value={nome}
                maxLength={50}
                erro={erro}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <CustomInput
                label="Código IBGE"
                type="number"
                placeholder="Digite o código IBGE"
                value={codigoIbge}
                erro={erroIbge}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCodigoIbge(parseInt(e.target.value))
                }
                required={true}
              />
            </div>
            <div className="col-3">
              <CustomInput
                label="Código Telefonico"
                type="number"
                placeholder="Digite o código telefonico"
                value={codigoTelefonico}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCodigoTelefonico(parseInt(e.target.value))
                }
                required={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-3">
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="pais" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="País editado com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
