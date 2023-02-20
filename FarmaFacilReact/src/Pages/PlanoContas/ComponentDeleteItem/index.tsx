import { X } from "phosphor-react";
import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { FailModal } from "../../../Components/Modals/FailModal";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { deleteDetail, GetId, postFormAll } from "../../../Services/Api";
import { CloseButton, MensageDefault, Container } from "./styles";

export const Modall = ({ children, isActive, toggleModal }:any) => {
  const [isOpenFail, setIsOpenFail] = useState(false);
  const [stateModalSucces, setStateModalSucces] = useState(false);
  
  const state = useSelector((state) => state)
  let valuee:any = state
  let msg = "Esta conta possui sub-contas ligadas a ela e por isso não pode ser excluída. Se deseja realmente apagar esta conta apague antes todas as suas sub-contas!"

  const submitButtonConfirm = async () => {
    if(valuee.children.length > 0) {
      setIsOpenFail(true)  
    
      setTimeout(() => {
        setIsOpenFail(false)
      }, 3000) 
    
    } else {

      setStateModalSucces(true)
      const request = await postFormAll("ExcluirPlanoDeContas", valuee);
      if (request.status == 200) {
        setTimeout(() => {
            setStateModalSucces(false);
            document.location.reload(); //refatorar usando refresh component
        }, 2000);
    } 



    }
    
  }

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isActive}   
      >
     <ModalBody>
                    <Container>
                        <div className="div_text">
                            <div className="div_btn">
                            <CloseButton onClick={toggleModal}>{"X"}</CloseButton>
                            </div>
                            <MensageDefault>{children}</MensageDefault>
                        </div>
                        <div className="row container_buttons">
                            <div className="col-12" style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center"
                            }}>
                                <ButtonConfirm onCLick={submitButtonConfirm} />
                                <ButtonCancel onClickCancel={toggleModal} />
                            </div>
                        </div>
                    </Container>
                </ModalBody>


      </Modal>
      <FailModal text={msg} show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      
      <SuccessModal show={stateModalSucces} textCustom="Dado Deletado com Sucesso" />
    </>
  );
};
