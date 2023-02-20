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
import { IEnsaio } from "../../Interfaces/Ensaio/IEnsaio";

export function EnsaioCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [farmacopeiaId, setFarmacopeiaId] = useState(0);
    const [erroFarmacopeia, setErroFarmacopeia] = useState("");
    const [erroNome, setErroNome] = useState("");
    const [farmacopeias, setFarmacopeias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const data: IEnsaio = {
        id: 0,
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

        const resp = await postFormAll("AdicionarEnsaio", data);

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
            <HeaderMainContent title="ADICIONAR ENSAIO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
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
                                title="Selecione a Farmacopéia"
                                filter="nome"
                                label="Farmacopéia"
                                Select={(id) => setFarmacopeiaId(id)}
                                error={erroFarmacopeia}
                            />
                        </div>
                    </div>
                </Container>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="ensaio" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Ensaio adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
