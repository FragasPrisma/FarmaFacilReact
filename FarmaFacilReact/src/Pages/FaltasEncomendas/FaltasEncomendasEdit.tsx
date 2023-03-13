import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container, ContainerProdutos } from "./styles";
import { useNavigate, useParams } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IBairro } from "../../Interfaces/Bairro/IBairro";
import { useTranslation } from "react-i18next";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";
import { IProduto } from "../../Interfaces/Produto/IProduto";
import { IFaltasEncomendas } from "../../Interfaces/FaltasEncomendas/IFaltasEncomendas";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { MaxLengthNumber } from "../../helper/MaxLengthNumber";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { GenericTable } from "../../Components/Others/GenericTable";
import { MessageErro } from "../../Components/Others/MessageError";

export function FaltasEncomendasEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const [nomeProduto, setNomeProduto] = useState("Selecione o produto");
    const [nomeVendedoor, setNomeVendedor] = useState("Selecione o vendedor");
    const [nomeCliente, setNomeCliente] = useState("Selecione o cliente");

    const [errorVendedor, setErrorVendedor] = useState("");
    const [errorProdutos, setErrorProdutos] = useState("");
    const [errorData, setErrorData] = useState("");

    const [idFaltasEncomendas, setIdFaltasEncomendas] = useState(0);
    const [faltasEncomendasView, setFaltasEncomendasView] = useState([] as any[]);
    const [vendedores, setVendedores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([] as IProduto[]);
    const [faltasEncomendas, setFaltasEncomendas] = useState([] as IFaltasEncomendas[])

    const [clienteId, setClienteId] = useState<Number>();
    const [vendedorId, setVendedorId] = useState(0);
    const [grupoId, setGrupoId] = useState(0);
    const [produtoId, setProdutoId] = useState(0);
    const [tipo, setTipo] = useState(0);
    const [previsaDeEntrega, setPrevisaDeEntrega] = useState("");
    const [telefone, setTelefone] = useState("");
    const [observacao, setObservacao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [dataCadastro, setDataCadastro] = useState("");
    const [status, setStatus] = useState(0);

    const [produtoEdite, setProdutoEdite] = useState({
        grupoId: 0,
        produtoId: 0,
        descricao: "",
        quantidade: 0
    });

    const { id } = useParams();
    const navigate = useNavigate();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        const LoadDataVendedor = async () => {
            const request = await getAll("ListaVendedor");

            if (request.status == 200) {
                setVendedores(request.data)
            }
        }

        const LoadDataProdutos = async () => {
            const request = await getAll("ListaProdutos");

            if (request.status == 200) {
                setProdutos(request.data)
            }
        }

        async function Init() {
            const response = await GetId("RetornaFaltasEncomendasPorId", idParams);
            if (response.status == 200) {
                setIdFaltasEncomendas(response.data.id)
                setTelefone(response.data.telefone)
                setObservacao(response.data.observacao)
                setVendedorId(response.data.vendedorId)
                setDataCadastro(response.data.dataCadastro);
                setPrevisaDeEntrega(response.data.previsaoDeEntrega ? response.data.previsaoDeEntrega.slice(0, 10) : "")
                setTipo(response.data.tipo)
                setStatus(response.data.status)

                if (response.data.produto) {
                    faltasEncomendasView.push({
                        grupoId: response.data.produto.grupoId,
                        produtoId: response.data.produto.id,
                        descricao: response.data.produto.descricao,
                        quantidade: response.data.quantidade,
                        unidadeEstoque: response.data.produto.unidadeEstoque

                    })
                }

                if (response.data.vendedor) {
                    setNomeVendedor(response.data.vendedor.nome)
                }
            }
        }
        LoadDataProdutos();
        LoadDataVendedor();
        Init()
    }, [])

    function DeleteProduto(index: number) {

        let produtoDelete = faltasEncomendasView[index];

        if (produtoDelete.produtoId == produtoEdite.produtoId) {
            setProdutoEdite({
                descricao: "",
                grupoId: 0,
                produtoId: 0,
                quantidade: 0
            })
        }

        faltasEncomendasView.splice(index, 1);
        setFaltasEncomendasView([...faltasEncomendasView])

    }

    function EditeProduto(produtoEdite: any) {
        setProdutoEdite({
            descricao: produtoEdite.descricao,
            grupoId: produtoEdite.grupoId,
            produtoId: produtoEdite.produtoId,
            quantidade: produtoEdite.quantidade
        })
    }

    function EditQuantidadeProduto(qtd: number) {

        if (qtd <= 0) return;

        produtoEdite.quantidade = qtd;

        let indexEdite = 0;

        faltasEncomendasView.map((x, index) => {
            if (x.produtoId == produtoEdite.produtoId) {
                indexEdite = index;
            }
        })

        faltasEncomendasView[indexEdite].quantidade = qtd;
        setFaltasEncomendasView([...faltasEncomendasView])

        if (!qtd) {
            faltasEncomendasView[indexEdite].quantidade = 0;
            setFaltasEncomendasView([...faltasEncomendasView])
        }

    }

    useEffect(() => {

        if (quantidade <= 0 || produtoId <= 0 || !quantidade) return;

        let faltasEncomendasComItem = faltasEncomendasView.filter(x => {
            return x.produtoId == produtoId;
        });

        let produtosFilter = produtos.filter(x => {
            return x.id == produtoId
        })

        setGrupoId(produtosFilter[0].grupoId)

        if (faltasEncomendasComItem.length > 0) {
            faltasEncomendasComItem[0].quantidade = quantidade;
            setFaltasEncomendasView([...faltasEncomendasView])
            return;
        }

        let faltaEncomendaView = {
            grupoId: produtosFilter[0].grupoId,
            produtoId: produtoId,
            descricao: nomeProduto,
            quantidade: quantidade,
            unidadeEstoque: produtosFilter[0].unidadeEstoque
        }

        faltasEncomendasView.push(faltaEncomendaView);
        setFaltasEncomendasView([...faltasEncomendasView])

    }, [quantidade])

    async function submit() {

        let errorQuantidade = false;
        setIsLoading(true);
        setErrorVendedor("");
        setErrorData("");

        if (vendedorId <= 0) {
            setIsLoading(false)
            setErrorVendedor("Campo de preenchimento obrigatório.")
            return;
        }

        if (previsaDeEntrega) {
            let dataPrevisaoDeEntrega = new Date(previsaDeEntrega);
            dataPrevisaoDeEntrega.setHours(dataPrevisaoDeEntrega.getHours() + 3)

            let dataAtual = new Date().getDate();

            if (dataPrevisaoDeEntrega.getDate() < dataAtual) {
                setErrorData("Previsão de entrega não pode ser menor que a data atual!")
                setIsLoading(false);
                return;
            }
        }

        if (faltasEncomendasView.length == 0) {
            setIsLoading(false)
            setErrorProdutos("É obrigatório informar os produtos.")
            return;
        }

        faltasEncomendasView.map(x => {
            if (x.quantidade == 0 || !x.quantidade) {
                setIsLoading(false)
                setErrorProdutos("É obrigatório informar a quantidade dos produtos.")
                errorQuantidade = true;
                return;
            }
        })

        if (errorQuantidade) return;

        faltasEncomendasView.map(x => {

            let faltaEncomenda: IFaltasEncomendas = {
                id: 0,
                empresaId: null,
                clienteId: null,
                grupoId: x.grupoId,
                produtoId: x.produtoId,
                vendedorId: vendedorId,
                dataCadastro: dataCadastro,
                compraId: null,
                observacao: observacao,
                previsaoDeEntrega: previsaDeEntrega ? previsaDeEntrega : null,
                quantidade: x.quantidade,
                status: status,
                telefone: telefone,
                tipo: tipo
            }

            faltasEncomendas.push(faltaEncomenda)
        })

        setFaltasEncomendas([...faltasEncomendas])

        const dataRequest = {
            id: idFaltasEncomendas,
            faltasEncomendas: faltasEncomendas
        }

        const resp = await postFormAll("EditarFaltasEncomendas", dataRequest);

        if (resp.status == 200) {

            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/faltasencomendas");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                faltasEncomendas.length = 0
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="Editar Faltas/Encomendas" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idFaltasEncomendas > 0 &&
                    <Container>

                        <div className="row">
                            <div className="col-6">
                                <CustomDropDown
                                    data={vendedores}
                                    filter="nome"
                                    label="Vendedor"
                                    required={true}
                                    title={nomeVendedoor}
                                    Select={(vendedorId, nomeVendedorP) => {
                                        setVendedorId(vendedorId)
                                        setNomeVendedor(nomeVendedorP)
                                    }}
                                    RemoveSelect={() => {
                                        setVendedorId(0)
                                        setNomeVendedor("Selecione o vendedor")
                                    }}
                                    error={errorVendedor}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3 mt-2">
                                <RadioCustom
                                    name="tipo"
                                    options={["Falta", "Encomenda"]}
                                    value={tipo}
                                    requerid={true}
                                    onClickOptions={(tipo) => {
                                        setTipo(tipo)
                                    }}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Previsão de entrega"
                                    type="date"
                                    placeholder=""
                                    value={previsaDeEntrega}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setPrevisaDeEntrega(e.target.value)
                                    }
                                />
                                <MessageErro message={errorData} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6">
                                <CustomDropDown
                                    data={clientes}
                                    filter="nome"
                                    label="Cliente"
                                    title={nomeCliente}
                                    Select={(clienteId, nomeClienteP) => {
                                        setClienteId(clienteId)
                                        setNomeCliente(nomeClienteP)
                                    }}
                                    RemoveSelect={() => {
                                        setClienteId(0)
                                        setNomeCliente("Selecione o cliente")
                                    }}
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Telefone"
                                    type="text"
                                    placeholder="9999-9999"
                                    maxLength={10}
                                    value={telefone}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setTelefone(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8">
                                <CustomInput
                                    label="Observação"
                                    type="text"
                                    placeholder="Digite a observação"
                                    value={observacao}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setObservacao(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1">
                                <CustomInput
                                    label="Grupo"
                                    type="text"
                                    placeholder="Grupo selecionado"
                                    value={grupoId}
                                    readonly={true}
                                    textAlign={true}
                                />
                            </div>
                            <div className="col-5">
                                <CustomDropDown
                                    data={produtos}
                                    filter="descricao"
                                    label="Produto"
                                    required={true}
                                    title={nomeProduto}
                                    Select={(produtoId, nomeProdutoP) => {
                                        setProdutoId(produtoId)
                                        setNomeProduto(nomeProdutoP)
                                        setQuantidade(0)
                                        setGrupoId(0)
                                    }}
                                    RemoveSelect={() => {
                                        setProdutoId(0)
                                        setNomeProduto("Selecione o produto")
                                        setQuantidade(0)
                                        setGrupoId(0)
                                    }}
                                    titlePesquisa="descrição"
                                />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Quantidade"
                                    type="number"
                                    placeholder=""
                                    value={quantidade}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setQuantidade(MaxLengthNumber(4,8, parseFloat(e.target.value)))
                                    }
                                    textAlign={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <MessageErro message={errorProdutos} />
                        </div>
                        <ContainerProdutos>
                            <div className="col-7" style={{ padding: "1rem" }}>
                                <FieldsetCustom borderAll={true} legend="Produtos" numberCols={12}>
                                    <div style={{ padding: "1rem" }}>
                                        <GenericTable
                                            data={faltasEncomendasView}
                                            header={["grupoId", "produtoId", "descricao", "quantidade", "unidadeEstoque"]}
                                            headerView={["Grupo", "Produto", "Descrição", "Quantidade", "U.E"]}
                                            onDelete={(produtoDelete) => {
                                                DeleteProduto(produtoDelete);
                                            }}
                                            editButton={true}
                                            onEdit={(editeProduto) => {
                                                EditeProduto(editeProduto)
                                            }}
                                        />
                                    </div>
                                </FieldsetCustom>
                            </div>
                            {produtoEdite.produtoId > 0 &&
                                <div style={{ padding: "1rem" }} className="col-5">
                                    <FieldsetCustom borderAll={true} numberCols={12} legend="Editar produto">
                                        <div className="col-12" style={{ padding: "1rem" }}>
                                            <div className="col-12">
                                                <CustomInput
                                                    label="Produto"
                                                    type="text"
                                                    placeholder=""
                                                    value={produtoEdite.descricao}
                                                    readonly={true}
                                                />
                                            </div>
                                            <div className="col-6 row">
                                                <CustomInput
                                                    label="Quantidade"
                                                    type="number"
                                                    placeholder=""
                                                    value={produtoEdite.quantidade}
                                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                        EditQuantidadeProduto(MaxLengthNumber(4,8, parseFloat(e.target.value)))
                                                    }
                                                    textAlign={true}
                                                />

                                            </div>
                                            <div className="mt-2 mb-2">
                                                <ButtonConfirm onCLick={() => {
                                                    setProdutoEdite({
                                                        descricao: "",
                                                        grupoId: 0,
                                                        produtoId: 0,
                                                        quantidade: 0
                                                    })
                                                }} />
                                            </div>
                                        </div>
                                    </FieldsetCustom>
                                </div>

                            }
                        </ContainerProdutos>
                        <LabelObrigatorio />
                        <div className="row">
                            <div className="col-6">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                                <ButtonCancel to="faltasencomendas" />
                            </div>
                        </div>
                    </Container>
                }
                <SuccessModal show={isOpenSuccess} textCustom="Registro editado com sucesso." />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
