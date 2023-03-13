import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import { Container } from "./styles";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { setTheme, setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import { ThemeProvider } from '@mui/material/styles';
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { getAll } from "../../Services/Api";

export function NegociacaoCompras() {
    const [fornecedores, setFornecedores] = useState([]);
    const [itensFornecedores, setItensFornecedores] = useState([]);

    //const [corFornecedor, setCorFornecedor] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("");
    const [frete, setFrete] = useState("");
    const [previsaoEntrega, setPrevisaoEntrega] = useState();
    const [observacoes, setObservacoes] = useState("");
    const [somenteFornecedorSelecionado, setSomenteFornecedorSelecionado]= useState(false);
    const [considerarMelhorValidade, setConsiderarMelhorValidade] = useState(false);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    const StyledSpeedDial = styled(SpeedDial)(({ theme }: any) => ({
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
        '& .MuiFab-root': {
            backgroundColor: 'rgb(207, 2, 9)',
            '&:hover': {
                backgroundColor: 'rgb(207, 2, 9)',
            },
        },
    }));

    const actions = [
        { icon: <PostAddOutlinedIcon />, name: 'Nova Negociação' },
        { icon: <AddShoppingCartOutlinedIcon />, name: 'Ultimas Compras' },
        { icon: <ShoppingBasketOutlinedIcon />, name: 'Ultimas Vendas' },
        { icon: <PrintOutlinedIcon />, name: 'Enviar ou Imprimir Pedido' }
    ];

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
            width: 100
        },
        {
            field: "referencia",
            headerName: "Ref",
            width: 75
        },
        {
            field: "fornecedorId",
            headerName: "Código",
            width: 75
        },
        {
            field: "nomeFornecedor",
            headerName: "Fornecedor",
            width: 400
        },
        {
            field: "cnpj",
            headerName: "Cnpj",
            width: 100
        },
        {
            field: "valorMinimo",
            headerName: "Valor Minimo Ped.",
            width: 150
        },
        {
            field: "valorSelecionado",
            headerName: "Valor Selecionado",
            width: 150
        },
        {
            field: "minimo",
            headerName: "Mínimo",
            width: 75
        }
    ]

    const columnsItensFornecedores = [
        {
            field: "id",
            headerName: "Id",
            width: 100
        },
        {
            field: "valor",
            headerName: "$",
            width: 50
        },
        {
            field: "grupoId",
            headerName: "Grupo",
            width: 75
        },
        {
            field: "produtoId",
            headerName: "Produto",
            width: 75
        },
        {
            field: "codigoCas",
            headerName: "CAS",
            width: 100
        },
        {
            field: "codigoDcb",
            headerName: "DCB",
            width: 75
        },
        {
            field: "descricao",
            headerName: "Descrição",
            width: 250
        },
        {
            field: "siglaUnidade",
            headerName: "Un",
            width: 50
        },
        {
            field: "quantidadeCompra",
            headerName: "Qtd Compra",
            width: 100
        },
        {
            field: "valorCompra",
            headerName: "Valor Compra",
            width: 100
        }
    ]

    useEffect(() => {
        // const Init = async () => {
        //     const response = await getAll(`BuscaFornecedorIdCompras/${idParams}`);
        //     console.log(response.data);
        // }

        // Init();
    },[])

    return (
        <>
            <HeaderMainContent title="Negociação de Compra" IncludeButton={false} ReturnButton={true} to={`compras/cotacaoCompras/${idParams}`} />
            <Container>
                <div className="row mt-3">
                    <FieldsetCustom legend="Fornecedores">
                        <div className="row">
                            <div className="col-8">
                                <ThemeProvider theme={setTheme()}>
                                    <Box sx={{ height: 400, mt: 1 }}>
                                        <DataGrid
                                            rows={fornecedores}
                                            columns={columns}
                                            components={{ Toolbar: CustomToolbar }}
                                            localeText={setTranslate()}
                                            columnVisibilityModel={{
                                                id: false
                                            }}
                                        />
                                    </Box>
                                </ThemeProvider>
                            </div>
                            <div className="col-4">
                                <div className="row">
                                    <CustomInput
                                        label={"Forma de Pagamento"}
                                        type={"text"}
                                        value={formaPagamento}
                                        //color={corFornecedor}
                                    />
                                </div>
                                <div className="row">
                                    <CustomInput
                                        label={"Frete"}
                                        type={"text"}
                                        value={frete}
                                        //color={corFornecedor}
                                    />
                                </div>
                                <div className="row">
                                    <CustomInput
                                        label={"Previsão Entrega"}
                                        type={"date"}
                                        value={previsaoEntrega}
                                        //color={corFornecedor}
                                    />
                                </div>
                                <div className="row">
                                    <CustomInput
                                        label={"Observações"}
                                        type={"text"}
                                        value={observacoes}
                                        //color={corFornecedor}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <CheckboxCustom 
                                            options={["Exibir somente fornecedor selecionado"]}
                                            check={somenteFornecedorSelecionado}
                                            onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setSomenteFornecedorSelecionado(e.target.checked)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-10">
                                        <CheckboxCustom
                                            options={["Considerar melhor validade"]}
                                            check={considerarMelhorValidade}
                                            onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setConsiderarMelhorValidade(e.target.checked)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FieldsetCustom>
                </div>
                <div className="row mt-2">
                    <FieldsetCustom legend="Itens">
                        <ThemeProvider theme={setTheme()}>
                            <Box sx={{ height: 400, mt: 1 }}>
                                <DataGrid
                                    rows={itensFornecedores}
                                    columns={columnsItensFornecedores}
                                    components={{ Toolbar: CustomToolbar }}
                                    localeText={setTranslate()}
                                    columnVisibilityModel={{
                                        id: false
                                    }}
                                />
                            </Box>
                        </ThemeProvider>
                    </FieldsetCustom>
                </div>
            </Container>
            <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
                <StyledSpeedDial
                    icon={<SpeedDialIcon />}
                    direction="left"
                    ariaLabel={""}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </StyledSpeedDial>
            </Box>
        </>
    )
}
