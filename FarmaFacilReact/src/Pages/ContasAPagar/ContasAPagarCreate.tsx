import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IContasAPagar } from "../../Interfaces/ContasAPagar/IContasAPagar";
import { IDuplicatasContasAPagar } from "../../Interfaces/DuplicatasContasAPagar/IDuplicatasContasAPagar";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { IFornecedor } from "../../Interfaces/Fornecedor/IFornecedor";
import { IPlanoDeconta } from "../../Interfaces/PlanoDeContas/IPlanoDeConta";
import { IPortador } from "../../Interfaces/Portador/IPortador";
import { IBanco } from "../../Interfaces/Banco/IBanco";
import { GenericTable } from "../../Components/Others/GenericTable";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { GerarVencimento } from "../../helper/GerarVencimento";
import { InverterDate } from "../../helper/InverterDate";
import { InvertDateJSON } from "../../helper/InvertDateJSON";
import { ButtonCustomIncluir } from "../../Components/Buttons/ButtonCustom";
import { MaxLengthNumber } from "../../helper/MaxLengthNumber";
import { MessageErro } from "../../Components/Others/MessageError";

export function ContasAPagarCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [observacao, setObservacao] = useState("");
    const [numeroFatura, setNumeroFatura] = useState(0);
    const [fornecedorId, setFornecedorId] = useState(0);
    const [planoDeContaId, setPlanoDeContaId] = useState(null);
    const [bancoId, setBancoId] = useState(null);
    const [portadorId, setPortadorId] = useState(null);
    const [fornecedores, setFornecedores] = useState([] as IFornecedor[]);
    const [planoDeContas, setPlanoDeContas] = useState([] as IPlanoDeconta[]);
    const [portadores, setPortadores] = useState([] as IPortador[])
    const [bancos, setBancos] = useState([] as IBanco[]);
    const [dataEmissao, setDataEmissao] = useState("")
    const [valor, setValor] = useState(0);
    const [quantidadeParcela, setQuantidadeParcela] = useState(0)
    const [primeiroVcto, setPrimeiroVcto] = useState("")
    const [duplicatas, setDuplicatas] = useState([] as IDuplicatasContasAPagar[])

    const [error, setErros] = useState({ erro: true, index: 0, erroNome: "" })
    const [erroFornecedor, setErroFornecedor] = useState("")
    const [erroValor, setErroValor] = useState("")
    const [erroDate, setErroDate] = useState("")
    const [erroDataEmissao, setErroDataEmissao] = useState("")
    const [itemDuplicataEdit, setItemDuplicataEdit] = useState({} as IDuplicatasContasAPagar)

    const [nomeFornecedor, setNomeFornecdor] = useState("Selecione o fornecedor");
    const [nomePlanoDeContas, setNomePlanoDeContas] = useState("Selecione o plano de contas")
    const [nomePortador, setNomePortador] = useState("Selecione o portador")
    const [nomeBanco, setNomeBanco] = useState("Selecione o banco")

    function ResetarCadastros(){
        setObservacao("")
        setDataEmissao("")
        setNumeroFatura(0)
        setFornecedorId(0)
        setPlanoDeContaId(null)
        setBancoId(null)
        setPortadorId(null)
        setValor(0)
        setQuantidadeParcela(0)
        setPrimeiroVcto("")
        duplicatas.length = 0
        setNomeFornecdor("Selecione o fornecedor")
        setNomePlanoDeContas("Selecione o plano de contas")
        setNomePortador("Selecione o portador")
        setNomeBanco("Selecione o banco")
        setErroDataEmissao("");
        setErroFornecedor("");
        setErroValor("");
        setErros({ erro: true, index: 0, erroNome: "" })
        setIsLoading(false)
    }

    useEffect(() => {
        const loadDataFornecedor = async () => {
            const response = await getAll("ListaFornecedor");
            setFornecedores(response.data);
        }
        const loadDataPlanoDeContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setPlanoDeContas(response.data.filter((x: { nivelConta: number }) => x.nivelConta == 2));
        }
        const loadDatapostador = async () => {
            const response = await getAll("ListaPortador");
            setPortadores(response.data);
        }
        const loadDataBanco = async () => {
            const response = await getAll("ListaBanco");
            setBancos(response.data);
        }
        loadDataBanco();
        loadDatapostador();
        loadDataPlanoDeContas();
        loadDataFornecedor();
    }, []);

    useEffect(() => {
        let emissaoNumber = parseInt(dataEmissao.replaceAll("-", ""));
        let primeiroVencimentoNumber = parseInt(primeiroVcto.replaceAll("-", ""));
        if (primeiroVencimentoNumber < emissaoNumber) {
            setErroDate("A data do primeiro vencimento não pode ser menor que a data de emissão")
            setIsLoading(false);
        } else {
            setErroDate("")
        }
    }, [primeiroVcto])

    const data: IContasAPagar = {
        id: 0,
        observacao: observacao,
        dataEmissao: dataEmissao,
        valor: valor,
        numeroFatura: numeroFatura,
        quantidadeParcela: quantidadeParcela,
        fornecedorId: fornecedorId,
        planoDeContasId: planoDeContaId,
        bancoId: bancoId,
        portadorId: portadorId,
        duplicatasContasAPagar: duplicatas
    };

    async function submit() {

        let valorTotal = 0

        setIsLoading(true);
        setErroDataEmissao("");
        setErroFornecedor("");
        setErroValor("");
        setErros({ erro: true, index: 0, erroNome: "" })

        if (erroDate) {
            setIsLoading(false);
            return;
        }

        if (fornecedorId <= 0) {
            setErroFornecedor("Campo de preenchimento obrigatório.")
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(numeroFatura, 1)
        ) {
            setIsLoading(false)
            return
        }

        if (!dataEmissao) {
            setErroDataEmissao("Campo de preenchimento obrigatório.")
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(valor, 2)
            || !ValidNumber(quantidadeParcela, 3)
        ) {
            setIsLoading(false)
            return
        }

        data.duplicatasContasAPagar.map((item) => {
            item.dataVencimento = InvertDateJSON(item.dataVencimento)
            valorTotal = parseFloat((valorTotal + item.valor).toFixed(2));
        })

        if (valorTotal != valor) {
            setErroValor(`O valor do documento de R$ ${valor} não confere com total das duplicatas R$ ${valorTotal} .`)
            data.duplicatasContasAPagar.map((item) => {
                item.dataVencimento = InverterDate(item.dataVencimento)
            })
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarContasAPagar", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                setIsOpenSuccess(false);
            }, 2000)
            ResetarCadastros();
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function ValidNumber(numero: number, index: number) {
        if (numero <= 0) {
            setErros({ erro: true, index: index, erroNome: "Campo de preenchimento obrigatório.", })
            return false;
        } else {
            return true;
        }
    }

    function ExcluirDuplicatas(index: number) {

        duplicatas.splice(index, 1);
        setDuplicatas([...duplicatas])
        setItemDuplicataEdit({} as IDuplicatasContasAPagar)
        setQuantidadeParcela(duplicatas.length)
    }

    useEffect(() => {

        quantidadeParcela > 999 ? setQuantidadeParcela(999) : setQuantidadeParcela(quantidadeParcela)

        if (ValidParcelamento()) {
            GerarParcelas();
        }
    }, [quantidadeParcela])

    function ValidParcelamento() {

        if (!quantidadeParcela || quantidadeParcela <= 0
            || !valor || valor <= 0
            || fornecedorId <= 0 || numeroFatura <= 0
            || !dataEmissao
        ) {
            return false
        }

        return true
    }

    function GerarParcelas() {

        if (!ValidParcelamento()) return;

        duplicatas.length = 0

        let valorTotal = 0;
        let valorParcela = parseFloat((valor / quantidadeParcela).toFixed(2));
        let Observacao = observacao ? " - " + observacao.trim() : "";

        for (var i = 1; i <= quantidadeParcela; i++) {

            let parcela: IDuplicatasContasAPagar = {
                id: 0,
                observacao: "Parcelamento: " + i.toString() + "/" + quantidadeParcela.toString() + Observacao.trim(),
                dataVencimento: InverterDate(GerarVencimento(dataEmissao, primeiroVcto, (i))),
                dataPagamento: null,
                valor: valorParcela,
                valorPago: 0,
                numeroFatura: numeroFatura.toString() + "." + i.toString(),
                numeroParcela: i,
                ContasAPagarId: 0
            }

            valorTotal = parseFloat((valorTotal + valorParcela).toFixed(2));

            duplicatas.push(parcela);
            setDuplicatas([...duplicatas])
        }

        if (valorTotal < valor) {
            valorTotal = parseFloat((valor - valorTotal).toFixed(2))
            duplicatas[0].valor = parseFloat((duplicatas[0].valor + valorTotal).toFixed(2));
            setDuplicatas([...duplicatas]);
        }

    }

    function EditDuplicata(item: IDuplicatasContasAPagar, valorNovo: number, dataVencimentoNova: string) {

        if (valorNovo < 0) {
            return;
        }

        let index = 0;

        if (!valorNovo) valorNovo = 0

        duplicatas.map((x, i) => {
            if (x.numeroParcela == item.numeroParcela) {
                index = i;
            }
        })

        item.valor = valorNovo;
        item.dataVencimento = dataVencimentoNova;

        duplicatas[index].valor = MaxLengthNumber(9999999999.99,item.valor);
        duplicatas[index].dataVencimento = InverterDate(dataVencimentoNova);

        setDuplicatas([...duplicatas])
    }

    return (
        <>
            <HeaderMainContent title="Incluir Contas a Pagar" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={fornecedores}
                                title={nomeFornecedor}
                                filter="nomeFornecedor"
                                label="Fornecedor"
                                required={true}
                                Select={(idFornecedor, nomeFornecedor) => {
                                    setNomeFornecdor(nomeFornecedor)
                                    setFornecedorId(idFornecedor)
                                }}
                                error={erroFornecedor}
                                RemoveSelect={() => {
                                    setFornecedorId(0)
                                    setNomeFornecdor("Selecione o fornecedor")
                                }}
                                placeHolder="nome"
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Documento"
                                type="number"
                                placeholder="Digite o documento"
                                value={numeroFatura}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNumeroFatura(MaxLengthNumber(999999999999999, parseInt(e.target.value)))
                                }
                                erros={error}
                                index={1}
                                required={true}
                                textAlign={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={planoDeContas}
                                title={nomePlanoDeContas}
                                filter="descricao"
                                label="Plano de Contas"
                                Select={(idPlano, nomePlano) => {
                                    setPlanoDeContaId(idPlano)
                                    setNomePlanoDeContas(nomePlano)
                                }}
                                RemoveSelect={() => {
                                    setPlanoDeContaId(null)
                                    setNomePlanoDeContas("Selecione o plano de contas")
                                }}
                                placeHolder="descrição"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={portadores}
                                title={nomePortador}
                                filter="nome"
                                label="Portador"
                                Select={(idPortador, nomePortador) => {
                                    setPortadorId(idPortador)
                                    setNomePortador(nomePortador)
                                }}
                                RemoveSelect={() => {
                                    setPortadorId(null)
                                    setNomePortador("Selecione o portador")
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={bancos}
                                title={nomeBanco}
                                filter="nome"
                                label="Banco"
                                Select={(idBanco, nomeBanco) => {
                                    setBancoId(idBanco)
                                    setNomeBanco(nomeBanco)
                                }}
                                RemoveSelect={() => {
                                    setBancoId(null)
                                    setNomeBanco("Selecione o banco")
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Observação"
                                type="text"
                                placeholder="Digite a observação"
                                value={observacao}
                                maxLength={100}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setObservacao(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Emissão"
                                type="date"
                                value={dataEmissao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.value.length > 10) return
                                    setDataEmissao(e.target.value)
                                }}
                                required={true}
                                erro={erroDataEmissao}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Valor (R$)"
                                type="number"
                                value={valor}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setValor(MaxLengthNumber(9999999999.99,parseFloat(e.target.value)))
                                }
                                required={true}
                                erros={error}
                                index={2}
                                textAlign={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Quantidade de parcelas"
                                type="number"
                                value={quantidadeParcela}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setQuantidadeParcela(parseInt(e.target.value))
                                }
                                required={true}
                                erros={error}
                                index={3}
                                textAlign={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Primeiro vencimento"
                                type="date"
                                value={primeiroVcto}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.value.length > 10) return
                                    setPrimeiroVcto(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="row mt-5 mb-5">
                            <div className="col-auto mb-3">
                                <ButtonCustomIncluir text="Gerar parcelas" onCLick={() => GerarParcelas()} width={8} height={2.1} />
                            </div>
                            {erroValor &&
                                <MessageErro message={erroValor}/>
                            }
                            {erroDate &&
                                <MessageErro message={erroDate} />
                            }
                        </div>
                        <FieldsetCustom legend="Duplicatas" borderAll={true} numberCols={6}>
                            <div className="col-12">
                                <GenericTable
                                    headerView={["N. fatura", "Data vencimento", "Valor (R$)"]}
                                    data={duplicatas}
                                    header={["numeroFatura", "dataVencimento", "valor"]}
                                    onDelete={(index) => ExcluirDuplicatas(index)}
                                    editButton={true}
                                    onEdit={(item) => setItemDuplicataEdit(item)}
                                />
                            </div>
                        </FieldsetCustom>
                        {itemDuplicataEdit.valor >= 0 &&
                            <FieldsetCustom legend="Editar Duplicata" borderAll={true} numberCols={3}>
                                <div className="col-12 mt-3">
                                    <CustomInput
                                        label="Data de Vencimento"
                                        type="date"
                                        value={InvertDateJSON(itemDuplicataEdit.dataVencimento)}
                                        required={true}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            EditDuplicata(itemDuplicataEdit, itemDuplicataEdit.valor, e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-12">
                                    <CustomInput
                                        label="Valor"
                                        type="number"
                                        value={itemDuplicataEdit.valor}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            EditDuplicata(itemDuplicataEdit, parseFloat(e.target.value), InvertDateJSON(itemDuplicataEdit.dataVencimento))
                                        }
                                        textAlign={true}
                                    />
                                </div>
                                <div className="col-6">
                                    <CustomInput
                                        label="Número da parcela"
                                        type="number"
                                        readonly={true}
                                        value={itemDuplicataEdit.numeroParcela}
                                    />
                                </div>
                                <div className="col-12 mt-1 mb-2">
                                    <ButtonConfirm
                                        onCLick={() =>
                                            setItemDuplicataEdit({} as IDuplicatasContasAPagar)}
                                        isLoading={isLoading}
                                    />
                                </div>
                            </FieldsetCustom>
                        }
                    </div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="contasapagar" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
