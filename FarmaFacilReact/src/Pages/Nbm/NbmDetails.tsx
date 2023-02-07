import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect, ChangeEvent } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { FieldsetCustom } from "../../Components/Others/FieldsetCustom";
import { INbm } from "../../Interfaces/Nbm/INbm";

export function NbmDetails() {

    const [nbmModel, setNbmModel] = useState({} as INbm);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString();

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaNbmPorId", idParams);
          if(response.status == 200){
            setNbmModel(response.data);
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
                                value={nbmModel.codigoNbm}
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
                                value={nbmModel.descricao}
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
                                        value={nbmModel.vlrAgregadoEst}
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-6">
                                    <CustomInput
                                        label="Valor Agregado Interestadual"
                                        type="number"
                                        value={nbmModel.vlrAgregadoInt}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-2">
                                    <CustomInput
                                        label="Valor Complementar Estadual"
                                        type="number"
                                        value={nbmModel.vlrComplementarEst}
                                        readonly={true}
                                    />
                                </div>
                                <div className="col-6 mb-2">
                                    <CustomInput
                                        label="Valor Complementar Interestadual"
                                        type="number"
                                        value={nbmModel.vlrComplementarInt}
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