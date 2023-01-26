import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect, ChangeEvent } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";

export function NbmDetails() {
    const [codigoNbm, setCodigoNbm] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valorAgregadoEstado, setValorAgregadoEstado] = useState(0);
    const [valorAgregadoInterestadual, setValorAgregadoInterestadual] = useState(0);
    const [valorComplementarEstado, setValorComplementarEstado] = useState(0);
    const [valorComplementarInterestadual, setValorComplementarInterestadual] = useState(0);
    const [nbmId, setNbmId] = useState(0);
    const { id } = useParams();

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

    return (
        <>
            <HeaderMainContent title="DETALHES NBM" IncludeButton={false} ReturnButton={true} to="nbm"/>
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Código Nbm"
                                type="text"
                                value={codigoNbm}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Descrição"
                                type="textarea"
                                value={descricao}
                                required={true}
                                readonly={true}
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
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-6">
                                    <CustomInput
                                        label="Valor Agregado Interestadual"
                                        type="number"
                                        value={valorAgregadoInterestadual}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <CustomInput
                                        label="Valor Complementar Estadual"
                                        type="number"
                                        value={valorComplementarEstado}
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-6 mb-2">
                                    <CustomInput
                                        label="Valor Complementar Interestadual"
                                        type="number"
                                        value={valorComplementarInterestadual}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </FieldsetCustom>
                    </div>
                </Container>
            </div>
        </>
    );
}