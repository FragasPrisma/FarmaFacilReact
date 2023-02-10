import { ChangeEvent, useEffect, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IFiltroContasPagas } from "../../Interfaces/RelatorioContasPagas/IFiltroContasPagas";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";

export function RelatorioContasPagas() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);

    const [classificacao, setClassificacao] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [fornecedorId, setFornecedorId] = useState(0);

    const [erroDataInicio, setErroDataInicio] = useState("");
    const [erroDataFim, setErroDataFim] = useState("");

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);

    const filtroData: IFiltroContasPagas = {
        fornecedorId: 0,
        dataInicial: "",
        dataFinal: "",
        classificacao: 0
    }

    useEffect(() => {
        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(response.data);
        }

        loadDataFornecedores()
    }, []);

    async function submit() {
        setErroDataInicio("");
        setErroDataFim("");
        setIsLoading(true);

        if (dataInicio == "") {
            setIsOpenFail(true);
            setIsLoading(false)
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDataInicio("Data Inicio vazia!");
            }, 2000)
            return;
        }

        if (dataFim == "") {
            setIsOpenFail(true);
            setIsLoading(false)
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDataFim("Data Inicio vazia!");
            }, 2000)
            return;
        }

        filtroData.classificacao = classificacao;
        filtroData.dataInicial = dataInicio;
        filtroData.dataFinal = dataFim;
        filtroData.fornecedorId = fornecedorId;

        if (filtroData.fornecedorId == 0) {
            const response = await postFormAll("RelatorioContasPagas", filtroData);
            if (response.status === 200) {
                setIsLoading(false)
                console.log(response.data)
            }
            setIsLoading(false)
        } else {
            const response = await postFormAll("RelatorioContasPagasPorFornecedor", filtroData);
            if (response.status === 200) {
                setIsLoading(false)
                console.log(response.data)
            }
            setIsLoading(false)
        }
    }
    
    return (
        <>
            <HeaderMainContent title="RELATÓRIO CONTAS PAGAS" IncludeButton={false} ReturnButton={false} />
            <Container>
                <div className="row mt-4">
                    <FieldsetCustom legend="Classificação" borderAll={true} numberCols={2}>
                        <div className="col-12 mt-2">
                            <RadioCustom
                                options={["Pagamento", "Vencimento"]}
                                value={classificacao}
                                name="Classificação"
                                onClickOptions={(value) => setClassificacao(value)} />
                        </div>
                    </FieldsetCustom>
                </div>
                <div className="row mt-2">
                    <FieldsetCustom legend="Seleção" borderAll={true} numberCols={3}>
                        <div className="row">
                            <div className="col-12 mt-2 mb-2">
                                <CustomDropDown
                                    data={fornecedores}
                                    title="Selecione o Fornecedor"
                                    filter="nomeFornecedor"
                                    label="Fornecedor"
                                    Select={(fornecedorId) => setFornecedorId(fornecedorId)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-2">
                                <CustomInput
                                    label="Data Inicio"
                                    type="date"
                                    erro={erroDataInicio}
                                    index={1}
                                    value={dataInicio}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataInicio(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-6 mb-2">
                                <CustomInput
                                    label="Data Fim"
                                    type="date"
                                    index={2}
                                    erro={erroDataFim}
                                    value={dataFim}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataFim(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                    </FieldsetCustom>
                </div>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                    </div>
                </div>
            </Container>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text="Erro ao gerar relatório confira os campos do filtro" />
        </>
    )
}