import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { CloseButton, MensageDefault, Container } from "./styles";

interface Props {
  show: boolean;
  onClose: () => void;
  text?: string;
  textButton?: string;
}

export function FailModal(props: Props) {
  function closeModal() {
    props.onClose();
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
    >
      <ModalBody>
        <Container>
          <div className="div_btn">
            <CloseButton onClick={closeModal}>
              {props.textButton == null ? "X" : props.textButton}
            </CloseButton>
          </div>
          <div className="div_text">
            <MensageDefault>
              {props.text == null ? "Dado não foi inserido!" : props.text}
            </MensageDefault>
          </div>
        </Container>
      </ModalBody>
    </Modal>
  );
}
