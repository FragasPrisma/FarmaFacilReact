import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useEffect, useState } from "react";
import { getAll, postFormAll } from "../../../Services/Api";
import TabsPage from "../../../Components/Others/Tabs";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { FornecedorCreateGeral, fornecedorGeral, sigla } from "./FornecedorCreateGeral";
import { fornecedorComplemento, FornecedorCreateComplemento } from "./FornecedorCreateComplemento";
import { validCPF } from "../../../helper/ValidCpf";
import { ValidCnpj } from "../../../helper/ValidCnpj";
import { LabelObrigatorio } from "../../../Components/Others/LabelMensagemObrigatorio";
import { ValidIeDigitos } from "../../../helper/ValidIeDigitos";

export function FornecedorCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ erro: true, index: 0, erroNome: "" })
    const [fornecedores, setFornecedores] = useState([] as IFornecedor[])
    const [errorRequest, setErrorRequest] = useState("");
    const [textParam, setTextParam] = useState("")

    useEffect(() => {
        const loadDataFornecedor = async () => {
            const request = await getAll("ListaFornecedor");
            setFornecedores(request.data)
        }
        loadDataFornecedor()
    }, [])

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    arrayTab.push(
        <FornecedorCreateGeral erros={error} textParameter={textParam} />,
        <FornecedorCreateComplemento textParam={textParam} />
    );

    function ValidString(text: string, index: number) {
        if (!text.trim()) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório.", index: index })
            return false
        }

        return true;
    }

    async function submit() {

        let erroCpfCnpj = false;
        setError({ erro: false, erroNome: "", index: 0 })

        setIsLoading(true);

        if (!ValidString(fornecedorGeral.nomeFornecedor.trim(), 1)
            || !ValidString(fornecedorGeral.nomeFantasia.trim(), 2)
            || !ValidString(fornecedorGeral.inscricaoEstadual.trim(), 5)
        ) {
            setIsLoading(false);
            return;
        }

        if (!fornecedorGeral.cnpj.trim() && !fornecedorGeral.cpf.trim()) {

            ValidString(fornecedorGeral.cpf.trim(), 3)
            ValidString(fornecedorGeral.cnpj.trim(), 4)
            return;
        }
        if (fornecedorGeral.estadoId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório.", index: 6 });
            setIsLoading(false);
            return;
        }

        if (sigla.charAt(0).toUpperCase() != "P") {
            if (!ValidIeDigitos(sigla, fornecedorGeral.inscricaoEstadual)) {
                setError({ erro: true, erroNome: "Inscrição estadual inválida.", index: 5 })
                setIsLoading(false);
                return;
            }
        }

        if (!validCPF(fornecedorGeral.cpf) || !ValidCnpj(fornecedorGeral.cnpj)) {
            if (fornecedorGeral.cpf && !validCPF(fornecedorGeral.cpf)) {
                setError({ erro: true, erroNome: "CPF inválido !", index: 3 });
                setIsLoading(false);
                return;
            }
            if (fornecedorGeral.cnpj && !ValidCnpj(fornecedorGeral.cnpj)) {
                setError({ erro: true, erroNome: "CNPJ inválido !", index: 4 });
                setIsLoading(false);
                return;
            }
        }

        fornecedores.map(x => {

            if (x.cpf == fornecedorGeral.cpf && fornecedorGeral.cpf) {
                setError({ erro: true, erroNome: "CPF já cadastrado !", index: 3 });
                setIsLoading(false);
                erroCpfCnpj = true
            }
            if (x.cnpj == fornecedorGeral.cnpj && fornecedorGeral.cnpj) {
                setError({ erro: true, erroNome: "CNPJ já cadastrado !", index: 4 });
                setIsLoading(false);
                erroCpfCnpj = true;
            }
            if (x.inscricaoEstadual == fornecedorGeral.inscricaoEstadual && fornecedorGeral.inscricaoEstadual) {
                setError({ erro: true, erroNome: "Inscrição Estadual já cadastrada !", index: 5 });
                setIsLoading(false);
                erroCpfCnpj = true;
            }

        })

        if (erroCpfCnpj) {
            return;
        }

        let data: IFornecedor = {
            id: 0,
            nomeFornecedor: "",
            nomeFantasia: "",
            cnpj: "",
            cpf: "",
            inscricaoEstadual: "",
            cep: "",
            endereco: "",
            numeroEndereco: "",
            complemento: "",
            bairroId: null,
            cidadeId: null,
            estadoId: 0,
            ddd: "",
            telefone: "",
            celular: "",
            email: "",
            homePage: "",
            contato: "",
            telefoneContato: "",
            bancoId: null,
            agencia: "",
            contaCorrenteFornecedor: "",
            responsavelTecnico: "",
            alvaraSanitario: "",
            autorizacaoFuncionamento: "",
            autorizacaoEspecial: "",
            licencaMapa: "",
            cadastroFarmacia: "",
            planoDeContaId: null,
            valorMinimoPedido: 0,
            formaPagamento: "",
            previsaoEntrega: 0,
            frete: "",
            observacoes: "",
            usuarioFornecedor: "",
            senhaFornecedor: "",
            hostFornecedor: "",
            dddCelular: "",
            contribuinte: 0
        }

        data.id = fornecedorGeral.id;
        data.nomeFornecedor = fornecedorGeral.nomeFornecedor;
        data.nomeFantasia = fornecedorGeral.nomeFantasia;
        data.cnpj = fornecedorGeral.cnpj;
        data.cpf = fornecedorGeral.cpf;
        data.inscricaoEstadual = fornecedorGeral.inscricaoEstadual;
        data.cep = fornecedorGeral.cep;
        data.endereco = fornecedorGeral.endereco;
        data.numeroEndereco = fornecedorGeral.numeroEndereco;
        data.complemento = fornecedorGeral.complemento;
        data.bairroId = fornecedorGeral.bairroId;
        data.cidadeId = fornecedorGeral.cidadeId;
        data.estadoId = fornecedorGeral.estadoId;
        data.ddd = fornecedorGeral.ddd;
        data.telefone = fornecedorGeral.telefone;
        data.celular = fornecedorGeral.celular;
        data.email = fornecedorGeral.email;
        data.homePage = fornecedorGeral.homePage;
        data.bancoId = fornecedorComplemento.bancoId;
        data.agencia = fornecedorComplemento.agencia;
        data.contaCorrenteFornecedor = fornecedorComplemento.contaCorrenteFornecedor;
        data.responsavelTecnico = fornecedorComplemento.responsavelTecnico;
        data.alvaraSanitario = fornecedorComplemento.alvaraSanitario;
        data.autorizacaoFuncionamento = fornecedorComplemento.autorizacaoFuncionamento;
        data.autorizacaoEspecial = fornecedorComplemento.autorizacaoEspecial;
        data.licencaMapa = fornecedorComplemento.licencaMapa;
        data.cadastroFarmacia = fornecedorComplemento.cadastroFarmacia;
        data.planoDeContaId = fornecedorComplemento.planoDeContaId;
        data.valorMinimoPedido = fornecedorComplemento.valorMinimoPedido;
        data.formaPagamento = fornecedorComplemento.formaPagamento;
        data.previsaoEntrega = fornecedorComplemento.previsaoEntrega;
        data.frete = fornecedorComplemento.frete;
        data.observacoes = fornecedorComplemento.observacoes;
        data.usuarioFornecedor = fornecedorComplemento.usuarioFornecedor;
        data.senhaFornecedor = fornecedorComplemento.senhaFornecedor;
        data.hostFornecedor = fornecedorComplemento.hostFornecedor;
        data.dddCelular = fornecedorGeral.dddCelular;
        data.telefoneContato = fornecedorGeral.telefoneContato;
        data.contato = fornecedorGeral.contato;
        data.contribuinte = fornecedorGeral.contribuinte

        const resp = await postFormAll("AdicionarFornecedor", data);

        if (resp.status == 200) {
            
            setIsOpenSuccess(true);
            setTimeout(() => {
                setIsOpenSuccess(false);
                setIsLoading(false);
                setTextParam(" ")
            }, 2000)
            setTextParam("")
        
        } else {
        
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErrorRequest(resp.request.response)
            }, 2000)
        
        }
    }

    return (
        <>
            <HeaderMainContent title="Incluir Fornecedor" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                <LabelObrigatorio />
                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="fornecedor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}