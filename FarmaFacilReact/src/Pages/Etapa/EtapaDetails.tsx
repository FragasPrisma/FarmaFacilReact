import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { IEtapa } from "../../Interfaces/Etapa/IEtapa";

export function EtapaDetails() {
    
    const [etapaModel, setEtapaModel] = useState({} as IEtapa);
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaEtapaPorId", idParams);
          if(response.status == 200){
            setEtapaModel(response.data);
          }
        }
    
        Init()
    },[])

    return (
        <>
            <HeaderMainContent title="DETALHES ETAPA" IncludeButton={false} ReturnButton={true} to="etapa" />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-5">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                value={etapaModel.descricao}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                label="Sequência"
                                type="number"
                                value={etapaModel.sequencia}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput 
                                type="text"
                                label="Processo"
                                value={etapaModel.processo}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput 
                                type="text"
                                label="Obrigatória"
                                value={etapaModel.obrigatoria}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                type="text"
                                label="Tipo"
                                value={etapaModel.tipo}
                                required={true}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput 
                                label="Tempo Máximo"
                                type="time"
                                step="1"
                                value={etapaModel.tempoMaximo}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}