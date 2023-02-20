import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useEffect, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { Container } from "../Dcb/styles";
import { useSelector } from "react-redux";


export function PlanoContasCreate() {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conta, setConta] = useState("");

  const data = {
    id: 0,
    nivelConta: null || 0,
    numeroConta: "",
    numeroContaPai: "",
    descricao: "",
    sequencia: 0,
  };


  const state = useSelector((state) => state)
  let valuee:any = state


 // let val = itemSelected

  // console.log("val", val)
  // console.log("valuee", valuee)

  

   // valuee.children[0].key.substring(0, valuee.children[0].key.length - 1) + parseInt(valuee.children[valuee.children.length - 1].key.slice(-1)) + 1 // faz a conversao correta a do children

   //const { id, key, label } = useSelector(state => state.planoDeContas);

   
  //  valuee.children[0].key.substring(0, valuee.children[0].key.length - 1) + (parseInt(valuee.children[valuee.children.length - 1].key.slice(-1)) + 1 ).toString()
  //  (valuee.key.slice(0) + '.' + Number(valuee.children.length + 1)  ).toString()
 
   let handleCaseChildren = valuee.children.length == 0 ? valuee.key.trim() + '.1' : (valuee.key.slice(0) + '.' + Number(valuee.children.length + 1)  ).toString()
   let nivelConta = parseInt(handleCaseChildren[0])
   let numeroContaPai = valuee.key.toString()


   

  useEffect(() => {
    const vl = () => {
      setConta( handleCaseChildren );
    };
    vl();
  }, []);


  async function submit() {

       data.nivelConta = nivelConta
       data.numeroConta = handleCaseChildren,
       data.numeroContaPai = numeroContaPai,
       data.descricao = descricao,
       data.sequencia = 0,

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

    const resp = await postFormAll("AdicionarPlanoDeContas", data);

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
        title="Adicionar Plano de Contas"
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

            <div className="col-3">
              <p style={{ paddingTop: "1rem" }}>
                item do grupo {valuee.key + " - " + valuee.label}
              </p>
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
          textCustom="Plano de contas adicionado com "
        />
        <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      </div>
    </>
  );
}
