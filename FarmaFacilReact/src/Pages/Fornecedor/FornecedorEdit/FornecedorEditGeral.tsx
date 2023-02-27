import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { useState, ChangeEvent, useEffect } from 'react';
import { getAll } from "../../../Services/Api";
import { IFornecedor, IFornecedorGeral } from "../../../Interfaces/Fornecedor/IFornecedor";
import { MaskCpf, MaskCnpj, MaskIe, MaskCep, MaskTelefone } from "../../../Mask/Mask";
import { IEstado } from "../../../Interfaces/Estado/IEstado";
import { ICidade } from "../../../Interfaces/Cidade/ICidade";
import { IBairro } from "../../../Interfaces/Bairro/IBairro";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";

export let siglaEdit = "";

export let fornecedorGeralEdit: IFornecedorGeral = {
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
    contribuinte: null
}

interface IData {
    erros: {
        erro: boolean,
        erroNome: string,
        index: number
    },
    fornecedorModel: IFornecedor,
    nomeEstado: string,
    nomeCidade: string,
    nomeBairro: string
}

export function FornecedorEditGeral({ erros, fornecedorModel, nomeBairro, nomeCidade, nomeEstado }: IData) {

    useEffect(() => { setErrosParameters(erros) }, [erros]);

    const [nomeFornecedor, setNomeFornecedor] = useState(fornecedorModel.nomeFornecedor);
    const [nomeFantasia, setNomeFantasia] = useState(fornecedorModel.nomeFantasia);
    const [cnpj, setCnpj] = useState(fornecedorModel.cnpj);
    const [cpf, setCpf] = useState(fornecedorModel.cpf);
    const [inscricaoEstadual, setInscricaoEstadual] = useState(fornecedorModel.inscricaoEstadual);
    const [cep, setCep] = useState(fornecedorModel.cep);
    const [endereco, setEndereco] = useState(fornecedorModel.endereco);
    const [numeroEndereco, setNumeroEndereco] = useState(fornecedorModel.numeroEndereco);
    const [complemento, setComplemento] = useState(fornecedorModel.complemento);
    const [ddd, setDdd] = useState(fornecedorModel.ddd);
    const [telefone, setTelefone] = useState(fornecedorModel.telefone);
    const [celular, setCelular] = useState(fornecedorModel.celular);
    const [email, setEmail] = useState(fornecedorModel.email);
    const [dddCelular, setDddCelular] = useState(fornecedorModel.dddCelular)
    const [erroEstadoId, setErroEstadoId] = useState("");
    const [cidadeId, setCidadeId] = useState(fornecedorModel.cidadeId);
    const [bairroId, setBairroId] = useState(fornecedorModel.bairroId);
    const [estadoId, setEstadoId] = useState(fornecedorModel.estadoId);
    const [contato, setContato] = useState(fornecedorModel.contato);
    const [telefoneContato, setTelefoneContato] = useState(fornecedorModel.telefoneContato)
    const [homePage, setHomePage] = useState(fornecedorModel.homePage)
    const [contribuinte, setContribuinte] = useState(fornecedorModel.contribuinte);
    const [estados, setEstados] = useState([] as IEstado[]);
    const [cidades, setCidades] = useState([] as ICidade[]);
    const [bairros, setBairros] = useState([] as IBairro[]);
    const [errosParameter, setErrosParameters] = useState(erros)
    const [siglaEstado, setSiglaEstado] = useState(nomeEstado);

    siglaEdit = siglaEstado;

    function AdcionarEstado(id: any, select: any) {
        setEstadoId(id)
        setSiglaEstado(select)
    }

    useEffect(() => {
        if (erros.index == 6) {
            setErroEstadoId("Selecione um Estado !");
        }
    }, [erros])

    fornecedorGeralEdit.id = 0;
    fornecedorGeralEdit.nomeFornecedor = nomeFornecedor;
    fornecedorGeralEdit.nomeFantasia = nomeFantasia;
    fornecedorGeralEdit.cnpj = cnpj.replace(/[-/.]/g, "");
    fornecedorGeralEdit.cpf = cpf.replace(/[-/.]/g, "");
    fornecedorGeralEdit.inscricaoEstadual = inscricaoEstadual.replace(/[-/.]/g, "");
    fornecedorGeralEdit.cep = cep.replace(/[-/.]/g, "");
    fornecedorGeralEdit.endereco = endereco;
    fornecedorGeralEdit.numeroEndereco = numeroEndereco;
    fornecedorGeralEdit.complemento = complemento;
    fornecedorGeralEdit.ddd = ddd;
    fornecedorGeralEdit.telefone = telefone;
    fornecedorGeralEdit.celular = celular;
    fornecedorGeralEdit.email = email;
    fornecedorGeralEdit.cidadeId = cidadeId;
    fornecedorGeralEdit.bairroId = bairroId;
    fornecedorGeralEdit.estadoId = estadoId;
    fornecedorGeralEdit.dddCelular = dddCelular;
    fornecedorGeralEdit.contato = contato;
    fornecedorGeralEdit.telefoneContato = telefoneContato;
    fornecedorGeralEdit.homePage = homePage;
    fornecedorGeralEdit.contribuinte = contribuinte;

    useEffect(() => {
        if (erros.index == 6) {
            setErroEstadoId(erros.erroNome);
        }
    }, [erros])

    useEffect(() => {
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }
        const loadDataCidade = async () => {
            const response = await getAll("ListaCidade");
            setCidades(response.data);
        }
        const loadDataBairro = async () => {
            const response = await getAll("ListaBairro");
            setBairros(response.data);
        }

        loadDataBairro()
        loadDataCidade()
        loadDataEstado()
    }, []);


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
                        focusParam={true}
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
                        maxLength={15}
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
                        title={nomeEstado ? nomeEstado : "Selecione o Estado"}
                        filter="sigla"
                        label="Estado"
                        error={erroEstadoId}
                        required={true}
                        Select={(estadoId, select) => AdcionarEstado(estadoId, select)}
                        titleEdit="Selecione o estado"
                    />
                </div>
                <div className="col-4">
                    <CustomDropDown
                        data={cidades}
                        title={nomeCidade ? nomeCidade : "Selecione a Cidade"}
                        filter="nome"
                        label="Cidade"
                        Select={(cidadeId) => setCidadeId(cidadeId)}
                        titleEdit="Selecione a cidade"
                    />
                </div>
                <div className="col-3">
                    <CustomDropDown
                        data={bairros}
                        title={nomeBairro ? nomeBairro : "Selecione o Bairro"}
                        filter="nome"
                        label="Bairro"
                        Select={(bairroId) => setBairroId(bairroId)}
                        titleEdit="Selecione o bairro"
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
                        value={celular}
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
                        value={contribuinte ? contribuinte : -1}
                        onClickOptions={(select) => setContribuinte(select)}
                    />
                </div>
            </div>

        </Container>
    )
}