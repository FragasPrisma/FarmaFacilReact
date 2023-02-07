import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IMotivo } from "../../Interfaces/Motivo/IMotivo";

export function MotivoDetails() {

    const [motivoModel, setMotivoModel] = useState({} as IMotivo);
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMotivoPorId", idParams);
            setMotivoModel(response.data.descricao);
        }

        Init();
    }, []);

    return (
        <>
            <HeaderMainContent title="DETALHES MOTIVO" IncludeButton={false} ReturnButton={true} to="motivo" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
                                value={motivoModel.descricao}
                                readonly={true}
                                required={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
