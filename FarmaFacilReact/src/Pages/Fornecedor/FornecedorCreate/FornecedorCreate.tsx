import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState } from "react";
import { postFormAll } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { FornecedorCreateGeral, fornecedorGeral } from "./FornecedorCreateGeral";
import { fornecedorComplemento, FornecedorCreateComplemento } from "./FornecedorCreateComplemento";
import TabsPage from "../../../Components/Others/Tabs";

export function FornecedorCreate() {

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ erro: true, index: 0, erroNome: "" })

    const [errorRequest, setErrorRequest] = useState("");

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    arrayTab.unshift(
        <FornecedorCreateGeral erros={error} />
    );
    arrayTab.push(
        <FornecedorCreateComplemento />
    );

    function ValidString(text: string, index: number) {
        if (!text.trim()) {
            setError({ erro: true, erroNome: "Campo obrigatório !", index: index })
            return false
        }

        return true;
    }

    async function submit() {

        setError({ erro: false, erroNome: "", index: 0 })

        setIsLoading(true);

        if (!ValidString(fornecedorGeral.nomeFornecedor.trim(), 1)
            || !ValidString(fornecedorGeral.nomeFantasia.trim(), 2)
            || !ValidString(fornecedorGeral.cpf.trim(), 3)
            || !ValidString(fornecedorGeral.cnpj.trim(), 4)
            || !ValidString(fornecedorGeral.inscricaoEstadual.trim(), 5)
        ) {
            setIsLoading(false);
            return;
        }

        if (fornecedorGeral.estadoId <= 0) {
            setError({ erro: true, erroNome: "Campo obrigatório !", index: 6 });
            setIsLoading(false);
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
            hostFornecedor: ""
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
        data.homePage = fornecedorComplemento.homePage;
        data.contato = fornecedorComplemento.contato;
        data.telefoneContato = fornecedorComplemento.telefoneContato;
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

        const resp = await postFormAll("AdicionarFornecedor", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/fornecedor");
            }, 2000)
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
            <HeaderMainContent title="ADICIONAR FORNECEDOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />

                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="fornecedor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Fornecedor adicionado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}