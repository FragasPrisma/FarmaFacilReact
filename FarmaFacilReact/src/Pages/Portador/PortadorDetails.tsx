import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function PortadorDetails() {

    const [nome, setNome] = useState("");
    const [portadorInativo, setPortadorInativo] = useState(false);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaPortadorPorId", idParams);
            setNome(response.data.nome);
            setPortadorInativo(response.data.portadorInativo)
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
                                value={nome}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 mb-3">
                            <CheckboxCustom
                                options={["Portador Inativo"]}
                                check={portadorInativo}
                                readOnly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
