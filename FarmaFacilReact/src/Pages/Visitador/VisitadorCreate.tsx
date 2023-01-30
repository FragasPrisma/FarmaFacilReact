import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";

export function VisitadorCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairroId, setBairroId] = useState(0);
    const [cidadeId, setCidadeId] = useState(0);
    const [estadoId, setEstadoId] = useState(0);
    const [ddd, setDdd] = useState("");
    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [comissao, setComissao] = useState(0);
    const [erroNome, setErroNome] = useState("");
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [bairros, setBairros] = useState([]);

    const data = {
        id: 0,
        nome: nome.trim(),
        cep: cep.trim(),
        endereco: endereco.trim(),
        numero: numero.trim(),
        complemento: complemento.trim(),
        bairroId: bairroId,
        cidadeId: cidadeId,
        estadoId: estadoId,
        ddd: ddd.trim(),
        telefone: telefone.trim(),
        celular: celular.trim(),
        comisso: comissao
    }

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

    async function submit() {
        setErroNome("")
        setIsLoading(true)
        if (!nome.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNome("Campo nome é obrigatório !")
            }, 2000)
            return;
        }
        const response = await postFormAll("AdicionarVisitador", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/visitador");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR VISITADOR" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome do Visitador"
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
                                label="Cep"
                                type="text"
                                placeholder="Digite o cep do visitador"
                                value={cep}
                                maxLength={14}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCep(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Número"
                                type="text"
                                placeholder="Digite o número da casa"
                                value={numero}
                                maxLength={4}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNumero(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Endereço"
                                type="text"
                                placeholder="Digite o endereço do visitador"
                                value={endereco}
                                maxLength={60}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEndereco(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Complemento"
                                type="text"
                                placeholder="Digite o complemento do visitador"
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
                                data={bairros}
                                title="Selecione o Bairro"
                                filter="nome"
                                label="Bairro"
                                Select={(bairroId) => setBairroId(bairroId)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomDropDown
                                data={cidades}
                                title="Selecione a Cidade"
                                filter="nome"
                                label="Cidade"
                                Select={(cidadeId) => setCidadeId(cidadeId)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomDropDown
                                data={estados}
                                title="Selecione o Estado"
                                filter="sigla"
                                label="Estado"
                                Select={(estadoId) =>
                                    setEstadoId(estadoId)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Ddd"
                                type="text"
                                placeholder="47"
                                value={ddd}
                                maxLength={2}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDdd(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Telefone"
                                type="text"
                                placeholder="0000-0000"
                                value={telefone}
                                maxLength={2}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setTelefone(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Celular"
                                type="text"
                                placeholder="90000-0000"
                                value={celular}
                                maxLength={2}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCelular(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Comissão %"
                                type="number"
                                value={comissao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setComissao(parseFloat(e.target.value))
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="visitador" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}