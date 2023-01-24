import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";
import { deleteDetail, GetId } from "../../../Services/Api";
import { ButtonCancel } from "../../Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Buttons/ButtonConfirm";
import { SuccessModal } from "../SuccessModal";
import { CloseButton, MensageDefault, Container } from "./styles";

interface IProps {
  show: boolean;
  onClose: () => void;
  textInformationModal?: string;
  textButton?: string;
  idItem: string;
  urlText: string;
}

export function DeleteModal({
  onClose,
  show,
  textInformationModal,
  textButton,
  idItem,
  urlText
}: IProps) {
  const navigate = useNavigate();

  const [stateModalSucces, setStateModalSucces] = useState(false);

  const closeModal = () => {
    onClose();
  };

  async function submitButtonConfirm() {
    const requestGetItemById = await GetId(`Retorna${urlText}PorId`, idItem);
    const payload = requestGetItemById.data;
    const resp = await deleteDetail(`Excluir${urlText}`, payload);

    if (resp.status == 200) {
      closeModal();

      setStateModalSucces(true);
      setTimeout(() => {
        setStateModalSucces(false);
        document.location.reload(); //refatorar usando refresh component
      }, 2000);
    }
  }

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <ModalBody>
          <Container>
            <div className="div_text">
              <div className="div_btn">
                <CloseButton onClick={closeModal}>{"X"}</CloseButton>
              </div>
              <MensageDefault>
                {textInformationModal == null
                  ? "Default"
                  : textInformationModal}
              </MensageDefault>
            </div>
            <div className="row container_buttons">
              <div className="col-12">
                <ButtonConfirm onCLick={submitButtonConfirm} />
                <ButtonCancel onClickCancel={closeModal} />
              </div>
            </div>
          </Container>
        </ModalBody>
      </Modal>
      <SuccessModal show={stateModalSucces} textCustom="Dado Deletado" />
      
    </>
  );
}