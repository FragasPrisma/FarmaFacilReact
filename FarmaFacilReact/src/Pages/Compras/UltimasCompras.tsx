import { ChangeEvent, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { Container } from "./styles";

export function UltimasCompras() {
    const [isLoading, setIsLoading] = useState(false);

    const [grupo, setGrupo] = useState();
    const [produto, setProduto] = useState("Pão de Batata");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    const [data, setData] = useState([]);

    async function submit() {

    }

    return (
        <>
            <HeaderMainContent title="Últimas Compras" IncludeButton={false} ReturnButton={true} to="compras/cotacaoCompras/negociacaoCompras/1" />
            <Container>
                <div className="row mt-3">
                    <FieldsetCustom legend="Filtros">
                        <div className="row mt-2">
                            <div className="col-8 ">
                                <h4>Grupo: {grupo}</h4>
                                <h4>Produto: {produto}</h4>
                            </div>
                            <div className="col-2 mt-1">
                                <CustomInput
                                    label="Data Inicial"
                                    type="date"
                                    value={dataInicial}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataInicial(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-2 mt-1">
                                <CustomInput
                                    label="Data Final"
                                    type="date"
                                    value={dataFinal}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataInicial(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 mt-2">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            </div>
                        </div>
                    </FieldsetCustom>
                </div>
                <div className="row mt-2">
                    {/* <FieldsetCustom legend="Últimas Compras">
                        <SearchContentScreens 
                            text="Últimas Compras"
                            data={data}
                            filter={"fornecedor"}
                            actionsButtons={true}
                            headerTable={["", "", "", "", "", "", "", "", "", "", "", "", "", ""]}
                            headerTableView={["Emissão", "Fornecedor", "Lote", "Entrada", "Validade", "Nota", "Série", "Qtde", "Un", "Vlr Unitário", "Vlr IPI", "Valor Frete", "Vlr Diversos", "Vlr Total"]} 
                            urlSearch={""}
                        />
                    </FieldsetCustom> */}
                </div>
            </Container>
        </>
    )
}