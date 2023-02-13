import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { ILaboratorio } from "../../Interfaces/Laboratorio/ILaboratorio";

export function LaboratorioDetails() {

    const [laboratorioModel, setLaboratorioModel] = useState({} as ILaboratorio);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaLaboratorioPorId", idParams);
            if (response.status == 200) {
                setLaboratorioModel(response.data);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="Visualizar Laboratório" IncludeButton={false} ReturnButton={true} to={"laboratorio"} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={laboratorioModel.descricao}
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