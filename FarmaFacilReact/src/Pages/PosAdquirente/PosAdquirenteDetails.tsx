import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState , useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function PosAdquirenteDetails() {

    const [descricao, setDescricao] = useState("");
    const [chaveRequisicao,setChaveRequisicao] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaPosAdquirentePorId", idParams);
            setDescricao(response.data.descricao);
            setChaveRequisicao(response.data.chaveRequisicao)
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES PÓS ADQUIRENTE" IncludeButton={false} ReturnButton={true} to="posadquirente" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder=""
                                value={descricao}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Chave Requisição"
                                type="text"
                                placeholder=""
                                value={chaveRequisicao}
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
