import { ChangeEvent, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { Container } from "./styles";

export function UltimasVendas() {
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
            <HeaderMainContent title="Últimas Vendas" IncludeButton={false} ReturnButton={true} to="compras/cotacaoCompras/negociacaoCompras/1" />
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
            </Container>
        </>
    )
}