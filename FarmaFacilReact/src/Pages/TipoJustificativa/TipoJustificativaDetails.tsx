import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function TipoJustificativaDetails() {
    const [descricao, setDescricao] = useState("");
    const { id } = useParams();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTipoJustificativaPorId", id.toString());
            if (response.status == 200) {
                setDescricao(response.data.descricao);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES TIPO JUSTIFICATIVA" IncludeButton={false} ReturnButton={true} to={"tipoJustificativa"} />
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
    );
}