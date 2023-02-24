import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId } from "../../Services/Api";
import { Container } from "./styles";
import { useParams } from "react-router-dom";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { UploadImagem } from "../../Components/Others/UploadImagem/UploadImagem";
import { IBanner } from "../../Interfaces/Banner/IBanner";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { useTranslation } from "react-i18next";

export function BannerDetails() {

    const [bannerModel, setBannerModel] = useState({} as IBanner)
    const { t } = useTranslation();

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
            <HeaderMainContent title={t('banner.titleVisualizar')} IncludeButton={false} ReturnButton={true} to="banner" />
            <div className="form-group">
                {bannerModel.id > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label={t('textGeneric.descricao')}
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
                                    label={t('banner.propriedade.link')}
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
                                    options={[t('banner.propriedade.novaAba'), t('banner.propriedade.mesmaAba')]}
                                    name="acaoLink"
                                    titleComponet={t('banner.titleAcaoLink').toString()}
                                    value={bannerModel.acaoLink}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label={t('banner.propriedade.posicao')}
                                    type="number"
                                    value={bannerModel.posicao}
                                    required={true}
                                    readonly={true}
                                    textAlign={true}
                                />
                            </div>
                            <div className="col-3">
                                    <CustomInput
                                        label={t('banner.propriedade.dataInicio')}
                                        type="date"
                                        value={bannerModel.dataInicio.slice(0, 10)}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                                <div className="col-3">
                                    <CustomInput
                                        label={t('banner.propriedade.dataFim')}
                                        type="date"
                                        value={bannerModel.dataFim.slice(0, 10)}
                                        readonly={true}
                                        required={true}
                                    />
                                </div>
                        </div>
                        <UploadImagem img={"data:image/png;base64," + bannerModel.imagem} onButton={false} text={t('banner.titleImagem')}/>
                        <div className="row mt-5">
                        <div className="col-3">
                            <CheckboxCustom
                                options={[t('banner.propriedade.ativo')]}
                                check={bannerModel.ativo}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    </Container>
                }
            </div>
        </>
    );
}
