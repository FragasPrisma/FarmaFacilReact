import { ChangeEvent, useEffect, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";
import { MessageErro } from "../../Components/Others/MessageError";
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
    const [messageError, setMessageError] = useState("");

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
        setMessageError("")

        let dataInicioNumber = parseInt(dataInicio.replaceAll("-", ""));
        let dataFimNumber = parseInt(dataFim.replaceAll("-", ""));

        if (dataFimNumber < dataInicioNumber) {
            setIsOpenFail(true);
            setIsLoading(false);
            setMessage("Erro ao gerar o relatório, verifique os campos obrigatórios !");
            setTimeout(() => {
                setIsOpenFail(false);
                setMessageError("A data final não poder ser menor que a data inicial.");
            }, 2000)
            return;
        }

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

        let dataPgto: number;
        let index = 0;
        let totalValor = 0;
        let totalPago = 0;
        let totalDiferenca = 0;
        let primeiroDia;
        let totalGeral = 0;
        let totalGeralPago = 0;
        let totalGeralDif = 0;

        data.map((item: { duplicatasContasAPagar: any[]; fornecedor: { nomeFornecedor: string } }) => {

            item.duplicatasContasAPagar.map((x: { dataPagamento: string; dataVencimento: string; observacao: string; valor: number; valorPago: number }) => {

                primeiroDia = parseInt(x.dataPagamento.replaceAll("-", ""))

                if (index > 0 && dataPgto != primeiroDia) {
                    dadosReport.push([
                        "Total do dia",
                        "",
                        "",
                        "",
                        totalValor.toFixed(2),
                        totalPago.toFixed(2),
                        "",
                        totalDiferenca.toFixed(2)
                    ])

                    totalValor = 0;
                    totalPago = 0;
                    totalDiferenca = 0;
                }

                let nomeFornecedor = "";
                let dataPagamento = "";

                if (item.fornecedor) {
                    nomeFornecedor = item.fornecedor.nomeFornecedor
                }
                if (x.dataPagamento) {
                    dataPagamento = x.dataPagamento.slice(0, 10)
                }


                let dataVcto = parseInt(x.dataVencimento.slice(0, 10).replaceAll("-", ""));
                dataPgto = parseInt(dataPagamento.replaceAll("-", ""));

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
                totalGeral += x.valor;
                totalGeralPago += x.valorPago;  
                totalGeralDif += (x.valorPago - x.valor);
                totalValor += x.valor;
                totalPago += x.valorPago;
                totalDiferenca += (x.valorPago - x.valor);

                index += 1;
            })

        })

        dadosReport.push([
            "Total do dia",
            "",
            "",
            "",
            totalValor.toFixed(2),
            totalPago.toFixed(2),
            "",
            totalDiferenca.toFixed(2)
        ])

        dadosReport.push([
            "Total Geral",
            "",
            "",
            "",
            totalGeral.toFixed(2),
            totalGeralPago.toFixed(2),
            "",
            totalGeralDif.toFixed(2)
        ])

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
                    <FieldsetCustom legend="Seleção" borderAll={true} numberCols={5}>
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
                    <MessageErro message={messageError} />
                    <LabelObrigatorio />
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