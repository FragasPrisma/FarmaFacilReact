import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function TurnoDetails() {
    const [horaInicial, setHoraInicial] = useState("");
    const [horaFinal, setHoraFinal] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaTurnoPorId", idParams);
            if (response.status == 200) {
                setHoraFinal(response.data.horaFinal.slice(11, 16));
                setHoraInicial(response.data.horaInicial.slice(11, 16));
            }
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES TURNO" IncludeButton={false} ReturnButton={true} to="turno" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Hora Inicial"
                                type="time"
                                value={horaInicial}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Hora Final"
                                type="time"
                                value={horaFinal}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}