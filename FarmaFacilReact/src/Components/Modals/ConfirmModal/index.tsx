import { X } from "phosphor-react";
import { Modal, ModalBody } from "react-bootstrap";
import { icons } from "react-icons";
import { ButtonCancel } from "../../Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Buttons/ButtonConfirm";
import { MensageDefault, Container, CloseButton } from "./styles";

interface Props {
    text: string;
    onClose: (confirmation: boolean) => void;
    openModal: boolean;
}

export function ConfirmModal(props: Props) {
    function closeModal() {
        props.onClose(false);
    }

    function confirmAction() {
        props.onClose(true);
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.openModal}
        >
            <ModalBody>
                <Container>
                    <div className="div_text">
                        <div className="div_btn">
                            <CloseButton onClick={closeModal}><X size={32} color="#d34545" weight="duotone"/></CloseButton>
                        </div>
                        <MensageDefault>
                            {props.text}
                        </MensageDefault>
                    </div>
                    <div className="row container_buttons">
                        <div className="col-12" style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "center"
                        }}>
                            <ButtonConfirm onCLick={confirmAction} />
                            <ButtonCancel onClickCancel={closeModal} />
                        </div>
                    </div>
                </Container>
            </ModalBody>
        </Modal>
    );
}