import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown"
import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { getAll } from "../../../Services/Api"
import { IFornecedorComplemento } from "../IFornecedor"
import { Container } from "../styles"
import { useState , useEffect , ChangeEvent } from 'react'

export let fornecedorComplemento : IFornecedorComplemento = {
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

export function FornecedorCreateComplemento(){

    const [bancoId, setBancoId] = useState(null);
    const [planoDeContaId, setPlanoDeContaId] = useState(null);
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
    const [bancos, setBancos] = useState([]);
    const [contas, setContas] = useState([]);

    fornecedorComplemento.homePage= homePage;
    fornecedorComplemento.bancoId= bancoId;
    fornecedorComplemento.agencia= agencia;
    fornecedorComplemento.contaCorrenteFornecedor= contaCorrenteFornecedor;
    fornecedorComplemento.responsavelTecnico= responsavelTecnico;
    fornecedorComplemento.alvaraSanitario= alvaraSanitario;
    fornecedorComplemento.autorizacaoFuncionamento= autorizacaoFuncionamento;
    fornecedorComplemento.autorizacaoEspecial= autorizacaoEspecial;
    fornecedorComplemento.licencaMapa= licencaMapa;
    fornecedorComplemento.cadastroFarmacia= cadastroFarmacia;
    fornecedorComplemento.planoDeContaId= planoDeContaId;
    fornecedorComplemento.valorMinimoPedido=valorMinimoPedido;
    fornecedorComplemento.formaPagamento= formaPagamento;
    fornecedorComplemento.previsaoEntrega= previsaoEntrega;
    fornecedorComplemento.frete= frete;
    fornecedorComplemento.observacoes= observacoes;

    useEffect(() => {
        const loadDataBancos = async () => {
            const response = await getAll("ListaBanco");
            setBancos(response.data);
        }
        const loadDataContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setContas(response.data);
        }

        loadDataContas()
        loadDataBancos()
    }, []);

    return(
        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomDropDown data={bancos} title="Selecione o Banco" filter="nome" label="Banco" Select={(bancoId) => setBancoId(bancoId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown data={contas} title="Selecione o Plano de Contas" filter="descricao" label="Plano de Contas" Select={(planoId) => setPlanoDeContaId(planoId)} />
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
    )
}