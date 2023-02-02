import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { ITabelaFloral } from "./ITabelaFloral";

export function TabelaFloralDetails() {

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTabelaFloralPorId", idParams);
            if (response.status == 200) {
                setId(response.data.id);
                setVolume(response.data.volume);
                if (response.data.tabelasFlorais) {
                    setTabelaFlorais([...response.data.tabelasFlorais])
                }
            }
        }

        Init()
    }, [])

    const [idTabelaFloral, setId] = useState(0)
    const [volume, setVolume] = useState(0);
    const [tabelasFlorais, setTabelaFlorais] = useState([] as ITabelaFloral[])

    return (
        <>
            <HeaderMainContent title="DETALHES TABELA FLORAL" IncludeButton={false} ReturnButton={true} to="tabelafloral" />
            <div className="form-group">
                {idTabelaFloral > 0 &&
                    <Container>
                        <div className="row mb-4">
                            <div className="col-2">
                                <CustomInput
                                    label="Volume"
                                    type="number"
                                    value={volume}
                                    readonly={true}
                                    required={true}
                                />
                            </div>
                        </div>

                        <FieldsetCustom legend="Intervalo de Gotas" numberCols={6}>
                            {tabelasFlorais.map((item, index) => (
                                <div key={item.id} className="row">

                                    <div className="row">
                                        <div className="col-4">
                                            <CustomInput
                                                label="Quantidade Inicial"
                                                type="number"
                                                value={item.quantidadeInicial}
                                                readonly={true}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <CustomInput
                                                label="Quantidade Final"
                                                type="number"
                                                value={item.quantidadeFinal}
                                                readonly={true}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <CustomInput
                                                label="Valor de Venda"
                                                type="number"
                                                value={item.valorVenda}
                                                readonly={true}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))

                            }

                        </FieldsetCustom>
                    </Container>

                }
            </div>
        </>
    );
}
