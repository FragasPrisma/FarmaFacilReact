import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function DcbDetails() {
    const [codigoDcb, setCodigoDcb] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dcbId, setDcbId] = useState(0);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaDcbPorId", idParams);
            if (response.status == 200) {
                setDcbId(response.data.id);
                setCodigoDcb(response.data.codigoDcb);
                setDescricao(response.data.descricao);
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES DCB" IncludeButton={false} ReturnButton={true} to={"dcb"} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Dcb"
                                type="text"
                                value={codigoDcb}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={descricao}
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