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

export function MotivoEdit() {

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idMotivo,setId] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  let idParams = !id ? "0" : id.toString();

  useEffect(() => {
    async function Init() {
      const response = await GetId("RetornaMotivoPorId", idParams);
      setId(response.data.id);
      setDescricao(response.data.descricao);
    }

    Init();
  }, []);

  const data = {
    id: idMotivo, 
    descricao: descricao.trim(),
  };

  async function submit() {

    setErro("")
    setIsLoading(true);

    if (!descricao.trim()) {
      setErro("Campo descrição é obrigatório !")
      setIsLoading(false);
      return;
    }

    const resp = await postFormAll("EditarMotivo", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/motivo");
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
      <HeaderMainContent title="EDITAR MOTIVO" IncludeButton={false} ReturnButton={false} />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-5 mb-3">
              <CustomInput
                label="Descrição"
                type="text"
                placeholder="Digite a descrição"
                value={descricao}
                maxLength={50}
                erro={erro}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescricao(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
              <ButtonCancel to="motivo" />
            </div>
          </div>
        </Container>
        <SuccessModal show={isOpenSuccess} textCustom="Motivo editado com "/>
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
