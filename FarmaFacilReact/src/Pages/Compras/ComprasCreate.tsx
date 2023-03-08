import { ChangeEvent, useEffect, useState } from "react";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { MultiSelect } from "../../Components/Inputs/MultiSelect";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { SelectInput } from "../../Components/Inputs/SelectInput";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { ILaboratorio } from "../../Interfaces/Laboratorio/ILaboratorio";
import { getAll, postFormAll } from "../../Services/Api";
import { Container, FooterGridTotal } from "./styles";
import { DataGrid, GridEditCellPropsParams, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import { IItemsCompra } from "../../Interfaces/Compras/IItemsCompra";
import { ICompra } from "../../Interfaces/Compras/ICompra";
import { ButtonFilter } from "../../Components/Buttons/ButtonFilter";
import { ThemeProvider } from '@mui/material/styles';
import { setTheme } from "../../helper/GridsTranslate/TranslateFunctions";
import { setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { IProduto } from "../../Interfaces/Produto/IProduto";
import { IEmpresa } from "../../Interfaces/Empresa/IEmpresa";
import { ButtonRemoveItems } from "../../Components/Buttons/ButtonRemoveItems";
import { ConfirmModal } from "../../Components/Modals/ConfirmModal";
import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { IFiltroCompras } from "../../Interfaces/Compras/IFiltroCompras";

export function ManutencaoCompras() {
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);
    const [isLoadingRemoveItems, setIsLoadingRemoveItems] = useState(false);

    const [textFail, setTextFail] = useState("");

    const [tipo, setTipo] = useState(0);
    const [tipoDemanda, setTipoDemanda] = useState(0);
    const [vendaDe, setVendaDe] = useState<string | null>(null);
    const [vendaAte, setVendaAte] = useState<string | null>(null);
    const [curvaAbc, setCurvaAbc] = useState(0);
    const [consideraEncomendaFaltas, setConsideraEncomendaFaltas] = useState(true);
    const [tempoDeRep, setTempoDeRep] = useState(0);
    const [quantidadeDias, setQuantidadeDias] = useState(0);
    const [tipoValor, setTipoValor] = useState(0);
    const [aPartirDe, setAPartirDe] = useState<string | null>("");
    const [fornecedoresIds, setFornecedoresIds] = useState([] as number[]);
    const [saldoQuantidadeComprometida, setSaldoQuantidadeComprometida] = useState(false);
    const [gruposIds, setGruposIds] = useState([] as number[]);
    const [produtosIds, setProdutosIds] = useState([] as number[]);
    const [laboratorioId, setLaboratorioId] = useState<number | null>(null);
    const [empresaId, setEmpresaId] = useState<number | null>(null);
    const [considerarApenasEmpresaSelecionada, setConsiderarApenasEmpresaSelecionada] = useState(false);

    const [readonlyVendaDe, setReadonlyVendaDe] = useState(false);
    const [readonlyVendaAte, setReadonlyVendaAte] = useState(false);
    const [readonlyTempoDeRep, setReadonlyTempoDeRep] = useState(false);
    const [readonlyQuantidadeDias, setReadonlyQuantidadeDias] = useState(false);
    const [readonlyAPartirDe, setReadonlyAPartirDe] = useState(false);

    const [hideUnidade, setHideUnidade] = useState(false);
    const [hideQuantidadeTotal, setHideQuantidadeTotal] = useState(false);
    const [hideConsumoDiario, setHideConsumoDiario] = useState(false);
    const [hideLaboratorio, setHideLaboratorio] = useState(true);

    const [fornecedoresIniciais, setFornecedoresIniciais] = useState([] as any[]);
    const [fornecedores, setFornecedores] = useState([] as any[]);
    const [laboratorios, setLaboratorios] = useState([] as ILaboratorio[]);
    const [grupos, setGrupos] = useState([] as IGrupo[]);
    const [empresas, setEmpresas] = useState([] as IEmpresa[]);
    const [produtos, setProdutos] = useState([] as IProduto[]);

    const [valorTotal, setValorTotal] = useState(0);

    const [itemsCompras, setItemsCompras] = useState([] as IItemsCompra[]);

    const [itemsComprasConfirmadas, setItemsComprasConfirmadas] = useState([] as IItemsCompra[]);

    const dataFiltro: IFiltroCompras = {
        tipoCompra: 0,
        tipoDemanda: null,
        vendaDe: "",
        vendaAte: "",
        curvaAbc: 0,
        consideraEncomendaFaltas: true,
        tempoDeReposicao: 0,
        quantidadeDias: 0,
        tipoValor: 0,
        aPartirDe: "",
        saldoQuantidadeComprometida: false,
        laboratorioId: 0,
        fornecedoresIds: [],
        gruposIds: [],
        produtosIds: [],
        empresaId: null,
        considerarApenasEmpresaSelecionada: false,
    }

    const data: ICompra = {
        id: 0,
        dataCadastro: null,
        itensCompras: [],
        totalCompra: 0,
        statusCompra: 1,
        tempoDeReposicaoMaxima: 0,
        tipoCompra: 0,
        tipoDemanda: null,
        vendaDe: "",
        vendaAte: "",
        curvaAbc: 0,
        consideraEncomendaFaltas: true,
        tempoDeReposicao: 0,
        quantidadeDias: 0,
        tipoValor: 0,
        aPartirDe: "",
        saldoQuantidadeComprometida: false,
        laboratorioId: 0,
        fornecedoresIds: [],
        gruposIds: [],
        produtosIds: [],
        empresaId: null,
        considerarApenasEmpresaSelecionada: false,
    }

    const columns = [
        {
            field: "id",
            headerName: "Id",
            width: 60,
        },
        {
            field: "grupoId",
            headerName: "Grupo",
            width: 150
        },
        {
            field: "produtoId",
            headerName: "Produto",
            width: 200
        },
        {
            field: "laboratorioId",
            headerName: "Laboratorio",
            width: 200
        },
        {
            field: "siglaUnidade",
            headerName: "Unidade",
            width: 200
        },
        {
            field: "curva",
            headerName: "Curva",
            width: 200
        },
        {
            field: "estoqueMinimo",
            headerName: "Estoque Minimo",
            width: 200
        },
        {
            field: "estoqueMaximo",
            headerName: "Estoque Máximo",
            width: 200
        },
        {
            field: "quantidadeVendida",
            headerName: "Quantidade Vendida",
            width: 200
        },
        {
            field: "valorVendido",
            headerName: "Valor Vendido",
            width: 200
        },
        {
            field: "estoque",
            headerName: "Estoque",
            width: 200
        },
        {
            field: "quantidadeCompra",
            headerName: "Quantidade Compra",
            width: 200,
            type: "number",
            editable: true,
        },
        {
            field: "quantidadeTotal",
            headerName: "Quantidade Total",
            width: 200
        },
        {
            field: "consumoDiario",
            headerName: "Consumo Diario",
            width: 200
        },
        {
            field: "valorUnitario",
            headerName: "Valor Unitario",
            width: 200
        },
        {
            field: "valorTotal",
            headerName: "Valor Total",
            width: 200
        },
        {
            field: "comprar",
            headerName: "Comprar",
            width: 200,
            type: 'boolean',
            editable: true,
        },
        {
            field: "nomeFornecedor",
            headerName: "Fornecedor Ultima Compra",
            width: 200,
        },
        {
            field: "codigoCas",
            headerName: "Código CAS",
            width: 200,
        },
        {
            field: "codigoDcb",
            headerName: "Código DCB",
            width: 200,
        },
        {
            field: "codigoBarra",
            headerName: "Código Barra",
            width: 200,
        }
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    function handleEditCellChange(params: GridEditCellPropsParams) {
        const updatedRows = itemsCompras.map((row) => {
            if (row.id === params.id) {
                return { ...row, [params.field]: params.props.value };
            }
            return row;
        });

        setItemsCompras(updatedRows);
    }

    useEffect(() => {
        let itemsConfirmados = [] as IItemsCompra[];
        let valorTotaldasCompras: number = 0;
        itemsCompras.map((item) => {
            item.valorTotal = item.quantidadeCompra * item.valorUnitario;

            if (item.comprar == true) {
                valorTotaldasCompras += item.valorTotal;
            }

            if (item.comprar == true) {
                itemsConfirmados.push(item)
            }
        })

        setValorTotal(valorTotaldasCompras);
        setItemsComprasConfirmadas(itemsConfirmados);
    }, [itemsCompras])

    useEffect(() => {
        const loadDataFornecedores = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(SetDataMultiSelect(response.data, "nomeFornecedor"));
        }

        const loadDataLaboratorios = async () => {
            const response = await getAll("ListaLaboratorio");
            setLaboratorios(response.data);
        }

        const loadDataGrupos = async () => {
            const response = await getAll("ListaGrupo");
            setGrupos(SetDataMultiSelect(response.data, "descricao"));
        }

        const loadDataProdutos = async () => {
            const response = await getAll("ListaProdutos");
            setProdutos(SetDataMultiSelect(response.data, "descricao"));
        }

        const loadDataEmpresas = async () => {
            const response = await getAll("ListaEmpresa");
            setEmpresas(response.data);
        }

        loadDataFornecedores();
        loadDataLaboratorios();
        loadDataGrupos();
        loadDataProdutos();
        loadDataEmpresas();
    }, [])

    useEffect(() => {
        if (tipo == 1) {
            setReadonlyVendaDe(false);
            setReadonlyVendaAte(false);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
            setHideLaboratorio(true);
            setHideUnidade(false);
            setHideQuantidadeTotal(false);
            setHideConsumoDiario(false);
        } else if (tipo == 2) {
            setReadonlyVendaDe(false);
            setReadonlyVendaAte(false);
            setReadonlyTempoDeRep(false);
            setReadonlyQuantidadeDias(true);
            setHideLaboratorio(true);
            setHideUnidade(false);
            setHideQuantidadeTotal(false);
            setHideConsumoDiario(false);
        } else if (tipo == 3) {
            setReadonlyVendaDe(true);
            setReadonlyVendaAte(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
            setHideLaboratorio(true);
            setHideUnidade(false);
            setHideQuantidadeTotal(false);
            setHideConsumoDiario(false);
        } else if (tipo == 4) {
            setReadonlyVendaDe(true);
            setReadonlyVendaAte(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
            setHideLaboratorio(true);
            setHideUnidade(false);
            setHideQuantidadeTotal(false);
            setHideConsumoDiario(false);
        } else if (tipo == 5) {
            setReadonlyVendaDe(false);
            setReadonlyVendaAte(false);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(false);
            setHideLaboratorio(false);
            setHideUnidade(true);
            setHideQuantidadeTotal(true);
            setHideConsumoDiario(true);
        } else if (tipo == 6) {
            setReadonlyVendaDe(true);
            setReadonlyVendaAte(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
            setHideLaboratorio(true);
            setHideUnidade(false);
            setHideQuantidadeTotal(false);
            setHideConsumoDiario(false);
        } else {
            setReadonlyVendaDe(false);
            setReadonlyVendaAte(false);
            setReadonlyTempoDeRep(false);
            setReadonlyQuantidadeDias(false);
            setHideLaboratorio(true);
            setHideUnidade(false);
            setHideQuantidadeTotal(false);
            setHideConsumoDiario(false);
        }
    }, [tipo])

    useEffect(() => {
        if (tipoValor == 2) {
            setReadonlyAPartirDe(false);
        } else {
            setReadonlyAPartirDe(true);
        }
    }, [tipoValor])

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


    async function filtrar() {
        let validation = false;
        setIsLoadingFilter(true);

        switch (tipo) {
            case 0:
                setTextFail("Escolha um tipo para realizar a sugestão de compra!");
                setIsOpenFail(true);
                setIsLoadingFilter(false);
                break;
            case 1:
                if (vendaDe == null || vendaDe == "" || vendaAte == null || vendaAte == "") {
                    setTextFail("Para o tipo Venda é obrigatório informar a data inicial e final!");
                    setIsOpenFail(true);
                    setIsLoadingFilter(false);
                } else {
                    validation = true;
                }
                break;
            case 2:
                if (tempoDeRep <= 0) {
                    setTextFail("Para o tipo Demanda é obrigatório informar o tempo de reposição!");
                    setIsOpenFail(true);
                    setIsLoadingFilter(false);
                } else if ((vendaDe == null || vendaDe == "") && (vendaAte == null || vendaAte == "")) {
                    setTextFail("Para o tipo Demanda o intervalo de data deve ser maior que um dia!")
                    setIsOpenFail(true);
                    setIsLoadingFilter(false);
                } else {
                    validation = true;
                }
                break;
            case 3:
                validation = true;
                break;
            case 4:
                validation = true;
                break;
            case 5:
                if (vendaDe == null || vendaDe == "" || vendaAte == null || vendaAte == "") {
                    setTextFail("Para o tipo Consumo é obrigatório informar a data inicial e final!");
                    setIsOpenFail(true);
                    setIsLoadingFilter(false);
                } else if (gruposIds.length == 0) {
                    setTextFail("Para o tipo Consumo é obrigatório informar o código do grupo!");
                    setIsOpenFail(true);
                    setIsLoadingFilter(false);
                } else if (quantidadeDias == 0) {
                    setTextFail("Para o tipo Consumo é obrigatório informar quantidade de dias!");
                    setIsOpenFail(true);
                    setIsLoadingFilter(false);
                } else {
                    validation = true;
                }
                break;
            case 6:
                validation = true;
                break;
        }

        if (validation) {
            dataFiltro.tipoCompra = tipo;
            dataFiltro.tipoDemanda = tipo == 2 ? tipoDemanda : null;
            dataFiltro.vendaDe = readonlyVendaDe == false ? vendaDe : null;
            dataFiltro.vendaAte = readonlyVendaAte == false ? vendaAte : null;
            dataFiltro.curvaAbc = curvaAbc;
            dataFiltro.consideraEncomendaFaltas = consideraEncomendaFaltas;
            dataFiltro.tempoDeReposicao = readonlyTempoDeRep == false ? tempoDeRep : 0;
            dataFiltro.quantidadeDias = readonlyQuantidadeDias == false ? quantidadeDias : 0;
            dataFiltro.tipoValor = tipoValor;
            dataFiltro.aPartirDe = readonlyAPartirDe == false ? aPartirDe : null;
            dataFiltro.saldoQuantidadeComprometida = saldoQuantidadeComprometida;
            dataFiltro.laboratorioId = laboratorioId;
            dataFiltro.fornecedoresIds = fornecedoresIds;
            dataFiltro.gruposIds = gruposIds;
            dataFiltro.produtosIds = produtosIds;
            dataFiltro.empresaId = empresaId;
            dataFiltro.considerarApenasEmpresaSelecionada = considerarApenasEmpresaSelecionada;
            console.log(dataFiltro)
            const response = await postFormAll("Compra/FiltroCompra", dataFiltro);

            if (response.status === 200) {

                response.data.map((x: { fornecedorId: number }) => {

                    if (x.fornecedorId != 0) {
                        fornecedoresIds.push(x.fornecedorId)
                    }
                })

                setFornecedoresIds(fornecedoresIds);
                popularFornecedoresIniciais();
                setIsLoadingFilter(false);
                setItemsCompras(response.data);
            } else {
                setTextFail("Ops! Tivemos um problema em gerar as sugestões de compra!");
                setIsOpenFail(true);
                setIsLoadingFilter(false);
                setTimeout(() => {
                    setIsOpenFail(false);
                }, 5000)
            }
        }
    }

    async function submit() {
        setIsLoading(true);

        const idsFornecedores = [...new Set(fornecedoresIds)];

        data.id = 0;
        data.itensCompras = itemsCompras;
        data.tipoCompra = tipo;
        data.tipoDemanda = tipo == 2 ? tipoDemanda : null;
        data.vendaDe = readonlyVendaDe == false ? vendaAte : "";
        data.vendaAte = readonlyVendaAte == false ? vendaAte : "";
        data.curvaAbc = curvaAbc;
        data.consideraEncomendaFaltas = consideraEncomendaFaltas;
        data.tempoDeReposicao = readonlyTempoDeRep == false ? tempoDeRep : 0;
        data.quantidadeDias = readonlyQuantidadeDias == false ? quantidadeDias : 0;
        data.tipoValor = tipoValor;
        data.aPartirDe = readonlyAPartirDe == false ? aPartirDe : null;
        data.saldoQuantidadeComprometida = saldoQuantidadeComprometida;
        data.laboratorioId = laboratorioId ? laboratorioId : null;
        data.fornecedoresIds = idsFornecedores;
        data.gruposIds = gruposIds;
        data.produtosIds = produtosIds;
        data.empresaId = empresaId;
        data.considerarApenasEmpresaSelecionada = considerarApenasEmpresaSelecionada;
        data.itensCompras = itemsComprasConfirmadas;

        const response = await postFormAll("AdicionarCompra", data);

        if (response.status === 200) {
            setIsLoading(false);
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function removerItems(confirmation: boolean) {
        if (confirmation) {
            setItemsCompras([]);
            setIsOpenConfirmModal(false);
            return
        }

        setIsOpenConfirmModal(false);
    }

    return (
        <>
            <HeaderMainContent title="Incluir Compra" IncludeButton={false} ReturnButton={false} />
            <Container>
                <div className="row">
                    <div className="col-2 mt-4">
                        <SelectInput
                            options={["", "Venda", "Demanda", "Estoque Mínimo", "Estoque Máximo", "Consumo", "Encomendas/Faltas"]}
                            label="Tipo"
                            Select={(select) => setTipo(parseInt(select))}
                            selectString={false}
                        />
                    </div>
                    <div className="col-2">
                        {tipo == 2 &&
                            <RadioCustom
                                name="Tipo Demanda"
                                options={["Estoque Mínimo", "Estoque Máximo"]}
                                titleComponet="Tipo Demanda"
                                onClickOptions={(tipoDemanda) => setTipoDemanda(tipoDemanda)}
                                value={tipoDemanda}
                            />
                        }
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda de"
                            type="datetime-local"
                            value={vendaDe}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaDe(e.target.value)
                            }
                            readonly={readonlyVendaDe}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda até"
                            type="datetime-local"
                            value={vendaAte}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaAte(e.target.value)
                            }
                            readonly={readonlyVendaAte}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Tempo de Rep"
                            type="number"
                            value={tempoDeRep}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setTempoDeRep(parseInt(e.target.value))
                            }
                            readonly={readonlyTempoDeRep}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Quantidade de dias"
                            type="number"
                            value={quantidadeDias}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuantidadeDias(parseInt(e.target.value))
                            }
                            readonly={readonlyQuantidadeDias}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <SelectInput
                            options={["Geral", "A", "B", "C"]}
                            label="Curva Abc"
                            Select={(select) => setCurvaAbc(parseInt(select))}
                            selectString={false}
                        />
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-4">
                        <CustomDropDown
                            data={laboratorios}
                            title="Selecione os Laboratorios"
                            filter="descricao"
                            label="Laboratório"
                            Select={(laboratorioId) => setLaboratorioId(laboratorioId)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <RadioCustom
                            name="Tipo Valor"
                            options={["Custo Referência", "Última Compra", "Melhor Compra"]}
                            titleComponet="Tipo Valor"
                            onClickOptions={(tipoValor) => setTipoValor(tipoValor)}
                            value={tipoValor}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="A Partir de"
                            type="date"
                            value={aPartirDe}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setAPartirDe(e.target.value)
                            }
                            readonly={readonlyAPartirDe}
                        />
                    </div>
                    <div className="col-4 mt-3">
                        <CheckboxCustom
                            options={["Considerar apenas empresa selecionada"]}
                            check={considerarApenasEmpresaSelecionada}
                            onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setConsiderarApenasEmpresaSelecionada(e.target.checked)}
                        />
                        <CheckboxCustom
                            options={["Considerar Encomenda/Faltas"]}
                            check={consideraEncomendaFaltas}
                            onClickOptions={(e) => setConsideraEncomendaFaltas(e.target.checked)}
                        />
                        <CheckboxCustom
                            options={["Saldo com Quantidade Comprometida"]}
                            check={saldoQuantidadeComprometida}
                            onClickOptions={(e) => setSaldoQuantidadeComprometida(e.target.checked)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        {<MultiSelect
                            label="Produtos"
                            title="Produtos"
                            data={produtos}
                            isMultiple={true}
                            Select={(produtosIds) => setProdutosIds(produtosIds)}
                            placeholder="Selecione o(s) produto(s)"
                        />}
                    </div>
                    <div className="col-4">
                        <MultiSelect
                            label="Grupos"
                            title="Grupos"
                            data={grupos}
                            isMultiple={true}
                            Select={(gruposIds) => setGruposIds(gruposIds)}
                            placeholder="Selecione o(s) grupo(s)"
                        />
                    </div>
                    <div className="col-4">
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
                </div>
                <div className="row">
                    <div className="col-4">
                        {/* { <CustomDropDown
                            data={empresas}
                            title="Selecione a Empresa"
                            filter="nome"
                            label="Empresa"
                            Select={(empresaId) => setEmpresaId(empresaId)}
                        /> } */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-2">
                        <ButtonFilter onCLick={filtrar} isLoading={isLoadingFilter} />
                        <ButtonRemoveItems onCLick={() => setIsOpenConfirmModal(true)} isLoading={isLoadingRemoveItems} />
                    </div>
                </div>
            </Container>
            <div className="row">
                <div className="col-12 mt-4">
                    <FieldsetCustom legend="Itens Compra">
                        <section>
                            <ThemeProvider theme={setTheme()}>
                                <Box sx={{ height: 400, mt: 1 }}>
                                    <DataGrid
                                        rows={itemsCompras}
                                        columns={columns}
                                        onEditCellPropsChange={handleEditCellChange}
                                        editMode="row"
                                        components={{
                                            Toolbar: CustomToolbar,
                                        }}
                                        localeText={setTranslate()}
                                        columnVisibilityModel={{
                                            id: false,
                                            laboratorioId: hideLaboratorio,
                                            siglaUnidade: hideUnidade,
                                            quantidadeTotal: hideQuantidadeTotal,
                                            consumoDiario: hideConsumoDiario,
                                        }}
                                    />
                                    <FooterGridTotal>Valor total: {valorTotal}</FooterGridTotal>
                                </Box>
                            </ThemeProvider>
                        </section>
                    </FieldsetCustom>
                </div>
            </div>
            <div className="row">
                <div className="col-4 mb-2 mt-2">
                    <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                    <ButtonCancel to="compras" />
                </div>
            </div>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} text={textFail} />
            <ConfirmModal openModal={isOpenConfirmModal} onClose={(confirmation: boolean) => removerItems(confirmation)} text="Confirmar exclusão da lista de produtos?" />
        </>
    )
}