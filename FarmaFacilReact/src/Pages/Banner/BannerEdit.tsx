import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { GetId, postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";

export function BannerEdit() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [idBanner, setId] = useState(0)
    const [descricao, setDescricao] = useState("");
    const [link, setLink] = useState("");
    const [acaoLink, setAcaoLink] = useState(0);
    const [posicao, setPosicao] = useState(0);
    const [dataInicio, setDataInicio] = useState(Date)
    const [dataFim, setDataFim] = useState(Date)
    const [imagemBanner, setImagemBanner] = useState("");
    const [imagem, setImagem] = useState("");

    const [erroDescricao, setErroDescricao] = useState("");
    const [erroLink, setErroLink] = useState("");
    const [erroPosicao, setErroPosicao] = useState("");
    const [erroImagem, setErroImagem] = useState("");
    const [erroDataInicial, setErroDataInicial] = useState("");
    const [erroDataFim, setErroDataFim] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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

    const data = {
        id: idBanner,
        descricao: descricao,
        link: link,
        acaoLink: acaoLink,
        posicao: posicao,
        dataInicio: dataInicio,
        dataFim: dataFim,
        imagemBanner: imagemBanner,
        imagem: imagem,
        ativo: true,
        tipoDadoImagem: "",
        integrados: "",
        bannerMagentoId: 0
    };

    async function submit() {

        setErroDescricao("");
        setIsLoading(true);

        if (!descricao.trim()) {
            setErroDescricao("Campo descrição é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!link.trim()) {
            setErroLink("Campo link é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (posicao <= 0) {
            setErroPosicao("Campo posição inválido !")
            setIsLoading(false);
            return;
        }

        if(!dataInicio){
            setErroDataInicial("Campo data inicial é obrigatório !")
            setIsLoading(false);
            return;
        }

        if(!dataFim){
            setErroDataFim("Campo data final é obrigatório !")
            setIsLoading(false);
            return;
        }

        if (!imagem) {
            setErroImagem("Selecione uma imagem !")
            setIsLoading(false);
            return;
        }

        const resp = await postFormAll("EditarBanner", data);

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

    function openFile(e: ChangeEvent<HTMLInputElement>) {

        e.preventDefault();

        if (e.target.files) {

            var input = e.target.files[0];
            var reader = new FileReader();

            reader.onload = function () {

                var dataURL = reader.result;

                if (typeof (dataURL) === "string") {
                    var index = dataURL.indexOf(',') + 1;
                    var base64 = dataURL.slice(index);
                    setImagem(base64)
                }
            };

            reader.readAsDataURL(input);
        }
    }

    return (
        <>
            <HeaderMainContent title="EDITAR BANNER" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {idBanner > 0 &&
                    <Container>
                        <div className="row">
                            <div className="col-6">
                                <CustomInput
                                    label="Descrição"
                                    type="text"
                                    placeholder="Digite a descrição"
                                    value={descricao}
                                    maxLength={100}
                                    erro={erroDescricao}
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
                                    label="Link"
                                    type="text"
                                    placeholder="Digite o link"
                                    value={link}
                                    maxLength={100}
                                    erro={erroLink}
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
                                    options={["Abrir link em nova aba", "Abrir link na mesma aba"]}
                                    name="acaoLink"
                                    onClickOptions={(value, label) => setAcaoLink(value)}
                                    titleComponet="Ação Link"
                                    value={acaoLink}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <CustomInput
                                    label="Posição"
                                    type="number"
                                    placeholder="Digite a posição"
                                    value={posicao}
                                    erro={erroPosicao}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setPosicao(parseInt(e.target.value))
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Data inicial"
                                    type="date"
                                    value={dataInicio}
                                    erro={erroDataInicial}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataInicio(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                            <div className="col-3">
                                <CustomInput
                                    label="Data final"
                                    type="date"
                                    value={dataFim}
                                    erro={erroDataFim}
                                    OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setDataFim(e.target.value)
                                    }
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-auto">
                                <span>Imagem do Banner</span>
                                <span className="text-danger">*</span>
                            </div>
                            <div className="col-3">
                                <label htmlFor="arquivo" className="imgLabel">Clique Aqui!</label>
                                <input
                                    type='file'
                                    className="imgInput"
                                    accept='image/*'
                                    id="arquivo"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => openFile(e)} />
                            </div>
                        </div>
                        <div className="row container-img border mt-2">
                            <img src={imagem && "data:image/png;base64," + imagem} />
                            <span className="text-danger">{erroImagem}</span>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                                <ButtonCancel to="banner" />
                            </div>
                        </div>
                    </Container>
                }
                <SuccessModal show={isOpenSuccess} textCustom="Banner editado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
