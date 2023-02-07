import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IFarmacopeia } from "../../Interfaces/Farmacopeia/IFarmacopeia";

export function FarmacopeiaEdit() {

    const [idFarmacopeia, setId] = useState(0);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [observacao, setObservacao] = useState("");
    const [erroNome, setErroNome] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaFarmacopeiaPorId", idParams);
            setId(response.data.id);
            setNome(response.data.nome);
            setObservacao(response.data.observacao)
        }

        Init()
    }, [])

    const data : IFarmacopeia = {
        id: idFarmacopeia,
        nome: nome.trim(),
        observacao: observacao.trim()
    };

    async function submit() {

        setErroNome("")
        setIsLoading(true);

        if (!nome.trim()) {
            setErroNome("Campo nome é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarFarmacopeia", data);

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
            <HeaderMainContent title="EDITAR FARMACOPÉIA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {data.id > 0 &&
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
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="farmacopeia" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Farmacopéia Editada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
