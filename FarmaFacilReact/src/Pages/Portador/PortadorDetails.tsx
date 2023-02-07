import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { IPortador } from "../../Interfaces/Portador/IPortador";

export function PortadorDetails() {

    const [portadorModel, setPortadorModel] = useState({} as IPortador);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaPortadorPorId", idParams);
            setPortadorModel(response.data);
        }

        Init();
    }, []);

    return (
        <>
            <HeaderMainContent title="DETALHES PORTADOR" IncludeButton={false} ReturnButton={true} to="portador" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Nome"
                                type="text"
                                readonly={true}
                                value={portadorModel.nome}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 mb-3">
                            <CheckboxCustom
                                options={["Portador Inativo"]}
                                check={portadorModel.portadorInativo}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
