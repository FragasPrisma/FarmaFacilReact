import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams, useNavigate } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { IPosologia } from "../../Interfaces/Posologia/IPosologia";

export function PosologiaEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [descricao, setDescricao] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [periodo, setPeriodo] = useState(0);
    const [periodoLabel, setPeriodoLabel] = useState("");
    const [posologiaId, setPosologiaId] = useState(0);

    let data: IPosologia = {
        id: posologiaId,
        descricao: descricao,
        quantidadeCapsulasOuDoses: quantidade,
        periodo: periodo
    }

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaPosologiaPorId", idParams);
            if (response.status == 200) {
                setPosologiaId(response.data.id);
                setDescricao(response.data.descricao);
                setQuantidade(response.data.quantidadeCapsulasOuDoses);
                setPeriodo(response.data.periodo);
            }
        }

        Init()
    }, [])

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

        data.id = posologiaId;
        data.descricao = descricao.trim();
        data.quantidadeCapsulasOuDoses = quantidade;
        data.periodo = periodo;

        const response = await postFormAll("EditarPosologia", data);

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
            <HeaderMainContent title="EDITAR POSOLOGIA" IncludeButton={false} ReturnButton={false} />
            {
                posologiaId > 0 &&
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
                                    onClickOptions={(value, label) => setOptions(value, label)}
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
                    <SuccessModal show={isOpenSuccess} textCustom="Posologia editada com " />
                    <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
                </div>
            }
        </>
    );
}