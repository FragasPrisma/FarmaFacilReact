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
import { IFiltroContasPagas } from "../../Interfaces/RelatorioContasPagas/IFiltroContasPagas";
import { IReport } from "../../Interfaces/Report/IReport";
import { ReportContasPagas } from "../../Reports/ReportContasPagas";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";

export function RelatorioContasPagas() {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [message, setMessage] = useState("")
    const [classificacao, setClassificacao] = useState(0);
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [fornecedorId, setFornecedorId] = useState(0);
    const [nomeFornecedor, setNomeFornecedor] = useState("Selecione o fornecedor")

    const [erroDataInicio, setErroDataInicio] = useState("");
    const [erroDataFim, setErroDataFim] = useState("");

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);

    let dadosReport = [] as string[][]

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
            setIsLoading(false);
            setMessage("Erro ao gerar o relatório, verifique os campos obrigatórios !");
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDataInicio("Data Inicio vazia!");
            }, 2000)
            return;
        }

        if (dataFim == "") {
            setIsOpenFail(true);
            setIsLoading(false);
            setMessage("Erro ao gerar o relatório, verifique os campos obrigatórios !");
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
                if (response.data.length > 0) {
                    GerarPdf(response.data);
                } else {
                    setMessage("Nenhuma ocorrência para Duplicatas Pagas !")
                    setIsOpenFail(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setIsOpenFail(false);
                    }, 2000)
                }
                setIsLoading(false)
            }
            setIsLoading(false)
        } else {
            const response = await postFormAll("RelatorioContasPagasPorFornecedor", filtroData);

            if (response.status === 200) {
                if (response.data.length > 0) {
                    GerarPdf(response.data);
                } else {
                    setMessage("Nenhuma ocorrência para Duplicatas Pagas !")
                    setIsOpenFail(true);
                    setIsLoading(false);
                    setTimeout(() => {
                        setIsOpenFail(false);
                    }, 2000)
                }
                setIsLoading(false)
            }
            setIsLoading(false)
        }
    }


    function GerarPdf(data: any[]) {
        data.map((item: { duplicatasContasAPagar: any[]; fornecedor: { nomeFornecedor: string } }) => {

            item.duplicatasContasAPagar.map((x: { dataPagamento: string; dataVencimento: string; observacao: string; valor: number; valorPago: number }) => {

                let nomeFornecedor = "";
                let dataPagamento = "";

                if (item.fornecedor) {
                    nomeFornecedor = item.fornecedor.nomeFornecedor
                }
                if (x.dataPagamento) {
                    dataPagamento = x.dataPagamento
                }

                let dataVcto = parseInt(x.dataVencimento.replaceAll("-", ""));
                let dataPgto = parseInt(dataPagamento.replaceAll("-", ""));

                dadosReport.push(
                    [
                        InverterDate(x.dataVencimento),
                        nomeFornecedor.slice(0, 15),
                        InverterDate(dataPagamento),
                        x.observacao.slice(0, 25),
                        x.valor.toString(),
                        x.valorPago.toString(),
                        (dataPgto - dataVcto).toString(),
                        (x.valorPago - x.valor).toFixed(2).toString()
                    ]
                )
            })
        })

        let dataReport: IReport = {
            title: classificacao == 1 ? "Duplicatas Pagas Por Vencimento" : "Duplicatas Pagas Por Pagamento",
            nomeEmpresa: "Concept Pharma",
            perido: { dataInicial: dataInicio, dataFinal: dataFim },
            cabecalho: ["Venc", "Fornecedor", "Pgto", "Observação", "Valor(R$)", "Valor pago (R$)", "Dias", "Dif. Pgto(R$)"],
            widths: ["11%", "15%", "11,5%", "23,5%", "8%", "13,5%", "5%", "12,5%"],
            dados: dadosReport
        }

        ReportContasPagas(dataReport)
    }

    return (
        <>
            <HeaderMainContent title="Relatório Pagas" IncludeButton={false} ReturnButton={false} />
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
                    <FieldsetCustom legend="Seleção" borderAll={true} numberCols={4}>
                        <div className="row">
                            <div className="col-12 mt-2 mb-2">
                                <CustomDropDown
                                    data={fornecedores}
                                    title={nomeFornecedor}
                                    filter="nomeFornecedor"
                                    label="Fornecedor"
                                    Select={(fornecedorId, nome) => {
                                        setFornecedorId(fornecedorId)
                                        setNomeFornecedor(nome)
                                    }}
                                    RemoveSelect={() => {
                                        setFornecedorId(0)
                                        setNomeFornecedor("Selecione o fornecedor")
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 mb-2">
                                <CustomInput
                                    label="Data inicial"
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
                                    label="Data final"
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
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text={message} />
        </>
    )
}