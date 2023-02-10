import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
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

export function ContasAPagarCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
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
            setErroDate("A data de emissão não pode ser menor que a primeira data de vencimento")
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
            setErroFornecedor("Selecione o fornecedor !")
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(numeroFatura, 1)
            || !ValidNumber(valor, 2)
            || !ValidNumber(quantidadeParcela, 3)
        ) {
            setIsLoading(false)
            return
        }

        if (!dataEmissao) {
            setErroDataEmissao("Informe a data de emissão !")
            setIsLoading(false);
            return;
        }

        data.duplicatasContasAPagar.map((item) => {
            item.dataVencimento = InvertDateJSON(item.dataVencimento)
            valorTotal = parseFloat((valorTotal + item.valor).toFixed(2));
        })

        if (valorTotal > valor) {
            setErroValor(`O valor do documento R$ ${valor} não confere com total das duplicatas R$ ${valorTotal}`)
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
                navigate("/contasapagar");
            }, 2000)
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
            setErros({ erro: true, index: index, erroNome: "Campo obrigatório", })
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

        let index = 0;

        if (!valorNovo) valorNovo = 0

        duplicatas.map((x, i) => {
            if (x.numeroParcela == item.numeroParcela) {
                index = i;
            }
        })

        item.valor = valorNovo;
        item.dataVencimento = dataVencimentoNova;

        duplicatas[index].valor = item.valor;
        duplicatas[index].dataVencimento = InverterDate(dataVencimentoNova);

        setDuplicatas([...duplicatas])
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR CONTAS A PAGAR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={fornecedores}
                                title="Selecione o fornecedor"
                                filter="nomeFornecedor"
                                label="Fornecedor"
                                required={true}
                                Select={(idFornecedor) => setFornecedorId(idFornecedor)}
                                error={erroFornecedor}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Documento"
                                type="number"
                                placeholder="Digite o documento"
                                value={numeroFatura}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNumeroFatura(parseInt(e.target.value))
                                }
                                erros={error}
                                index={1}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={planoDeContas}
                                title="Selecione o plano de contas"
                                filter="descricao"
                                label="Plano de Contas"
                                Select={(idPlano) => setPlanoDeContaId(idPlano)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={portadores}
                                title="Selecione o portador"
                                filter="nome"
                                label="Portador"
                                Select={(idPlano) => setPortadorId(idPlano)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomDropDown
                                data={bancos}
                                title="Selecione o banco"
                                filter="nome"
                                label="Banco"
                                Select={(idPlano) => setBancoId(idPlano)}
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
                                maxLength={50}
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
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDataEmissao(e.target.value)
                                }
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
                                    setValor(parseFloat(e.target.value))
                                }
                                required={true}
                                erros={error}
                                index={2}
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
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Primeiro Vencimento"
                                type="date"
                                value={primeiroVcto}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPrimeiroVcto(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="row mt-4">
                            <div className="col-auto mb-3">
                                <ButtonCustomIncluir text="Gerar Parcelas" onCLick={() => GerarParcelas()} width={8} height={2.1}/>
                            </div>
                            {erroValor &&
                                <span className="text-danger mb-3">{erroValor}</span>
                            }
                            {erroDate &&
                                <span className="text-danger mb-3">{erroDate}</span>
                            }
                        </div>
                        <FieldsetCustom legend="Duplicatas" borderAll={true} numberCols={6}>
                            <div className="col-12">
                                <GenericTable
                                    data={duplicatas}
                                    header={["numeroFatura", "dataVencimento", "valor"]}
                                    onDelete={(index) => ExcluirDuplicatas(index)}
                                    editButton={true}
                                    onEdit={(item) => setItemDuplicataEdit(item)}
                                />
                            </div>
                        </FieldsetCustom>
                        {itemDuplicataEdit.valor > 0 &&
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
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="contasapagar" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Contas a pagar adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
