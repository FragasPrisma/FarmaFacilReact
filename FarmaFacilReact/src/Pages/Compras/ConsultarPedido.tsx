import { SelectInput } from "../../Components/Inputs/SelectInput";
import { ChangeEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { IProduto } from "../../Interfaces/Produto/IProduto";
import { getAll, postFormAll, postFormById } from "../../Services/Api";
import { Container } from "./styles";
import { Check, Save } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Fab,
  Modal,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  DataGrid,
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
import { InverterDate } from "../../helper/InverterDate";
import { InvertDateJSON } from "../../helper/InvertDateJSON";
import { t } from "i18next";

export function ConsultarPedido() {
  const [fornecedoresSelect, setFornecedoresSelect] = useState(
    [] as IFornecedor[]
  );
  const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
  const [grupos, setGrupos] = useState([] as IGrupo[]);
  const [produto, setProduto] = useState([] as IProduto[]);

  const [nomeProduto, setNomeProduto] = useState("Selecione o Produto");
  const [nomeFornecedores, setNomeFornecedores] = useState(
    "Selecione o Fornecedor"
  );
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
  const [rowId, setRowId] = useState(null);
  const [rowProduto, setRowProduto] = useState(null);
  const [loadingProduto, setLoadingProduto] = useState(false);
  const [successProduto, setSuccessProduto] = useState(false);
  const [successFornecedor, setSuccessFornecedor] = useState(false);
  const [loadingFornecedor, setLoadingFornecedor] = useState(false);

  const [params, setParams] = useState("");

  useEffect(() => {
    const loadDataFornecedores = async () => {
      const response = await getAll("ListaFornecedor");
      setFornecedoresSelect(response.data);
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

  const [paramsRowFornecedor, setParamsRowFornecedor] = useState({} as any);
  const [paramsRowProduto, setParamsRowProduto] = useState({} as any);

  const handleSubmitFornecedor = async () => {
    setLoadingFornecedor(true);

    const date = new Date(paramsRowFornecedor?.prevEntrega);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString()}`;

    let valueStatus: number;

    switch (paramsRowFornecedor?.status) {
      case "Todos":
        valueStatus = 0;
        break;
      case "Em Aberto":
        valueStatus = 1;
        break;
      case "Parcial":
        valueStatus = 2;
        break;
      case "Completo":
        valueStatus = 3;
        break;
      case "Cancelado":
        valueStatus = 4;
        break;
      default:
        valueStatus = 0;
    }

    const editarFornecedor = await postFormById(
      `EditarStatusCompraFornecedor/${paramsRowFornecedor?.id}/${InvertDateJSON(
        formattedDate
      )}/${valueStatus}`
    );

    if (editarFornecedor.status == 200) {
      setSuccessFornecedor(true);
      setRowId(paramsRowFornecedor?.id);
    }

    //setSuccessFornecedor(false);
    setLoadingFornecedor(false);
  };

  const [modalAberta, setModalAberta] = useState(false);
  const [senha, setSenha] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleSubmitSenha = () => {
    const password = "prixpto";

    if (password !== senha) {
      setMessageError("Você não possui permissão");
    } else {
      //if (paramsRowProduto == null) {
        setModalAberta(false);
        handleSubmitFornecedor();
        handleSubmitProduto();
      //} 
      // else {
      //   setModalAberta(false);
      // }
    }

    // setModalAberta(false);
    // handleSubmitFornecedor()
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "background.paper",
    borderRadius: "4px",
    border: "2px solid #000",
    //boxShadow: 24,
    p: 4,
  };

  function handleMouseDownFornecedor(test: any) {
    setModalAberta(true);
    setParamsRowFornecedor(test);
  }

  function handleMouseDownProduto(test: any) {
    setModalAberta(true);
    setParamsRowProduto(test);
  }

  // table forncedor
  const columnsPedido = useMemo(
    () => [
      {
        field: "compraId",
        headerName: "Pedido",
        width: 100,
      },
      {
        field: "fornecedorId",
        headerName: "Cod Fornecedor",
        width: 100,
      },
      {
        field: "nomeFornecedor",
        headerName: "Nome Fornecedor",
        width: 300,
      },
      {
        field: "datageracao",
        headerName: "Data Geração",
        width: 150,
        //type: "date"
      },
      {
        field: "prevEntrega",
        headerName: "Prev Entrega",
        width: 150,
        editable: true,
        type: "date",
      },
      {
        field: "status",
        headerName: "status",
        editable: true,
        width: 200,

        type: "singleSelect",
        valueOptions: [
          "Em Aberto",
          "Parcial",
          "Completo",
          "Cancelado",
        ],
      },
      {
        field: "id",
        headerName: "ID",
        width: 100,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: any) => (
          <Box
            sx={{
              m: 1,
              position: "relative",
            }}
          >
            {successFornecedor && params.id === rowId ? (
              <Fab
                color="primary"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#048604",
                  "&:hover": { bgcolor: "#008000" },
                }}
              >

                  <Check /> 
              </Fab>
            ) : (
              <>
                <Fab
                  color="primary"
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: params.id == rowId ? "#2196f3" : "#b1b1b1",
                  }}
                  disabled={params.id !== rowId || loadingFornecedor}
                  //onMouseDown={() =>  handleSubmitFornecedor(params.row)}
                  onClick={() => handleMouseDownFornecedor(params.row)}
                >
                  <Save />
                </Fab>
              </>
            )}
            {loadingFornecedor && (
              <CircularProgress
                size={52}
                sx={{
                  color: "#008000",
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        ),
      },
    ],

    [
      loadingFornecedor,
      successFornecedor,
      rowId,
      modalAberta,
      senha,
      messageError,
    ]
  );

  const handleSubmitProduto = async () => {
    setLoadingProduto(true);

    let valueStatus: number;

    switch (paramsRowProduto?.statusItem) {
      case "Todos":
        valueStatus = 0;
        break;
      case "Em Aberto":
        valueStatus = 1;
        break;
      case "Parcial":
        valueStatus = 2;
        break;
      case "Completo":
        valueStatus = 3;
        break;
      case "Cancelado":
        valueStatus = 4;
        break;
      default:
        valueStatus = 0;
    }

    const editarPedido = await postFormById(
      `EditarStatusItensCompraFornecedor/${paramsRowProduto?.id}/${valueStatus}`
    );

    if (editarPedido.status == 200) {
      setSuccessProduto(true);
      setRowId(paramsRowProduto?.id);
    }

    //setSuccessProduto(false);
    setLoadingProduto(false);
  };
  // table produtos
  const columnsGrupo = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 100,
      },
      {
        field: "grupo",
        headerName: "Grupo",
        width: 100,
      },
      {
        field: "produtoId",
        headerName: "Produto",
        width: 100,
      },
      {
        field: "descricao",
        headerName: "Descrição",
        width: 300,
      },
      {
        field: "unidade",
        headerName: "Unidade",
        width: 100,
      },
      {
        field: "quantidade",
        headerName: "Quantidade",
        width: 100,
      },
      {
        field: "valor",
        headerName: "Valor (R$)",
        width: 200,
      },
      {
        field: "validade",
        headerName: "Validade",
        width: 150,
      },
      {
        field: "statusItem",
        headerName: "Status Item",
        width: 100,
        editable: true,
        type: "singleSelect",
        valueOptions: [
          "Em Aberto",
          "Parcial",
          "Completo",
          "Cancelado",
        ],
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params: any) => (
          <Box
            sx={{
              m: 1,
              position: "relative",
            }}
          >
            {successProduto && params.id === rowId ? (
              <Fab
                color="primary"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#048604",
                  "&:hover": { bgcolor: "#008000" },
                }}
                  >

              {params.id === rowId ? (
                  <Check /> ):(
                    <></>
                  )
              }
              </Fab>
            ) : (
              <Fab
                color="primary"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: params.id == rowProduto ? "#2196f3" : "#b1b1b1",
                }}
                disabled={params.id !== rowProduto || loadingProduto}
                //onMouseDown={() => handleSubmitProduto(params.row)}
                onClick={() => handleMouseDownProduto(params.row)}
              >
                <Save />
              </Fab>
            )}
            {loadingProduto && (
              <CircularProgress
                size={52}
                sx={{
                  color: "#008000",
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        ),
      },
    ],

    [
      loadingProduto,
      successProduto,
      rowProduto,
      modalAberta,
      senha,
      messageError,
    ]
  );

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  async function Filtrar() {

    setErros({ erro: false, index: 0, erroNome: "" });

    if (!ValidString(emissaoInicial.trim(), 1) || !ValidString(emissaoFinal.trim(), 2)) return;


    setIsLoadingFilter(true);

    let valueStatus: number;

    switch (status) {
      case "Todos":
        valueStatus = 0;
        break;
      case "Em Aberto":
        valueStatus = 1;
        break;
      case "Parcial":
        valueStatus = 2;
        break;
      case "Completo":
        valueStatus = 3;
        break;
      case "Cancelado":
        valueStatus = 4;
        break;
      default:
        valueStatus = 0;
    }

    const dataFiltro = {
      fornecedorId: Number(fornecedorId),
      grupoId: Number(grupo),
      produtoId: Number(produtoId),
      dataInicial: emissaoInicial,
      dataFinal: emissaoFinal,
      compraId: Number(pedido),
      compraFornecedorId: Number(ID),
      statusPedido: valueStatus,
    };

    const consultaPedido = await postFormAll(
      "ConsultarCompraFornecedor",
      dataFiltro
    );

    //primeira tabela
    const modelFornecedor = consultaPedido.data.map(
      (modelFornecedor: {
        compraId: any;
        fornecedorId: any;
        itensCompraFornecedors: any;
        fornecedor: { nomeFornecedor: any };
        dataCadastro: any;
        dataPreveEntrega: any;
        statusPedido: any;
        id: any;
      }) => {
        let valueStatus: string;

        switch (modelFornecedor.statusPedido) {
          case 0 :
           valueStatus = "Todos";
        break;
          case 1:
            valueStatus = "Em Aberto";
            break;
          case 2:
            valueStatus = "Parcial";
            break;
          case 3:
            valueStatus = "Completo";
            break;
          case 4:
            valueStatus = "Cancelado";
            break;
            default:  valueStatus = "Em Aberto";
        }
        return {
          compraId: modelFornecedor.compraId,
          fornecedorId: modelFornecedor.fornecedorId,
          nomeFornecedor: modelFornecedor.fornecedor.nomeFornecedor,
          itenCompraFornecedor: modelFornecedor.itensCompraFornecedors,
          datageracao: InverterDate(modelFornecedor.dataCadastro),
          prevEntrega: InverterDate(modelFornecedor.dataPreveEntrega),
          status: valueStatus,
          id: modelFornecedor.id,
        };
      }
    );

    setFornecedores(modelFornecedor);
    setIsLoadingFilter(false);
  }

  function getValueRow(params: any) {
    //segunda tabela
    const modelProduto = params.itenCompraFornecedor.map((x: any) => {
      let valueStatus: string;

      switch (x.statusItemPedido) {
        case 0:
          valueStatus = "Todos";
          break;
        case 1:
          valueStatus = "Em Aberto";
          break;
        case 2:
          valueStatus = "Parcial";
          break;
        case 3:
          valueStatus = "Completo";
          break;
        case 4:
          valueStatus = "Cancelado";
          break;
        default:
          valueStatus = "Todos";
      }
      return {
        id: x.id,
        grupo: x.grupoId,
        produtoId: x.produtoId,
        descricao: !x.produto ? "Ex." : x.produto.descricao,
        unidade: x.siglaUnidade, //validar se realmente é esse q tem que ser buscado
        quantidade: x.quantidadeCompra, //validar se realmente é esse q tem que ser buscado
        valor: x.valorUnitario, //validar se realmente é esse q tem que ser buscado
        validade: InverterDate(x.dataValidade),
        statusItem: valueStatus,
      };
    });

    setParams(params);
    setCompras(modelProduto);
  }

  const [erros, setErros] = useState({ erro: false, index: 0, erroNome: "" })

  function ValidString(texto: string, index: number) {
    if (!texto.trim()) {
        setErros({ erro: true, index: index, erroNome: t('erros.campoObrigatorio') })
        return false;
    } else {
        return true;
    }
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
              data={fornecedoresSelect}
              title={nomeFornecedores}
              filter="nomeFornecedor"
              label="Fornecedor"
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

          <div className="col-3">
            <CustomInput
              label="Emissão Inicial"
              type="date"
              required={true}
              value={emissaoInicial}
              index={1}
              erros={erros}
              OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmissaoInicial(e.target.value)
              }
            />
          </div>

          <div className="col-3">
            <CustomInput
              label="Emissão Final"
              type="date"
              required={true}
              index={2}
              value={emissaoFinal}
              erros={erros}
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
                  columns={columnsPedido}
                  rows={fornecedores}
                  onCellEditCommit={(params) => setRowId(params.id as SetStateAction<any>)}
                  isRowSelectable={(params: GridRowParams<any>) => Boolean(getValueRow(params.row)) }
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
                  onCellEditCommit={(params) => setRowProduto(params.id as SetStateAction<any>)}
                  components={{ Toolbar: CustomToolbar }}
                  localeText={setTranslate()}
                />
              </Box>
            </ThemeProvider>
          </section>
        </div>
      </Container>

      <Modal
        open={modalAberta}
        onClose={() => setModalAberta(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="spring-modal-description"
            sx={{ mt: 2, mb: 2, fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Senha para liberação
          </Typography>

          <TextField
            label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            sx={{ width: "100%" }}
          />
          <h3
            style={{
              fontSize: "1.2rem",
              color: "red",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {messageError}
          </h3>
          <Button onClick={handleSubmitSenha}>Confirmar</Button>
        </Box>
      </Modal>
    </>
  );
}
