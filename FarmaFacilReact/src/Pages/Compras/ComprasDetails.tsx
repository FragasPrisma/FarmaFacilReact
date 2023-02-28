import { Box } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { SetDataMultiSelect } from "../../helper/GerarDataMultiSelect";
import { IItemsCompras } from "../../Interfaces/Compras/IItemsCompra";
import { IManutencaoCompras } from "../../Interfaces/Compras/IFiltroCompras";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IGrupo } from "../../Interfaces/Grupo/IGrupo";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";

export function ManutencaoComprasDetails() {
    const [filtro, setFiltro] = useState({} as IManutencaoCompras)

    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
    const [grupos, setGrupos] = useState([] as IGrupo[]);
    //const [produtos, setProdutos] = useState([] as IProduto[]);

    const [descricaoLaboratorio, setDescricaoLaboratorio] = useState(0);

    const [itemsCompras, setItemsCompras] = useState([] as IItemsCompras[]);

    const columns = [
        { field: "id", headerName: "Id", width: 60 },
        { field: "codigogrupo", headerName: "Código Grupo", width: 150 },
        { field: "estoque", headerName: "Estoque", width: 200 },
        { field: "descricaoproduto", headerName: "Descrição Produto", width: 200 },
        { field: "nomelaboratorio", headerName: "Nome Laboratório", width: 200 },
        { field: "curvaabcproduto", headerName: "Curva Abc Produto", width: 200 },
        { field: "estoqueminimoproduto", headerName: "Estoque Minimo Produto", width: 200 },
        { field: "estoquemaximoproduto", headerName: "Estoque Máximo Produto", width: 200 },
    ];

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaCompraPorId", idParams);

            if (response.status === 200) {
                if (response.data.laboratorio) {
                    setDescricaoLaboratorio(response.data.laboratorio.descricao)
                }

                // if (response.data.fornecedores.length > 0) {
                //     setFornecedores(SetDataMultiSelect(response.data.fornecedores, "nomeFornecedor"))
                // }

                // if (response.data.grupos.length > 0) {
                //     setFornecedores(SetDataMultiSelect(response.data.grupos, "descricao"))
                // }

                // if (response.data.produtos.length > 0) {
                //     setProdutos(SetDataMultiSelect(response.data.produtos, "nome"))
                // }

                setFiltro(response.data);
            }
        }

        Init();
    }, [])

    return (
        <>
            <HeaderMainContent title="Visualizar Manutenção de Compra" IncludeButton={false} ReturnButton={true} to="compras" />
            <Container>
                <div className="row">
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Tipo"
                            type="text"
                            value={filtro.tipo}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">
                        {filtro.tipo == "Demanda" &&
                            <RadioCustom
                                name="Tipo Demanda"
                                options={["Estoque Mínimo", "Estoque Máximo"]}
                                titleComponet="Tipo Demanda"
                                value={filtro.tipoDemanda ? filtro.tipoDemanda : null}
                                readonly={true}
                            />
                        }
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda de"
                            type="date"
                            value={filtro.vendaDe}
                            readonly={true}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Hora"
                            type="time"
                            value={filtro.vendaDeHora}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Venda até"
                            type="date"
                            value={filtro.vendaAte}
                            readonly={true}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Hora"
                            type="time"
                            value={filtro.vendaAteHora}
                            readonly={true}
                        />
                    </div>
                    <div className="col-1 mt-4">
                        <CustomInput
                            label="Tempo de Rep"
                            type="number"
                            value={filtro.tempoDeRep}
                            readonly={true}
                        />
                    </div>
                    <div className="col-1 mt-4">
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
                            value={filtro.curvaAbc}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-2">
                        <CustomInput
                            label="Laboratório"
                            type="text"
                            value={descricaoLaboratorio}
                            readonly={true}
                        />
                    </div>
                    <div className="col-2 mt-3">
                        <CheckboxCustom
                            options={["Considerar Encomenda/Faltas"]}
                            check={filtro.consideraEncomendaFaltas}
                            readOnly={true}
                        />
                    </div>
                    <div className="col-3 mt-3">
                        <CheckboxCustom
                            options={["Saldo com Quantidade Comprometida"]}
                            check={filtro.saldoQuantidadeComprometida}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <RadioCustom
                            name="Tipo Valor"
                            options={["Custo Referência", "Última Compra", "Melhor Compra"]}
                            titleComponet="Tipo Valor"
                            value={filtro.tipoValor}
                            readonly={true}
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
                    <div className="col-4 mt-4">
                        {/* <MultiSelect
                            label="Grupos"
                            title="Grupos" 
                            data={grupos}
                            isMultiple={true}
                            Select={(gruposIds) => setGruposIds(gruposIds)}
                            placeholder="Selecione o(s) grupo(s)"
                        /> */}
                    </div>
                    <div className="col-4 mt-4">
                        {/* <MultiSelect 
                            label="Fornecedores"
                            title="Fornecedores" 
                            data={fornecedores}
                            isMultiple={true}
                            Select={(fornecedoresIds) => setFornecedoresIds(fornecedoresIds)}
                            placeholder="Selecione o(s) fornecedor(es)"
                        /> */}
                    </div>
                </div>
                <div className="row">

                    <div className="col-4">
                        {/* <MultiSelect 
                            label="Produtos"
                            title="Produtos"
                            data={produtos}
                            isMultiple={true}
                            Select={(produtosIds) => SetProdutosIds)}
                            placeholder="Selecione o(s) produto(s)"
                        /> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-4">
                        <FieldsetCustom legend="Itens Compra">
                            <section>
                                <Box sx={{ height: 400, mt: 1 }}>
                                    <DataGrid rows={itemsCompras} columns={columns} editMode="row" components={{ Toolbar: CustomToolbar }} />
                                </Box>
                            </section>
                        </FieldsetCustom>
                    </div>
                </div>
            </Container>
        </>
    )
}