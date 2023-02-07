import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { ChangeEvent, useState, useEffect } from "react";
import { postFormAll } from "../../Services/Api";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { RadioCustom } from "../../Components/Inputs/RadioCustom";
import { UploadImagem } from "../../Components/Others/UploadImagem/UploadImagem";
import { IBanner } from "../../Interfaces/Banner/IBanner";

export function BannerCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const navigate = useNavigate();

    const [descricao, setDescricao] = useState("");
    const [link, setLink] = useState("");
    const [acaoLink, setAcaoLink] = useState(0);
    const [posicao, setPosicao] = useState(0);
    const [dataInicio, setDataInicio] = useState("")
    const [dataFim, setDataFim] = useState("")
    const [imagemBanner, setImagemBanner] = useState("");
    const [imagem, setImagem] = useState<string | ArrayBuffer | null>("");

    const [erros, setErros] = useState({ erro: false, index: 0, erroNome: "" })
    const [erroPosicao, setErroPosicao] = useState("");
    const [erroImagem, setErroImagem] = useState("");

    const [isLoading, setIsLoading] = useState(false);

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
        ativo: true,
        tipoDadoImagem: "",
        integrados: "",
        bannerMagentoId: 0
    };

    function ValidString(texto: string, index: number) {
        if (!texto.trim()) {
            setErros({ erro: true, index: index, erroNome: "Campo obrigatório !", })
            return false;
        } else {
            return true;
        }
    }

    async function submit() {

        setErros({ erro: false, index: 0, erroNome: "" });
        setIsLoading(true);
        console.log(dataInicio.length)

        if (!ValidString(descricao.trim(), 1)
            || !ValidString(link.trim(), 2)
            || !ValidString(dataInicio,3)
            || !ValidString(dataFim,4)
        ) {
            setIsLoading(false);
            return;
        }

        if (posicao <= 0) {
            setErroPosicao("Campo posição inválido !")
            setIsLoading(false);
            return;
        }

        if (!imagem) {
            setErroImagem("Selecione uma imagem !")
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

    return (
        <>
            <HeaderMainContent title="ADICIONAR BANNER" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-6">
                            <CustomInput
                                label="Descrição"
                                type="text"
                                placeholder="Digite a descrição"
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
                                label="Link"
                                type="text"
                                placeholder="Digite o link"
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
                                label="Data final"
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

                    <UploadImagem onUpdate={updateImgModel} text="Seleciona a Imagem" />
                    {erroImagem &&
                        <p className="text-danger">{erroImagem}</p>
                    }
                    <div className="row mt-3">
                        <div className="col-6">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="banner" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Banner adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}
