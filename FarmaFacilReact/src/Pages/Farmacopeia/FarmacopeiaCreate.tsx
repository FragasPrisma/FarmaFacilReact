import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";

export function FarmacopeiaCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [observacao, setObservacao] = useState("");
    const [erroNome, setErroNome] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const data = {
        id: 0,
        nome: nome,
        observacao: observacao
    };

    async function submit() {

        setErroNome("")
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarFarmacopeia", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/farmacopeia");
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
            <HeaderMainContent title="ADICIONAR FARMACOPÉIA" IncludeButton={false} ReturnButton={false} />
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
                        <div className="col-8">
                            <CustomInput
                                label="Observação"
                                type="text"
                                placeholder="Digite a observação"
                                value={observacao}
                                maxLength={150}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setObservacao(e.target.value)
                                }
                                required={false}
                            />
                        </div>
                    </div>
                </Container>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="farmacopeia" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Farmacopéia adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
