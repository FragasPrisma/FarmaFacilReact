import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown"
import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { getAll } from "../../../Services/Api"
import { IFornecedorComplemento } from "../../../Interfaces/Fornecedor/IFornecedor"
import { Container } from "../styles"
import { useState, useEffect, ChangeEvent } from 'react'
import { MaxLengthNumber } from "../../../helper/MaxLengthNumber"

export let fornecedorComplemento: IFornecedorComplemento = {
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

interface IData {
    textParam: string;
}

export function FornecedorCreateComplemento({ textParam }: IData) {

    useEffect(() => {

        setBancoId(null)
        setPlanoDeContaId(null)
        setAgencia("")
        setContaCorrenteFornecedor("")
        setResponsavelTecnico("")
        setAlvaraSanitario("")
        setAutorizacaoFuncionamento("")
        setAutorizacaoEspecial("")
        setLicencaMapa("")
        setCadastroFarmacia("")
        setValorMinimoPedido(0)
        setFormaPagamento("")
        setPrevisaoEntrega(0)
        setFrete("")
        setObservacoes("")
        setHost("")
        setUsuario("")
        setSenha("")
        setNomeBanco("Selecione o banco")
        setNomePlano("Selecione o plano de contas")

    }, [textParam])

    const [bancoId, setBancoId] = useState(null);
    const [planoDeContaId, setPlanoDeContaId] = useState(null);
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
    const [host, setHost] = useState("");
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("")
    const [bancos, setBancos] = useState([]);
    const [contas, setContas] = useState([]);
    const [nomeBanco, setNomeBanco] = useState("Selecione o banco");
    const [nomePlano, setNomePlano] = useState("Selecione o plano de contas")

    fornecedorComplemento.bancoId = bancoId;
    fornecedorComplemento.agencia = agencia;
    fornecedorComplemento.contaCorrenteFornecedor = contaCorrenteFornecedor;
    fornecedorComplemento.responsavelTecnico = responsavelTecnico;
    fornecedorComplemento.alvaraSanitario = alvaraSanitario;
    fornecedorComplemento.autorizacaoFuncionamento = autorizacaoFuncionamento;
    fornecedorComplemento.autorizacaoEspecial = autorizacaoEspecial;
    fornecedorComplemento.licencaMapa = licencaMapa;
    fornecedorComplemento.cadastroFarmacia = cadastroFarmacia;
    fornecedorComplemento.planoDeContaId = planoDeContaId;
    fornecedorComplemento.valorMinimoPedido = valorMinimoPedido;
    fornecedorComplemento.formaPagamento = formaPagamento;
    fornecedorComplemento.previsaoEntrega = previsaoEntrega;
    fornecedorComplemento.frete = frete;
    fornecedorComplemento.observacoes = observacoes;
    fornecedorComplemento.hostFornecedor = host;
    fornecedorComplemento.usuarioFornecedor = usuario;
    fornecedorComplemento.senhaFornecedor = senha;

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

    return (
        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomDropDown
                        data={bancos}
                        title={nomeBanco}
                        filter="nome"
                        label="Banco"
                        Select={(bancoId, select) => { setBancoId(bancoId), setNomeBanco(select) }}
                        RemoveSelect={() => {setBancoId(null), setNomeBanco("Selecione o banco")}}
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
                <div className="col-4">
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
                <div className="col-4">
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
            </div>
            <div className="row">
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
                    <CustomDropDown
                        data={contas}
                        title={nomePlano}
                        filter="descricao"
                        label="Plano de Contas"
                        Select={(planoId, select) => { setPlanoDeContaId(planoId), setNomePlano(select) }}
                        RemoveSelect={() => {setPlanoDeContaId(null), setNomePlano("Selecione o plano de contas")}}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Host"
                        type="text"
                        placeholder="Digite o host"
                        value={host}
                        required={false}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setHost(e.target.value)
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Usuário"
                        type="text"
                        placeholder="Digite o usuário"
                        value={usuario}
                        required={false}
                        maxLength={15}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setUsuario(e.target.value)
                        }
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Senha"
                        type="password"
                        placeholder="Digite a senha"
                        value={senha}
                        required={false}
                        maxLength={15}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSenha(e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Valor mínimo"
                        type="number"
                        placeholder="Digite o valor"
                        value={valorMinimoPedido}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setValorMinimoPedido(MaxLengthNumber(9999999999.99, parseFloat(e.target.value)))
                        }
                        textAlign={true}
                        required={false}
                    />
                </div>
                <div className="col-4">
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

            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Previsão de Entrega"
                        type="number"
                        placeholder="Digite a previsão"
                        value={previsaoEntrega}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPrevisaoEntrega(MaxLengthNumber(100, parseInt(e.target.value)))
                        }
                        step="1"
                        textAlign={true}
                        required={false}
                    />
                </div>

                <div className="col-4">
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

        </Container>
    )
}