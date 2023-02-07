import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { useState, ChangeEvent, useEffect } from 'react';
import { getAll } from "../../../Services/Api";
import { IFornecedor, IFornecedorGeral } from "../../../Interfaces/Fornecedor/IFornecedor";

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
    email: ""
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
    const [erroEstadoId, setErroEstadoId] = useState("");
    const [cidadeId, setCidadeId] = useState(fornecedorModel.cidadeId);
    const [bairroId, setBairroId] = useState(fornecedorModel.bairroId);
    const [estadoId, setEstadoId] = useState(fornecedorModel.estadoId);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    fornecedorGeralEdit.id = 0;
    fornecedorGeralEdit.nomeFornecedor = nomeFornecedor;
    fornecedorGeralEdit.nomeFantasia = nomeFantasia;
    fornecedorGeralEdit.cnpj = cnpj;
    fornecedorGeralEdit.cpf = cpf;
    fornecedorGeralEdit.inscricaoEstadual = inscricaoEstadual;
    fornecedorGeralEdit.cep = cep;
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

    useEffect(() => {
        if (erros.index == 6) {
            setErroEstadoId("Selecione um Estado !");
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
                <div className="col-4">
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome do Fornecedor"
                        value={nomeFornecedor}
                        maxLength={50}
                        erros={erros}
                        index={1}
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
                        erros={erros}
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
                        value={cpf}
                        maxLength={11}
                        erros={erros}
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
                        value={cnpj}
                        maxLength={14}
                        erros={erros}
                        index={4}
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
                        erros={erros}
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
                    <CustomDropDown data={estados} title={nomeEstado ? nomeEstado : "Selecione o Estado"} filter="sigla" label="Estado" error={erroEstadoId} required={true} Select={(estadoId) => setEstadoId(estadoId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown data={cidades} title={nomeCidade ? nomeCidade : "Selecione a Cidade"} filter="nome" label="Cidade" Select={(cidadeId) => setCidadeId(cidadeId)} />
                </div>
                <div className="col-2">
                    <CustomDropDown data={bairros} title={nomeBairro ? nomeBairro : "Selecione o Bairro"} filter="nome" label="Bairro" Select={(bairroId) => setBairroId(bairroId)} />
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
    )
}