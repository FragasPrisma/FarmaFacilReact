import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown"
import { CustomInput } from "../../../Components/Inputs/CustomInput"
import { getAll } from "../../../Services/Api"
import { IFornecedor, IFornecedorComplemento } from "../../../Interfaces/Fornecedor/IFornecedor"
import { Container } from "../styles"
import { useState, useEffect, ChangeEvent } from 'react'

export let fornecedorComplementoEdit: IFornecedorComplemento = {
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

interface IData {
    fornecedorModel: IFornecedor,
    nomePLanoDeConta: string,
    nomeBanco: string
}

export function FornecedorEditComplemento({ fornecedorModel, nomeBanco, nomePLanoDeConta }: IData) {

    const [bancoId, setBancoId] = useState(fornecedorModel.bancoId);
    const [planoDeContaId, setPlanoDeContaId] = useState(fornecedorModel.planoDeContaId);
    const [homePage, setHomePage] = useState(fornecedorModel.homePage);
    const [agencia, setAgencia] = useState(fornecedorModel.agencia);
    const [contaCorrenteFornecedor, setContaCorrenteFornecedor] = useState(fornecedorModel.contaCorrenteFornecedor);
    const [responsavelTecnico, setResponsavelTecnico] = useState(fornecedorModel.responsavelTecnico);
    const [alvaraSanitario, setAlvaraSanitario] = useState(fornecedorModel.alvaraSanitario);
    const [autorizacaoFuncionamento, setAutorizacaoFuncionamento] = useState(fornecedorModel.autorizacaoFuncionamento);
    const [autorizacaoEspecial, setAutorizacaoEspecial] = useState(fornecedorModel.autorizacaoEspecial);
    const [licencaMapa, setLicencaMapa] = useState(fornecedorModel.licencaMapa);
    const [cadastroFarmacia, setCadastroFarmacia] = useState(fornecedorModel.cadastroFarmacia);
    const [valorMinimoPedido, setValorMinimoPedido] = useState(fornecedorModel.valorMinimoPedido);
    const [formaPagamento, setFormaPagamento] = useState(fornecedorModel.formaPagamento);
    const [previsaoEntrega, setPrevisaoEntrega] = useState(fornecedorModel.previsaoEntrega);
    const [frete, setFrete] = useState(fornecedorModel.frete);
    const [observacoes, setObservacoes] = useState(fornecedorModel.observacoes);
    const [bancos, setBancos] = useState([]);
    const [contas, setContas] = useState([]);

    fornecedorComplementoEdit.homePage = homePage;
    fornecedorComplementoEdit.bancoId = bancoId;
    fornecedorComplementoEdit.agencia = agencia;
    fornecedorComplementoEdit.contaCorrenteFornecedor = contaCorrenteFornecedor;
    fornecedorComplementoEdit.responsavelTecnico = responsavelTecnico;
    fornecedorComplementoEdit.alvaraSanitario = alvaraSanitario;
    fornecedorComplementoEdit.autorizacaoFuncionamento = autorizacaoFuncionamento;
    fornecedorComplementoEdit.autorizacaoEspecial = autorizacaoEspecial;
    fornecedorComplementoEdit.licencaMapa = licencaMapa;
    fornecedorComplementoEdit.cadastroFarmacia = cadastroFarmacia;
    fornecedorComplementoEdit.planoDeContaId = planoDeContaId;
    fornecedorComplementoEdit.valorMinimoPedido = valorMinimoPedido;
    fornecedorComplementoEdit.formaPagamento = formaPagamento;
    fornecedorComplementoEdit.previsaoEntrega = previsaoEntrega;
    fornecedorComplementoEdit.frete = frete;
    fornecedorComplementoEdit.observacoes = observacoes;

    useEffect(() => {
        const loadDataContas = async () => {
            const response = await getAll("ListaPlanoDeContas");
            setContas(response.data);
        }
        const loadDataBancos = async () => {
            const response = await getAll("ListaBanco");
            setBancos(response.data);
        }

        loadDataBancos()
        loadDataContas()
    }, []);

    return (

        <Container>
            <div className="row">
                <div className="col-4">
                    <CustomDropDown data={bancos} title={nomeBanco ? nomeBanco : "Selecione o Banco"} filter="nome" label="Banco" Select={(bancoId) => setBancoId(bancoId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown data={contas} title={nomePLanoDeConta ? nomePLanoDeConta : "Selecione o Plano de Contas"} filter="descricao" label="Plano de Contas" Select={(planoId) => setPlanoDeContaId(planoId)} />
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