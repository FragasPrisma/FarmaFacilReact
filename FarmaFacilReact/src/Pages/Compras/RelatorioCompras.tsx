import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { MultiSelect } from "../../Components/Inputs/MultiSelect";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { IFiltroRelatorioCompras } from "../../Interfaces/Compras/IFiltroRelatorioCompras";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { getAll, GetId } from "../../Services/Api";
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

    useEffect(() => {
        async function Init() {
            // const response = await GetId("RetornaCompraPorId", idParams)

            // if (response.status === 200) {

            // }
        }

        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(SetDataMultiSelect(response.data, "nomeFornecedor"));
        }

        loadDataFornecedores();
        Init();
    }, [])

    useEffect(() => {
        if (tipoEnvio == 0) {
            setReadonlyModoEnvio(false);
        } else {
            setReadonlyModoEnvio(true);
        }
    }, [tipoEnvio])

    async function submit() {
        setIsLoading(true);

        filtro.fornecedoresIds = fornecedoresIds;
        filtro.contato = contato;
        filtro.dataLimite = dataLimite;
        filtro.para = para;
        filtro.cc = cc;
        filtro.tipoEnvio = tipoEnvio ? tipoEnvio : -1;
        filtro.modoEnvio = modoEnvio ? modoEnvio : null;

        // var response = await postFormAll("", filtro)

        // if (response.status === 200 ) {
        //     GerarPdf(response.data);
        //     setIsLoading(false);
        // } else {
        //     setIsLoading(false);
        //     setIsOpenFail(true);
        // }

        setIsLoading(false);
    }

    function GerarPdf(data: any[]) {

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
                    <div className="col-4 mt-2">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                    </div>
                </div>
            </Container>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text="Erro ao gerar relatório confira os campos do filtro" />
        </>
    )
}