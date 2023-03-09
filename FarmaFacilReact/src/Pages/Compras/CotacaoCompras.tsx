import { ChangeEvent, useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { MultiSelect } from "../../Components/Inputs/MultiSelect";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { setTheme, setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { getAll } from "../../Services/Api";
import { Container } from "./styles";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import { ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import { ICompraFornecedor } from "../../Interfaces/Compras/ICompraFornecedor";

export function CotacaoCompras() {
    const [auxilarLoadData, setAuxiliarLoadData] = useState(false);

    const [dataEmissao, setDataEmissao] = useState("");
    const [ate, setAte] = useState("");
    const [aEmitir, setAEmitir] = useState(true);
    const [rejeitadas, setRejeitadas] = useState(true);
    const [emitidas, setEmitidas] = useState(true);
    const [processadas, setProcessadas] = useState(true);
    const [fornecedoresIds, setFornecedoresIds] = useState([] as number[]);

    const [fornecedores, setFornecedores] = useState([] as any[]);
    const [fornecedoresIniciais, setFornecedoresIniciais] = useState([] as any[]);

    const [cotacoes, setCotacoes] = useState([]);

    useEffect(() => {
        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(SetDataMultiSelect(response.data, "nomeFornecedor"));
            setFornecedoresIds([])
        }

        loadDataFornecedores();
    }, [])

    useEffect(() => {
        const popularFornecedoresIniciais = () => {
            if (fornecedores.length == 0 || fornecedoresIds.length == 0) {
                return
            }

            var listaFornecedoresIniciais: any[] = [];

            fornecedoresIds.map((item) => {
                let dado = fornecedores.find(x => x.value == item);
                listaFornecedoresIniciais.push(dado);
            })

            setFornecedoresIniciais(listaFornecedoresIniciais);
        }

        popularFornecedoresIniciais();
    }, [fornecedores])

    useEffect(() => {
        setAuxiliarLoadData(true);
    }, [fornecedoresIniciais])

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    const columns = [
        {   field: "id", 
            headerName: "Compra", 
            width: 100
        },
        {   field: "fornecedorId",
            headerName: "Código",
            width: 100
        },
        {
            field: "nomeFornecedor",
            headerName: "Fornecedor",
            width: 500
        },
        {
            field: "dataCadastro",
            headerName: "Emissão",
            width: 100
        },
        {
            field: "cotacao",
            headerName: "Cotação",
            width: 100
        },
        {
            field: "valor",
            headerName: "Valor R$",
            width: 100
        }
    ]

    return (
        <>
            <HeaderMainContent title="Cotação de Compras" IncludeButton={false} ReturnButton={true} to="compras" />
            <Container>
                <div className="row mt-3">
                    <FieldsetCustom legend="Período" numberCols={4} borderAll={true}>
                        <div className="row mt-1 mb-2">
                            <div className="col-6">
                                <CustomInput
                                    label="Data Emissão"
                                    type="date"
                                    value={dataEmissao}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataEmissao(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <CustomInput
                                    label="Até"
                                    type="date"
                                    value={ate}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setAte(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </FieldsetCustom>
                    <div className="col-1">

                    </div>
                    {auxilarLoadData == true &&
                        <div className="col-7">
                            <MultiSelect
                                label="Fornecedores"
                                title="Fornecedores"
                                data={fornecedores}
                                isMultiple={true}
                                inicialData={fornecedoresIniciais}
                                Select={(fornecedoresIds) => setFornecedoresIds(fornecedoresIds)}
                                placeholder="Selecione o(s) fornecedor(es)"
                            />
                        </div>
                    }
                </div>
                <div className="row mt-2">
                    <FieldsetCustom legend="Cotações">
                        <div className="row">
                            <div className="col-1">

                            </div>
                            <div className="col-10 mt-4">
                                <FieldsetCustom legend="Mostrar Cotações" numberCols={12} borderAll={true}>
                                    <div className="row mt-1 mb-2">
                                        <div className="col-2">

                                        </div>
                                        <div className="col-2 mt-2">
                                            <CheckboxCustom
                                                options={["A Emitir"]}
                                                check={aEmitir}
                                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setAEmitir(e.target.checked)}
                                            />
                                        </div>
                                        <div className="col-2 mt-2">
                                            <CheckboxCustom
                                                options={["Rejeitadas"]}
                                                check={rejeitadas}
                                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setRejeitadas(e.target.checked)}
                                                color="#ff000080"
                                            />
                                        </div>
                                        <div className="col-2 mt-2">
                                            <CheckboxCustom
                                                options={["Emitidas"]}
                                                check={emitidas}
                                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setEmitidas(e.target.checked)}
                                                color="#ffff0080"
                                            />
                                        </div>
                                        <div className="col-2 mt-2">
                                            <CheckboxCustom
                                                options={["Processadas"]}
                                                check={processadas}
                                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setProcessadas(e.target.checked)}
                                                color="#00800080"
                                            />
                                        </div>
                                        <div className="col-2">

                                        </div>
                                    </div>
                                </FieldsetCustom>
                            </div>
                            <div className="col-1">

                            </div>
                        </div>
                        <section>
                            <ThemeProvider theme={setTheme()}>
                                <Box sx={{ height: 400, mt: 1 }}>
                                    <DataGrid rows={cotacoes} columns={columns} components={{ Toolbar: CustomToolbar }} localeText={setTranslate()} />
                                </Box>
                            </ThemeProvider>
                        </section>
                    </FieldsetCustom>
                </div>
            </Container>
        </>
    )
}