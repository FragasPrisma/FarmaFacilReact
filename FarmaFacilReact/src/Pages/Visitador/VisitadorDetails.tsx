import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IVisitador } from "../../Interfaces/Visitador/IVisitador";

export function VisitadorDetails() {
    
    const [visitadorModel, setVisitadorModel] = useState({} as IVisitador);
    const [nomeBairro, setNomeBairro] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeEstado, setNomeEstado] = useState("");
    
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaVisitadorPorId", idParams);
            if (response.status == 200) {
                setVisitadorModel(response.data);
                
                if (response.data.bairro) {
                    setNomeBairro(response.data.bairro.nome)
                }
                if (response.data.cidade) {
                    setNomeCidade(response.data.cidade.nome)
                }
                if (response.data.estado) {
                    setNomeEstado(response.data.estado.sigla)
                }
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES VISITADOR" IncludeButton={false} ReturnButton={true} to="visitador"/>
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Nome"
                                type="text"
                                value={visitadorModel.nome}
                                readonly={true}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Cep"
                                type="text"
                                value={visitadorModel.cep}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Número"
                                type="text"
                                value={visitadorModel.numero}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Endereço"
                                type="text"
                                value={visitadorModel.endereco}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Complemento"
                                type="text"
                                value={visitadorModel.complemento}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Bairro"
                                type="text"
                                value={nomeBairro}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Cidade"
                                type="text"
                                value={nomeCidade}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Estado"
                                type="text"
                                value={nomeEstado}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Ddd"
                                type="text"
                                value={visitadorModel.ddd}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Telefone"
                                type="text"
                                value={visitadorModel.telefone}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Celular"
                                type="text"
                                value={visitadorModel.celular}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Comissão %"
                                type="number"
                                value={visitadorModel.comissao}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}