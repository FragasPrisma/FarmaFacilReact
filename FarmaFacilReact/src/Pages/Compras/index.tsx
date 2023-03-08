import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { setTheme, setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { getAll} from "../../Services/Api";
import { ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { DataGrid, GridActionsCellItem, GridRowId, GridRowParams, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurvaAbcString, getStatusCompraString, getTipoCompraString } from "../../helper/TransformaEnum";

export function Compras() {
    const navigate = useNavigate()

    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const Init = async () => {
            const request = await getAll("ListaCompra");
            setCompras(request.data);
        }

        Init();
    }, [])

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    const consultarPedido = React.useCallback(
        (id: GridRowId) => () => {
            navigate(`/compras/pedidoCompra/${id}`)
        },
        [],
    )

    const cotacoesCompra = React.useCallback(
        (id: GridRowId) => () => {
            navigate(`/compras/cotacaoCompras/${id}`)
        },
        [],
    )

    const encaminharRelatorio = React.useCallback(
        (id: GridRowId) => () => {
            navigate(`/compras/relatorioCompras/${id}`)
        },
        [],
    )

    const deletarCompra = React.useCallback(
        (id: GridRowId) => () => {

        },
        [],
    )

    const visualizarCompra = React.useCallback(
        (id: GridRowId) => () => {
            navigate(`/compras/details/${id}`)
        },
        [],
    )

    const editarCompra = React.useCallback(
        (id: GridRowId) => () => {
            navigate(`/compras/edit/${id}`)
        },
        [],
    )

    const columns = [
        {   field: "id", 
            headerName: "Compra", 
            width: 100
        },
        {   field: "dataCadastro", 
            headerName: "Data", 
            width: 150, 
            type: "dateTime", 
            valueGetter: ({ value }: any) => value && new Date(value).toLocaleDateString(), 
        },
        {   field: "tipoCompra", 
            headerName: "Tipo", 
            width: 200, 
            valueGetter: ({ row }: any) => {  
                return getTipoCompraString(row.tipoCompra);
            },
        },
        {   field: "curvaAbc", 
            headerName: "Curva", 
            width: 200,
            valueGetter: ({ row }: any) => {  
                return getCurvaAbcString(row.curvaAbc);
            },
        },
        {   field: "totalCompra", 
            headerName: "Total", 
            width: 200 
        },
        {   field: "statusCompra", 
            headerName: "Status Pedido/Cotação",
            width: 200,
            valueGetter: ({ row }: any) => {  
                return getStatusCompraString(row.curvaAbc);
            },
        },
        {
            field: 'actions',
            headerName: 'Ações',
            type: 'actions',
            width: 200,
            getActions: (params: GridRowParams) => [
                <GridActionsCellItem
                    icon={<VisibilityIcon />}
                    onClick={visualizarCompra(params.id)}
                    label="Visualizar"
                />,
                <GridActionsCellItem
                    icon={<ModeEditIcon />}
                    onClick={editarCompra(params.id)}
                    label="Editar"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    onClick={deletarCompra(params.id)}
                    label="Excluir"
                />,
                <GridActionsCellItem 
                    icon={<PlagiarismIcon />} 
                    onClick={consultarPedido(params.id)} 
                    label="Consultar Pedido"
                    showInMenu
                />,
                <GridActionsCellItem 
                    icon={<TravelExploreIcon />} 
                    onClick={cotacoesCompra(params.id)} 
                    label="Cotação de Compras"
                    showInMenu
                />,
                <GridActionsCellItem 
                    icon={<FileCopyIcon />} 
                    onClick={encaminharRelatorio(params.id)} 
                    label="Relatório de Compras"
                    showInMenu
                />,
            ]
        } 
    ];

    return (
        <>
            <HeaderMainContent title="Compras" IncludeButton={true} ReturnButton={false}/>
            <FieldsetCustom legend="Compras">
                <section>
                    <ThemeProvider theme={setTheme()}>
                        <Box sx={{ height: 400, mt: 1 }}>
                            <DataGrid rows={compras} columns={columns} editMode="row" components={{ Toolbar: CustomToolbar }} localeText={setTranslate()} />
                        </Box>
                    </ThemeProvider>
                </section>
            </FieldsetCustom>
        </>
    )
}