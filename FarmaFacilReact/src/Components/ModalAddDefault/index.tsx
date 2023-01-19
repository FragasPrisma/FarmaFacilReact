import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { ModalButtonAdd, ModalButtonClose, ModalButtonConfirmed, SucessMensage } from "./styles";
import { Module } from 'module';

interface Props{
    title?: string;
    children: React.ReactNode;
}

export function ModalAddDefault({title, children}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSucess, setIsOpenSucess] = useState(false)
    const [isOpenFail, setIsOpenFail] = useState(false)

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // function adicionarDado() {
    //     console.log(onAddConfirm)
    //     const confirmed = onAddConfirm;
    //     !confirmed ? setisOpenFail(true) : addSucess();
    // }

    function addSucess() {
        closeModal();
        setIsOpenSucess(true)
        setTimeout(() => {
            setIsOpenSucess(false);
        },2000)
    }

    function closeFailModal() {
        setIsOpenFail(false);
    }

    return (
        <>
            <ModalButtonAdd onClick={openModal}>Incluir</ModalButtonAdd>
            <Modal
                show={isOpen}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        {
                            title == null || "" ? "Adicionar" : title 
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <ModalButtonClose onClick={closeModal}>Cancelar</ModalButtonClose>
                </Modal.Footer>
            </Modal>
            <Modal
                show={isOpenSucess}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div>
                        <h1>Dado inserido com</h1>
                        <SucessMensage>Sucesso!</SucessMensage>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={isOpenFail}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div>
                        <ModalButtonClose onClick={closeFailModal}>Fechar</ModalButtonClose>
                        <h1>Dado não foi inserido!</h1>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}