import { X } from "phosphor-react";
import { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { postFormAll } from "../../../Services/Api";
import { ButtonCancel } from "../../Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Buttons/ButtonConfirm";
import { FailModal } from "../FailModal";
import { SuccessModal } from "../SuccessModal";
import { CloseButton, MensageDefault, Container } from "./styles";

interface IProps {
    textInformationModal: string;
    url: string;
    object: any;
    openModal: boolean;
    onClose: () => void;
}

export function ModalGeneric({ textInformationModal, url, object, openModal , onClose }: IProps) {

    const [stateModalSucces, setStateModalSucces] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false)

    const closeModal = () => {
        onClose();
    };

    async function submitButtonConfirm() {
        const request = await postFormAll(url, object);
        if (request.status == 200) {
            closeModal();
            setStateModalSucces(true);
            setTimeout(() => {
                setStateModalSucces(false);
                document.location.reload(); //refatorar usando refresh component
            }, 2000);
        }else{
            setIsOpenFail(true)
        }
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openModal}
            >
                <ModalBody>
                    <Container>
                        <div className="div_text">
                            <div className="div_btn">
                                <CloseButton onClick={closeModal}><X size={32} color="#d34545" weight="duotone"/></CloseButton>
                            </div>
                            <MensageDefault>
                                {textInformationModal}
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
            <SuccessModal show={stateModalSucces} textCustom="Cancelamento efetuado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text="Ocorreu algum erro interno ao cancelar o pagamento. Tente novamente mais tarde." />
        </>
    );
}