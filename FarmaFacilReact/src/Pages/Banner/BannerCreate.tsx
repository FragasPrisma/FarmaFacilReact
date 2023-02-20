import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { UploadImagem } from "../../Components/Others/UploadImagem/UploadImagem";
import { IBanner } from "../../Interfaces/Banner/IBanner";
import { LabelObrigatorio } from "../../Components/Others/LabelMensagemObrigatorio";
import { CheckboxCustom } from "../../Components/Inputs/CheckboxCustom";
import { MaxLengthNumber } from "../../helper/MaxLengthNumber";
import { useTranslation } from "react-i18next";

export function BannerCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [descricao, setDescricao] = useState("");
    const [link, setLink] = useState("");
    const [acaoLink, setAcaoLink] = useState(0);
    const [posicao, setPosicao] = useState(0);
    const [dataInicio, setDataInicio] = useState("")
    const [dataFim, setDataFim] = useState("")
    const [imagemBanner, setImagemBanner] = useState("");
    const [imagem, setImagem] = useState<string | ArrayBuffer | null>("");
    const [ativo, setAtivo] = useState(false);

    const [erros, setErros] = useState({ erro: false, index: 0, erroNome: "" })
    const [erroPosicao, setErroPosicao] = useState("");
    const [erroImagem, setErroImagem] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [banners, setBanners] = useState([] as IBanner[]);

    useEffect(() => {

        const init = async () => {
            const request = await getAll("listabanner");

            if (request.status == 200) {
                setBanners(request.data)
            }
        };

        init();

    }, [])

    const data: IBanner = {
        id: 0,
        descricao: descricao,
        link: link,
        acaoLink: acaoLink,
        posicao: posicao,
        dataInicio: dataInicio,
        dataFim: dataFim,
        imagemBanner: imagemBanner,
        imagem: imagem,
        ativo: ativo,
        tipoDadoImagem: "",
        integrados: "",
        bannerMagentoId: 0
    };

    function ValidString(texto: string, index: number) {
        if (!texto.trim()) {
            setErros({ erro: true, index: index, erroNome: t('erros.campoObrigatorio') })
            return false;
        } else {
            return true;
        }
    }

    async function submit() {

        setErros({ erro: false, index: 0, erroNome: "" });
        setIsLoading(true);

        if (!ValidString(descricao.trim(), 1)
            || !ValidString(link.trim(), 2)
            || !ValidString(dataInicio, 3)
            || !ValidString(dataFim, 4)
        ) {
            setIsLoading(false);
            return;
        }

        if (posicao <= 0) {
            setErroPosicao(t('banner.erros.campoPosicao').toString())
            setIsLoading(false);
            return;
        }

        if (!imagem) {
            setErroImagem(t('banner.erros.imagem').toString())
            setIsLoading(false);
            return;
        }

        const banner = banners.filter(x => x.posicao == posicao);

        if (banner.length > 0) {
            setErroPosicao(t('banner.erros.campoPosicaoDuplicado').toString())
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("AdicionarBanner", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/banner");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    const updateImgModel = (value: string | ArrayBuffer | null) => {
        setImagem(value);
    };

    const onDelete = () => {
        setImagem("");
    }

    return (
        <>
            <HeaderMainContent title={t('banner.title')} IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label={t('textGeneric.descricao')}
                                type="text"
                                placeholder={t('textGeneric.digiteDescricao').toString()}
                                value={descricao}
                                maxLength={100}
                                erros={erros}
                                index={1}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDescricao(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label={t('banner.propriedade.link')}
                                type="text"
                                placeholder={t('banner.propriedade.digiteLink').toString()}
                                value={link}
                                maxLength={100}
                                erros={erros}
                                index={2}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setLink(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <RadioCustom
                                requerid={true}
                                options={[t('banner.propriedade.novaAba'), t('banner.propriedade.mesmaAba')]}
                                name="acaoLink"
                                onClickOptions={(value, label) => setAcaoLink(value)}
                                titleComponet={t('banner.titleAcaoLink').toString()}
                                value={acaoLink}
                            />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-3">
                            <CustomInput
                                label={t('banner.propriedade.posicao')}
                                type="number"
                                value={posicao}
                                erro={erroPosicao}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPosicao(MaxLengthNumber(999, parseInt(e.target.value)))
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label={t('banner.propriedade.dataInicio')}
                                type="date"
                                erros={erros}
                                index={3}
                                value={dataInicio}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDataInicio(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-3">
                            <CustomInput
                                label={t('banner.propriedade.dataFim')}
                                type="date"
                                value={dataFim}
                                erros={erros}
                                index={4}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDataFim(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                    </div>

                    <UploadImagem onUpdate={updateImgModel} text={t('banner.propriedade.imagem')} requerid={true} onDelete={onDelete} />
                    <div className="row mt-5">
                        <div className="col-3">
                            <CheckboxCustom
                                options={[t('banner.propriedade.ativo')]}
                                check={ativo}
                                onClickOptions={(check) => setAtivo(check.target.checked)}
                            />
                        </div>
                    </div>
                    {erroImagem &&
                        <p className="text-danger-erro">{erroImagem}</p>
                    }
                    <LabelObrigatorio />
                    <div className="row mt-3">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="banner" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
