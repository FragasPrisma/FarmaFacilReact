import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useState } from "react";
import { postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { NOMEM } from "dns";

export function DciCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [codigoDci, setCodigoDci] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erroCodigoDci, setErroCodigoDci] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const data = {
        id: 0,
        codigoDci: codigoDci.trim(),
        descricao: descricao.trim(),
    }

    async function submit() {
        setErroCodigoDci("")
        setErroDescricao("")
        setIsLoading(true)

        if (!codigoDci.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroCodigoDci("Campo código dci é obrigatório !")
            }, 2000)
            return;
        } else if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo descrição é obrigatório !")
            }, 2000)
            return;
        }
        const response = await postFormAll("AdicionarDci", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/dci");
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
            <HeaderMainContent title="ADICIONAR DCI" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Dci"
                                type="text"
                                placeholder="Digite um código para o Dci"
                                value={codigoDci}
                                maxLength={15}
                                erro={erroCodigoDci}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoDci(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Descrição"
                                type="textarea"
                                placeholder="Digite uma descrição para o Dci"
                                value={descricao}
                                maxLength={100}
                                erro={erroDescricao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
                            <ButtonCancel to="dci" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="DCI adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}