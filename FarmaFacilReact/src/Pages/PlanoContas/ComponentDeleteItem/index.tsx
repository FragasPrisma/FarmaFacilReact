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
import { deleteDetail, GetId } from "../../../Services/Api";
import { CloseButton, MensageDefault, Container } from "./styles";

export const Modall = ({ children, isActive, toggleModal }:any) => {
  const [isOpenFail, setIsOpenFail] = useState(false);
  
  const state = useSelector((state) => state)
  let valuee:any = state
  let msg = "Esta conta possui sub-contas ligadas a ela e por isso não pode ser excluída. Se deseja realmente apagar esta conta apague antes todas as suas sub-contas!"

  const submitButtonConfirm = () => {
    if(valuee.children.length > 0) {
      setIsOpenFail(true)  
      //return;
    }
    setTimeout(() => {
      setIsOpenFail(false)
    }, 2500) 
    
  }

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isActive}
        
      >
        <ModalBody style={{border:'2px solid #cf0209', borderRadius: '6px'}}>
          <Container>
            <div className="div_text">
              <div className="div_btn">
                <CloseButton onClick={toggleModal}><X size={32} color="#d34545" weight="bold" /></CloseButton>
              </div>
              <MensageDefault>{children}</MensageDefault>
            </div>
            <div className="row container_buttons">
               <div className="col-12"> 
                <ButtonConfirm onCLick={submitButtonConfirm} />
                <ButtonCancel onClickCancel={toggleModal} />
              </div>
            </div>
          </Container>
        </ModalBody>
      </Modal>
      <FailModal text={msg} show={isOpenFail} onClose={() => setIsOpenFail(false)} />
      {/* <SuccessModal show={stateModalSucces} textCustom="Dado Deletado" /> */}
    </>
  );
};
