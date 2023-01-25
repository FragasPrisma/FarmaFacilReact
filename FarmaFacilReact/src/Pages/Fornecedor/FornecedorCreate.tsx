import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { postFormAll, getAll } from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import TabsPage from "../../Components/Tabs";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { itemsHandlesFornecedor } from "../../Enum/itensFornecedor";

export function FornecedorCreate() {

    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [idFornecedor,setId] = useState(0);
    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [erroNomeFornecedor, setErroNomeFornecedor] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [erroNomeFantasia, setErroNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [erroCnpj, setErroCnpj] = useState("");
    const [cpf, setCpf] = useState("");
    const [erroCpf, setErroCpf] = useState("");
    const [inscricaoEstadual, setInscricaoEstadual] = useState("");
    const [erroInscricaoEstadual, setErroInscricaoEstadual] = useState("");
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
    const [valorMinimoPedido, setValorMinimoPedido] = useState(0);
    const [formaPagamento, setFormaPagamento] = useState("");
    const [previsaoEntrega, setPrevisaoEntrega] = useState(0);
    const [frete, setFrete] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [estadoId, setEstadoId] = useState(0);
    const [erroEstadoId, setErroEstadoId] = useState("");
    const [cidadeId, setCidadeId] = useState();
    const [bairroId, setBairroId] = useState();
    const [bancoId, setBancoId] = useState();
    const [planoDeContaId, setPlanoDeContaId] = useState();

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);
    const [bancos, setBancos] = useState([]);
    const [contas, setContas] = useState([]);
    
    const [errorRequest, setErrorRequest] = useState("");

    useEffect(() => {
        const loadDataBairro = async () => {
            const response = await getAll("ListaBairro");
            setBairros(response.data);
        }

        loadDataBairro()
    }, []);

    useEffect(() => {
        const loadDataCidade = async () => {
            const response = await getAll("ListaCidade");
            setCidades(response.data);
        }

        loadDataCidade()
    }, []);

    useEffect(() => {
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }

        loadDataEstado()
    }, []);

    useEffect(() => {
        const loadDataBancos = async () => {
            const response = await getAll("ListaBanco");
            setBancos(response.data);
        }

        loadDataBancos()
    }, []);

    useEffect(() => {
        const loadDataContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setContas(response.data);
        }

        loadDataContas()
    }, []);

    let data = {
        id: 0, 
        nomeFornecedor: nomeFornecedor,
        NomeFantasia: nomeFantasia,
        Cnpj: cnpj,
        Cpf: cpf,
        InscricaoEstadual: inscricaoEstadual,
        Cep: cep,
        Endereco: endereco,
        NumeroEndereco: numeroEndereco,
        Complemento: complemento,
        BairroId: bairroId,
        CidadeId: cidadeId,
        EstadoId: estadoId,
        Ddd: ddd,
        Telefone: telefone,
        Celular: celular,
        Email: email,
        HomePage: homePage,
        Contato: "",
        TelefoneContato: "",
        BancoId: bancoId,
        Agencia: agencia,
        ContaCorrenteFornecedor: contaCorrenteFornecedor,
        ResponsavelTecnico: responsavelTecnico,
        AlvaraSanitario: alvaraSanitario,
        AutorizacaoFuncionamento: autorizacaoFuncionamento,
        AutorizacaoEspecial: autorizacaoEspecial,
        LicencaMapa: licencaMapa,
        CadastroFarmacia: cadastroFarmacia,
        PlanoDeContaId: planoDeContaId,
        ValorMinimoPedido: valorMinimoPedido,
        FormaPagamento: formaPagamento,
        PrevisaoEntrega: previsaoEntrega,
        Frete: frete,
        Observacoes: observacoes,
        UsuarioFornecedor: "",
        SenhaFornecedor: "",
        HostFornecedor: ""
    };

    let arrayTab: any = [];
    const titles = itemsHandlesFornecedor;

    arrayTab.unshift(

        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome do Fornecedor"
                        value={nomeFornecedor}
                        maxLength={50}
                        erro={erroNomeFornecedor}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNomeFornecedor(e.target.value)
                        }
                        required={true}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Nome Fantasia"
                        type="text"
                        placeholder="Digite o Nome Fantasia"
                        value={nomeFantasia}
                        maxLength={50}
                        erro={erroNomeFantasia}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNomeFantasia(e.target.value)
                        }
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <CustomInput
                        label="CPF"
                        type="text"
                        placeholder="Digite o CPF"
                        value={cpf}
                        maxLength={11}
                        erro={erroCpf}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCpf(e.target.value)
                        }
                        required={true}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="CNPJ"
                        type="text"
                        placeholder="Digite o CNPJ"
                        value={cnpj}
                        maxLength={14}
                        erro={erroCnpj}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCnpj(e.target.value)
                        }
                        required={true}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Inscrição estadual"
                        type="text"
                        placeholder="Digite a Inscrição estadual"
                        value={inscricaoEstadual}
                        maxLength={9}
                        erro={erroInscricaoEstadual}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setInscricaoEstadual(e.target.value)
                        }
                        required={true}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="CEP"
                        type="text"
                        placeholder="Digite o CEP"
                        value={cep}
                        maxLength={8}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCep(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Endereço"
                        type="text"
                        placeholder="Digite o endereço"
                        value={endereco}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEndereco(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Número"
                        type="text"
                        placeholder="Digite o número"
                        value={numeroEndereco}
                        maxLength={7}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNumeroEndereco(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomDropDown data={estados} title="Selecione o Estado" filter="sigla" label="Estado" error={erroEstadoId} required={true} Select={(estadoId) => setEstadoId(estadoId)}/> 
                </div>
                <div className="col-4">
                    <CustomDropDown data={cidades} title="Selecione a Cidade" filter="nome" label="Cidade" Select={(cidadeId) => setCidadeId(cidadeId)}/>
                </div>
                <div className="col-2"> 
                    <CustomDropDown data={bairros} title="Selecione o Bairro" filter="nome" label="Bairro" Select={(bairroId) => setBairroId(bairroId)}/>
                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="E-mail"
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        maxLength={60}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Complemento"
                        type="text"
                        placeholder="Digite o complemento"
                        value={complemento}
                        maxLength={20}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setComplemento(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        placeholder="(99)"
                        value={ddd}
                        maxLength={2}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDdd(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Telefone"
                        type="text"
                        placeholder="9999-9999"
                        value={telefone}
                        maxLength={9}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTelefone(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Celular"
                        type="text"
                        placeholder="9 9999-9999"
                        value={celular}
                        maxLength={9}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCelular(e.target.value)
                        }
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
                    <CustomDropDown data={bancos} title="Selecione o Banco" filter="nome" label="Banco" Select={(bancoId) => setBancoId(bancoId)}/>
                </div>
                <div className="col-4">
                    <CustomDropDown data={contas} title="Selecione o Plano de Contas" filter="descricao" label="Plano de Contas" Select={(planoId) => setPlanoDeContaId(planoId)}/>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Responsável técnico"
                        type="text"
                        placeholder="Digite o nome do responsável"
                        value={responsavelTecnico}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setResponsavelTecnico(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Observações"
                        type="text"
                        placeholder="Digite a observação"
                        value={observacoes}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setObservacoes(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <CustomInput
                        label="Home-Page"
                        type="text"
                        placeholder="Home-Page"
                        value={homePage}
                        maxLength={60}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setHomePage(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                
                <div className="col-3">
                    <CustomInput
                        label="Autorização de funcionamento"
                        type="text"
                        placeholder="Digite a autorização"
                        value={autorizacaoFuncionamento}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAutorizacaoFuncionamento(e.target.value)
                        }
                        required={false}
                    />
                </div>

                <div className="col-3">
                    <CustomInput
                        label="Autorização Especial"
                        type="text"
                        placeholder="Digite a autorização especial"
                        value={autorizacaoEspecial}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAutorizacaoEspecial(e.target.value)
                        }
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Licença Mapa"
                        type="text"
                        placeholder="Digite a licença"
                        value={licencaMapa}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setLicencaMapa(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">

                
                <div className="col-2">
                    <CustomInput
                        label="Cadastro Farmácia"
                        type="text"
                        placeholder="Digite o cadastro"
                        value={cadastroFarmacia}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCadastroFarmacia(e.target.value)
                        }
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Agência"
                        type="text"
                        placeholder="Digite a agência"
                        value={agencia}
                        maxLength={6}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAgencia(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Conta Corrente"
                        type="text"
                        placeholder="Digite a conta corrente"
                        value={contaCorrenteFornecedor}
                        maxLength={15}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setContaCorrenteFornecedor(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Alvará sanitário"
                        type="text"
                        placeholder="Digite o alvará"
                        value={alvaraSanitario}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAlvaraSanitario(e.target.value)
                        }
                        required={false}
                    />
                </div>
                
                
            </div>
            <div className="row">
                <div className="col-2">
                    <CustomInput
                        label="Valor mínimo"
                        type="number"
                        placeholder="Digite o valor"
                        value={valorMinimoPedido}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setValorMinimoPedido(parseFloat(e.target.value))
                        }
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Previsão de Entrega"
                        type="number"
                        placeholder="Digite a previsão"
                        value={previsaoEntrega}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPrevisaoEntrega(parseInt(e.target.value))
                        }
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Frete"
                        type="text"
                        placeholder="Digite o frete"
                        value={frete}
                        maxLength={100}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFrete(e.target.value)
                        }
                        required={false}
                    />
                </div>

                <div className="col-2">
                    <CustomInput
                        label="Forma Pgto"
                        type="text"
                        placeholder="Digite a forma pgto"
                        value={formaPagamento}
                        maxLength={100}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setFormaPagamento(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

        </Container>

    );

    async function submit() {

        setErroNomeFornecedor("")
        setErroNomeFantasia("");
        setErroCnpj("");
        setErroCpf("");
        setErroInscricaoEstadual("");

        if (!nomeFornecedor.trim()) {
            setErroNomeFornecedor("Campo nome é obrigatório !")
            return;
        }

        if (!nomeFantasia.trim()) {
            setErroNomeFantasia("Campo nome fantasia é obrigatório !");
            return;
        }

        if (!cnpj.trim()) {
            setErroCnpj("Campo CNPJ é obrigatório !");
            return;
        }

        if (!cpf.trim()) {
            setErroCpf("Campo CPF é obrigatório !");
            return;
        }

        if (!inscricaoEstadual.trim()) {
            setErroInscricaoEstadual("Campo Inscrição Estadual é obrigatório !");
            return;
        }

        if(estadoId <= 0){
            setErroEstadoId("Campo Estado é obrigatório !");
            return;
        }

        const resp = await postFormAll("AdicionarFornecedor", data);

        if(resp.status == 200){
            setIsOpenSuccess(true);
            setTimeout(() => {
              navigate("/fornecedor");
            }, 2000)
          }else{
            setIsOpenFail(true);
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
                        <ButtonConfirm onCLick={submit} />
                        <ButtonCancel to="fornecedor" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}