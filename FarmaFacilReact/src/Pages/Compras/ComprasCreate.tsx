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
import { IFiltroCompras } from "../../Interfaces/Compras/IFiltroCompras";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { ILaboratorio } from "../../Interfaces/Laboratorio/ILaboratorio";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { DataGrid, GridCellParams, GridEditCellPropsParams, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, GridValueGetterParams } from '@mui/x-data-grid'
import Box from '@mui/material/Box';
import { IItemsCompra } from "../../Interfaces/Compras/IItemsCompra";
import { ICompra } from "../../Interfaces/Compras/ICompra";
import { ButtonFilter } from "../../Components/Buttons/ButtonFilter";
import { ThemeProvider } from '@mui/material/styles';
import { setTheme } from "../../helper/GridsTranslate/TranslateFunctions";
import { setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { optionCSS } from "react-select/dist/declarations/src/components/Option";
import { IProduto } from "../../Interfaces/Produto/IProduto";
import { IEmpresa } from "../../Interfaces/Empresa/IEmpresa";

export function ManutencaoCompras() {

    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);

    const [tipo, setTipo] = useState(0);
    const [tipoDemanda, setTipoDemanda] = useState(0);
    const [vendaDe, setVendaDe] = useState("");
    const [vendaDeHora, setVendaDeHora] = useState("");
    const [vendaAte, setVendaAte] = useState("");
    const [vendaAteHora, setVendaAteHora] = useState("");
    const [curvaAbc, setCurvaAbc] = useState(0);
    const [consideraEncomendaFaltas, setConsideraEncomendaFaltas] = useState(true);
    const [tempoDeRep, setTempoDeRep] = useState(0);
    const [quantidadeDias, setQuantidadeDias] = useState(0);
    const [tipoValor, setTipoValor] = useState(0);
    const [aPartirDe, setAPartirDe] = useState("");
    const [fornecedoresIds, setFornecedoresIds] = useState([] as number[]);
    const [saldoQuantidadeComprometida, setSaldoQuantidadeComprometida] = useState(false);
    const [gruposIds, setGruposIds] = useState([] as number[]);
    const [produtosIds, setProdutosIds] = useState([] as number[]);
    const [laboratorioId, setLaboratorioId] = useState(0);
    const [empresaId, setEmpresaId] = useState(0);
    const [considerarApenasEmpresaSelecionada, setConsiderarApenasEmpresaSelecionada] = useState(false);

    const [readonlyVendaDe, setReadonlyVendaDe] = useState(false);
    const [readonlyVendaDeHora, setReadonlyVendaDeHora] = useState(false);
    const [readonlyVendaAte, setReadonlyVendaAte] = useState(false);
    const [readonlyVendaAteHora, setReadonlyVendaAteHora] = useState(false);
    const [readonlyTempoDeRep, setReadonlyTempoDeRep] = useState(false);
    const [readonlyQuantidadeDias, setReadonlyQuantidadeDias] = useState(false);
    const [readonlyAPartirDe, setReadonlyAPartirDe] = useState(false);

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
    const [laboratorios, setLaboratorios] = useState([] as ILaboratorio[]);
    const [grupos, setGrupos] = useState([] as IGrupo[]);
    const [empresas, setEmpresas] = useState([] as IEmpresa[]); 
    const [produtos, setProdutos] = useState([] as IProduto[]);

    const [itemsCompras, setItemsCompras] = useState([
        { id: 1, grupoId: 1, laboratorioId: 1, produtoId: 1, comprar: true, curva: "Geral", estoque: 100, estoqueMinimo: 1000, compraId: 0, quantidadeCompra: 0, quantidadeVendida: 100, siglaUnidade: "g", quantidadeTotal: 1100, valorTotal: 0, valorUnitario: 0.50, valorVendido: 100, consumoDiario: 1, estoqueMaximo: 1200},
        { id: 2, grupoId: 2, laboratorioId: 2, produtoId: 2, comprar: false, curva: "Geral", estoque: 200, estoqueMinimo: 1100, compraId: 0, quantidadeCompra: 0, quantidadeVendida: 200, siglaUnidade: "g", quantidadeTotal: 1200, valorTotal: 0, valorUnitario: 0.60, valorVendido: 200, consumoDiario: 2, estoqueMaximo: 1300},
        { id: 3, grupoId: 3, laboratorioId: 3, produtoId: 3, comprar: true, curva: "Geral", estoque: 300, estoqueMinimo: 1200, compraId: 0, quantidadeCompra: 0, quantidadeVendida: 300, siglaUnidade: "g", quantidadeTotal: 1300, valorTotal: 0, valorUnitario: 0.70, valorVendido: 300, consumoDiario: 3, estoqueMaximo: 1400},
        { id: 4, grupoId: 4, laboratorioId: 4, produtoId: 4, comprar: false, curva: "Geral", estoque: 400, estoqueMinimo: 1300, compraId: 0, quantidadeCompra: 0, quantidadeVendida: 400, siglaUnidade: "g", quantidadeTotal: 1400, valorTotal: 0, valorUnitario: 0.80, valorVendido: 400, consumoDiario: 4, estoqueMaximo: 1500},
        { id: 5, grupoId: 5, laboratorioId: 5, produtoId: 5, comprar: true, curva: "Geral", estoque: 500, estoqueMinimo: 1400, compraId: 0, quantidadeCompra: 0, quantidadeVendida: 500, siglaUnidade: "g", quantidadeTotal: 1500, valorTotal: 0, valorUnitario: 0.90, valorVendido: 500, consumoDiario: 5, estoqueMaximo: 1600}
    ] as IItemsCompra[]);

    const dataFiltro: IFiltroCompras = {
        tipo: 0,
        tipoDemanda: null,
        vendaDe: "",
        vendaDeHora: "",
        vendaAte: "",
        vendaAteHora: "",
        curvaAbc: 0,
        consideraEncomendaFaltas: true,
        tempoDeRep: 0,
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
        data: Date.now().toString(),
        listaItems: [],
        totalCompra: 0,
        status: 1,
        tempoReposicaoMaximo: 0,
        tipo: 0,
        tipoDemanda: null,
        vendaDe: "",
        vendaDeHora: "",
        vendaAte: "",
        vendaAteHora: "",
        curvaAbc: 0,
        consideraEncomendaFaltas: true,
        tempoDeRep: 0,
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
        {   field: "id", 
            headerName: "Id", 
            width: 60 
        },
        {   field: "grupoId", 
            headerName: "Grupo", 
            width: 150 
        },
        {   field: "produtoId", 
            headerName: "Produto", 
            width: 200 
        },
        {   field: "siglaUnidade", 
            headerName: "Unidade", 
            width: 200 
        },
        {   field: "curva", 
            headerName: "Curva", 
            width: 200 
        },
        {   field: "estoqueMinimo", 
            headerName: "Estoque Minimo", 
            width: 200 
        },
        {   field: "estoqueMaximo", 
            headerName: "Estoque Máximo", 
            width: 200 
        },
        {   field: "quantidadeVendida", 
            headerName: "Quantidade Vendida", 
            width: 200 
        },
        {   field: "valorVendido", 
            headerName: "Valor Vendido", 
            width: 200 
        },
        {   field: "estoque", 
            headerName: "Estoque", 
            width: 200 
        },
        {   field: "quantidadeCompra", 
            headerName: "Quantidade Compra", 
            width: 200,
            type: "number",
            editable: true,
        },
        {   field: "quantidadeTotal", 
            headerName: "Quantidade Total", 
            width: 200 
        },
        {   field: "consumoDiario", 
            headerName: "Consumo Diario", 
            width: 200 
        },
        {   field: "valorUnitario", 
            headerName: "Valor Unitario", 
            width: 200 
        },
        {   field: "valorTotal", 
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
            field: "laboratorioId", 
            headerName: "Estoque", 
            width: 200 
        },
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
            const response = await getAll("ListaProduto");
            setProdutos(SetDataMultiSelect(response.data, "dad"));
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
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == 2) {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(false);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == 3) {
            setReadonlyVendaDe(true);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(true);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == 4) {
            setReadonlyVendaDe(true);
            setReadonlyVendaDeHora(true);
            setReadonlyVendaAte(true);
            setReadonlyVendaAteHora(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else if (tipo == 5) {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(true);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(false);
        } else if (tipo == 6) {
            setReadonlyVendaDe(true);
            setReadonlyVendaDeHora(true);
            setReadonlyVendaAte(true);
            setReadonlyVendaAteHora(true);
            setReadonlyTempoDeRep(true);
            setReadonlyQuantidadeDias(true);
        } else {
            setReadonlyVendaDe(false);
            setReadonlyVendaDeHora(false);
            setReadonlyVendaAte(false);
            setReadonlyVendaAteHora(false);
            setReadonlyTempoDeRep(false);
            setReadonlyQuantidadeDias(false);
        }
    }, [tipo])

    useEffect(() => {
        if (tipoValor == 2) {
            setReadonlyAPartirDe(false);
        } else {
            setReadonlyAPartirDe(true);
        }
    }, [tipoValor])

    async function filtrar() {
        setIsLoadingFilter(true);

        dataFiltro.tipo = tipo;
        dataFiltro.tipoDemanda = tipo == 2 ? tipoDemanda : null;
        dataFiltro.vendaDe = readonlyVendaDe == false ? vendaAte : "";
        dataFiltro.vendaDeHora = readonlyVendaDeHora == false ? vendaDeHora : "";
        dataFiltro.vendaAte = readonlyVendaAte == false ? vendaAte : "";
        dataFiltro.vendaAteHora = readonlyVendaAteHora == false ? vendaAteHora : "";
        dataFiltro.curvaAbc = curvaAbc;
        dataFiltro.consideraEncomendaFaltas = consideraEncomendaFaltas;
        dataFiltro.tempoDeRep = readonlyTempoDeRep == false ? tempoDeRep : 0;
        dataFiltro.quantidadeDias = readonlyQuantidadeDias == false ? quantidadeDias : 0;
        dataFiltro.tipoValor = tipoValor;
        dataFiltro.aPartirDe = readonlyAPartirDe == false ? aPartirDe : "";
        dataFiltro.saldoQuantidadeComprometida = saldoQuantidadeComprometida;
        dataFiltro.laboratorioId = laboratorioId;
        dataFiltro.fornecedoresIds = fornecedoresIds;
        dataFiltro.gruposIds = gruposIds;
        dataFiltro.produtosIds = [] //Preencher com dados mocados, ainda não temos componente
        dataFiltro.empresaId = empresaId;
        dataFiltro.considerarApenasEmpresaSelecionada = considerarApenasEmpresaSelecionada;

        // const response = await postFormAll("ManutencaoCompras/MontaFiltro", dataFiltro);

        // if (response.status === 200) {
        //     setIsLoading(false);
        //     setItemsCompras(response.data.result);
        // } else {
        //     setIsOpenFail(true);
        //     setIsLoading(false);
        //     setTimeout(() => {
        //         setIsOpenFail(false);
        //     }, 2000)
        // }
    }

    async function submit() {
        setIsLoading(true);

        data.id = 0;
        data.listaItems = itemsCompras;
        data.tipo = tipo;
        data.tipoDemanda = tipo == 2 ? tipoDemanda : null;
        data.vendaDe = readonlyVendaDe == false ? vendaAte : "";
        data.vendaDeHora = readonlyVendaDeHora == false ? vendaDeHora : "";
        data.vendaAte = readonlyVendaAte == false ? vendaAte : "";
        data.vendaAteHora = readonlyVendaAteHora == false ? vendaAteHora : "";
        data.curvaAbc = curvaAbc;
        data.consideraEncomendaFaltas = consideraEncomendaFaltas;
        data.tempoDeRep = readonlyTempoDeRep == false ? tempoDeRep : 0;
        data.quantidadeDias = readonlyQuantidadeDias == false ? quantidadeDias : 0;
        data.tipoValor = tipoValor;
        data.aPartirDe = readonlyAPartirDe == false ? aPartirDe : "";
        data.saldoQuantidadeComprometida = saldoQuantidadeComprometida;
        data.laboratorioId = laboratorioId;
        data.fornecedoresIds = fornecedoresIds;
        data.gruposIds = gruposIds;
        data.produtosIds = [] //Preencher com dados mocados, ainda não temos componente
        data.empresaId = empresaId;
        data.considerarApenasEmpresaSelecionada = considerarApenasEmpresaSelecionada;

        const response = await postFormAll("", data);

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

    return (
        <>
            <HeaderMainContent title="Manutenção de Compra" IncludeButton={false} ReturnButton={true} to="compras" />
            <Container>
                <div className="row">
                    <div className="col-2 mt-4">
                        <SelectInput
                            options={["", "Venda", "Demanda", "Estoque Mínimo", "Estoque Máximo", "Consumo", "Encomendas/Faltas"]}
                            label="Tipo"
                            Select={(select) => setTipo(select)}
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
                            type="date"
                            value={vendaDe}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaDe(e.target.value)
                            }
                            readonly={readonlyVendaDe}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Hora"
                            type="time"
                            placeholder="00:00"
                            value={vendaDeHora}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaDeHora(e.target.value)
                            }
                            readonly={readonlyVendaDeHora}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda até"
                            type="date"
                            value={vendaAte}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaAte(e.target.value)
                            }
                            readonly={readonlyVendaAte}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Hora"
                            type="time"
                            placeholder="00:00"
                            value={vendaAteHora}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setVendaAteHora(e.target.value)
                            }
                            readonly={readonlyVendaAteHora}
                        />
                    </div>
                    <div className="col-1 mt-4">
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
                    <div className="col-1 mt-4">
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
                            Select={(select) => setCurvaAbc(select)}
                            selectString={false}
                        />
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-2">
                        <CustomDropDown
                            data={laboratorios}
                            title="Selecione os Laboratorios"
                            filter="descricao"
                            label="Laboratório"
                            Select={(laboratorioId) => setLaboratorioId(laboratorioId)}
                        />
                    </div>
                    <div className="col-2 mt-3">
                        <CheckboxCustom
                            options={["Considerar Encomenda/Faltas"]}
                            check={consideraEncomendaFaltas}
                            onClickOptions={(e) => setConsideraEncomendaFaltas(e.target.checked)}
                        />
                    </div>
                    <div className="col-3 mt-3">
                        <CheckboxCustom
                            options={["Saldo com Quantidade Comprometida"]}
                            check={saldoQuantidadeComprometida}
                            onClickOptions={(e) => setSaldoQuantidadeComprometida(e.target.checked)}
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
                    <div className="col-4 mt-4">
                        <MultiSelect
                            label="Grupos"
                            title="Grupos"
                            data={grupos}
                            isMultiple={true}
                            Select={(gruposIds) => setGruposIds(gruposIds)}
                            placeholder="Selecione o(s) grupo(s)"
                        />
                    </div>
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
                </div>
                <div className="row">
                    <div className="col-4">
                        { <MultiSelect 
                            label="Produtos"
                            title="Produtos"
                            data={produtos}
                            isMultiple={true}
                            Select={(produtosIds) => setProdutosIds(produtosIds)}
                            placeholder="Selecione o(s) produto(s)"
                        /> }
                    </div>
                    <div className="col-4">
                        {/* { <CustomDropDown
                            data={empresas}
                            title="Selecione a Empresa"
                            filter="nome"
                            label="Empresa"
                            Select={(empresaId) => setEmpresaId(empresaId)}
                        /> } */}
                    </div>
                    <div className="col-3">
                        <CheckboxCustom
                            options={["Considerar apenas empresa selecionada"]}
                            check={considerarApenasEmpresaSelecionada}
                            onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setConsiderarApenasEmpresaSelecionada(e.target.checked)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mt-2">
                        <ButtonFilter onCLick={filtrar} isLoading={isLoadingFilter} />
                    </div>
                </div>
            </Container>
            <div className="row">
                <div className="col-12 mt-4">
                    <FieldsetCustom legend="Itens Compra">
                        <section>
                            <ThemeProvider theme={setTheme()}>
                                <Box sx={{ height: 400, mt: 1 }}>
                                    <DataGrid rows={itemsCompras} columns={columns} onEditCellPropsChange={handleEditCellChange} editMode="row" components={{ Toolbar: CustomToolbar }} localeText={setTranslate()} />
                                </Box>
                            </ThemeProvider>
                        </section>
                    </FieldsetCustom>
                </div>
            </div>
            <div className="row">
                <div className="col-4 mb-2">
                    <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                </div>
            </div>
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}