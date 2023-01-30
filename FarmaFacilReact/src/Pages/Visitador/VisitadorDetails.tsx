import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function VisitadorDetails() {
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeEstado, setNomeEstado] = useState("");
    const [ddd, setDdd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [comissao, setComissao] = useState(0);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaVisitadorPorId", idParams);
            if (response.status == 200) {
                setNome(response.data.nome);
                setCep(response.data.cep);
                setEndereco(response.data.endereco);
                setNumero(response.data.numero);
                setComplemento(response.data.complemento);
                setDdd(response.data.ddd);
                setTelefone(response.data.telefone);
                setCelular(response.data.celular);
                setComissao(response.data.comissao);

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
                                value={nome}
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
                                value={cep}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Número"
                                type="text"
                                value={numero}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
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
                        <div className="col-6">
                            <CustomInput
                                label="Complemento"
                                type="text"
                                value={complemento}
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
                                value={ddd}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Telefone"
                                type="text"
                                value={telefone}
                                readonly={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Celular"
                                type="text"
                                value={celular}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Comissão %"
                                type="number"
                                value={comissao}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}