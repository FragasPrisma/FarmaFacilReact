import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function ContabilistaEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [bairroId, setBairroId] = useState();
    const [cidadeId, setCidadeId] = useState();
    const [estadoId, setEstadoId] = useState();

    const [idContabilista, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [crc, setCrc] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [telefone, setTelefone] = useState("");
    const [fax, setFax] = useState("");
    const [email, setEmail] = useState("");
    const [complemento, setComplemento] = useState("");

    const [erroNome, setErroNome] = useState("");
    const [erroCnpj, setErroCnpj] = useState("");
    const [erroCpf, setErroCpf] = useState("");
    const [erroCrc, setErroCrc] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");

    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaContabilistaPorId", idParams);
            if (response.status == 200) {
                setId(response.data.id);
                setNome(response.data.nome);
                setBairroId(response.data.bairroId)
                setCidadeId(response.data.cidadeId)
                setEstadoId(response.data.estadoId)
                setCnpj(response.data.cnpj);
                setCpf(response.data.cpf);
                setCrc(response.data.crc);
                setFax(response.data.fax);
                setEmail(response.data.email);
                setCep(response.data.cep)
                setEndereco(response.data.endereco)
                setNumero(response.data.numero)
                setTelefone(response.data.telefone)
                setComplemento(response.data.complemento)

                if (response.data.bairro) {
                    setNomeBairro(response.data.bairro.nome)
                }
                if (response.data.cidade) {
                    setNomeCidade(response.data.cidade.nome)
                }
                if (response.data.estado) {
                    setNomeEstado(response.data.estado.sigla)
                }
            }
        }

        Init()
    }, [])

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

    const data = {
        id: idContabilista,
        bairroId: bairroId,
        cidadeId: cidadeId,
        estadoId: estadoId,
        nome: nome,
        cnpj: cnpj,
        cpf: cpf,
        crc: crc,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        cep: cep,
        telefone: telefone,
        fax: fax,
        email: email
    };

    async function submit() {

        setErroNome("");
        setErroCnpj("");
        setErroCpf("");
        setErroCrc("");
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!cnpj.trim()) {
            setErroCnpj("Campo CNPJ é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!cpf.trim()) {
            setErroCpf("Campo CPF é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!crc.trim()) {
            setErroCrc("Campo CRC é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarContabilista", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/contabilista");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNome(resp.request.response)
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="EDITAR CONTABILISTA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idContabilista > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-9">
                                <CustomInput
                                    label="Nome"
                                    type="text"
                                    placeholder="Digite o nome"
                                    value={nome}
                                    maxLength={100}
                                    erro={erroNome}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setNome(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="CNPJ"
                                    type="text"
                                    placeholder="Digite o CNPJ"
                                    value={cnpj}
                                    erro={erroCnpj}
                                    maxLength={14}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setCnpj(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CPF"
                                    type="text"
                                    placeholder="Digite o CPF"
                                    value={cpf}
                                    erro={erroCpf}
                                    maxLength={11}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setCpf(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="CRC"
                                    type="text"
                                    placeholder="Digite o CRC"
                                    value={crc}
                                    erro={erroCrc}
                                    maxLength={15}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setCrc(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
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
                            <div className="col-6">
                                <CustomInput
                                    label="Endereço"
                                    type="text"
                                    placeholder="Digite o Endereço"
                                    value={endereco}
                                    maxLength={60}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setEndereco(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
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
                            <div className="col-6">
                                <CustomInput
                                    label="Complemento"
                                    type="text"
                                    placeholder="Digite o complemento"
                                    value={complemento}
                                    maxLength={100}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setComplemento(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-3">
                                <CustomDropDown
                                    data={estados}
                                    title={nomeEstado ? nomeEstado : "Selecione o Estado"}
                                    filter="sigla"
                                    label="Estado"
                                    Select={(estadoId) =>
                                        setEstadoId(estadoId)} />
                            </div>
                            <div className="col-4">
                                <CustomDropDown
                                    data={cidades}
                                    title={nomeCidade ? nomeCidade : "Selecione a Cidade"}
                                    filter="nome"
                                    label="Cidade"
                                    Select={(cidadeId) => setCidadeId(cidadeId)} />
                            </div>
                            <div className="col-2">
                                <CustomDropDown
                                    data={bairros}
                                    title={nomeBairro ? nomeBairro : "Selecione o Bairro"}
                                    filter="nome"
                                    label="Bairro"
                                    Select={(bairroId) => setBairroId(bairroId)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-9">
                                <CustomInput
                                    label="E-mail"
                                    type="email"
                                    placeholder="Digite o e-mail"
                                    value={email}
                                    maxLength={60}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4">
                                <CustomInput
                                    label="Fax"
                                    type="text"
                                    placeholder="Digite o fax"
                                    value={fax}
                                    maxLength={10}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setFax(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Telefone"
                                    type="text"
                                    placeholder="Digite o telefone"
                                    value={telefone}
                                    maxLength={20}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setTelefone(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                    </Container>

                }
                <div className="row mt-3">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="contabilista" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Contabilista editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
