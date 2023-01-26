import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';

export function PosologiaDetails() {
    const [descricao, setDescricao] = useState("");
    const [quantidade, setQuantidade] = useState(0);
    const [periodo, setPeriodo] = useState(0);
    const [periodoLabel, setPeriodoLabel] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaPosologiaPorId", idParams);
            if (response.status == 200) {
                setDescricao(response.data.descricao);
                setQuantidade(response.data.quantidade);
                setPeriodo(response.data.periodo);
            }
        }

        Init()
    }, [])

    useEffect(() => {
        if (periodo == 0) {
            setPeriodoLabel("Dia");
        } else if (periodo == 1) {
            setPeriodoLabel("Semana");
        } else {
            setPeriodoLabel("Mês");
        }
    }, [periodo])

    return (
        <>
            <HeaderMainContent title="DETALHES POSOLOGIA" IncludeButton={false} ReturnButton={true} to="posologia" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={descricao}
                                maxLength={100}
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label={`Capsulas/Doses por ${periodoLabel}`}
                                type="number"
                                value={quantidade}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Periodo"
                                type="text"
                                value={periodoLabel}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}