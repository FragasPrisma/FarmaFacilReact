import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function CidadeDetails() {

    const { id } = useParams();
    const [nome,setNome] = useState("");
    const [codigoIbge, setCodigoIbge] = useState(Number);
    const [codigoSiafi,setCodigoSiafi] = useState(Number);
    const [dataCfps,setDataCfps] = useState();

    useEffect(() => {
        const loadCidade = async () => {
            const response = await GetId("RetornaCidadePorId",id?.toString());
            setNome(response.data.nome)
            setCodigoIbge(response.data.codigoIbge)
            setCodigoSiafi(response.data.codigoSiafi)
            if(response.data.codigoCfps != null){
                setDataCfps(response.data.codigoCfps.descricao)
            }
        }

        loadCidade()
    }, []);

    return (
        <>
            <HeaderMainContent title="DETALHES DA CIDADE" IncludeButton={false} ReturnButton={true} to={"cidade"}/>
            <div className="form-group">
                {nome &&
                    <Container>
                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={nome}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Código IBGE"
                                    type="text"
                                    readonly={true}
                                    value={codigoIbge}
                                    required={false}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Código SIAFI"
                                    type="text"
                                    value={codigoSiafi}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Código CFPS"
                                    type="text"
                                    value={dataCfps}
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
