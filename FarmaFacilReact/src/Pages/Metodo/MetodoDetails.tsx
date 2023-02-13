import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { IMetodo } from "../../Interfaces/Metodo/IMetodo";

export function MetodoDetails() {

    const [metodoModel, setMetodoModel] = useState({} as IMetodo);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMetodoPorId", idParams);
            setMetodoModel(response.data);
        }

        Init();
    }, []);

    return (
        <>
            <HeaderMainContent title="Visualizar Método" IncludeButton={false} ReturnButton={true} to="metodo" />
            <div className="form-group">
                {metodoModel.id > 0 &&
                    < Container >
                        <div className="row">
                            <div className="col-5 mb-3">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    readonly={true}
                                    value={metodoModel.descricao}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 mb-3">
                                <CustomInput
                                    label="Qtd de Gotas"
                                    type="number"
                                    readonly={true}
                                    value={metodoModel.quantidadeGotas}
                                />
                            </div>
                            <div className="col-1 mt-4">
                                <span className="span-porcentagem">Ou %</span>
                            </div>
                            <div className="col-2 mb-3">
                                <CustomInput
                                    label="Percentual"
                                    type="number"
                                    value={metodoModel.percentual}
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
