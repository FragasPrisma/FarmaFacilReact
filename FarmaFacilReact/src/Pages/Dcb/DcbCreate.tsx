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

export function DcbCreate() {
    const navigate = useNavigate();
    const [codigoDcb, setCodigoDcb] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erroCodigoDcb, setErroCodigoDcb] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const data = {
        id: 0, //id 0 é default
        codigoDcb: codigoDcb,
        descricao: descricao
    };

    async function submit() {
        setErroCodigoDcb("");
        setErroDescricao("");
        setIsLoading(true);

        if (!codigoDcb.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroCodigoDcb("Campo código dcb é obrigatório!")
            }, 2000)
            return;
        }
        if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo descrição é obrigatório!")
            }, 2000)
            return;
        }

        const resp = await postFormAll("AdicionarDcb", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/dcb");
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
            <HeaderMainContent title="ADICIONAR DCB" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Dcb"
                                type="text"
                                placeholder="Digite o código do dcb"
                                value={codigoDcb}
                                maxLength={10}
                                erro={erroCodigoDcb}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoDcb(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite uma descrição para o Dcb"
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
                            <ButtonCancel to="dcb" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="DCB adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}