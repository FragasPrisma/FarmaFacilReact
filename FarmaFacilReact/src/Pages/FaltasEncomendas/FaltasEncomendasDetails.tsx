import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IFaltasEncomendas } from "../../Interfaces/FaltasEncomendas/IFaltasEncomendas";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export function FaltasEncomendasDetails() {

    const [nomeProduto, setNomeProduto] = useState("Selecione o produto");
    const [nomeVendedoor, setNomeVendedor] = useState("Selecione o vendedor");

    const [faltasEncomendas, setFaltasEncomendas] = useState({} as IFaltasEncomendas)
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFaltasEncomendasPorId", idParams);
            if (response.status == 200) {
                setFaltasEncomendas(response.data)

                if (response.data.produto) {
                    setNomeProduto(response.data.produto.descricao)
                }

                if (response.data.vendedor) {
                    setNomeVendedor(response.data.vendedor.nome)
                }
            }
        }
        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="Visualizar Faltas/Encomendas" IncludeButton={false} ReturnButton={true} to="faltasencomendas" />
            <div className="form-group">
                {faltasEncomendas.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Vendedor"
                                    type="text"
                                    placeholder=""
                                    value={nomeVendedoor}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 mt-2">
                                <RadioCustom
                                    name="tipo"
                                    options={["Falta", "Encomenda"]}
                                    value={faltasEncomendas.tipo}
                                    requerid={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Previsão de entrega"
                                    type="date"
                                    placeholder=""
                                    value={faltasEncomendas.previsaoDeEntrega?.slice(0,10)}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Cliente"
                                    type="text"
                                    placeholder=""
                                    value={""}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Telefone"
                                    type="text"
                                    placeholder="9999-9999"
                                    maxLength={10}
                                    value={faltasEncomendas.telefone}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-7">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    placeholder="Digite a observação"
                                    value={faltasEncomendas.observacao}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Grupo"
                                    type="text"
                                    placeholder="Grupo selecionado"
                                    value={faltasEncomendas.grupoId}
                                    readonly={true}
                                    textAlign={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Produto"
                                    type="text"
                                    placeholder=""
                                    value={nomeProduto}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Quantidade"
                                    type="number"
                                    placeholder=""
                                    value={faltasEncomendas.quantidade}
                                    readonly={true}
                                    textAlign={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
