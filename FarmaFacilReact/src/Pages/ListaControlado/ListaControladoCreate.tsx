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
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function ListaControladoCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState(0);
    const [receitaObrigatorio, setReceitaObrigatorio] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [erroCodigo, setErroCodigo] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");

    const data = {
        id: 0,
        codigo: codigo,
        descricao: descricao,
        tipo: tipo,
        receitaObrigatorio: receitaObrigatorio
    };

    async function submit() {

        setErroCodigo("");
        setErroDescricao("");
        setIsLoading(true);

        if (!codigo.trim()) {
            setErroCodigo("Campo código é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarListaControlado", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/listacontrolado");
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
            <HeaderMainContent title="ADICIONAR LISTA CONTROLADO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Lista Controlado"
                                type="text"
                                placeholder="Digite o código"
                                value={codigo}
                                maxLength={10}
                                erro={erroCodigo}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigo(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
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
                        <div className="col-5">
                            <RadioCustom
                                options={["Entorpecentes",
                                    "Psicotrópicos",
                                    "Controle Especial"]}
                                name="tipo"
                                onClickOptions={(value, label) => setTipo(value)}
                                titleComponet="Tipo"
                                value={tipo}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <CheckboxCustom
                                options={["Número da receita obrigatório"]}
                                check={receitaObrigatorio}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setReceitaObrigatorio(e.target.checked)}
                            />
                        </div>
                    </div>
                </Container>
                <div className="row mt-3">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="listacontrolado" />
                    </div>
                </div>
                <SuccessModal show={isOpenSuccess} textCustom="Lista Controlado adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
