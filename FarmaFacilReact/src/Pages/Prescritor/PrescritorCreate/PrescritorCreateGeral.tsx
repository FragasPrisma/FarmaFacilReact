import { ChangeEvent, useState, useEffect } from "react";
import { CustomDropDown } from "../../../Components/Inputs/CustomDropDown";
import { CustomInput } from "../../../Components/Inputs/CustomInput";
import { RadioCustom } from "../../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../../Components/Others/CheckboxCustom";
import { getAll } from "../../../Services/Api";
import { Container } from "../styles";

export let PrescritorGeral = {
    id: 0,
    nome: "",
    cep: "",
    data_Nascimento: "",
    endereco: "",
    numero: "",
    complemento: "",
    cpfCnpj: "",
    ddd: "",
    dddCelular: "",
    telefone: "",
    celular: "",
    secretaria: "",
    nomeRotulo: "",
    ativo: true,
    bairroId: undefined,
    cidadeId: undefined,
    estadoId: undefined,
    genero: 0,
    crmNumero: "",
    crmEstado: "",
    crmTipo: "",
    tipoCr: 0
}


export function PrescritorCreateGeral() {

    const [nome, setNome] = useState("");
    const [erroNome, setErroNome] = useState("");
    const [cep, setCep] = useState("");
    const [data_Nascimento, setData_Nascimento] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [ddd, setDdd] = useState("");
    const [dddCelular, setDddCelular] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [secretaria, setSecretaria] = useState("");
    const [nomeRotulo, setNomeRotulo] = useState("");
    const [ativo, setAtivo] = useState(true);

    const [erroEstadoCrm, setErroEstadoCrm] = useState("");

    const [genero, setGenero] = useState(-1);
    const [crmNumero, setCrmNumero] = useState("");
    const [crmEstado, setCrmEstado] = useState("");
    const [crmTipo, setCrmTipo] = useState("");
    const [tipoCr, setTipoCr] = useState(-1);

    const [estadoId, setEstadoId] = useState();
    const [cidadeId, setCidadeId] = useState();
    const [bairroId, setBairroId] = useState();

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    PrescritorGeral.nome = nome;
    PrescritorGeral.cep = cep;
    PrescritorGeral.data_Nascimento = data_Nascimento;
    PrescritorGeral.endereco = endereco;
    PrescritorGeral.numero = numero;
    PrescritorGeral.complemento = complemento;
    PrescritorGeral.cpfCnpj = cpfCnpj;
    PrescritorGeral.ddd = ddd;
    PrescritorGeral.dddCelular = dddCelular;
    PrescritorGeral.telefone = telefone;
    PrescritorGeral.celular = celular;
    PrescritorGeral.secretaria = secretaria;
    PrescritorGeral.nomeRotulo = nomeRotulo;
    PrescritorGeral.ativo = ativo;
    PrescritorGeral.estadoId = estadoId;
    PrescritorGeral.bairroId = bairroId;
    PrescritorGeral.cidadeId = cidadeId;


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
        const loadDataEspecialidade = async () => {
            const response = await getAll("ListaEspecialidade");
            setEspecialidades(response.data);
        }

        loadDataEspecialidade()
    }, []);

    function ProcurarSiglaEstado(sigla: string) {
        var estadoFilter = estados.filter((item: { sigla: string }) => item.sigla == sigla);
        if (estadoFilter.length > 0) {
            estadoFilter.map((x: { sigla: string }) => (
                setCrmEstado(x.sigla)
            ))
        } else {
            setErroEstadoCrm("Estado não encontrado");
        }
    }

    return (
        <Container>
            <div className="row">
                <div className="col-5">
                    <CustomInput
                        label="Nome"
                        type="text"
                        placeholder="Digite o nome"
                        value={nome}
                        maxLength={100}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNome(e.target.value)
                        }
                        required={true}
                    />
                </div>
                <div className="col-3">
                    <CustomInput
                        label="CPF/CNPJ"
                        type="text"
                        placeholder="Digite o CPF ou CNPJ"
                        value={cpfCnpj}
                        maxLength={11}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCpfCnpj(e.target.value)
                        }
                        required={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <RadioCustom
                        name="tipoCr"
                        options={["CRM", "CRMV", "CRO", "Outro"]}
                        titleComponet="Tipo CR"
                        onClickOptions={(select) => { setTipoCr(select) }}
                        value={tipoCr}
                    />
                </div>
                {tipoCr == 3 &&
                    <div className="col-2 mt-4">
                        <CustomInput
                            label="Tipo CRM"
                            type="text"
                            placeholder="Digite o tipo CRM"
                            value={crmTipo}
                            maxLength={10}
                            OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCrmTipo(e.target.value)
                            }
                            required={true}
                        />
                    </div>
                }
                <div className="col-2 mt-4">
                    <CustomInput
                        label="Estado do Médico"
                        type="text"
                        placeholder="Digite a sigla do Estado"
                        value={crmEstado}
                        erro={erroEstadoCrm}
                        maxLength={2}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            ProcurarSiglaEstado(e.target.value)
                        }
                        required={true}
                    />
                </div>
                <div className="col-2 mt-4">
                    <CustomInput
                        label="Número do CRM"
                        type="text"
                        placeholder="Digite o número do CRM"
                        value={crmNumero}
                        maxLength={20}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCrmNumero(e.target.value)
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
                        maxLength={14}
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
                        maxLength={60}
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
                        value={numero}
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNumero(e.target.value)
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
                        maxLength={100}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setComplemento(e.target.value)
                        }
                        required={false}
                    />
                </div>
                <div className="col-2">
                    <CustomInput
                        label="Data de Nascimento"
                        type="date"
                        value={data_Nascimento}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setData_Nascimento(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <CustomDropDown data={estados} title="Selecione o Estado" filter="sigla" label="Estado" Select={(estadoId) => setEstadoId(estadoId)} />
                </div>
                <div className="col-4">
                    <CustomDropDown data={cidades} title="Selecione a Cidade" filter="nome" label="Cidade" Select={(cidadeId) => setCidadeId(cidadeId)} />
                </div>
                <div className="col-2">
                    <CustomDropDown data={bairros} title="Selecione o Bairro" filter="nome" label="Bairro" Select={(bairroId) => setBairroId(bairroId)} />
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
                        maxLength={10}
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
                        maxLength={10}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setCelular(e.target.value)
                        }
                        required={false}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <CustomInput
                        label="Secretária"
                        type="text"
                        placeholder="Digite o nome da secretária"
                        value={secretaria}
                        maxLength={60}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSecretaria(e.target.value)
                        }
                    />
                </div>
                <div className="col-4">
                    <CustomInput
                        label="Nome rótulo"
                        type="text"
                        placeholder="Digite o nome do rótulo"
                        value={nomeRotulo}
                        maxLength={60}
                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNomeRotulo(e.target.value)
                        }
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <RadioCustom
                        name="genero"
                        options={["Masculino", "Feminino"]}
                        titleComponet="Gênero"
                        onClickOptions={(select) => { setGenero(select) }}
                        value={genero}
                    />
                </div>
                <div className="col-3 mt-4">
                    <CheckboxCustom
                        options={["Ativo"]}
                        check={ativo}
                        onClickOptions={(e) => setAtivo(e.target.checked)}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <CustomDropDown
                        data={especialidades}
                        title="Selecione as Especialidades"
                        filter="descricao" label="Especialidade"
                        Select={(especialidadeId) => setEstadoId(especialidadeId)} />
                </div>
            </div>

        </Container>
    )
}