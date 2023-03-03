import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { useState, ChangeEvent, useEffect } from 'react';
import { getAll } from "../../../Services/Api";
import { IFornecedorGeral } from "../../../Interfaces/Fornecedor/IFornecedor";
import { MaskCpf, MaskCnpj, MaskIe, MaskCep, MaskTelefone } from "../../../Mask/Mask";
import { ViaCep } from "../../../helper/ViaCep";
import { IEstado } from "../../../Interfaces/Estado/IEstado";
import { IBairro } from "../../../Interfaces/Bairro/IBairro";
import { ICidade } from "../../../Interfaces/Cidade/ICidade";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";

export let sigla = "";

export let fornecedorGeral: IFornecedorGeral = {
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
    dddCelular: "",
    homePage: "",
    contato: "",
    telefoneContato: "",
    contribuinte: 0
}

interface IData {
    erros: {
        erro: boolean,
        erroNome: string,
        index: number
    },
    textParameter: string
}

export function FornecedorCreateGeral({ erros, textParameter }: IData) {

    useEffect(() => { setErrosParameters(erros) }, [erros])

    useEffect(() => {

        setNomeFornecedor("")
        setNomeFantasia("")
        setCnpj("")
        setCpf("")
        setInscricaoEstadual("")
        setCep("")
        setEndereco("")
        setNumeroEndereco("")
        setComplemento("")
        setDdd("")
        setTelefone("")
        setDddCelular("")
        setCelular("")
        setEmail("")
        setErroEstadoId("")
        setHomePage("")
        setContato("")
        setTelefoneContato("")
        setSiglaEstado("")
        setCidadeId(0)
        setBairroId(0)
        setEstadoId(0)
        setContribuinte(-1)
        setNomeEstado("Selecione o Estado")
        setNomeCidade("Selecione a Cidade")
        setNomeBairro("Selecione o Bairro")

    }, [textParameter])

    const [nomeFornecedor, setNomeFornecedor] = useState(textParameter);
    const [nomeFantasia, setNomeFantasia] = useState(textParameter);
    const [cnpj, setCnpj] = useState(textParameter);
    const [cpf, setCpf] = useState(textParameter);
    const [inscricaoEstadual, setInscricaoEstadual] = useState(textParameter);
    const [cep, setCep] = useState(textParameter);
    const [endereco, setEndereco] = useState(textParameter);
    const [numeroEndereco, setNumeroEndereco] = useState(textParameter);
    const [complemento, setComplemento] = useState(textParameter);
    const [ddd, setDdd] = useState(textParameter);
    const [telefone, setTelefone] = useState(textParameter);
    const [dddCelular, setDddCelular] = useState(textParameter)
    const [celular, setCelular] = useState(textParameter);
    const [email, setEmail] = useState(textParameter);
    const [erroEstadoId, setErroEstadoId] = useState(textParameter);
    const [homePage, setHomePage] = useState(textParameter);
    const [contato, setContato] = useState(textParameter)
    const [telefoneContato, setTelefoneContato] = useState(textParameter)
    const [siglaEstado, setSiglaEstado] = useState(textParameter);
    const [cidadeId, setCidadeId] = useState(0);
    const [bairroId, setBairroId] = useState(0);
    const [estadoId, setEstadoId] = useState(0);
    const [contribuinte, setContribuinte] = useState(-1);
    const [estados, setEstados] = useState([] as IEstado[]);
    const [cidades, setCidades] = useState([] as ICidade[]);
    const [bairros, setBairros] = useState([] as IBairro[]);

    const [nomeEstado, setNomeEstado] = useState("Selecione o Estado")
    const [nomeCidade, setNomeCidade] = useState("Selecione a Cidade")
    const [nomeBairro, setNomeBairro] = useState("Selecione o Bairro")

    const [errosParameter, setErrosParameters] = useState(erros)

    sigla = siglaEstado;

    useEffect(() => {
        async function PesquisaCep() {

            if (cep.length == 9) {

                const request = await ViaCep(cep.replace(/\.|-/gm, ''))

                setEndereco(request.logradouro)
                setComplemento(request.complemento)
                setDdd(request.ddd)
                setDddCelular(request.ddd)
                const estado = estados.filter(x =>
                    x.sigla == request.uf
                )
                if (estado.length > 0) {
                    setNomeEstado(request.uf)
                    setSiglaEstado(request.uf)
                    setEstadoId(estado[0].id)
                }

                const cidade = cidades.filter(x =>
                    x.nome == request.localidade
                )

                if (cidade.length > 0) {
                    setNomeCidade(request.localidade)
                    setCidadeId(cidade[0].id)
                }

                const bairro = bairros.filter(x =>
                    x.nome == request.bairro
                )

                if (bairro.length > 0) {
                    setNomeBairro(request.bairro)
                    setBairroId(bairro[0].id)
                }

            }
        }
        PesquisaCep()
    }, [cep])

    useEffect(() => {

        if (erros.index == 6) {
            setErroEstadoId("Campo de preenchimento obrigatório.");
        } else {
            setErroEstadoId("");
        }
    }, [erros])

    fornecedorGeral.id = 0;
    fornecedorGeral.nomeFornecedor = nomeFornecedor;
    fornecedorGeral.nomeFantasia = nomeFantasia;
    fornecedorGeral.cnpj = cnpj.replace(/[-/.]/g, "");
    fornecedorGeral.cpf = cpf.replace(/\.|-/gm, '');
    fornecedorGeral.inscricaoEstadual = inscricaoEstadual.replace(/\.|-/gm, '');
    fornecedorGeral.cep = cep.replace(/\.|-/gm, '');
    fornecedorGeral.endereco = endereco;
    fornecedorGeral.numeroEndereco = numeroEndereco;
    fornecedorGeral.complemento = complemento;
    fornecedorGeral.ddd = ddd;
    fornecedorGeral.telefone = telefone;
    fornecedorGeral.celular = celular;
    fornecedorGeral.email = email;
    fornecedorGeral.cidadeId = cidadeId > 0 ? cidadeId : null;
    fornecedorGeral.bairroId = bairroId > 0 ? bairroId : null;
    fornecedorGeral.estadoId = estadoId;
    fornecedorGeral.contato = contato;
    fornecedorGeral.telefoneContato = telefoneContato;
    fornecedorGeral.homePage = homePage
    fornecedorGeral.dddCelular = dddCelular
    fornecedorGeral.contribuinte = contribuinte;

    useEffect(() => {
        const loadDataBairro = async () => {
            const response = await getAll("ListaBairro");
            setBairros(response.data);
        }
        const loadDataCidade = async () => {
            const response = await getAll("ListaCidade");
            setCidades(response.data);
        }
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }

        loadDataBairro();
        loadDataCidade();
        loadDataEstado();
    }, [])

    return (
        <Container>
            <div className="row">
                <div className="col-5">
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome do Fornecedor"
                        value={nomeFornecedor}
                        maxLength={50}
                        erros={errosParameter}
                        index={1}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNomeFornecedor(e.target.value)
                        }
                        required={true}
                        focusParam={true}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Nome Fantasia"
                        type="text"
                        placeholder="Digite o Nome Fantasia"
                        value={nomeFantasia}
                        maxLength={50}
                        erros={errosParameter}
                        index={2}
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
                        value={MaskCpf(cpf)}
                        maxLength={14}
                        erros={errosParameter}
                        index={3}
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
                        value={MaskCnpj(cnpj)}
                        maxLength={18}
                        erros={errosParameter}
                        index={4}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCnpj(e.target.value)
                        }
                        required={true}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="Inscrição estadual"
                        type="text"
                        placeholder="Digite a Inscrição estadual"
                        value={MaskIe(inscricaoEstadual)}
                        maxLength={20}
                        erros={errosParameter}
                        index={5}
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
                        value={MaskCep(cep)}
                        maxLength={9}
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
                <div className="col-3">
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
                    <CustomDropDown
                        data={estados}
                        title={nomeEstado}
                        filter="sigla"
                        label="Estado"
                        error={erroEstadoId}
                        required={true}
                        Select={(estadoId, select) => {
                            if (estadoId != null) {
                                setEstadoId(estadoId)
                                setSiglaEstado(select)
                                setNomeEstado(select)
                            }
                        }}
                        RemoveSelect={() => {
                            setEstadoId(0)
                            setSiglaEstado("")
                            setNomeEstado("Selecione o estado")
                        }}
                    />
                </div>
                <div className="col-4">
                    <CustomDropDown
                        data={cidades}
                        title={nomeCidade}
                        filter="nome"
                        label="Cidade"
                        Select={(cidadeId, select) => {
                            if (cidadeId != null) {
                                setCidadeId(cidadeId)
                                setNomeCidade(select)
                            }
                        }
                        }
                        RemoveSelect={() => {
                            setCidadeId(0)
                            setNomeCidade("Selecione a cidade")
                        }}
                    />
                </div>
                <div className="col-3">
                    <CustomDropDown
                        data={bairros}
                        title={nomeBairro}
                        filter="nome"
                        label="Bairro"
                        Select={(bairroId, select) => {
                            if (bairroId != null) {
                                setBairroId(bairroId)
                                setNomeBairro(select)
                            }
                        }
                        }
                        RemoveSelect={() => {
                            setBairroId(0)
                            setNomeBairro("Selecione o bairro")
                        }}
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
                        value={MaskTelefone(telefone)}
                        maxLength={9}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTelefone(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="DDD"
                        type="text"
                        placeholder="(99)"
                        value={dddCelular}
                        maxLength={2}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDddCelular(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Celular"
                        type="text"
                        placeholder="9 9999-9999"
                        value={MaskTelefone(celular)}
                        maxLength={9}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCelular(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-8">
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
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
                    <CustomInput
                        label="Contato"
                        type="text"
                        placeholder="Digite o contato"
                        value={contato}
                        maxLength={50}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setContato(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Telefone Contato"
                        type="text"
                        placeholder="Digite o telefone contato"
                        value={telefoneContato}
                        maxLength={20}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setTelefoneContato(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-4">
                    <RadioCustom
                        options={["Contribuinte do ICMS", "Contribui isento de inscrição", "Não contribuinte"]}
                        name="contribuinte"
                        value={contribuinte}
                        onClickOptions={(select) => setContribuinte(select)}
                    />
                </div>
            </div>

        </Container>
    )
}