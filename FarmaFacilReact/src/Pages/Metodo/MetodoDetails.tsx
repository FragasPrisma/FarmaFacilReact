import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState ,useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";

export function MetodoDetails() {

    const [descricao, setDescricao] = useState("");
    const [quantidadeGotas, setQuantidadeGotas] = useState(Number);
    const [percentual, setPercentual] = useState(Number);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMetodoPorId", idParams);
            setDescricao(response.data.descricao);
            setQuantidadeGotas(response.data.quantidadeGotas);
            setPercentual(response.data.percentual);
        }

        Init();
    }, []);

    return (
        <>
            <HeaderMainContent title="DETALHES MÉTODO" IncludeButton={false} ReturnButton={true} to="metodo" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                readonly={true}
                                value={descricao}
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
                                value={quantidadeGotas}
                            />
                        </div>
                        <div className="col-1 mt-4">
                            <span>Ou %</span>
                        </div>
                        <div className="col-2 mb-3">
                            <CustomInput
                                label="Percentual"
                                type="number"
                                value={percentual}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
