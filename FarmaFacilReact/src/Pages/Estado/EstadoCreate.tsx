import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { getAll, postFormAll } from "../../Services/Api";
import { SuccessModal } from "../../Components/Modals/SuccessModal";
import { FailModal } from "../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import { CustomDropDown } from "../../Components/Inputs/CustomDropDown";
import { CheckboxCustom } from "../../Components/Others/CheckboxCustom";

export function EstadoCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");
    const [sigla, setSigla] = useState("");
    const [aliquotaIcmsEstado, setAliquotaIcmsEstado] = useState(0);
    const [aliquotaFcpEstado, setAliquotaFcpEstado] = useState(0)
    const [difalComCalculoPorDentro, setDifalComCalculoPorDentro] = useState(false);
    const [difalComCalculoDeIsento, setDifalComcalculoDeIsento] = useState(false);
    const [checagemContribuinteIsento, setChecagemContribuinteIsento] = useState(false);
    const [paisId, setPaisId] = useState();
    const [erroNome, setErroNome] = useState("");
    const [paises, setPaises] = useState([]);

    const data = {
        id: 0,
        nome: nome.trim(),
        sigla: sigla.trim(),
        aliquotaIcmsEstado: aliquotaIcmsEstado,
        aliquotaFcpEstado: aliquotaFcpEstado,
        difalComCalculoPorDentro: difalComCalculoPorDentro,
        difalComCalculoDeIsento: difalComCalculoDeIsento,
        checagemContribuinteIsento: checagemContribuinteIsento,
        paisId: paisId,
    }

    useEffect(() => {
        const loadDataPaises = async () => {
            const response = await getAll("ListaPais");
            setPaises(response.data);
        }

        loadDataPaises()
    }, []);

    async function submit() {
        setErroNome("")
        setIsLoading(true)
        if (!nome.trim()) {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErroNome("Campo nome é obrigatório !")
            }, 2000)
            return;
        }
        const response = await postFormAll("AdicionarEstado", data);

        if (response.status === 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/estado");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR ESTADO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                <Container>
                    <div className="row">
                        <div className="col-4">
                            <CustomInput
                                label="Nome"
                                type="text"
                                placeholder="Digite o nome do Estado"
                                value={nome}
                                maxLength={50}
                                erro={erroNome}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setNome(e.target.value)
                                }
                                required={true}
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Sigla"
                                type="text"
                                placeholder="SC"
                                value={sigla}
                                maxLength={150}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSigla(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <CustomInput
                                label="Aliquota Icms %"
                                type="number"
                                value={aliquotaIcmsEstado}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAliquotaIcmsEstado(parseFloat(e.target.value))
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomInput
                                label="Aliquota Fcp %"
                                type="number"
                                value={aliquotaFcpEstado}
                                OnChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setAliquotaFcpEstado(parseFloat(e.target.value))
                                }
                            />
                        </div>
                        <div className="col-2">
                            <CustomDropDown
                                data={paises}
                                title="Selecione o Pais"
                                filter="nome"
                                label="Pais"
                                Select={(paisId) =>
                                    setPaisId(paisId)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <CheckboxCustom
                                options={["Checagem Contribuinte Isento(NFe N.T. 2015/003)"]}
                                check={checagemContribuinteIsento}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setChecagemContribuinteIsento(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <CheckboxCustom
                                options={["Difal com Calculo por Dentro"]}
                                check={difalComCalculoPorDentro}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setDifalComCalculoPorDentro(e.target.checked)}
                            />
                        </div>
                        <div className="col-3">
                            <CheckboxCustom
                                options={["Difal com Calculo Isento"]}
                                check={difalComCalculoDeIsento}
                                onClickOptions={(e: ChangeEvent<HTMLInputElement>) => setDifalComcalculoDeIsento(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                            <ButtonCancel to="Estado" />
                        </div>
                    </div>
                </Container>
                <SuccessModal show={isOpenSuccess} textCustom="Estado adicionado com " />
                <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
            </div>
        </>
    );
}