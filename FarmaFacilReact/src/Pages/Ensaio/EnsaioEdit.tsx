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
import { IEnsaio } from "../../Interfaces/Ensaio/IEnsaio";

export function EnsaioEdit() {

    const { id } = useParams();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [farmacopeiaId, setFarmacopeiaId] = useState(0);
    const [erroNome, setErroNome] = useState("");
    const [erroFarmacopeia, setErroFarmacopeia] = useState("");
    const [farmacopeias, setFarmacopeias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [idEnsaio, setId] = useState(0);
    const [nomeFarmacopeia, setNomeFarmacopeia] = useState("");

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaEnsaioPorId", idParams);
            setId(response.data.id);
            setNome(response.data.nome);
            if (response.data.farmacopeia != null) {
                setNomeFarmacopeia(response.data.farmacopeia.nome)
                setFarmacopeiaId(response.data.farmacopeia.id);
            }
        }

        Init()
    }, [])

    const data: IEnsaio = {
        id: idEnsaio,
        nome: nome,
        farmacopeiaId: farmacopeiaId
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

        if (farmacopeiaId <= 0) {
            setErroFarmacopeia("Selecione a Farmacopéia !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarEnsaio", data);

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
            <HeaderMainContent title="EDITAR ENSAIO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {data.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-5">
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
                            <div className="col-5">
                                <CustomDropDown
                                    data={farmacopeias}
                                    title={nomeFarmacopeia}
                                    filter="nome"
                                    label="Farmacopéia"
                                    error={erroFarmacopeia}
                                    Select={(id) => setFarmacopeiaId(id)}
                                />
                            </div>
                        </div>
                    </Container>
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="ensaio" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Ensaio editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
