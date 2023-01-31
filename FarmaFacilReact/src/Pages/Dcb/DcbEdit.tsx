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

export function DcbEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [codigoDcb, setCodigoDcb] = useState("");
    const [erroCodigoDcb, setErroCodigoDcb] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [dcbId, setDcbId] = useState(0);
    const { id } = useParams();
    const [isLoading,setIsLoading] = useState(false);

    const [data] = useState({
        id: 0,
        codigoDcb: "",
        descricao: ""
    });

    let idParams = !id ? "0" : id.toString();

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaDcbPorId", idParams);
          if(response.status == 200){
            setDcbId(response.data.id);
            setCodigoDcb(response.data.codigoDcb);
            setDescricao(response.data.descricao)
          }
        }
    
        Init()
    },[])

    async function submit() {
        setErroCodigoDcb("");
        setErroDescricao("");
        setIsLoading(true);

        if (!codigoDcb.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroCodigoDcb("Campo código dcb é obrigatório!")
            }, 2000)
            return;
        }
        if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo descrição é obrigatório!")
            }, 2000)
            return;
        }

        data.id = dcbId;
        data.codigoDcb = codigoDcb.trim();
        data.descricao = descricao.trim();

        const resp = await postFormAll("EditarDcb", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/dcb");
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
            <HeaderMainContent title="EDITAR DCB" IncludeButton={false} ReturnButton={false}/>
        <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Dcb"
                                type="text"
                                placeholder="Digite o código do dcb"
                                value={codigoDcb}
                                maxLength={10}
                                erro={erroCodigoDcb}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setCodigoDcb(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite uma descrição para o Dcb"
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
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
                            <ButtonCancel to="dcb" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="DCB editado com"/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    )
}