import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IDcb } from "../../Interfaces/Dcb/IDcb";

export function DcbDetails() {

    const [dcbModel, setDcbModel] = useState({} as IDcb);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaDcbPorId", idParams);
            if (response.status == 200) {
                setDcbModel(response.data);
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
                                value={dcbModel.codigoDcb}
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
                                value={dcbModel.descricao}
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