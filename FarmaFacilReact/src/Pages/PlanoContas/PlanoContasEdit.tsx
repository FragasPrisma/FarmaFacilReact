import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useEffect, useState } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { Container } from "../Dcb/styles";
//import { itemSelected, value } from ".";
import { useSelector } from "react-redux";

export function PlanoContasEdit() {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conta, setConta] = useState("");
  const [response, setResponse] = useState("")
 
  //state

  const state = useSelector((state) => state)

   let valuee:any = state

   let handleCaseChildren = valuee.key
   let nivelConta = parseInt(handleCaseChildren[0])
   let numeroContaPai = valuee.key.toString()


   useEffect(() =>{
    
    async function Init() {
      let response = await GetId("RetornarPlanoDeContasPorId", valuee.id);

      setResponse(response.data)

      if(response.status == 200){
        setDescricao(response.data.descricao);
      }


      setConta( handleCaseChildren )
      setDescricao(valuee.label)

    }

    Init()

},[])


const data = {
  id: response.id,
  nivelConta: response.nivelConta,
  numeroConta: response.numeroConta,
  numeroContaPai: response.numeroContaPai,
  descricao: descricao,
  sequencia: response.sequencia,
};


  async function submit() {

    setErroDescricao("");
    setIsLoading(true);

    if (!descricao.trim()) {
      setIsOpenFail(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsOpenFail(false);
        setErroDescricao("Campo descrição é obrigatório!");
      }, 2000);
      return;
    }

    const resp = await postFormAll("EditarPlanoDeContas", data);

    if (resp.status == 200) {
      setIsOpenSuccess(true);
      setTimeout(() => {
        navigate("/planodecontas");
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
        title="Editar Plano de Contas"
        IncludeButton={false}
        ReturnButton={false}
      />
      <div className="form-group">
        <Container>
          <div className="row">
            <div className="col-3">
              <CustomInput
                label="Conta"
                type="text"
                value={conta}
                readonly={true}
              />
            </div>

          </div>
          <div className="row">
            <div className="col-4">
              <CustomInput
                label="Descrição"
                type="text"
                placeholder="Digite uma descrição de plano de contas"
                value={descricao}
                maxLength={50}
                erro={erroDescricao}
                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setDescricao(e.target.value)
                }
                required={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-2">
              <ButtonConfirm onCLick={submit} isLoading={isLoading} />
              <ButtonCancel to="planodecontas" />
            </div>
          </div>
        </Container>
        <SuccessModal
          show={isOpenSuccess}
          textCustom="Plano de contas editado com "
        />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
