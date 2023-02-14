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
import { IMetodo } from "../../Interfaces/Metodo/IMetodo";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";

export function MetodoEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idMetodo, setId] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [quantidadeGotas, setQuantidadeGotas] = useState(Number);
    const [percentual, setPercentual] = useState(Number);
    const [errorQdt, setErroQtd] = useState("")
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaMetodoPorId", idParams);
            setId(response.data.id);
            setDescricao(response.data.descricao);
            setQuantidadeGotas(response.data.quantidadeGotas);
            setPercentual(response.data.percentual);
        }

        Init();
    }, []);

    const data: IMetodo = {
        id: idMetodo,
        descricao: descricao.trim(),
        quantidadeGotas: quantidadeGotas,
        percentual: percentual
    };

    async function submit() {

        setErro("")
        setErroQtd("")
        setIsLoading(true);

        if (!descricao.trim()) {
            setErro("Campo de preenchimento obrigatório.")
            setIsLoading(false);
            return;
        }

        if ((percentual > 0 && quantidadeGotas > 0)) {
            setErroQtd("Só é possivel informar a quantidade de gotas ou o percentual !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarMetodo", data);

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
            <HeaderMainContent title="Editar Método" IncludeButton={false} ReturnButton={false} />
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
                    <span className="text-danger-erro">{errorQdt}</span>
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
                            <span className="span-porcentagem">Ou %</span>
                        </div>
                        <div className="col-2">
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
                    <LabelObrigatorio />
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="metodo" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Registro editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
