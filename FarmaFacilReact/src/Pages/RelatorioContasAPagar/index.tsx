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
    const [messageError, setMessageError] = useState("");
    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
    const [planoDeContas, setPlanoDeContas] = useState([] as IPlanoDeconta[]);
    const [message, setMessage] = useState("");

    const [nomeFornecedor, setNomeFornecedor] = useState("Selecione o fornecedor")
    const [nomePlano, setNomePlano] = useState("Selecione o plano de contas")

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
        setMessageError("")

        let dataInicioNumber = parseInt(dataInicio.replaceAll("-", ""));
        let dataFimNumber = parseInt(dataFim.replaceAll("-", ""));

        if (dataFimNumber < dataInicioNumber) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setMessageError("A data final não poder ser menor que a data inicial.");
            }, 2000)
            return;
        }

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
            }
            setIsLoading(false);
        } else {
            const response = await postFormAll("RelatorioContasAPagarPorFornecedor", filtroData);
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
            title: classificacao == 1 ? "Duplicatas a Pagar Fornecedor" : "Duplicatas a Pagar",
            nomeEmpresa: "Concept Pharma",
            perido: { dataInicial: dataInicio, dataFinal: dataFim },
            cabecalho: ["Venc", "Duplicata", "Fornecedor", "Valor(R$)"],
            widths: ["15%", "15%", "50%", "20%"],
            dados: dadosReport
        }

        ReportContasPagas(dataReport)
    }

    return (
        <>
            <HeaderMainContent title="Relatório A Pagar" IncludeButton={false} ReturnButton={false} />
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
                    <FieldsetCustom legend="Seleção" borderAll={true} numberCols={5}>
                        <div className="row">
                            <div className="col-12 mt-2 mb-2">
                                <CustomDropDown
                                    data={classificacao == 1 ? fornecedores : planoDeContas}
                                    title={classificacao == 1 ? nomeFornecedor : nomePlano}
                                    filter={classificacao == 1 ? "nomeFornecedor" : "descricao"}
                                    label={classificacao == 1 ? "Fornecedor" : "Plano de contas"}
                                    Select={(id, nome) => {
                                        if (classificacao == 1) {
                                            setFornecedorId(id)
                                            setNomeFornecedor(nome)
                                        } else {
                                            setPlanoDeContasId(id)
                                            setNomePlano(nome)
                                        }
                                    }}
                                    RemoveSelect={() => {
                                        setFornecedorId(0)
                                        setNomeFornecedor("Selecione o fornecedor")
                                        setPlanoDeContasId(0)
                                        setNomePlano("Selecione o plano de contas")
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