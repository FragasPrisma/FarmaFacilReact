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
import { IDci } from "../../Interfaces/Dci/IDci";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";

export function DciEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [codigoDci, setCodigoDci] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erroCodigoDci, setErroCodigoDci] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [dciId, setDciId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let idParams = !id ? "0" : id.toString();

    let data: IDci = {
        id: dciId,
        codigoDci: codigoDci,
        descricao: descricao
    }

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaDciPorId", idParams);
            if (response.status == 200) {
                setDciId(response.data.id);
                setCodigoDci(response.data.codigoDci);
                setDescricao(response.data.descricao);
            }
        }

        Init()
    }, [])

    async function submit() {
        setErroCodigoDci("")
        setErroDescricao("")
        setIsLoading(true)
        if (!codigoDci.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroCodigoDci("Campo de preenchimento obrigatório.")
            }, 2000)
            return;
        } else if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo de preenchimento obrigatório.")
            }, 2000)
            return;
        }

        data.id = dciId;
        data.codigoDci = codigoDci.trim();
        data.descricao = descricao.trim();

        const response = await postFormAll("EditarDci", data);

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
            <HeaderMainContent title="Editar DCI" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Dci"
                                type="text"
                                placeholder="Digite um código para o DCI"
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
                                placeholder="Digite uma descrição para o DCI"
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
                    <LabelObrigatorio/>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="dci" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Registro editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}