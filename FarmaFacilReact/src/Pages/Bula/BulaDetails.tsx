import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export function BulaDetails() {

    const [descricao, setDescricao] = useState("");
    const [limitacaoVisual, setLimitacaoVisual] = useState(false);
    const [tipo, setTipo] = useState(0);
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaBulaPorId", idParams);
            setDescricao(response.data.descricao);
            setLimitacaoVisual(response.data.limitacaoVisual)
            setTipo(response.data.tipo)
        }

        Init();
    }, []);

    return (
        <>
            <HeaderMainContent title="DETALHES BULA" IncludeButton={false} ReturnButton={true} to="bula" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <RadioCustom
                                name="tipo"
                                options={["Alopática", "Homeopática"]}
                                value={tipo}
                                readonly={true}
                                titleComponet="Tipo de Bula"
                                onClickOptions={(select) => setTipo(select)}
                            />
                        </div>

                        <div className="col-2 mt-4">
                            <CheckboxCustom
                                options={["Limitação visual"]}
                                check={limitacaoVisual}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-auto">
                            <CustomTextArea
                                value={descricao}
                                label="Texto Bula"
                                cols={105}
                                rows={20}
                                readonly={true}
                                required={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
