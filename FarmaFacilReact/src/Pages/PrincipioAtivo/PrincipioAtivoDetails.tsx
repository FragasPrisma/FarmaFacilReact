import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IPrincipioAtivo } from "../../Interfaces/PrincipioAtivo/IPrincipioAtivo";

export function PrincipioAtivoDetails() {

    const [principioAtivoModel, setPrincipioAtivoModel] = useState({} as IPrincipioAtivo);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaPrincipioAtivoPorId", idParams);
            if (response.status == 200) {
                setPrincipioAtivoModel(response.data);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES PRINCIPIO ATIVO" IncludeButton={false} ReturnButton={true} to={"principioAtivo"} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={principioAtivoModel.descricao}
                                maxLength={50}
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