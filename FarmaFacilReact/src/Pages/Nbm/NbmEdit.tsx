import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useParams,useNavigate } from 'react-router-dom';
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { INbm } from "../../Interfaces/Nbm/INbm";

export function NbmEdit() {
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const [codigoNbm, setCodigoNbm] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valorAgregadoEstado, setValorAgregadoEstado] = useState(0);
    const [valorAgregadoInterestadual, setValorAgregadoInterestadual] = useState(0);
    const [valorComplementarEstado, setValorComplementarEstado] = useState(0);
    const [valorComplementarInterestadual, setValorComplementarInterestadual] = useState(0);
    const [erroCodigoNbm, setErroCodigoNbm] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    const [nbmId, setNbmId] = useState(0);
    const { id } = useParams();
    const [isLoading,setIsLoading] = useState(false);
    
    let data : INbm = {
        id: nbmId,
        codigoNbm: codigoNbm,
        descricao: descricao,
        vlrAgregadoEst: valorAgregadoEstado,
        vlrAgregadoInt: valorAgregadoInterestadual,
        vlrComplementarEst: valorComplementarEstado,
        vlrComplementarInt: valorComplementarInterestadual
    }

    let idParams = !id ? "0" : id.toString();

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaNbmPorId", idParams);
          if(response.status == 200){
            setNbmId(response.data.id);
            setCodigoNbm(response.data.codigoNbm);
            setDescricao(response.data.descricao);
            setValorAgregadoEstado(response.data.vlrAgregadoEst);
            setValorAgregadoInterestadual(response.data.vlrAgregadoInt);
            setValorComplementarEstado(response.data.vlrComplementarEst);
            setValorComplementarInterestadual(response.data.vlrComplementarInt);
          }
        }
    
        Init()
    },[])

    async function submit() {
        setErroDescricao("")
        setIsLoading(true)
        if (!descricao.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroDescricao("Campo descrição é obrigatório !")
            }, 2000)
            return;
        } else if (!codigoNbm.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroCodigoNbm("Campo código nbm é obrigatório !")
            }, 2000)
            return;
        }

        data.id = nbmId;
        data.codigoNbm = codigoNbm.trim();
        data.descricao = descricao.trim();
        data.vlrAgregadoEst = valorAgregadoEstado;
        data.vlrAgregadoInt = valorAgregadoInterestadual;
        data.vlrComplementarEst = valorComplementarEstado;
        data.vlrComplementarInt = valorComplementarInterestadual;

        const response = await postFormAll("EditarNbm", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/nbm");
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
            <HeaderMainContent title="EDITAR NBM" IncludeButton={false} ReturnButton={false} />
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
                    <div className="row mt-4">
                        <FieldsetCustom legend="Margens" numberCols={3} borderAll={true}>
                            <div className="row">
                                <div className="col-6">
                                    <CustomInput
                                        label="Valor Agregado Estadual"
                                        type="number"
                                        value={valorAgregadoEstado}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setValorAgregadoEstado(parseFloat(e.target.value))
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <CustomInput
                                        label="Valor Agregado Interestadual"
                                        type="number"
                                        value={valorAgregadoInterestadual}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setValorAgregadoInterestadual(parseFloat(e.target.value))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <CustomInput
                                        label="Valor Complementar Estadual"
                                        type="number"
                                        value={valorComplementarEstado}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setValorComplementarEstado(parseFloat(e.target.value))
                                        }
                                    />
                                </div>
                                <div className="col-6 mb-2">
                                    <CustomInput
                                        label="Valor Complementar Interestadual"
                                        type="number"
                                        value={valorComplementarInterestadual}
                                        OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setValorComplementarInterestadual(parseFloat(e.target.value))
                                        }
                                    />
                                </div>
                            </div>
                        </FieldsetCustom>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading}/>
                            <ButtonCancel to="nbm" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="NBM editado com"/>
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}