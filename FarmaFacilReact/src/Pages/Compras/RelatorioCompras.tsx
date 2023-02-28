import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonCustomIncluir } from "../../Components/Buttons/ButtonCustom";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { MultiSelect } from "../../Components/Inputs/MultiSelect";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { InverterDate } from "../../helper/InverterDate";
import { IFiltroRelatorioCompras } from "../../Interfaces/Compras/IFiltroRelatorioCompras";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IReport } from "../../Interfaces/Report/IReport";
import { ReportContasPagas } from "../../Reports/ReportContasPagas";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";

export function RelatorioCompras() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);

    const [fornecedoresIds, setFornecedoresIds] = useState([] as number[]);
    const [contato, setContato] = useState("");
    const [dataLimite, setDataLimite] = useState("");
    const [para, setPara] = useState("");
    const [cc, setCC] = useState("");
    const [tipoEnvio, setTipoEnvio] = useState<null | number>(null);
    const [modoEnvio, setModoEnvio] = useState<null | number>(null);

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);

    const [readonlyModoEnvio, setReadonlyModoEnvio] = useState(true);

    const [filtro, setFiltro] = useState({} as IFiltroRelatorioCompras);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    let dadosReport = [] as string[][]

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaCompraPorId", idParams)

            if (response.status === 200) {

            }
        }

        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(SetDataMultiSelect(response.data, "nomeFornecedor"));
        }

        //loadDataFornecedores();
        Init();
    }, [])

    useEffect(() => {
        if (tipoEnvio == 0) {
            setReadonlyModoEnvio(false);
        } else {
            setReadonlyModoEnvio(true);
        }
    }, [tipoEnvio])

    async function enviarEmail() {
        filtro.fornecedoresIds = fornecedoresIds;
        filtro.contato = contato;
        filtro.dataLimite = dataLimite;
        filtro.para = para;
        filtro.cc = cc;
        filtro.tipoEnvio = tipoEnvio ? tipoEnvio : -1;
        filtro.modoEnvio = modoEnvio ? modoEnvio : null;

        var response = await postFormAll("", filtro)

        if (response.status === 200 ) {
            console.log(response);
        } else {
            setIsOpenFail(true);
        }
    }

    async function gerarRelatorio() {
        filtro.idcompra = parseInt(idParams);
        filtro.fornecedoresIds = [1, 5, 6];
        filtro.contato = contato;
        filtro.dataLimite = dataLimite;
        filtro.para = para;
        filtro.cc = cc;
        filtro.tipoEnvio = tipoEnvio ? tipoEnvio : -1;
        filtro.modoEnvio = modoEnvio ? modoEnvio : null;

        var response = await postFormAll("ManutencaoCompras/MontaFiltroRelatorioCompras", filtro)

        if (response.status === 200 ) {
            console.log(response.data.result);
            GerarPdf(response.data.result);
        } else {
            setIsOpenFail(true);
        }
    }

    function GerarPdf(data: any[]) {
        data.map((item: any) => {
            dadosReport.push(
                [
                    item.codigogrupo.toString(),
                    item.codigoproduto.toString(),
                    item.descricaoproduto,
                ]
            )
        })
        
        let dataReport: IReport = {
            title: "Relatório de Compras",
            nomeEmpresa: "Concept Pharma",
            perido: { dataInicial: dataLimite, dataFinal: dataLimite },
            cabecalho: ["Grupo","Produto", "Descrição"],
            widths: ["15%","15%","70%"],
            dados: dadosReport
        }

        ReportContasPagas(dataReport)
    }

    return (
        <>
            <HeaderMainContent title="Relatório de Compras" IncludeButton={false} ReturnButton={true} to="compras" />
            <Container>
                <div className="row">
                    <div className="col-4 mt-4">
                        <MultiSelect
                            label="Fornecedores"
                            title="Fornecedores"
                            data={fornecedores}
                            isMultiple={true}
                            Select={(fornecedoresIds) => setFornecedoresIds(fornecedoresIds)}
                            placeholder="Selecione o(s) fornecedor(es)"
                        />
                    </div>
                    <div className="col-4 mt-4">
                        <div className="row">
                            <FieldsetCustom borderAll={true} legend="Farmácia" numberCols={12}>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <CustomInput
                                            label="Contato"
                                            type="string"
                                            value={contato}
                                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setContato(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-6">
                                        <CustomInput
                                            label="Data Limite"
                                            type="date"
                                            value={dataLimite}
                                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setDataLimite(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </FieldsetCustom>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <CustomInput 
                            label="Para"
                            type="string"
                            value={para}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPara(e.target.value)
                            }
                        />
                    </div>
                    <div className="col-4">
                        <CustomInput 
                            label="CC"
                            type="string"
                            value={cc}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCC(e.target.value)
                            }
                            placeholder="Opcional"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <RadioCustom 
                            options={["Cotação", "Pedido"]}
                            titleComponet="Tipo Envio"
                            name="Tipo Envio"
                            onClickOptions={(tipoEnvio) => setTipoEnvio(tipoEnvio)}
                            value={tipoEnvio}
                        />
                    </div>
                    <div className="col-2">
                        <RadioCustom 
                            options={["Completo", "Resumido", "ExportarExcel"]}
                            titleComponet="ModoEnvio"
                            name="Modo Envio"
                            onClickOptions={(modoEnvio) => setModoEnvio(modoEnvio)}
                            value={modoEnvio}
                            readonly={readonlyModoEnvio}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 mt-2">
                        <ButtonCustomIncluir onCLick={enviarEmail} text="Enviar e-mail" height={3} width={7}/>
                    </div>
                    <div className="col-2 mt-2">
                        <ButtonCustomIncluir onCLick={gerarRelatorio} text="Gerar pdf" height={3} width={7}/>
                    </div>
                </div>
            </Container>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text="Erro ao gerar relatório confira os campos do filtro" />
        </>
    )
}