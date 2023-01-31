import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState , useEffect} from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";

export function ContaCorrenteEdit() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [idConta,setId] = useState(0);
  const [nome, setNome] = useState("");
  const [numeroConta,setNumeroConta] = useState("");
  const [limite,setLimite] = useState(Number);
  
  const [erroNome, setErroNome] = useState("");
  const [erroNumeroConta, setErroNumeConta] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaContaCorrentePorId", idParams);
      setId(response.data.id);
      setNome(response.data.nome);
      setNumeroConta(response.data.numeroConta)
      setLimite(response.data.limite)
    }

    Init();
  }, []);

  const data = {
    id: idConta, 
    nome: nome.trim(),
    numeroConta:numeroConta,
    limite:limite
  };

  async function submit() {

    setErroNome("")
    setErroNumeConta("")
    setIsLoading(true);

    if (!nome.trim()) {
      setErroNome("Campo nome é obrigatório !")
      setIsLoading(false);
      return;
    }

    if (!numeroConta) {
        setErroNumeConta("Número da conta é obrigatório !")
        setIsLoading(false);
        return;
      }

    const resp = await postFormAll("EditarContaCorrente", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/contacorrente");
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
      <HeaderMainContent title="EDITAR CONTA CORRENTE" IncludeButton={false} ReturnButton={false} />
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
                erro={erroNome}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNome(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <CustomInput
                label="Número da Conta"
                type="text"
                placeholder="Digite o número da conta"
                value={numeroConta}
                erro={erroNumeroConta}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNumeroConta(e.target.value)
                }
                required={true}
              />
            </div>
            <div className="col-2">
              <CustomInput
                label="Limite"
                type="number"
                placeholder="Digite o limite"
                value={limite}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLimite(parseFloat(e.target.value))
                }
                required={false}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-3">
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="contacorrente" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Conta Corrente editada com " />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
