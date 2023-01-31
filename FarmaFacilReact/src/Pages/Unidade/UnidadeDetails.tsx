import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { GetId } from "../../Services/Api";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";

interface IUnidadeConversao {
    id: 0,
    sigla: "",
    descricao: "",
    fator: Number,
    unidadeId: 0
}

export function UnidadeDetails() {

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaUnidadePorId", idParams);
            if (response.status == 200) {
                
                setId(response.data.id);
                setSigla(response.data.sigla);
                setDescricao(response.data.descricao);
                setTipo(response.data.tipo);
                setFator(response.data.fator);
                if (response.data.unidadesConversao) {
                    setUnidadesConversaoModel([...response.data.unidadesConversao])
                }
            }
        }

        Init()
    }, [])

    const [idUnidade, setId] = useState(0);
    const [sigla, setSigla] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0);
    const [fator, setFator] = useState(Number);

    const [unidadesConversaoModel, setUnidadesConversaoModel] = useState([] as IUnidadeConversao[]);

    return (
        <>
            <HeaderMainContent
                title="DETALHES UNIDADE"
                IncludeButton={false}
                ReturnButton={true}
                to="unidade"
            />
            <div className="form-group">
                {idUnidade > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Sigla"
                                    type="text"
                                    value={sigla}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    value={descricao}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <RadioCustom
                                    titleComponet="Tipo"
                                    options={[
                                        "Massa",
                                        "Volume"
                                    ]}
                                    name="tipo"
                                    readonly={true}
                                    value={tipo}
                                />
                            </div>
                            <div className="col-3 mt-4">
                                <CustomInput
                                    label="Fator Lactobacilos"
                                    type="number"
                                    value={fator}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        {unidadesConversaoModel.length > 0 && fator <= 0 &&
                            
                            unidadesConversaoModel.map((item) => (

                                <div key={item.id} className="row">
                                    <p className="paragrafo">Unidades de Conversão</p>        
                                    <div className="col-1">
                                        <CustomInput
                                            label="Sigla"
                                            type="text"
                                            value={item.sigla}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <CustomInput
                                            label="Descrição"
                                            type="text"
                                            value={item.descricao}
                                            readonly={true}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <CustomInput
                                            label="Fator de Conversão"
                                            type="number"
                                            value={item.fator}
                                            readonly={true}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </Container>
                }
            </div >
        </>
    );
}
