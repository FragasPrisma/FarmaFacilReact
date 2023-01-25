import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function EnsaioDetails() {

    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [idEnsaio, setId] = useState(0);
    const [nomeFarmacopeia, setNomeFarmacopeia] = useState("");

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEnsaioPorId", id?.toString());
            setId(response.data.id);
            setNome(response.data.nome);
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
                {idEnsaio > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    placeholder=""
                                    value={nome}
                                    maxLength={50}
                                    required={false}
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
                                    maxLength={50}
                                    required={false}
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
