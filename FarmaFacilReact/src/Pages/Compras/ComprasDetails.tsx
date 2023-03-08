import { Box, ThemeProvider } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { IItemsCompra } from "../../Interfaces/Compras/IItemsCompra";
import { IFiltroCompras } from "../../Interfaces/Compras/IFiltroCompras";
import { GetId } from "../../Services/Api";
import { Container, FooterGridTotal } from "./styles";
import { setTheme, setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { getCurvaAbcString, getTipoCompraString } from "../../helper/TransformaEnum";

export function ManutencaoComprasDetails() {
    const [filtro, setFiltro] = useState({} as IFiltroCompras)

    const [descricaoLaboratorio, setDescricaoLaboratorio] = useState("");

    const [itemsCompras, setItemsCompras] = useState([] as IItemsCompra[]);

    const [hideUnidade, setHideUnidade] = useState(false);
    const [hideQuantidadeTotal, setHideQuantidadeTotal] = useState(false);
    const [hideConsumoDiario, setHideConsumoDiario] = useState(false);
    const [hideLaboratorio, setHideLaboratorio] = useState(true);

    const [valorTotal, setValorTotal] = useState(0);

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
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

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaCompraPorId", idParams);

            if (response.status === 200) {
                if (response.data.laboratorioId > 0) {
                    setDescricaoLaboratorio(response.data.laboratorio.descricao)
                }

                setFiltro(response.data);
                setItemsCompras(response.data.itensCompras);
                setValorTotal(response.data.totalCompra);

                switch (response.data.tipoCompra) {
                    case (response.data.tipoCompra == 1) :
                        setHideLaboratorio(true);
                        setHideUnidade(false);
                        setHideQuantidadeTotal(false);
                        setHideConsumoDiario(false);
                        break;
                    case (response.data.tipoCompra == 2) :
                        setHideLaboratorio(true);
                        setHideUnidade(false);
                        setHideQuantidadeTotal(false);
                        setHideConsumoDiario(false);
                        break;
                    case (response.data.tipoCompra == 3) :
                        setHideLaboratorio(true);
                        setHideUnidade(false);
                        setHideQuantidadeTotal(false);
                        setHideConsumoDiario(false);
                        break;
                    case (response.data.tipoCompra == 4) :
                        setHideLaboratorio(true);
                        setHideUnidade(false);
                        setHideQuantidadeTotal(false);
                        setHideConsumoDiario(false);
                        break; 
                    case (response.data.tipoCompra == 5) :
                        setHideLaboratorio(false);
                        setHideUnidade(true);
                        setHideQuantidadeTotal(true);
                        setHideConsumoDiario(true);
                        break;
                    case (response.data.tipoCompra == 6) :
                        setHideLaboratorio(true);
                        setHideUnidade(false);
                        setHideQuantidadeTotal(false);
                        setHideConsumoDiario(false);
                        break;
                }
            }
        }

        Init();
    }, [])

    return (
        <>
            <HeaderMainContent title="Visualizar Compra" IncludeButton={false} ReturnButton={true} to="compras"/>
            <Container>
                <div className="row">
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Tipo"
                            type="text"
                            value={getTipoCompraString(filtro.tipoCompra)}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        {filtro.tipoCompra == 2 &&
                            <RadioCustom
                                name="Tipo Demanda"
                                options={["Estoque Mínimo", "Estoque Máximo"]}
                                titleComponet="Tipo Demanda"
                                readonly={true}
                                value={filtro.tipoDemanda}
                            />
                        }
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda de"
                            type="datetime-local"
                            value={filtro.vendaDe}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda até"
                            type="datetime-local"
                            value={filtro.vendaAte}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Tempo de Rep"
                            type="number"
                            value={filtro.tempoDeReposicao}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Quantidade de dias"
                            type="number"
                            value={filtro.quantidadeDias}
                            readonly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <CustomInput
                            label="Curva Abc"
                            type="text"
                            value={getCurvaAbcString(filtro.curvaAbc)}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-4">
                        <CustomInput
                            label="Laboratório"
                            type="text"
                            value={descricaoLaboratorio}
                            readonly={true}
                        />
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
                </div>
                <div className="row">
                    <div className="col-2">
                        <RadioCustom
                            name="Tipo Valor"
                            options={["Custo Referência", "Última Compra", "Melhor Compra"]}
                            titleComponet="Tipo Valor"
                            readonly={true}
                            value={filtro.tipoValor}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="A Partir de"
                            type="date"
                            value={filtro.aPartirDe}
                            readonly={true}
                        />
                    </div>
                    <div className="col-4 mt-3">
                        <CheckboxCustom
                            options={["Considerar apenas empresa selecionada"]}
                            check={filtro.considerarApenasEmpresaSelecionada}
                            readOnly={true}
                        />
                        <CheckboxCustom
                            options={["Considerar Encomenda/Faltas"]}
                            check={filtro.consideraEncomendaFaltas}
                            readOnly={true}
                        />
                        <CheckboxCustom
                            options={["Saldo com Quantidade Comprometida"]}
                            check={filtro.saldoQuantidadeComprometida}
                            readOnly={true}
                        />
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
        </>
    )
}