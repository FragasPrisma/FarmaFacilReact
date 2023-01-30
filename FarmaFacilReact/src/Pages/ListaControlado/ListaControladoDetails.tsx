import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function ListaControladoDetails() {

    const [idLista, setId] = useState(0)
    const [codigo, setCodigo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0);
    const [receitaObrigatorio, setReceitaObrigatorio] = useState(false);

    const { id } = useParams();
    let idParams = !id ? "" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaListaControladoPorId", idParams);

            setId(response.data.id);
            setCodigo(response.data.codigo);
            setDescricao(response.data.descricao)
            setTipo(response.data.tipo)
            setReceitaObrigatorio(response.data.receitaObrigatorio)
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES LISTA CONTROLADO" IncludeButton={false} ReturnButton={true} to="listacontrolado" />
            <div className="form-group">
                {idLista > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Lista Controlado"
                                    type="text"
                                    value={codigo}
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
                                    value={descricao}
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
                                    value={tipo}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <CheckboxCustom
                                    options={["Número da receita obrigatório"]}
                                    check={receitaObrigatorio}
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
