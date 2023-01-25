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
import { describe } from "node:test";

export function NbmCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [codigoNbm, setCodigoNbm] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valorAgregadoEstado, setValorAgregadoEstado] = useState();
    const [valorAgregadoInterestadual, setValorAgregadoInterestadual] = useState();
    const [valorComplementarEstado, setValorComplementarEstado] = useState();
    const [valorComplementarInterestadual, setValorComplementarInterestadual] = useState();
    const [erroCodigoNbm, setErroCodigoNbm] = useState("");
    const [erroDescricao, setErroDescricao] = useState("";)

    return (
        <>
            <HeaderMainContent title="ADICIONAR NBM" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Nbm"
                                type="text"
                                placeholder="Digite o código do Nbm"
                                value={codigoNbm}
                                maxLength={10}
                                erro={erroCodigoNbm}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoNbm(e.target.value)
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
                                placeholder="Digite uma descrição para o Nbm"
                                value={descricao}
                                erro={erroDescricao}
                                maxLength={50}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} />
                            <ButtonCancel to="nbm" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}