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

export function TransportadorCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [bairroId,setBairroId] = useState();
    const [cidadeId,setCidadeId] = useState();
    const [estadoId,setEstadoId] = useState();
    const [estadoPlacaId,setEstadoPlacaId] = useState();
    const [nome, setNome] = useState("");
    const [cpfCnpj,setCpfCnpj] = useState("");
    const [ie,setIe] = useState("");
    const [cep,setCep] = useState("");
    const [endereco,setEndereco] = useState("");
    const [numero,setNumero] = useState("");
    const [ddd,setDdd] = useState("");
    const [telefone,setTelefone] = useState("");
    const [codigoAntt,setCodigoAntt] = useState("");
    const [placa,setPlaca] = useState("");

    const [erroNome, setErroNome] = useState("");
    const [farmacopeias, setFarmacopeias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const data = {
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

    useEffect(() => {
        const loadDataFarmacopeia = async () => {
            const response = await getAll("ListaFarmacopeia");
            setFarmacopeias(response.data);
        }

        loadDataFarmacopeia()
    }, []);

    async function submit() {

        setErroNome("")
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarTransportador", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/ensaio");
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
                        <div className="col-6">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome"
                                value={nome}
                                maxLength={50}
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
                                label="CPF/CNPJ"
                                type="text"
                                placeholder="Digite o CPF/CNPJ"
                                value={cpfCnpj}
                                maxLength={14}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCpfCnpj(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label="Inscrição Estadual"
                                type="text"
                                placeholder="Digite a Inscrição Estadual"
                                value={ie}
                                maxLength={14}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setIe(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            {/* <CustomDropDown data={farmacopeias} title="Selecione a Farmacopéia" filter="nome" label="Farmacopéia" Select={(id) => setFarmacopeiaId(id)} /> */}
                        </div>
                    </div>
                </Container>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="transportador" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
