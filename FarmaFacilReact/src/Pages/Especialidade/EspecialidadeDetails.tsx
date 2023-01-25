import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function EspecialidadeDetails() {
    const [descricao, setDescricao] = useState("");
    const [especialidadeId, setEspecialidadeId] = useState(0);
    const { id } = useParams();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEspecialidadePorId", id.toString());
            if (response.status == 200) {
                setEspecialidadeId(response.data.id);
                setDescricao(response.data.descricao);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES ESPECIALIDADE" IncludeButton={false} ReturnButton={true} to="especialidade"/>
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={descricao}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}