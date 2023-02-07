import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IEnsaio } from "../../Interfaces/Ensaio/IEnsaio";

export function EnsaioDetails() {

    const { id } = useParams();
    const [ensaioModel, setEnsaioModel] = useState({} as IEnsaio);
    const [nomeFarmacopeia, setNomeFarmacopeia] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEnsaioPorId", idParams);
            setEnsaioModel(response.data);
            if (response.data.farmacopeia != null) {
                setNomeFarmacopeia(response.data.farmacopeia.nome)
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES DO ENSAIO" IncludeButton={false} ReturnButton={true} to="ensaio" />
            <div className="form-group">
                {ensaioModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    placeholder=""
                                    value={ensaioModel.nome}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Farmacopéia"
                                    type="text"
                                    placeholder=""
                                    value={nomeFarmacopeia}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                    </Container>
                }
            </div>
        </>
    );
}
