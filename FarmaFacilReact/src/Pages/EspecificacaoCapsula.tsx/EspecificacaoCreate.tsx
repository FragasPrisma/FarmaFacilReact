import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState , useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { IEspecialidadeCapsula } from "../../Interfaces/EspecificacaoCapsula/IEspecificacaoCapsula";

export function EspecificacaoCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [descricao, setDescricao] = useState("");
    const [prioridade, setPrioridade] = useState(Number);
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroPrioridade, setErroPrioridade] = useState("");
    const [especificaoCapsulas, setEspecificacaoCapsulas] = useState([] as IEspecialidadeCapsula[])
    const [isLoading, setIsLoading] = useState(false);

    const data: IEspecialidadeCapsula = {
        id: 0,
        descricao: descricao,
        prioridade: prioridade
    };

    useEffect(() => {
        const loadData = async () => {
            const response = await getAll("ListaEspecificacaoCapsula");
            setEspecificacaoCapsulas(response.data);
        }
        loadData()
    }, []);

    function ValidPrioridade(value : number){
        let arrayValid = especificaoCapsulas.filter(x => x.prioridade == value);

        if(arrayValid.length > 0){
            setErroPrioridade("Prioridade inválida !")
        }else{
            setErroPrioridade("")
        }

        setPrioridade(value)
    }

    async function submit() {

        setErroDescricao("");
        setIsLoading(true);

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        if(erroPrioridade){
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarEspecificacaoCapsula", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/especificacaocapsula");
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
            <HeaderMainContent title="ADICIONAR ESPECIFICAÇÃO CÁPSULA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
                                value={descricao}
                                maxLength={50}
                                erro={erroDescricao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Prioridade"
                                type="number"
                                placeholder="Digite a observação"
                                value={prioridade}
                                erro={erroPrioridade}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    ValidPrioridade(parseInt(e.target.value))
                                }
                                required={true}
                            />
                        </div>
                    </div>
                </Container>
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="especificacaocapsula" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Especificação Cápsula adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
