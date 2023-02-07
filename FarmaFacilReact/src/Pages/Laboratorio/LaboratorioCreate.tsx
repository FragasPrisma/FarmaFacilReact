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
import { ILaboratorio } from "../../Interfaces/Laboratorio/ILaboratorio";

export function LaboratorioCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const data : ILaboratorio = {
        id: 0,
        descricao: descricao.trim()
    };

    async function submit() {
        setErroDescricao("")
        setIsLoading(true)
        if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo descrição é obrigatório !")
            }, 2000)
            return;
        }
        const response = await postFormAll("AdicionarLaboratorio", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/laboratorio");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao(response.request.response)
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR LABORATÓRIO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição para o laboratório"
                                value={descricao}
                                maxLength={50}
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
                            <ButtonCancel to="laboratorio" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Laboratório adicionado com "/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    )
}