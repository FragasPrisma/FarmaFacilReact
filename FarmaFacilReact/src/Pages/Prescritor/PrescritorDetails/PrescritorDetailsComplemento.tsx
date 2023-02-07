import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { useState, ChangeEvent, useEffect } from 'react'
import { getAll } from "../../../Services/Api";
import { CheckboxCustom } from "../../../Components/Inputs/CheckboxCustom";
import { IPrescritorComplemento } from "../../../Interfaces/Prescritor/IPrescritorComplemento";

interface Data {
    PrescritorComplemento: IPrescritorComplemento;
    NomeVisitador: string
}

export function PrescritorDetailsComplemento({ PrescritorComplemento, NomeVisitador }: Data) {

    return (
        <Container>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="E-mail"
                        type="text"
                        value={PrescritorComplemento.email}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Secretária"
                        type="text"
                        value={PrescritorComplemento.secretaria}
                        readonly={true}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Nome rótulo"
                        type="text"
                        value={PrescritorComplemento.nomeRotulo}
                        readonly={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        value={PrescritorComplemento.cepRes}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        value={PrescritorComplemento.numeroRes}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        value={PrescritorComplemento.enderecoRes}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Aniversário (dia/mês)"
                        type="text"
                        value={PrescritorComplemento.aniversario}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        value={PrescritorComplemento.dddRes}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Telefone"
                        type="text"
                        value={PrescritorComplemento.telefoneRes}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Proximidade"
                        type="text"
                        value={PrescritorComplemento.proximidade}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Visitador"
                        type="text"
                        value={NomeVisitador}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Observação de Venda"
                        type="text"
                        value={PrescritorComplemento.observacaoVenda}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7">
                    <CustomInput
                        label="Registro MAPA"
                        type="text"
                        value={PrescritorComplemento.registroMapa}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-3">
                    <CheckboxCustom
                        options={["CEDH"]}
                        check={PrescritorComplemento.cedh}
                        readOnly={true}
                    />
                </div>
            </div>

        </Container>
    )
}