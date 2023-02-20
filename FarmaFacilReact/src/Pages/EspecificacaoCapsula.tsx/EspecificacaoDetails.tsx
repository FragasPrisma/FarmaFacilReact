import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IEspecialidadeCapsula } from "../../Interfaces/EspecificacaoCapsula/IEspecificacaoCapsula";

export function EspecificacaoDetails() {

    const [especificacaoModel, setEspecificacaoModel] = useState({} as IEspecialidadeCapsula);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEspecificacaoCapsulaPorId", idParams);
            setEspecificacaoModel(response.data);
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES ESPECIFICAÇÃO CÁPSULA" IncludeButton={false} ReturnButton={true} to={"especificacaocapsula"} />
            <div className="form-group">
                {especificacaoModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    placeholder=""
                                    value={especificacaoModel.descricao}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Prioridade"
                                    type="number"
                                    value={especificacaoModel.prioridade}
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
