import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IContabilista } from "../../Interfaces/Contabilista/IContabilista";

export function ContabilistaDetails() {

    const [contabilistaModel, setContabilistaModel] = useState({} as IContabilista);

    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");

    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaContabilistaPorId", idParams);
            if (response.status == 200) {
                setContabilistaModel(response.data);

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
            <HeaderMainContent title="DETALHES CONTABILISTA" IncludeButton={false} ReturnButton={true} to="contabilista" />
            <div className="form-group">
                {contabilistaModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-9">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={contabilistaModel.nome}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="CNPJ"
                                    type="text"
                                    value={contabilistaModel.cnpj}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CPF"
                                    type="text"
                                    value={contabilistaModel.cpf}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CRC"
                                    type="text"
                                    value={contabilistaModel.crc}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="CEP"
                                    type="text"
                                    value={contabilistaModel.cep}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-6">
                                <CustomInput
                                    label="Endereço"
                                    type="text"
                                    value={contabilistaModel.endereco}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Número"
                                    type="text"
                                    value={contabilistaModel.numero}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-6">
                                <CustomInput
                                    label="Complemento"
                                    type="text"
                                    readonly={true}
                                    value={contabilistaModel.complemento}
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
                            <div className="col-9">
                                <CustomInput
                                    label="E-mail"
                                    type="email"
                                    value={contabilistaModel.email}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Fax"
                                    type="text"
                                    value={contabilistaModel.fax}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Telefone"
                                    type="text"
                                    value={contabilistaModel.telefone}
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
