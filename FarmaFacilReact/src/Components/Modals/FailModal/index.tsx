import { Modal, ModalBody } from "react-bootstrap";
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
              {props.text == null ? "Campo (os) obrigatório (os) não preenchido (os) corretamente." : props.text}
            </MensageDefault>
          </div>
        </Container>
      </ModalBody>
    </Modal>
  );
}
