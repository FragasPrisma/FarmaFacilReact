import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { ITransportador } from "../../Interfaces/Transportador/ITransportador";
import { IEstado } from "../../Interfaces/Estado/IEstado";
import { ICidade } from "../../Interfaces/Cidade/ICidade";
import { IBairro } from "../../Interfaces/Bairro/IBairro";

export function TransportadorCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [bairroId, setBairroId] = useState(null);
    const [cidadeId, setCidadeId] = useState(null);
    const [estadoId, setEstadoId] = useState(null);
    const [estadoPlacaId, setEstadoPlacaId] = useState(null);
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

    const [erroNome, setErroNome] = useState("");
    const [erroCnpj, setErroCnpj] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [estados, setEstados] = useState([] as IEstado []);
    const [cidades, setCidades] = useState([] as ICidade []);
    const [bairros, setBairros] = useState([] as IBairro []);

    useEffect(() => {
        const loadDataBairro = async () => {
            const response = await getAll("ListaBairro");
            setBairros(response.data);
        }
        const loadDataEstado = async () => {
            const response = await getAll("ListaEstado");
            setEstados(response.data);
        }
        const loadDataCidade = async () => {
            const response = await getAll("ListaCidade");
            setCidades(response.data);
        }

        loadDataCidade()
        loadDataEstado()
        loadDataBairro()
    }, []);

    const data: ITransportador = {
        id: 0,
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

        const resp = await postFormAll("AdicionarTransportador", data);

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
            <HeaderMainContent title="ADICIONAR TRANSPORTADOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
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
                            title="Selecione o Estado" 
                            filter="sigla" 
                            label="Estado" 
                            Select={(estadoId) => 
                            setEstadoId(estadoId)} />
                        </div>
                        <div className="col-4">
                            <CustomDropDown 
                            data={cidades} 
                            title="Selecione a Cidade" 
                            filter="nome" 
                            label="Cidade" 
                            Select={(cidadeId) => setCidadeId(cidadeId)} />
                        </div>
                        <div className="col-2">
                            <CustomDropDown 
                            data={bairros} 
                            title="Selecione o Bairro" 
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
                            title="Selecione o Estado da placa" 
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
                <div className="row mt-3">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="transportador" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Transportador adicionado com "/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
