import { Modal, ModalBody } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SucessMensage, MensageDefault } from "./styles";

interface IProps {
  show: boolean;
  textCustom?: string;
}

export function SuccessModal({ show, textCustom}: IProps) {
  const { t } = useTranslation();
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
              <MensageDefault>{t('successModal.registro')}</MensageDefault>
            </>
          ) : (
            <>
              <MensageDefault>{textCustom}</MensageDefault>
            </>
          )}

          <SucessMensage>{t('successModal.message')}</SucessMensage>
        </div>
      </ModalBody>
    </Modal>
  );
}
