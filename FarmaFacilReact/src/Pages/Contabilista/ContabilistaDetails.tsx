import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function ContabilistaDetails() {

    const [idContabilista, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [crc, setCrc] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [telefone, setTelefone] = useState("");
    const [fax, setFax] = useState("");
    const [email, setEmail] = useState("");
    const [complemento, setComplemento] = useState("");

    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");

    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaContabilistaPorId", idParams);
            if (response.status == 200) {
                setId(response.data.id);
                setNome(response.data.nome);
                setCnpj(response.data.cnpj);
                setCpf(response.data.cpf);
                setCrc(response.data.crc);
                setFax(response.data.fax);
                setEmail(response.data.email);
                setCep(response.data.cep)
                setEndereco(response.data.endereco)
                setNumero(response.data.numero)
                setTelefone(response.data.telefone)
                setComplemento(response.data.complemento)

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
                {idContabilista > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-9">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={nome}
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
                                    value={cnpj}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CPF"
                                    type="text"
                                    value={cpf}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CRC"
                                    type="text"
                                    value={crc}
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
                                    value={cep}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-6">
                                <CustomInput
                                    label="Endereço"
                                    type="text"
                                    value={endereco}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Número"
                                    type="text"
                                    value={numero}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-6">
                                <CustomInput
                                    label="Complemento"
                                    type="text"
                                    readonly={true}
                                    value={complemento}
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
                                    value={email}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Fax"
                                    type="text"
                                    value={fax}
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

                    </Container>

                }
            </div>
        </>
    );
}
