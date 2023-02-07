import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import { GetId } from "../../Services/Api";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom/index";
import { IUnidadeConversao } from "../../Interfaces/Unidade/IUnidadeConversao";
import { IUnidade } from "../../Interfaces/Unidade/IUnidade";

export function UnidadeDetails() {

    const { id } = useParams();
    
    const [unidadeModel, setUnidadeModel] = useState({} as IUnidade);
    const [unidadesConversaoModel, setUnidadesConversaoModel] = useState([] as IUnidadeConversao[]);
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaUnidadePorId", idParams);
            if (response.status == 200) {

                setUnidadeModel(response.data);
                if (response.data.unidadesConversao) {
                    setUnidadesConversaoModel([...response.data.unidadesConversao])
                }
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent
                title="DETALHES UNIDADE"
                IncludeButton={false}
                ReturnButton={true}
                to="unidade"
            />
            <div className="form-group">
                {unidadeModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Sigla"
                                    type="text"
                                    value={unidadeModel.sigla}
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
                                    value={unidadeModel.descricao}
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
                                    value={unidadeModel.tipo}
                                />
                            </div>
                            <div className="col-3 mt-4">
                                <CustomInput
                                    label="Fator Lactobacilos"
                                    type="number"
                                    value={unidadeModel.fator}
                                    readonly={true}
                                />
                            </div>
                        </div>

                        {unidadesConversaoModel.length > 0 && unidadeModel.fator <= 0 &&

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
