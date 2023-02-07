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
import { ITurno } from "../../Interfaces/Turno/ITurno";

export function TurnoEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [turnoId, setTurnoId] = useState(0);
    const { id } = useParams();
    const [horaInicial, setHoraInicial] = useState("");
    const [horaFinal, setHoraFinal] = useState("");
    const [erroHoraInicial, setErroHoraInicial] = useState("");
    const [erroHoraFinal, setErroHoraFinal] = useState("");
    const [horaInicialDateTime, setHoraInicialDateTime] = useState<Date>();
    const [horaFinalDateTime, setHoraFinalDateTime] = useState<Date>();

    let idParams = !id ? "0" : id.toString();

    let data: ITurno = {
        id: turnoId,
        horaInicial: horaInicialDateTime,
        horaFinal: horaFinalDateTime,
        filialId: null
    }

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTurnoPorId", idParams);
            if (response.status == 200) {
                setTurnoId(response.data.id);
                setHoraInicial(response.data.horaInicial.slice(11, 16));
                setHoraFinal(response.data.horaFinal.slice(11, 16));
            }
        }

        Init()
    }, [])

    useEffect(() => {
        const timeComponents = horaInicial.split(":");
        const hours = parseInt(timeComponents[0]);
        const minutes = parseInt(timeComponents[1]);
        const dateTimeInicial = new Date();
        dateTimeInicial.setHours(hours);
        dateTimeInicial.setMinutes(minutes);
        setHoraInicialDateTime(dateTimeInicial);
    }, [horaInicial])

    useEffect(() => {
        const timeComponents = horaFinal.split(":");
        const hours = parseInt(timeComponents[0]);
        const minutes = parseInt(timeComponents[1]);
        const dateTimeFinal = new Date();
        dateTimeFinal.setHours(hours);
        dateTimeFinal.setMinutes(minutes);
        setHoraFinalDateTime(dateTimeFinal);
    }, [horaFinal])

    async function submit() {
        setErroHoraInicial("")
        setErroHoraFinal("")
        setIsLoading(true)
        if (!horaInicial.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroHoraInicial("Campo hora inicial é obrigatório !")
            }, 2000)
            return;
        }

        if (!horaFinal.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroHoraFinal("Campo hora final é obrigatório !")
            }, 2000)
            return;
        }

        const response = await postFormAll("EditarTurno", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/turno");
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
            <HeaderMainContent title="Editar TURNO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Hora Inicial"
                                type="time"
                                placeholder="00:00"
                                value={horaInicial}
                                erro={erroHoraInicial}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setHoraInicial(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Hora Final"
                                type="time"
                                placeholder="00:00"
                                value={horaFinal}
                                erro={erroHoraFinal}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setHoraFinal(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="turno" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Turno editado com" />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}