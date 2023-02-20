import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IListaControlado } from "../../Interfaces/ListaControlado/IListaControlado";

export function ListaControladoDetails() {

    const [listaModel, setListaModel] = useState({} as IListaControlado)

    const { id } = useParams();
    let idParams = !id ? "" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaListaControladoPorId", idParams);
            setListaModel(response.data);
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES LISTA CONTROLADO" IncludeButton={false} ReturnButton={true} to="listacontrolado" />
            <div className="form-group">
                {listaModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Lista Controlado"
                                    type="text"
                                    value={listaModel.codigo}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    value={listaModel.descricao}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-5">
                                <RadioCustom
                                    options={["Entorpecentes",
                                        "Psicotrópicos",
                                        "Controle Especial"]}
                                    name="tipo"
                                    titleComponet="Tipo"
                                    value={listaModel.tipo}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <CheckboxCustom
                                    options={["Número da receita obrigatório"]}
                                    check={listaModel.receitaObrigatorio}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
