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

export function MetodoCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [quantidadeGotas, setQuantidadeGotas] = useState(Number);
    const [percentual, setPercentual] = useState(Number);
    const [errorQdt, setErroQtd] = useState("")
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    const data = {
        id: 0,
        descricao: descricao.trim(),
        quantidadeGotas: quantidadeGotas,
        percentual: percentual
    };

    async function submit() {

        setErro("")
        setIsLoading(true);

        if (!descricao.trim()) {
            setErro("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        if ((percentual == 0 && quantidadeGotas == 0)) {
            setErroQtd("É obrigatório informar a quantidade de gotas ou o percentual !")
            setIsLoading(false);
            return;
        }

        if ((percentual > 0 && quantidadeGotas > 0)) {
            setErroQtd("Só é possivel informar a quantidade de gotas ou o percentual !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarMetodo", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/metodo");
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
            <HeaderMainContent title="ADICIONAR MÉTODO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5 mb-3">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
                                value={descricao}
                                maxLength={10}
                                erro={erro}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 mb-3">
                            <CustomInput
                                label="Qtd de Gotas"
                                type="number"
                                placeholder="Digite a qtd de gotas"
                                value={quantidadeGotas}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setQuantidadeGotas(parseInt(e.target.value))
                                }
                                required={false}
                            />
                        </div>
                        <div className="col-1 mt-4">
                            <span>Ou %</span>
                        </div>
                        <div className="col-2 mb-3">
                            <CustomInput
                                label="Percentual"
                                type="number"
                                placeholder="Digite o percentual"
                                value={percentual}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPercentual(parseFloat(e.target.value))
                                }
                                required={false}
                            />
                        </div>
                    </div>
                    <div className="col-auto">
                        <p className="text-danger">{errorQdt}</p>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="metodo" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
