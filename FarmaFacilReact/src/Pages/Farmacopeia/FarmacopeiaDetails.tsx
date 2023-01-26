import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function FarmacopeiaDetails() {

    const [idFarmacopeia, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [observacao, setObservacao] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFarmacopeiaPorId", idParams);
            setId(response.data.id);
            setNome(response.data.nome);
            setObservacao(response.data.observacao)
        }

        Init()
    }, [])

    const data = {
        id: idFarmacopeia,
        nome: nome,
        observacao: observacao
    };

    return (
        <>
            <HeaderMainContent title="DETALHES DA FARMACOPÉIA" IncludeButton={false} ReturnButton={true} to={"farmacopeia"} />
            <div className="form-group">
                {data.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    placeholder=""
                                    value={nome}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    value={observacao}
                                    readonly={true}
                                    required={false}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
