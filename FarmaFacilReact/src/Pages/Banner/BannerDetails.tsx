import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { UploadImagem } from "../../Components/Others/UploadImagem/UploadImagem";

export function BannerDetails() {

    const [idBanner, setId] = useState(0)
    const [descricao, setDescricao] = useState("");
    const [link, setLink] = useState("");
    const [acaoLink, setAcaoLink] = useState(0);
    const [posicao, setPosicao] = useState(0);
    const [dataInicio, setDataInicio] = useState(Date)
    const [dataFim, setDataFim] = useState(Date)
    const [imagem, setImagem] = useState("");

    const { id } = useParams();
    let idParams = !id ? "" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaBannerPorId", idParams);

            setId(response.data.id);
            setDescricao(response.data.descricao);
            setLink(response.data.link);
            setAcaoLink(response.data.acaoLink);
            setPosicao(response.data.posicao);
            setDataInicio(response.data.dataInicio.slice(0, 10));
            setDataFim(response.data.dataFim.slice(0, 10));
            setImagem(response.data.imagem);
        }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES BANNER" IncludeButton={false} ReturnButton={true} to="banner" />
            <div className="form-group">
                {idBanner > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
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
                            <div className="col-6">
                                <CustomInput
                                    label="Link"
                                    type="text"
                                    value={link}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <RadioCustom
                                    options={["Abrir link em nova aba", "Abrir link na mesma aba"]}
                                    name="acaoLink"
                                    titleComponet="Ação Link"
                                    value={acaoLink}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Posição"
                                    type="number"
                                    value={posicao}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                    <CustomInput
                                        label="Data inicial"
                                        type="date"
                                        value={dataInicio}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                                <div className="col-3">
                                    <CustomInput
                                        label="Data final"
                                        type="date"
                                        value={dataFim}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                        </div>
                        <UploadImagem img={"data:image/png;base64," + imagem} onButton={false} text="Imagem do Banner"/>
                    </Container>
                }
            </div>
        </>
    );
}
