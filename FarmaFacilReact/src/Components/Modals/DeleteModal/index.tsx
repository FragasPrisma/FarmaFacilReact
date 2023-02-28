import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { deleteDetail, GetId } from "../../../Services/Api";
import { ButtonCancel } from "../../Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Buttons/ButtonConfirm";
import { FailModal } from "../FailModal";
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
  const { t } = useTranslation();
  const [stateModalSucces, setStateModalSucces] = useState(false);
  const [fail, setFail] = useState(false);
  const [messageRequest, setMessageRequest] = useState<any | string>();

  const closeModal = () => {
    onClose();
  };

  async function submitButtonConfirm() {
    const requestGetItemById = await GetId(`Retorna${urlText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, '')}PorId`, idItem);
    const payload = requestGetItemById.data;

    try {

      const resp = await deleteDetail(`Excluir${urlText
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, '')}/${idItem}`);

      if (resp.status == 200) {
        closeModal();
        setMessageRequest(resp.data.value)
        setStateModalSucces(true);
        setTimeout(() => {
          setStateModalSucces(false);
          document.location.reload(); //refatorar usando refresh component
        }, 2000);
      } else {
        setMessageRequest(resp)

        closeModal();
        setFail(true)
        setTimeout(() => {
          setFail(false);
        }, 2000);
      }

    } catch (error: any) {
      setMessageRequest(error)

        closeModal();
        setFail(true)
        setTimeout(() => {
          setFail(false);
        }, 5000);
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
                  ? t('deleteModal.excluir')
                  : textInformationModal}
              </MensageDefault>
            </div>
            <div className="row container_buttons">
              <div className="col-12" style={{
                display: "flex",
                width: "100%",
                justifyContent: "center"
              }}>
                <ButtonConfirm onCLick={submitButtonConfirm} />
                <ButtonCancel onClickCancel={closeModal} />
              </div>
            </div>
          </Container>
        </ModalBody>
      </Modal>
      <SuccessModal show={stateModalSucces} textCustom={`${t('deleteModal.excluido')}`} />
      <FailModal show={fail} onClose={() => setFail(false)} text={messageRequest ? messageRequest : ""} />

    </>
  );
}