import { ChangeEvent, useEffect, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { InverterDate } from "../../helper/InverterDate";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IPlanoDeconta } from "../../Interfaces/PlanoDeContas/IPlanoDeConta";
import { IFiltroContasAPagar } from "../../Interfaces/RelatorioContasAPagar/IFiltroContasAPagar";
import { IReport } from "../../Interfaces/Report/IReport";
import { ReportContasPagas } from "../../Reports/ReportContasPagas";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";

export function RelatorioContasAPagar() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);

    const [classificacao, setClassificacao] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [fornecedorId, setFornecedorId] = useState(0);
    const [planoDeContasId, setPlanoDeContasId] = useState(0);

    const [erroDataInicio, setErroDataInicio] = useState("");
    const [erroDataFim, setErroDataFim] = useState("");

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
    const [planoDeContas, setPlanoDeContas] = useState([] as IPlanoDeconta[]);

    const filtroData: IFiltroContasAPagar = {
        fornecedorId: 0,
        planoDeContasId: 0,
        dataInicial: "",
        dataFinal: "",
        classificacao: 0
    }

    let dadosReport = [] as string[][]

    useEffect(() => {
        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(response.data);
        }

        const loadDataPlanoDeContas = async () => {
            const response2 = await getAll("ListaPlanoDeContas");
            setPlanoDeContas(response2.data);
        }

        loadDataFornecedores()
        loadDataPlanoDeContas()
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
                setErroDataFim("Data Final vazia!");
            }, 2000)
            return;
        }

        filtroData.classificacao = classificacao;
        filtroData.dataInicial = dataInicio;
        filtroData.dataFinal = dataFim;
        filtroData.fornecedorId = fornecedorId;
        filtroData.planoDeContasId = planoDeContasId;

        if (filtroData.classificacao == 0) {
            const response = await postFormAll("RelatorioContasAPagarPorPlanoDeContas", filtroData);
            if (response.status === 200) {
                GerarPdf(response.data);
                setIsLoading(false);
            }
            setIsLoading(false);
        } else {
            const response = await postFormAll("RelatorioContasAPagarPorFornecedor", filtroData);
            if (response.status === 200) {
                GerarPdf(response.data);
                setIsLoading(false);
            }
            setIsLoading(false);
        }
    }

    function GerarPdf(data: any[]) {
        data.map((item: { duplicatasContasAPagar: any[]; fornecedor: { nomeFornecedor: string } }) => {

            item.duplicatasContasAPagar.map((x: { dataVencimento: string; numeroFatura: string; valor: number }) => {

                let nomeFornecedor = "";
                
                if (item.fornecedor) {
                    nomeFornecedor = item.fornecedor.nomeFornecedor
                }
                dadosReport.push(
                    [
                        InverterDate(x.dataVencimento),
                        x.numeroFatura,
                        nomeFornecedor.slice(0, 15),
                        x.valor.toString(),
                    ]
                )
            })
        })

        let dataReport: IReport = {
            title: classificacao == 1 ? "Duplicatas Pagas Por Vencimento" : "Duplicatas Pagas Por Pagamento",
            nomeEmpresa: "Concept Pharma",
            perido: { dataInicial: dataInicio, dataFinal: dataFim },
            cabecalho: ["Vcto","Duplicata", "Fornecedor","Valor"],
            widths: ["15%","15%","50%","20%"],
            dados: dadosReport
        }

        ReportContasPagas(dataReport)
    }

    return (
        <>
            <HeaderMainContent title="Relatório Contas a Pagar" IncludeButton={false} ReturnButton={false} />
            <Container>
                <div className="row mt-4">
                    <FieldsetCustom legend="Classificação" borderAll={true} numberCols={2}>
                        <div className="col-12 mt-2">
                            <RadioCustom
                                options={["Período", "Fornecedor"]}
                                value={classificacao}
                                name="Classificação"
                                onClickOptions={(value) => setClassificacao(value)} />
                        </div>
                    </FieldsetCustom>
                </div>
                <div className="row mt-2">
                    <FieldsetCustom legend="Seleção" borderAll={true} numberCols={4}>
                        <div className="row">
                            <div className="col-12 mt-2 mb-2">
                                {classificacao == 1 &&
                                    <CustomDropDown
                                        data={fornecedores}
                                        title="Selecione o Fornecedor"
                                        filter="nomeFornecedor"
                                        label="Fornecedor"
                                        Select={(fornecedorId) => setFornecedorId(fornecedorId)}
                                    />
                                }
                                {classificacao == 0 &&
                                    <CustomDropDown
                                        data={planoDeContas}
                                        title="Selecione o Plano de Contas"
                                        filter="descricao"
                                        label="Plano de Contas"
                                        Select={(planoDeContasId) => setPlanoDeContasId(planoDeContasId)}
                                    />
                                }
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