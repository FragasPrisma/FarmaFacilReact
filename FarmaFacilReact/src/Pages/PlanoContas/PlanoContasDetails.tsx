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
//import { valSelectedIndex, valSelectedText } from "./ComponentTree";

import { useSelector } from "react-redux";
import { RootState } from "../../store/IRootState";

export function PlanoContasDetails() {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conta, setConta] = useState("");


  const state = useSelector((state: RootState) => state.planoReducer)
  
  let valuee:any = state

  
 // let valuee = itemSelected;


  useEffect(() => {
    const vl = () => {
      setConta( valuee.key );
      setDescricao( valuee.label );
    };
    vl();
  }, []);


  return (
    <>
      <HeaderMainContent
        title="Visualizar Plano de Contas"
        IncludeButton={false}
        ReturnButton={true}
        to={"planodecontas"}
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
                required={false}
                readonly={true}
              />
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
