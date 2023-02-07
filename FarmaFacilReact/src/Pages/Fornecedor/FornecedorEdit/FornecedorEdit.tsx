import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { postFormAll, GetId } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import TabsPage from "../../../Components/Tabs";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../../Enum/itensFornecedor";
import { FornecedorEditComplemento } from "./FornecedorEditComplemento";
import { FornecedorEditGeral } from "./FornecedorEditGeral";
import { IFornecedor } from "../../../Interfaces/Fornecedor/IFornecedor";
import { fornecedorComplementoEdit } from './FornecedorEditComplemento'
import { fornecedorGeralEdit } from './FornecedorEditGeral'

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

        loadData()
    }, []);

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    arrayTab.push(
        <FornecedorEditGeral fornecedorModel={fornecedorModel} erros={error} nomeBairro={dataBairro} nomeCidade={dataCidade} nomeEstado={dataEstado} />,
        <FornecedorEditComplemento fornecedorModel={fornecedorModel} nomeBanco={dataBanco} nomePLanoDeConta={dataPlanoConta} />
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

        let data = {
            id: fornecedorModel.id,
            nomeFornecedor: fornecedorGeralEdit.nomeFornecedor,
            NomeFantasia: fornecedorGeralEdit.nomeFantasia,
            Cnpj: fornecedorGeralEdit.cnpj,
            Cpf: fornecedorGeralEdit.cpf,
            InscricaoEstadual: fornecedorGeralEdit.inscricaoEstadual,
            Cep: fornecedorGeralEdit.cep,
            Endereco: fornecedorGeralEdit.endereco,
            NumeroEndereco: fornecedorGeralEdit.numeroEndereco,
            Complemento: fornecedorGeralEdit.complemento,
            BairroId: fornecedorGeralEdit.bairroId,
            CidadeId: fornecedorGeralEdit.cidadeId,
            EstadoId: fornecedorGeralEdit.estadoId,
            Ddd: fornecedorGeralEdit.ddd,
            Telefone: fornecedorGeralEdit.telefone,
            Celular: fornecedorGeralEdit.celular,
            Email: fornecedorGeralEdit.email,
            HomePage: fornecedorComplementoEdit.homePage,
            Contato: fornecedorComplementoEdit.contato,
            TelefoneContato: fornecedorComplementoEdit.telefoneContato,
            BancoId: fornecedorComplementoEdit.bancoId,
            Agencia: fornecedorComplementoEdit.agencia,
            ContaCorrenteFornecedor: fornecedorComplementoEdit.contaCorrenteFornecedor,
            ResponsavelTecnico: fornecedorComplementoEdit.responsavelTecnico,
            AlvaraSanitario: fornecedorComplementoEdit.alvaraSanitario,
            AutorizacaoFuncionamento: fornecedorComplementoEdit.autorizacaoFuncionamento,
            AutorizacaoEspecial: fornecedorComplementoEdit.autorizacaoEspecial,
            LicencaMapa: fornecedorComplementoEdit.licencaMapa,
            CadastroFarmacia: fornecedorComplementoEdit.cadastroFarmacia,
            PlanoDeContaId: fornecedorComplementoEdit.planoDeContaId,
            ValorMinimoPedido: fornecedorComplementoEdit.valorMinimoPedido,
            FormaPagamento: fornecedorComplementoEdit.formaPagamento,
            PrevisaoEntrega: fornecedorComplementoEdit.previsaoEntrega,
            Frete: fornecedorComplementoEdit.frete,
            Observacoes: fornecedorComplementoEdit.observacoes,
            UsuarioFornecedor: fornecedorComplementoEdit.usuarioFornecedor,
            SenhaFornecedor: fornecedorComplementoEdit.senhaFornecedor,
            HostFornecedor: fornecedorComplementoEdit.hostFornecedor
        };

        if (!ValidString(fornecedorModel.nomeFornecedor.trim(), 1)
            || !ValidString(fornecedorModel.nomeFantasia.trim(), 2)
            || !ValidString(fornecedorModel.cpf.trim(), 3)
            || !ValidString(fornecedorModel.cnpj.trim(), 4)
            || !ValidString(fornecedorModel.inscricaoEstadual.trim(), 5)
        ) {
            setIsLoading(false);
            return;
        }

        if (fornecedorModel.estadoId <= 0) {
            setError({ erro: true, erroNome: "Campo obrigatório !", index: 6 });
            setIsLoading(false);
            return;
        }

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
            <HeaderMainContent title="EDITAR FORNECEDOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {fornecedorModel.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="fornecedor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Fornecedor editado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}