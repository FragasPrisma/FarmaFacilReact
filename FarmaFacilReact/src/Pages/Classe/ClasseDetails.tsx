import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IClasse } from "../../Interfaces/Classe/IClasse";

export function ClasseDetails() {
    const [classeModel, setClasseModel] = useState({} as IClasse);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaClassePorId", idParams);
            if (response.status == 200) {
                setClasseModel(response.data);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="Visualizar Classe" IncludeButton={false} ReturnButton={true} to={"classe"}/>
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={classeModel.descricao}
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