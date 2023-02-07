import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IfuncionarioLaboratorio } from "../../Interfaces/FuncionarioLaboratorio/IFuncionarioLaboratorio";

export function FuncionarioLaboratorioDetails() {

    const [funcionarioModel, setfuncionarioModel] = useState({} as IfuncionarioLaboratorio);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFuncionarioLaboratorioPorId", idParams);
            if (response.status == 200) {
                setfuncionarioModel(response.data);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES FUNCIONÁRIO LABORATÓRIO" IncludeButton={false} ReturnButton={true} to="funcionarioLaboratorio" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Nome"
                                type="text"
                                value={funcionarioModel.nome}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <CheckboxCustom
                                options={["Ativo"]}
                                check={funcionarioModel.ativo}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}