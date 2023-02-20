import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IEspecialidade } from "../../Interfaces/Especialidade/IEspecialidade";

export function EspecialidadeDetails() {
    const [especialidadeModel, setEspecialidadeModel] = useState({} as IEspecialidade);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEspecialidadePorId", idParams);
            if (response.status == 200) {
                setEspecialidadeModel(response.data);
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
                                value={especialidadeModel.descricao}
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