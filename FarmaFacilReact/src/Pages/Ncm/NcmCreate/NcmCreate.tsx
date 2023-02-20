import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState } from "react";
import { postFormAll } from "../../../Services/Api";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { useNavigate } from "react-router-dom";
import TabsPage from "../../../Components/Others/Tabs";
import { itemsHandlesNcm } from "../../../Enum/ItemsNcm";
import { NcmCreateGeral } from "./NcmCreateGeral";
import { NcmCreatePorEstado } from "./NcmCreatePorEstado";
import { NcmGeral } from "../../../Interfaces/Ncm/INcmGeral";
import { Ncm } from "../../../Interfaces/Ncm/INcm";
import { ncmPorEstado } from "./NcmCreatePorEstado";

export function NcmCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setErros] = useState({ erro: true, index: 0, erroNome: "" })

    let arrayTab: any = [];
    const titles = itemsHandlesNcm;

    arrayTab.unshift(
        <NcmCreateGeral
            error={error}
        />
    );
    arrayTab.push(
        <NcmCreatePorEstado />
    );

    async function submit() {
        if (!ValidString(NcmGeral.descricao, 1) || (!ValidString(NcmGeral.codigoNcm, 2))) {
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(NcmGeral.percentualMva, 3) || (!ValidNumber(NcmGeral.aliquotaNacional, 4) ||
            !ValidNumber(NcmGeral.aliquotaImportacao, 5) || !ValidNumber(NcmGeral.aliquotaPis, 6) ||
            !ValidNumber(NcmGeral.aliquotaCofins, 7)
        )) {
            setIsLoading(false);
            return;
        }

        Ncm.descricao = NcmGeral.descricao;
        Ncm.codigoNcm = NcmGeral.codigoNcm;
        Ncm.codigoNcmEx = NcmGeral.codigoNcmEx;
        Ncm.produtoServico = NcmGeral.produtoServico;
        Ncm.percentualMva = NcmGeral.percentualMva;
        Ncm.aliquotaNacional = NcmGeral.aliquotaNacional;
        Ncm.aliquotaImportacao = NcmGeral.aliquotaNacional;
        Ncm.aliquotaCofins = NcmGeral.aliquotaCofins;
        Ncm.aliquotaIcmsProduto = NcmGeral.aliquotaIcmsProduto;
        Ncm.aliquotaPis = NcmGeral.aliquotaPis;
        Ncm.tributoCstCofinsEntradaId = NcmGeral.tributoCstCofinsEntradaId;
        Ncm.tributoCstCofinsSaidaId = NcmGeral.tributoCstCofinsSaidaId;
        Ncm.tributoCstPisEntradaId = NcmGeral.tributoCstPisEntradaId;
        Ncm.tributoCstPisSaidaId = NcmGeral.tributoCstPisSaidaId;
        Ncm.ncmEstados = ncmPorEstado;

        const resp = await postFormAll("AdicionarNcm", Ncm);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/ncm");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function ValidString(texto: string, index: number) {
        if (!texto.trim()) {
            setErros({ erro: true, index: index, erroNome: "Campo obrigatório !", })
            return false;
        } else {
            return true;
        }
    }

    function ValidNumber(numero: number, index: number) {
        if (numero < 0) {
            setErros({ erro: true, index: index, erroNome: "Campo não pode ser menor que 0 !", })
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <HeaderMainContent title="ADICIONAR NCM" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />

                <div className="row">
                    <div className="col-6 mt-2">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="ncm" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Ncm adicionado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}