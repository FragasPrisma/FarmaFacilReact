import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, ChangeEvent, useEffect } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { CustomTextArea } from "../../Components/Inputs/CustomTextArea";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { IBula } from "../../Interfaces/Bula/IBula";
import { contentEditor, EditorCustom } from "../../Components/Others/Editor";
//import { Editor } from "../../Components/Others/Editor";

export function BulaCreate() {

    const [editorValue,setEditorValue]=useState({ops : []} as any);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [descricao, setDescricao] = useState("");
    const [limitacaoVisual, setLimitacaoVisual] = useState(false);
    const [tipo, setTipo] = useState(0);
    const [erroDescricao, setErroDescricao] = useState("");
    const [erroTipo, setErroTipo] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        setEditorValue(contentEditor)
    },[contentEditor])

    async function submit() {

        setErroDescricao("")
        setErroTipo("")
        setIsLoading(true);

        // if (!descricao.trim()) {
        //     setErroDescricao("Campo Texto Bula é obrigatório !")
        //     setIsLoading(false);
        //     return;
        // }

        if (tipo < 0) {
            setErroTipo("Campo tipo é obrigatório !")
            setIsLoading(false);
            return;
        }

        const data: IBula = {
            id: 0,
            descricao: "",
            limitacaoVisual: limitacaoVisual,
            tipo: tipo
        };

        editorValue.ops.map((x : any) => 
            console.log(x)
        )

        console.log(data)
        return

        const resp = await postFormAll("AdicionarBula", data);

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
            <HeaderMainContent title="ADICIONAR BULA" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <RadioCustom
                                name="tipo"
                                options={["Alopática", "Homeopática"]}
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
                        <EditorCustom/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="bula" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Bula adicionada com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
