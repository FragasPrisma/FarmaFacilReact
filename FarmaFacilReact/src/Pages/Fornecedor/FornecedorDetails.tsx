import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { getAll, GetId } from "../../Services/Api";
import { useParams } from "react-router-dom";
import { Container } from "./styles";
import TabsPage from "../../Components/Others/Tabs";
import { itemsHandlesFornecedor } from "../../Enum/itensFornecedor";

export function FornecedorDetails() {

    const { id } = useParams();
    const [idFornecedor, setId] = useState();
    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cpf, setCpf] = useState("");
    const [inscricaoEstadual, setInscricaoEstadual] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numeroEndereco, setNumeroEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [ddd, setDdd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [homePage, setHomePage] = useState("");
    const [agencia, setAgencia] = useState("");
    const [contaCorrenteFornecedor, setContaCorrenteFornecedor] = useState("");
    const [responsavelTecnico, setResponsavelTecnico] = useState("");
    const [alvaraSanitario, setAlvaraSanitario] = useState("");
    const [autorizacaoFuncionamento, setAutorizacaoFuncionamento] = useState("");
    const [autorizacaoEspecial, setAutorizacaoEspecial] = useState("");
    const [licencaMapa, setLicencaMapa] = useState("");
    const [cadastroFarmacia, setCadastroFarmacia] = useState("");
    const [valorMinimoPedido, setValorMinimoPedido] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("");
    const [previsaoEntrega, setPrevisaoEntrega] = useState("");
    const [frete, setFrete] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [estadoId, setEstadoId] = useState(0);
    const [cidadeId, setCidadeId] = useState();
    const [bairroId, setBairroId] = useState();
    const [bancoId, setBancoId] = useState();
    const [planoDeContaId, setPlanoDeContaId] = useState();

    const [dataEstado, setDataEstado] = useState("");
    const [dataCidade, setDataCidade] = useState("");
    const [dataBairro, setDataBairro] = useState("");
    const [dataPlanoConta, setDataPlanoConta] = useState("");
    const [dataBanco, setDataBanco] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        const loadData = async () => {
            const response = await GetId("RetornaFornecedorPorId", idParams);
            let resp = response.data;

            setAgencia(resp.agencia)
            setAlvaraSanitario(resp.alvaraSanitario)
            setAutorizacaoEspecial(resp.autorizacaoEspecial)
            setAutorizacaoFuncionamento(resp.autorizacaoFuncionamento)
            setBairroId(resp.bairroId)
            setBancoId(resp.bancoId)
            setCadastroFarmacia(resp.cadastroFarmacia)
            setCelular(resp.celular)
            setCep(resp.cep)
            setCidadeId(resp.cidadeId)
            setCnpj(resp.cnpj)
            setComplemento(resp.complemento)
            setContaCorrenteFornecedor(resp.contaCorrenteFornecedor)
            setCpf(resp.cpf)
            setDdd(resp.ddd)
            setEmail(resp.email)
            setEndereco(resp.endereco)
            setEstadoId(resp.estadoId)
            setFormaPagamento(resp.formaPagamento)
            setFrete(resp.frete)
            setHomePage(resp.homePage)
            setId(resp.id)
            setInscricaoEstadual(resp.inscricaoEstadual)
            setLicencaMapa(resp.licencaMapa)
            setNomeFantasia(resp.nomeFantasia)
            setNomeFornecedor(resp.nomeFornecedor)
            setNumeroEndereco(resp.numeroEndereco)
            setObservacoes(resp.observacoes)
            setPlanoDeContaId(resp.planoDeContaId)
            setPrevisaoEntrega(resp.previsaoEntrega)
            setResponsavelTecnico(resp.responsavelTecnico)
            setTelefone(resp.telefone)
            setValorMinimoPedido(resp.valorMinimoPedido)
            setDataEstado(resp.estado.sigla)
            if (resp.cidade != null) {
                setDataCidade(resp.cidade.nome)
            }
            if (resp.bairro != null) {
                setDataBairro(resp.bairro.nome)
            }
            if (resp.planoDeConta != null) {
                setDataPlanoConta(resp.planoDeConta.descricao)
            }
            if (resp.banco != null) {
                setDataBanco(resp.banco.nome)
            }
        }

        loadData()
    }, []);

    let arrayTab: any = [];

    const titles = itemsHandlesFornecedor;

    arrayTab.unshift(

        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Nome"
                        type="text"
                        value={nomeFornecedor}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Nome Fantasia"
                        type="text"
                        value={nomeFantasia}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <CustomInput
                        label="CPF"
                        type="text"
                        value={cpf}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="CNPJ"
                        type="text"
                        value={cnpj}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Inscrição estadual"
                        type="text"
                        value={inscricaoEstadual}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        value={cep}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        value={endereco}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        value={numeroEndereco}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    {dataEstado ?
                        <CustomInput
                            label="Estado"
                            type="text"
                            value={dataEstado}
                            readonly={true}
                            required={false}
                        />
                        :
                        <CustomInput
                            label="Estado"
                            type="text"
                            value={""}
                            readonly={true}
                            required={false}
                        />
                    }

                </div>
                <div className="col-4">
                    {dataCidade ?
                        <CustomInput
                            label="Cidade"
                            type="text"
                            value={dataCidade}
                            readonly={true}
                            required={false}
                        />
                        :
                        <CustomInput
                            label="Cidade"
                            type="text"
                            value={""}
                            readonly={true}
                            required={false}
                        />
                    }

                </div>
                <div className="col-2">
                    {dataBairro ?
                        <CustomInput
                            label="Bairro"
                            type="text"
                            value={dataBairro}
                            readonly={true}
                            required={false}
                        />
                        :
                        <CustomInput
                            label="Bairro"
                            type="text"
                            value={""}
                            readonly={true}
                            required={false}
                        />
                    }

                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="E-mail"
                        type="text"
                        value={email}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Complemento"
                        type="text"
                        value={complemento}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        value={ddd}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Telefone"
                        type="text"
                        value={telefone}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Celular"
                        type="text"
                        value={celular}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>

        </Container>

    );
    arrayTab.push(

        <Container>

            <div className="row">
                <div className="col-4">
                    {dataBanco ?
                        <CustomInput
                            label="Banco"
                            type="text"
                            value={dataBanco}
                            readonly={true}
                            required={false}
                        />
                        :
                        <CustomInput
                            label="Banco"
                            type="text"
                            value={""}
                            readonly={true}
                            required={false}
                        />
                    }

                </div>
                <div className="col-4">
                    {dataPlanoConta ?
                        <CustomInput
                            label="Plano de Contas"
                            type="text"
                            value={dataPlanoConta}
                            readonly={true}
                            required={false}
                        />
                        :
                        <CustomInput
                            label="Plano de Contas"
                            type="text"
                            value={""}
                            readonly={true}
                            required={false}
                        />
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Responsável técnico"
                        type="text"
                        value={responsavelTecnico}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Observações"
                        type="text"
                        value={observacoes}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Home-Page"
                        type="text"
                        value={homePage}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">

                <div className="col-3">
                    <CustomInput
                        label="Autorização de funcionamento"
                        type="text"
                        value={autorizacaoFuncionamento}
                        maxLength={10}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-3">
                    <CustomInput
                        label="Autorização Especial"
                        type="text"
                        value={autorizacaoEspecial}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Licença Mapa"
                        type="text"
                        value={licencaMapa}
                        readonly={true}
                        required={false}
                    />
                </div>
            </div>
            <div className="row">


                <div className="col-2">
                    <CustomInput
                        label="Cadastro Farmácia"
                        type="text"
                        value={cadastroFarmacia}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Agência"
                        type="text"
                        value={agencia}
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Conta Corrente"
                        type="text"
                        readonly={true}
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Alvará sanitário"
                        type="text"
                        value={alvaraSanitario}
                        readonly={true}
                        required={false}
                    />
                </div>


            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Valor mínimo"
                        type="number"
                        value={valorMinimoPedido}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Previsão de Entrega"
                        type="number"
                        value={previsaoEntrega}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Frete"
                        type="text"
                        value={frete}
                        readonly={true}
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Forma Pgto"
                        type="text"
                        readonly={true}
                        value={formaPagamento}
                        required={false}
                    />
                </div>
            </div>

        </Container>

    );

    return (
        <>
            <HeaderMainContent title="DETALHES DO FORNECEDOR" IncludeButton={false} ReturnButton={true} to={"fornecedor"} />
            <div className="form-group">
                {nomeFornecedor &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
            </div>
        </>
    );
}