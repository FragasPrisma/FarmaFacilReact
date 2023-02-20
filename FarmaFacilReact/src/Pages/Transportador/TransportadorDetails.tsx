import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { ITransportador } from "../../Interfaces/Transportador/ITransportador";

export function TransportadorDetails() {

    const [transportadorModel, setTransportadorModel] = useState({} as ITransportador);
    
    const [nomeBairro, setNomeBairro] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeEstadoPlaca, setNomeEstadoPlaca] = useState("");

    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTransportadorPorId", idParams);
            if (response.status == 200) {
                setTransportadorModel(response.data);

                if (response.data.bairro) {
                    setNomeBairro(response.data.bairro.nome)
                }
                if (response.data.cidade) {
                    setNomeCidade(response.data.cidade.nome)
                }
                if (response.data.estado) {
                    setNomeEstado(response.data.estado.sigla)
                }
                if (response.data.estadoPlaca) {
                    setNomeEstadoPlaca(response.data.estadoPlaca.sigla)
                }
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES TRANSPORTADOR" IncludeButton={false} ReturnButton={true} to="transportador" />
            <div className="form-group">
                {transportadorModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={transportadorModel.nome}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="CPF/CNPJ"
                                    type="text"
                                    value={transportadorModel.cpfCnpj}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Inscrição Estadual"
                                    type="text"
                                    value={transportadorModel.ie}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="CEP"
                                    type="text"
                                    value={transportadorModel.cep}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Endereço"
                                    type="text"
                                    value={transportadorModel.endereco}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Número"
                                    type="text"
                                    value={transportadorModel.numero}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Estado"
                                    type="text"
                                    value={nomeEstado}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Cidade"
                                    type="text"
                                    value={nomeCidade}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Bairro"
                                    type="text"
                                    value={nomeBairro}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="DDD"
                                    type="text"
                                    value={transportadorModel.ddd}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Telefone"
                                    type="text"
                                    value={transportadorModel.telefone}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Código ANTT"
                                    type="text"
                                    value={transportadorModel.codigoAntt}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Estado Placa"
                                    type="text"
                                    value={nomeEstadoPlaca}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Placa do Veículo"
                                    type="text"
                                    value={transportadorModel.placa}
                                    readonly={true}
                                />
                            </div>
                        </div>

                    </Container>
                }
            </div>
        </>
    );
}
