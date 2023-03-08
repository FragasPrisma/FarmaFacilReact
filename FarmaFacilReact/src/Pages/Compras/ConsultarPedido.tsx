import { SelectInput } from "../../Components/Inputs/SelectInput";
import { ChangeEvent, useEffect, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { IProduto } from "../../Interfaces/Produto/IProduto";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";

import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridRowParams,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  setTheme,
  setTranslate,
} from "../../helper/GridsTranslate/TranslateFunctions";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { Fornecedor } from './../Fornecedor/index';


export function ConsultarPedido() {
  const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
  const [grupos, setGrupos] = useState([] as IGrupo[]);
  const [produto, setProduto] = useState([] as IProduto[]);

  const [nomeProduto, setNomeProduto] = useState("Selecione o Produto");
  const [nomeFornecedores, setNomeFornecedores] = useState("Selecione o Fornecedor");
  const [produtoId, setProdutoId] = useState(0);
  const [fornecedorId, setFornecedorId] = useState(0);

  const [emissaoInicial, setEmissaoInicial] = useState("");
  const [emissaoFinal, setEmissaoFinal] = useState("");
  const [grupo, setGrupo] = useState("");
  const [pedido, setPedido] = useState("");
  const [status, setStatus] = useState("");
  const [ID, setID] = useState("");
  const [compras, setCompras] = useState([]);

  const [isLoadingFilter, setIsLoadingFilter] = useState(false);

  useEffect(() => {
    const loadDataFornecedores = async () => {
      const response = await getAll("ListaFornecedor");
      setFornecedores(response.data);
    };

    const loadDataGrupos = async () => {
      const response = await getAll("ListaGrupo");
      setGrupos(response.data);
    };

    const loadDataProdutos = async () => {
      const response = await getAll("ListaProdutos");
      setProduto(response.data);
    };

    loadDataFornecedores();
    loadDataGrupos();
    loadDataProdutos();
  }, []);

  // table pedido
  const columnsPedido = [
    { field: "compraId", headerName: "Pedido", width: 100 },
    {
      field: "codFornecedor",
      headerName: "Cod Fornecedor",
      width: 150,
    },
    {
      field: "nomeFornecedor",
      headerName: "Nome Fornecedor",
      width: 300,
    },
    {
      field: "dataCadastro",
      headerName: "Data Geração",
      width: 200,
    },
    { field: "previsaoEntrega", headerName: "Prev Entrega", width: 100 },
    {
      field: "statusPedido",
      headerName: "Status",
      width: 200,
    },
    { field: "id", headerName: "ID", width: 100 },
  ];

  // table grupo
  const columnsGrupo = [
    { field: "grupo", headerName: "Grupo", width: 100 },
    {
      field: "produtoId",
      headerName: "Produto",
      width: 200,
    },
    {
      field: "descricao",
      headerName: "Descrição",
      width: 200,
    },
    {
      field: "unidade",
      headerName: "Unidade",
      width: 200,
    },
    { field: "qualidade", headerName: "Qualidade", width: 200 },
    {
      field: "valor",
      headerName: "Valor",
      width: 200,
    },
    { field: "validade", headerName: "Validade", width: 200 },
    { field: "statusItem", headerName: "Status Item", width: 200 },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

 async function  Filtrar() {
    setIsLoadingFilter(true);

    const dataFiltro = {
        fornecedorId: Number(fornecedorId),
        grupoId: Number(grupo),
        produtoId: Number(produtoId),
        dataInicial: emissaoInicial,
        dataFinal: emissaoFinal,
        compraId: Number(pedido),
        compraFornecedorId: Number(ID),
        statusPedido: 0
      }

    const consultaPedido = await postFormAll("ConsultarCompraFornecedor", dataFiltro)

    const fornecedores = consultaPedido.data.map((x: { fornecedor: object; }) => x.fornecedor)
    

      setCompras(consultaPedido.data)

      setFornecedores(fornecedores)

     console.log(consultaPedido.data)

    setIsLoadingFilter(false);
  }

  

  return (
    <>
      <HeaderMainContent
        title="Pedido de Compra"
        IncludeButton={false}
        ReturnButton={true}
        to="compras"
      />

      <Container>
        <div className="row">
          <div className="col-4">
            <CustomDropDown
              data={fornecedores}
              title={nomeFornecedores}
              filter="nomeFornecedor"
              label="Fornecedor"
              //error={erroFornecedor}
              Select={(fornecedorInternoId, select) => {
                if (fornecedorInternoId != null) {
                  setFornecedorId(fornecedorInternoId);
                  setNomeFornecedores(select);
                }
              }}
              RemoveSelect={() => {
                setFornecedorId(0);
                setNomeFornecedores("Selecione um Fornecedor");
              }}
            />
          </div>

          <div className="col-2">
            <CustomInput
              label="Emissão Inicial"
              type="date"
              required={true}
              value={emissaoInicial}
              OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmissaoInicial(e.target.value)
              }
            />
          </div>

          <div className="col-2">
            <CustomInput
              label="Emissão Final"
              type="date"
              required={true}
              value={emissaoFinal}
              OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmissaoFinal(e.target.value)
              }
            />
          </div>

          <div className="col-2">
            <CustomInput
              label="Pedido"
              type="text"
              value={pedido}
              OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPedido(e.target.value)
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <CustomInput
              label="Grupo"
              type="text"
              value={grupo}
              OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setGrupo(e.target.value)
              }
            />
          </div>

          <div className="col-3">
            <CustomDropDown
              data={produto}
              title={nomeProduto}
              filter="descricao"
              label="Produto"
              //error={erroFornecedorInternoId}
              Select={(produtoId, select) => {
                if (produtoId != null) {
                  setProdutoId(produtoId);
                  setNomeProduto(select);
                }
              }}
              RemoveSelect={() => {
                setProdutoId(0);
                setNomeProduto("Selecione o Produto");
              }}
            />
          </div>

          <div className="col-1">
            <CustomInput
              label="ID"
              type="text"
              value={ID}
              OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setID(e.target.value)
              }
            />
          </div>

          <div className="col-2 p-2">
            <SelectInput
              label="Status"
              options={[
                "Todos",
                "Em Aberto",
                "Parcial",
                "Completo",
                "Cancelado",
              ]}
              Select={(select: string) => setStatus(select)}
            />
          </div>
          <div className="col-2 mt-4">
            <ButtonConfirm onCLick={Filtrar} isLoading={isLoadingFilter} />
          </div>

          <section>
            <ThemeProvider theme={setTheme()}>
              <Box sx={{ height: 400, mt: 1 }}>
                <DataGrid
                  rows={fornecedores}
                  columns={columnsPedido}
                  editMode="row"
                  components={{ Toolbar: CustomToolbar }}
                  localeText={setTranslate()}
                />
              </Box>
            </ThemeProvider>
          </section>

          <section>
            <ThemeProvider theme={setTheme()}>
              <Box sx={{ height: 400, mt: 1 }}>
                <DataGrid
                  rows={compras}
                  columns={columnsGrupo}
                  editMode="row"
                  components={{ Toolbar: CustomToolbar }}
                  localeText={setTranslate()}
                />
              </Box>
            </ThemeProvider>
          </section>

        </div>
      </Container>

      {/* <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            <ConfirmModal openModal={isOpenConfirmModal} onClose={(confirmation: boolean) => removerItems(confirmation)} text="Confirmar exclusão da lista de produtos?"/> */}
    </>
  );
}
