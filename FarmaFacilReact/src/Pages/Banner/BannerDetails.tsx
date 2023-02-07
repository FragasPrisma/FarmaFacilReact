import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { UploadImagem } from "../../Components/Others/UploadImagem/UploadImagem";
import { IBanner } from "../../Interfaces/Banner/IBanner";

export function BannerDetails() {

    const [bannerModel, setBannerModel] = useState({} as IBanner)

    const { id } = useParams();
    let idParams = !id ? "" : id.toString();

    useEffect(() => {

        async function Init() {
            const response = await GetId("RetornaBannerPorId", idParams);
                setBannerModel(response.data)
            }

        Init()
    }, [])

    return (
        <>
            <HeaderMainContent title="DETALHES BANNER" IncludeButton={false} ReturnButton={true} to="banner" />
            <div className="form-group">
                {bannerModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    value={bannerModel.descricao}
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
                                    value={bannerModel.link}
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
                                    value={bannerModel.acaoLink}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Posição"
                                    type="number"
                                    value={bannerModel.posicao}
                                    required={true}
                                    readonly={true}
                                />
                            </div>
                            <div className="col-3">
                                    <CustomInput
                                        label="Data inicial"
                                        type="date"
                                        value={bannerModel.dataInicio.slice(0, 10)}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                                <div className="col-3">
                                    <CustomInput
                                        label="Data final"
                                        type="date"
                                        value={bannerModel.dataFim.slice(0, 10)}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                        </div>
                        <UploadImagem img={"data:image/png;base64," + bannerModel.imagem} onButton={false} text="Imagem do Banner"/>
                    </Container>
                }
            </div>
        </>
    );
}
