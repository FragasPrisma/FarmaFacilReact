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
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export function PosologiaCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [periodo, setPeriodo] = useState(0);
    const [periodoLabel, setPeriodoLabel] = useState("");

    const data = {
        id: 0,
        descricao: descricao.trim(),
        quantidadeCapsulasOuDoses: quantidade,
        periodo: periodo
    };

    function setOptions(value: number, label: string) {
        setPeriodo(value);
        setPeriodoLabel(label);
    }

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
        const response = await postFormAll("AdicionarPosologia", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/posologia");
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
            <HeaderMainContent title="ADICIONAR POSOLOGIA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição para a posologia"
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
                        <div className="col-2 mt-5">
                            <CustomInput
                                label={`Capsulas/Doses por ${periodoLabel}`}
                                type="number"
                                value={quantidade}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setQuantidade(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="col-2 mt-2">
                            <RadioCustom 
                                options={["Dia", "Semana", "Mes"]}
                                name="periodo"
                                onClickOptions={(value, label) => setOptions(value,label)}
                                titleComponet="Periodo"
                                value={periodo}                           
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="posologia" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}