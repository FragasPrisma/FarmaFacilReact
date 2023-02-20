import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { postFormAll, GetId, getAll } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import TabsPage from "../../../Components/Others/Tabs";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { FornecedorEditComplemento } from "./FornecedorEditComplemento";
import { FornecedorEditGeral, siglaEdit } from "./FornecedorEditGeral";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { fornecedorComplementoEdit } from './FornecedorEditComplemento'
import { fornecedorGeralEdit } from './FornecedorEditGeral'
import { LabelObrigatorio } from "../../../Components/Others/LabelMensagemObrigatorio";
import { ValidCnpj } from "../../../helper/ValidCnpj";
import { validCPF } from "../../../helper/ValidCpf";
import { ValidIeDigitos } from "../../../helper/ValidIeDigitos";

export function FornecedorEdit() {

    const { id } = useParams();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [dataEstado, setDataEstado] = useState("");
    const [dataCidade, setDataCidade] = useState("");
    const [dataBairro, setDataBairro] = useState("");
    const [dataPlanoConta, setDataPlanoConta] = useState("");
    const [dataBanco, setDataBanco] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ erro: true, index: 0, erroNome: "" })
    const [fornecedorModel, setFornnecedorModel] = useState({} as IFornecedor);
    const [fornecedores, setFornecedores] = useState([] as IFornecedor[])

    const [errorRequest, setErrorRequest] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        const loadData = async () => {
            const response = await GetId("RetornaFornecedorPorId", idParams);
            setFornnecedorModel(response.data)

            if (response.data.estado != null) {
                setDataEstado(response.data.estado.sigla);
                response.data.estado = null
            }
            if (response.data.cidade != null) {
                setDataCidade(response.data.cidade.nome)
                response.data.cidade = null
            }
            if (response.data.bairro != null) {
                setDataBairro(response.data.bairro.nome)
                response.data.bairro = null
            }
            if (response.data.planoDeConta != null) {
                setDataPlanoConta(response.data.planoDeConta.descricao)
                response.data.planoDeConta = null
            }
            if (response.data.banco != null) {
                setDataBanco(response.data.banco.nome)
                response.data.banco = null
            }

        }
        const loadDataFornecedor = async () => {
            const request = await getAll("ListaFornecedor");
            setFornecedores(request.data)
        }
        loadDataFornecedor()
        loadData()
    }, []);

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;
    {
        fornecedorModel.id > 0 &&
            arrayTab.push(

                < FornecedorEditGeral fornecedorModel={fornecedorModel} erros={error} nomeBairro={dataBairro} nomeCidade={dataCidade} nomeEstado={dataEstado} />,
                <FornecedorEditComplemento fornecedorModel={fornecedorModel} nomeBanco={dataBanco} nomePLanoDeConta={dataPlanoConta} />

            )
    }

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

        if (!ValidString(fornecedorGeralEdit.nomeFornecedor.trim(), 1)
            || !ValidString(fornecedorGeralEdit.nomeFantasia.trim(), 2)
            || !ValidString(fornecedorGeralEdit.inscricaoEstadual.trim(), 5)
        ) {
            setIsLoading(false);
            return;
        }

        if(!fornecedorGeralEdit.cnpj.trim() && !fornecedorGeralEdit.cpf.trim()){

            ValidString(fornecedorGeralEdit.cpf.trim(), 3)
            ValidString(fornecedorGeralEdit.cnpj.trim(), 4)
            return;
        }
        
        if (!ValidIeDigitos(siglaEdit, fornecedorGeralEdit.inscricaoEstadual)) {
            setError({ erro: true, erroNome: "Inscrição estadual inválida.", index: 5 })
            setIsLoading(false);
            return;
        }
        if (fornecedorGeralEdit.estadoId <= 0) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório.", index: 6 });
            setIsLoading(false);
            return;
        }
        if (!validCPF(fornecedorGeralEdit.cpf) || !ValidCnpj(fornecedorGeralEdit.cnpj)) {
            if (fornecedorGeralEdit.cpf && !validCPF(fornecedorGeralEdit.cpf)) {
                setError({ erro: true, erroNome: "CPF inválido !", index: 3 });
                setIsLoading(false);
                return;
            }
            if (fornecedorGeralEdit.cnpj && !ValidCnpj(fornecedorGeralEdit.cnpj)) {
                setError({ erro: true, erroNome: "CNPJ inválido !", index: 4 });
                setIsLoading(false);
                return;
            }
        }

        fornecedores.map(x => {

            if (x.cpf == fornecedorGeralEdit.cpf && fornecedorGeralEdit.cpf && x.id != fornecedorModel.id) {
                setError({ erro: true, erroNome: "CPF já cadastrado !", index: 3 });
                setIsLoading(false);
                erroCpfCnpj = true
            }
            if (x.cnpj == fornecedorGeralEdit.cnpj && fornecedorGeralEdit.cnpj && x.id != fornecedorModel.id) {
                setError({ erro: true, erroNome: "CNPJ já cadastrado !", index: 4 });
                setIsLoading(false);
                erroCpfCnpj = true;
            }
            if (x.inscricaoEstadual == fornecedorGeralEdit.inscricaoEstadual && fornecedorGeralEdit.inscricaoEstadual && x.id != fornecedorModel.id) {
                setError({ erro: true, erroNome: "Inscrição Estadual já cadastrada !", index: 5 });
                setIsLoading(false);
                erroCpfCnpj = true;
            }

        })

        if (erroCpfCnpj) {
            return;
        }

        let data: IFornecedor = {
            id: fornecedorModel.id,
            nomeFornecedor: fornecedorGeralEdit.nomeFornecedor,
            nomeFantasia: fornecedorGeralEdit.nomeFantasia,
            cnpj: fornecedorGeralEdit.cnpj,
            cpf: fornecedorGeralEdit.cpf,
            inscricaoEstadual: fornecedorGeralEdit.inscricaoEstadual,
            cep: fornecedorGeralEdit.cep,
            endereco: fornecedorGeralEdit.endereco,
            numeroEndereco: fornecedorGeralEdit.numeroEndereco,
            complemento: fornecedorGeralEdit.complemento,
            bairroId: fornecedorGeralEdit.bairroId,
            cidadeId: fornecedorGeralEdit.cidadeId,
            estadoId: fornecedorGeralEdit.estadoId,
            ddd: fornecedorGeralEdit.ddd,
            telefone: fornecedorGeralEdit.telefone,
            celular: fornecedorGeralEdit.celular,
            email: fornecedorGeralEdit.email,
            homePage: fornecedorGeralEdit.homePage,
            bancoId: fornecedorComplementoEdit.bancoId,
            agencia: fornecedorComplementoEdit.agencia,
            contaCorrenteFornecedor: fornecedorComplementoEdit.contaCorrenteFornecedor,
            responsavelTecnico: fornecedorComplementoEdit.responsavelTecnico,
            alvaraSanitario: fornecedorComplementoEdit.alvaraSanitario,
            autorizacaoFuncionamento: fornecedorComplementoEdit.autorizacaoFuncionamento,
            autorizacaoEspecial: fornecedorComplementoEdit.autorizacaoEspecial,
            licencaMapa: fornecedorComplementoEdit.licencaMapa,
            cadastroFarmacia: fornecedorComplementoEdit.cadastroFarmacia,
            planoDeContaId: fornecedorComplementoEdit.planoDeContaId,
            valorMinimoPedido: fornecedorComplementoEdit.valorMinimoPedido,
            formaPagamento: fornecedorComplementoEdit.formaPagamento,
            previsaoEntrega: fornecedorComplementoEdit.previsaoEntrega,
            frete: fornecedorComplementoEdit.frete,
            observacoes: fornecedorComplementoEdit.observacoes,
            usuarioFornecedor: fornecedorComplementoEdit.usuarioFornecedor,
            senhaFornecedor: fornecedorComplementoEdit.senhaFornecedor,
            hostFornecedor: fornecedorComplementoEdit.hostFornecedor,
            dddCelular: fornecedorGeralEdit.dddCelular,
            telefoneContato: fornecedorGeralEdit.telefoneContato,
            contato: fornecedorGeralEdit.contato,
            contribuinte: fornecedorGeralEdit.contribuinte
        };

        const resp = await postFormAll("EditarFornecedor", data);

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
            <HeaderMainContent title="Editar Fornecedor" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {fornecedorModel.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <LabelObrigatorio />
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="fornecedor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Registro editado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}