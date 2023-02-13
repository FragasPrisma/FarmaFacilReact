import { Modal, ModalBody } from "react-bootstrap";
import { SucessMensage, MensageDefault } from "./styles";

interface IProps {
  show: boolean;
  textCustom?: string;
}

export function SuccessModal({ show, textCustom}: IProps) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <ModalBody>
        <div>
          {!textCustom ? (
            <>
              <MensageDefault>Registro incluído com </MensageDefault>
            </>
          ) : (
            <>
              <MensageDefault>{textCustom}</MensageDefault>
            </>
          )}

          <SucessMensage>Sucesso!</SucessMensage>
        </div>
      </ModalBody>
    </Modal>
  );
}
