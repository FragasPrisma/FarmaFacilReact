import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from 'react-router-dom';
import { SelectInput } from "../../Components/Inputs/SelectInput";

export function EtapaDetails() {
    const [descricao, setDescricao] = useState("");
    const [sequencia, setSequencia] = useState(Number);
    const [tipo, setTipo] = useState("");
    const [processo, setProcesso] = useState("");
    const [obrigatoria, setObrigatoria] = useState("");
    const [tempoMaximo, setTempoMaximo] = useState("");
    const { id } = useParams();

    let idParams = !id ? "0" : id.toString()

    useEffect(() =>{
    
        async function Init() {
          const response = await GetId("RetornaEtapaPorId", idParams);
          if(response.status == 200){
            setDescricao(response.data.descricao);
            setSequencia(response.data.sequencia);
            setTipo(response.data.tipo);
            setProcesso(response.data.processo);
            setObrigatoria(response.data.obrigatoria);
            setTempoMaximo(response.data.tempoMaximo);
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
                                value={descricao}
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
                                value={sequencia}
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
                                value={processo}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput 
                                type="text"
                                label="Obrigatória"
                                value={obrigatoria}
                                readonly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CustomInput
                                type="text"
                                label="Tipo"
                                value={tipo}
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
                                value={tempoMaximo}
                                readonly={true}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}