import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState , useEffect , ChangeEvent } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export function BulaEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idBula,setId] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [limitacaoVisual, setLimitacaoVisual] = useState(false);
    const [tipo, setTipo] = useState(0);
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroTipo, setErroTipo] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {
        async function Init() {
            const response = await GetId("RetornaBulaPorId", idParams);
            setId(response.data.id);
            setDescricao(response.data.descricao);
            setLimitacaoVisual(response.data.limitacaoVisual)
            setTipo(response.data.tipo)}

        Init();
    }, []);

    const data = {
        id: idBula,
        descricao: descricao.trim(),
        limitacaoVisual: limitacaoVisual,
        tipo: tipo
    };

    async function submit() {

        setErroDescricao("")
        setErroTipo("")
        setIsLoading(true);

        if (!descricao.trim()) {
            setErroDescricao("Campo Texto Bula é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (tipo < 0) {
            setErroTipo("Campo tipo é obrigatório !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarBula", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/bula");
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
            <HeaderMainContent title="EDITAR BULA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <RadioCustom
                                name="tipo"
                                options={["Alopática","Homeopática"]}
                                value={tipo}
                                titleComponet="Tipo de Bula"
                                onClickOptions={(select) => setTipo(select)}
                            />
                        </div>

                        <div className="col-2 mt-4">
                            <CheckboxCustom
                                options={["Limitação visual"]}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) =>
                                    setLimitacaoVisual(e.target.checked)}
                                check={limitacaoVisual}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-auto">
                            <CustomTextArea
                                value={descricao}
                                label="Texto Bula"
                                cols={105}
                                rows={20}
                                maxLength={1000}
                                erro={erroDescricao}
                                required={true}
                                OnChange={(e) => { setDescricao(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="bula" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Bula editada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
