import { X } from "phosphor-react";
import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { deleteDetail, GetId } from "../../../Services/Api";
import { CloseButton, MensageDefault, Container } from "./styles";

export const Modall = ({ children, isActive, toggleModal }) => {

  const submitButtonConfirm = () => {

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
      {/* <SuccessModal show={stateModalSucces} textCustom="Dado Deletado" /> */}
    </>
  );
};
