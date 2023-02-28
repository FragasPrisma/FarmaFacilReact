import { useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import Paginations from "../../Components/Others/Pagination";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { setTheme, setTranslate } from "../../helper/GridsTranslate/TranslateFunctions";
import { getAll, postFormAll } from "../../Services/Api";
import { ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { DataGrid, GridActionsCellItem, GridRowId, GridRowParams, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export function Compras() {
    const navigate = useNavigate()

    const [compras, setCompras] = useState([]);

    useEffect(() => {
        const Init = async () => {
            const request = await getAll("ManutencaoCompras/ListaCompras");
            setCompras(request.data.result);
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

    const encaminharRelatorio = React.useCallback(
        (id: GridRowId) => () => {
            {console.log(`Entrou ${id}`)}
            navigate(`/compras/relatorioCompras/${id}`)
        },
        [],
    )


    const columns = [
        { field: "id", headerName: "Compra", width: 100 },
        { field: "data", headerName: "Data", width: 150 },
        { field: "tipo", headerName: "Tipo", width: 200 },
        { field: "curvaabc", headerName: "Curva", width: 200 },
        { field: "totalcompra", headerName: "Total", width: 200 },
        { field: "status", headerName: "Status Pedido/Cotação", width: 200 },
        {
            field: 'actions',
            headerName: 'Ações',
            type: 'actions',
            getActions: (params: GridRowParams) => [
              <GridActionsCellItem icon={<FileCopyIcon />} onClick={encaminharRelatorio(params.id)} label="Delete" />,
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