import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container, ContainerProdutos } from "./styles";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useTranslation } from "react-i18next";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";
import { IProduto } from "../../Interfaces/Produto/IProduto";
import { IFaltasEncomendas } from "../../Interfaces/FaltasEncomendas/IFaltasEncomendas";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { GenericTable } from "../../Components/Others/GenericTable";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { MaxLengthNumber } from "../../helper/MaxLengthNumber";

export function FaltasEncomendasCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const [nomeProduto, setNomeProduto] = useState("Selecione o produto");
    const [nomeVendedoor, setNomeVendedor] = useState("Selecione o vendedor");
    const [nomeCliente, setNomeCliente] = useState("Selecione o cliente");

    const [errorVendedor, setErrorVendedor] = useState("");
    const [errorProdutos, setErrorProdutos] = useState("");

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

    const [produtoEdite, setProdutoEdite] = useState({
        grupoId: 0,
        produtoId: 0,
        descricao: "",
        quantidade: 0
    });

    function ReiniciarCadastros() {
        setNomeVendedor("Selecione o vendedor");
        setVendedorId(0);
        setNomeProduto("Selecione o produto");
        setProdutoId(0);
        setGrupoId(0);
        setPrevisaDeEntrega("");
        setObservacao("");
        setTelefone("");
        setQuantidade(0)
        faltasEncomendasView.length = 0;
        setTipo(0);
    }

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
        // const LoadDataGrupo = async () => {
        //     const request = await getAll("ListaGrupo");

        //     if (request.status == 200) {
        //         setGrupos(request.data)
        //     }
        // }

        //LoadDataGrupo();
        LoadDataProdutos();
        LoadDataVendedor();
    }, [])

    async function submit() {

        setIsLoading(true);
        setErrorVendedor("");

        if (vendedorId <= 0) {
            setIsLoading(false)
            setErrorVendedor("Campo de preenchimento obrigatório.")
            return;
        }

        if (faltasEncomendasView.length == 0) {
            setIsLoading(false)
            setErrorProdutos("É obrigatório informar os produtos.")
            return;
        }

        faltasEncomendasView.map(x => {

            let faltaEncomenda: IFaltasEncomendas = {
                id: 0,
                empresaId: null,
                clienteId: null,
                grupoId: x.grupoId,
                produtoId: x.produtoId,
                vendedorId: vendedorId,
                dataCadastro: null,
                compraId: null,
                observacao: observacao,
                previsaoDeEntrega: previsaDeEntrega ? previsaDeEntrega : null,
                quantidade: x.quantidade,
                status: null,
                telefone: telefone,
                tipo: tipo
            }

            faltasEncomendas.push(faltaEncomenda)
        })

        setFaltasEncomendas([...faltasEncomendas])

        const resp = await postFormAll("AdicionarFaltasEncomendas", faltasEncomendas);

        if (resp.status == 200) {

            setIsOpenSuccess(true);

            setTimeout(() => {
                setIsOpenSuccess(false);
                setIsLoading(false);
            }, 2000)

            ReiniciarCadastros()

        } else {

            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)

        }
    }

    useEffect(() => {

        if (quantidade <= 0 || produtoId <= 0) return;

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
            quantidade: quantidade
        }

        faltasEncomendasView.push(faltaEncomendaView);
        setFaltasEncomendasView([...faltasEncomendasView])

    }, [quantidade])

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

    }

    return (
        <>
            <HeaderMainContent title="Incluir Faltas/Encomendas" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
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
                        <div className="col-2">
                            <CustomInput
                                label="Previsão de entrega"
                                type="date"
                                placeholder=""
                                value={previsaDeEntrega}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPrevisaDeEntrega(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-5">
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
                        <div className="col-7">
                            <CustomInput
                                label="Observação"
                                type="text"
                                placeholder="Digite a observação"
                                value={observacao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setObservacao(e.target.value)
                                }
                                erro={errorProdutos}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Grupo"
                                type="text"
                                placeholder="Grupo selecionado"
                                value={grupoId}
                                readonly={true}
                                textAlign={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomDropDown
                                data={produtos}
                                filter="descricao"
                                label="Produto"
                                required={true}
                                title={nomeProduto}
                                Select={(produtoId, nomeProdutoP) => {
                                    setProdutoId(produtoId)
                                    setNomeProduto(nomeProdutoP)
                                }}
                                RemoveSelect={() => {
                                    setProdutoId(0)
                                    setNomeProduto("Selecione o produto")
                                }}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Quantidade"
                                type="number"
                                placeholder=""
                                value={quantidade}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setQuantidade(MaxLengthNumber(9999999999.99999, parseFloat(e.target.value)))
                                }
                                textAlign={true}
                            />
                        </div>
                    </div>

                    <ContainerProdutos>
                        <div className="col-6" style={{ padding: "1rem" }}>
                            <FieldsetCustom borderAll={true} legend="Produtos" numberCols={12}>
                                <div style={{ padding: "1rem" }}>
                                    <GenericTable
                                        data={faltasEncomendasView}
                                        header={["grupoId", "produtoId", "descricao", "quantidade"]}
                                        headerView={["Grupo", "Produto", "Descrição", "Quantidade"]}
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
                                                    EditQuantidadeProduto(MaxLengthNumber(9999999999.9999, parseInt(e.target.value)))
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
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
