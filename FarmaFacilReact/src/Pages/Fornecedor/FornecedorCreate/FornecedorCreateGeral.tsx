import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { Container } from "../styles";
import { useState , ChangeEvent , useEffect } from 'react';
import { getAll } from "../../../Services/Api";
import { IFornecedorGeral } from "../IFornecedor";

export let fornecedorGeral : IFornecedorGeral = {
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

interface IData{
    erros:{
        erro:boolean,
        erroNome:string,
        index:number
    }
}

export function FornecedorCreateGeral({erros}:IData){

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
    const [erroEstadoId, setErroEstadoId] = useState("");
    const [cidadeId, setCidadeId] = useState(null);
    const [bairroId, setBairroId] = useState(null);
    const [estadoId, setEstadoId] = useState(0);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    useEffect(() => {
        if(erros.index == 6){
            setErroEstadoId("Selecione um Estado !");
        }
    },[erros])

    fornecedorGeral.id = 0;
    fornecedorGeral.nomeFornecedor = nomeFornecedor;
    fornecedorGeral.nomeFantasia = nomeFantasia;
    fornecedorGeral.cnpj = cnpj;
    fornecedorGeral.cpf = cpf;
    fornecedorGeral.inscricaoEstadual = inscricaoEstadual;
    fornecedorGeral.cep = cep;
    fornecedorGeral.endereco = endereco;
    fornecedorGeral.numeroEndereco = numeroEndereco;
    fornecedorGeral.complemento = complemento;
    fornecedorGeral.ddd = ddd;
    fornecedorGeral.telefone = telefone;
    fornecedorGeral.celular = celular;
    fornecedorGeral.email = email;
    fornecedorGeral.cidadeId = cidadeId;
    fornecedorGeral.bairroId = bairroId;
    fornecedorGeral.estadoId = estadoId;

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
    },[])

    return(
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
                    <CustomDropDown data={estados} title="Selecione o Estado" filter="sigla" label="Estado" error={erroEstadoId} required={true} Select={(estadoId) => setEstadoId(estadoId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown data={cidades} title="Selecione a Cidade" filter="nome" label="Cidade" Select={(cidadeId) => setCidadeId(cidadeId)} />
                </div>
                <div className="col-2">
                    <CustomDropDown data={bairros} title="Selecione o Bairro" filter="nome" label="Bairro" Select={(bairroId) => setBairroId(bairroId)} />
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