import { useState, useEffect } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { SucessMensage, MensageDefault } from "./styles";

interface Props{
    show: boolean;
}

export function SuccessModal(props: Props) {

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
        >
            <ModalBody>
                <div>
                    <MensageDefault>Dado inserido com</MensageDefault>
                    <SucessMensage>Sucesso!</SucessMensage>
                </div>
            </ModalBody>
        </Modal>
    );
}