import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function TransportadorDetails() {

    const [idTransportador, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [ie, setIe] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [ddd, setDdd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [codigoAntt, setCodigoAntt] = useState("");
    const [placa, setPlaca] = useState("");
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
                setId(response.data.id);
                setNome(response.data.nome);
                setCpfCnpj(response.data.cpfCnpj)
                setIe(response.data.ie)
                setCep(response.data.cep)
                setEndereco(response.data.endereco)
                setNumero(response.data.numero)
                setDdd(response.data.ddd)
                setTelefone(response.data.telefone)
                setCodigoAntt(response.data.codigoAntt)
                setPlaca(response.data.placa)

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
                {idTransportador > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={nome}
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
                                    value={cpfCnpj}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Inscrição Estadual"
                                    type="text"
                                    value={ie}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="CEP"
                                    type="text"
                                    value={cep}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Endereço"
                                    type="text"
                                    value={endereco}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Número"
                                    type="text"
                                    value={numero}
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
                                    value={ddd}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Telefone"
                                    type="text"
                                    value={telefone}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Código ANTT"
                                    type="text"
                                    value={codigoAntt}
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
                                    value={placa}
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
