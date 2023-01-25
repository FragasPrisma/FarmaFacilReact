import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function EspecificacaoDetails() {

    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState(Number);

    const { id } = useParams();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEspecificacaoCapsulaPorId", id?.toString());
            setDescricao(response.data.descricao);
            setPrioridade(response.data.prioridade)
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES ESPECIFICAÇÃO CÁPSULA" IncludeButton={false} ReturnButton={true} to={"especificacaocapsula"} />
            <div className="form-group">
                {descricao &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    placeholder=""
                                    value={descricao}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Prioridade"
                                    type="number"
                                    value={prioridade}
                                    required={false}
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
