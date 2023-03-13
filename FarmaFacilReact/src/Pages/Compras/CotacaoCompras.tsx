import { ChangeEvent, useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { MultiSelect } from "../../Components/Inputs/MultiSelect";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { setTheme, setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import { ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import { ICompraFornecedor } from "../../Interfaces/Compras/ICompraFornecedor";
import { ButtonFilter } from "../../Components/Buttons/ButtonFilter";
import { ICotacaoCompra } from "../../Interfaces/Compras/ICotacaoCompra";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate, useParams } from "react-router-dom";
import { InvertDateJSON } from "../../helper/InvertDateJSON";
import { ButtonCustomIncluir } from "../../Components/Buttons/ButtonCustom";
import React from "react";

export function CotacaoCompras() {
    const [selectedRows, setSelectedRows] = useState([]);

    const [isLoadingFilter, setIsLoadingFilter] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);

    const [textFail, setTextFail] = useState("");

    const [auxilarLoadData, setAuxiliarLoadData] = useState(false);

    const [dataEmissao, setDataEmissao] = useState<string | null>(null);
    const [ate, setAte] = useState<string | null>(InvertDateJSON(new Date().toLocaleDateString()));
    const [aEmitir, setAEmitir] = useState(true);
    const [rejeitadas, setRejeitadas] = useState(true);
    const [emitidas, setEmitidas] = useState(true);
    const [processadas, setProcessadas] = useState(true);
    const [fornecedoresIds, setFornecedoresIds] = useState([] as number[]);

    const [fornecedores, setFornecedores] = useState([] as any[]);
    const [fornecedoresIniciais, setFornecedoresIniciais] = useState([] as any[]);

    const [cotacoes, setCotacoes] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    const filtro: ICotacaoCompra = {
        compraId: parseInt(idParams),
        dataInicial: "",
        dataFinal: "",
        fornecedores: [],
    }

    useEffect(() => {
        const Init = async () => {
            const request = await GetId("RetornaCompraPorId", idParams);

            if (request.status === 200) {
                setDataEmissao(request.data.dataCadastro.slice(0,10));
                setFornecedoresIds(request.data.fornecedoresIds);
            } else {
                setTextFail("Ops! Tivemos um problema com a filtragem inicial tente novamente através dos filtros!");
                setIsOpenFail(true);
                setTimeout(() => {
                    setIsOpenFail(false);
                }, 5000)
            }

            //const response = await postFormAll("", filtro);
        }

        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(SetDataMultiSelect(response.data, "nomeFornecedor"));
        }

        loadDataFornecedores();
        Init();
    }, []);

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

    async function filtrar() {
        setIsLoadingFilter(true)

        if (dataEmissao == null || dataEmissao == "") {
            setTextFail("Data emissão inválida!");
            setIsOpenFail(true);
            setIsLoadingFilter(false);
        } else if (ate == null || ate == "") {
            setTextFail("Data até inválida!");
            setIsOpenFail(true);
            setIsLoadingFilter(false);
        } else if (fornecedoresIds.length == 0){
            setTextFail("Você deve selecionar ao menos 1 fornecedor!");
            setIsOpenFail(true);
            setIsLoadingFilter(false);
        }

        filtro.dataInicial = dataEmissao;
        filtro.dataFinal = ate;
        filtro.fornecedores = fornecedoresIds;

        const response = await postFormAll("",filtro);

        if (response.status === 200) {
            setCotacoes(response.data);
            setIsLoadingFilter(false);
        } else {
            setTextFail("Ops! Tivemos um problema em gerar as sugestões de compra!");
            setIsOpenFail(true);
            setIsLoadingFilter(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 5000)
        }
    }

    function chamaNegociacao(currentPath: string) {
        const newPath = currentPath.replace(/([0-9]+)/, 'negociacaoCompras/$1');
        navigate(newPath);
    }

    const handleRowSelection = (newSelection: any) => {
        setSelectedRows(newSelection.rows);
      };

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
                        <div className="col-5">
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
                    <div className="col-2 mt-3">
                        <ButtonFilter onCLick={filtrar} isLoading={isLoadingFilter} />
                    </div>
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
                                    <DataGrid 
                                        checkboxSelection 
                                        onSelectionModelChange={handleRowSelection}
                                        rows={cotacoes}
                                        columns={columns}
                                        components={{ Toolbar: CustomToolbar }} 
                                        localeText={setTranslate()} 
                                    />
                                </Box>
                            </ThemeProvider>
                        </section>
                    </FieldsetCustom>
                    <div className="row">
                        <div className="col-2">
                            <ButtonCustomIncluir text="Negociação" onCLick={() => chamaNegociacao(window.location.pathname)} width={8} height={2.5}/>
                        </div>
                    </div>
                </div>
            </Container>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text={textFail} />
        </>
    )
}