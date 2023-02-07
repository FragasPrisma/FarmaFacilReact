import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { ICidade } from "../../Interfaces/Cidade/ICidade";

export function CidadeDetails() {

    const { id } = useParams();
    const [cidadeModel,setCidadeModel] = useState({} as ICidade);
    const [dataCfps,setDataCfps] = useState();
    
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        const loadCidade = async () => {
            const response = await GetId("RetornaCidadePorId", idParams);
            setCidadeModel(response.data)
            
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
                {cidadeModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    value={cidadeModel.nome}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Código IBGE"
                                    type="text"
                                    readonly={true}
                                    value={cidadeModel.codigoIbge}
                                    required={false}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Código SIAFI"
                                    type="text"
                                    value={cidadeModel.codigoSiafi}
                                    required={false}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
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
