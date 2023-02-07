import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IFarmacopeia } from "../../Interfaces/Farmacopeia/IFarmacopeia";

export function FarmacopeiaDetails() {

    const [farmacopeiaModel, setFarmacopeiaModel] = useState({} as IFarmacopeia);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFarmacopeiaPorId", idParams);
            setFarmacopeiaModel(response.data);
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES DA FARMACOPÉIA" IncludeButton={false} ReturnButton={true} to={"farmacopeia"} />
            <div className="form-group">
                {farmacopeiaModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    placeholder=""
                                    value={farmacopeiaModel.nome}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    value={farmacopeiaModel.observacao}
                                    readonly={true}
                                    required={false}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
