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

export function TransportadorEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [idTransportador, setId] = useState(0);
    const [bairroId, setBairroId] = useState();
    const [cidadeId, setCidadeId] = useState();
    const [estadoId, setEstadoId] = useState();
    const [estadoPlacaId, setEstadoPlacaId] = useState();
    const [nome, setNome] = useState("");
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [ie, setIe] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [ddd, setDdd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [codigoAntt, setCodigoAntt] = useState("");
    const [placa, setPlaca] = useState("");
    const [nomeBairro, setNomeBairro] = useState("");
    const [nomeCidade, setNomeCidade] = useState("");
    const [nomeEstado, setNomeEstado] = useState("");
    const [nomeEstadoPlaca, setNomeEstadoPlaca] = useState("");

    const [erroNome, setErroNome] = useState("");
    const [erroCnpj, setErroCnpj] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTransportadorPorId", idParams);
            if (response.status == 200) {
                setId(response.data.id);
                setNome(response.data.nome);
                setBairroId(response.data.bairroId)
                setCidadeId(response.data.cidadeId)
                setEstadoId(response.data.estadoId)
                setEstadoPlacaId(response.data.estadoPlacaId)
                setCpfCnpj(response.data.cpfCnpj)
                setIe(response.data.ie)
                setCep(response.data.cep)
                setEndereco(response.data.endereco)
                setNumero(response.data.numero)
                setDdd(response.data.ddd)
                setTelefone(response.data.telefone)
                setCodigoAntt(response.data.codigoAntt)
                setPlaca(response.data.placa)

                if (response.data.bairro) {
                    setNomeBairro(response.data.bairro.nome)
                }
                if (response.data.cidade) {
                    setNomeCidade(response.data.cidade.nome)
                }
                if (response.data.estado) {
                    setNomeEstado(response.data.estado.sigla)
                }
                if (response.data.estadoPlaca) {
                    setNomeEstadoPlaca(response.data.estadoPlaca.sigla)
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
        id: idTransportador,
        bairroId: bairroId,
        cidadeId: cidadeId,
        estadoId: estadoId,
        estadoPlacaId: estadoPlacaId,
        nome: nome,
        cpfCnpj: cpfCnpj,
        ie: ie,
        cep: cep,
        endereco: endereco,
        numero: numero,
        ddd: ddd,
        telefone: telefone,
        codigoAntt: codigoAntt,
        placa: placa
    };

    async function submit() {

        setErroNome("")
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!cpfCnpj.trim()) {
            setErroCnpj("Campo CPF/CNPJ é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarTransportador", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/transportador");
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
            <HeaderMainContent title="EDITAR TRANSPORTADOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idTransportador > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-8">
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
                            <div className="col-4">
                                <CustomInput
                                    label="CPF/CNPJ"
                                    type="text"
                                    placeholder="Digite o CPF/CNPJ"
                                    value={cpfCnpj}
                                    erro={erroCnpj}
                                    maxLength={14}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setCpfCnpj(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-4">
                                <CustomInput
                                    label="Inscrição Estadual"
                                    type="text"
                                    placeholder="Digite a Inscrição Estadual"
                                    value={ie}
                                    maxLength={11}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setIe(e.target.value)
                                    }
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
                                    maxLength={10}
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
                                    placeholder="Digite o Endereço"
                                    value={endereco}
                                    maxLength={60}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setEndereco(e.target.value)
                                    }
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
                            <div className="col-2">
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
                            <div className="col-2">
                                <CustomInput
                                    label="DDD"
                                    type="text"
                                    placeholder="Digite o DDD"
                                    value={ddd}
                                    maxLength={2}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDdd(e.target.value)
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
                        <div className="row">
                            <div className="col-2">
                                <CustomInput
                                    label="Código ANTT"
                                    type="text"
                                    placeholder="Digite o código ANTT"
                                    value={codigoAntt}
                                    maxLength={10}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setCodigoAntt(e.target.value)
                                    }
                                />
                            </div>
                            <div className="col-4">
                                <CustomDropDown
                                    data={estados}
                                    title={nomeEstadoPlaca ? nomeEstadoPlaca : "Selecione o Estado da placa"}
                                    filter="sigla"
                                    label="Estado Placa"
                                    Select={(estadoIdPlaca) => setEstadoPlacaId(estadoIdPlaca)} />
                            </div>
                            <div className="col-2">
                                <CustomInput
                                    label="Placa do Veículo"
                                    type="text"
                                    placeholder="Digite a placa do veículo"
                                    value={placa}
                                    maxLength={20}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setPlaca(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                    </Container>
                }
                <div className="row mt-3">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="transportador" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Transportador editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
