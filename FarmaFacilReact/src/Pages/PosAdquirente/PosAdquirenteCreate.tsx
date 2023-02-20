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
import { IPosAdquirente } from "../../Interfaces/PosAdquirente/IPosAdquirente";

export function PosAdquirenteCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [descricao, setDescricao] = useState("");
    const [chaveRequisicao, setChaveRequisicao] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroChaveRequisicao, setErroChaveRequisicao] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const data: IPosAdquirente = {
        id: 0,
        descricao: descricao,
        chaveRequisicao: chaveRequisicao
    };

    async function submit() {

        setErroDescricao("");
        setErroChaveRequisicao("");
        setIsLoading(true);

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!chaveRequisicao) {
            setErroChaveRequisicao("Campo chave reuisição é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarPosAdquirente", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/posadquirente");
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
            <HeaderMainContent title="ADICIONAR PÓS ADQUIRENTE" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
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
                        <div className="col-5">
                            <CustomInput
                                label="Chave Requisição"
                                type="text"
                                placeholder="Digite a chave"
                                value={chaveRequisicao}
                                maxLength={100}
                                erro={erroChaveRequisicao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setChaveRequisicao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                </Container>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="posadquirente" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Pós Adquirente adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
