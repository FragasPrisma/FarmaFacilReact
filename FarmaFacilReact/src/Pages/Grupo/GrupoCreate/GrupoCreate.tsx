import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState } from "react";
import { postFormAll } from "../../../Services/Api";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { IGrupo } from "../../../Interfaces/Grupo/IGrupo";
import { GrupoCreateEnsaio } from "./GrupoCreateEnsaio";
import { gruposEnsaios } from "./GrupoCreateEnsaio";
import { itemsHandlesGrupo } from "../../../Enum/itensGrupo"
import { GrupoCreateGeral, GrupoGeral } from "./GrupoCreateGeral"
import TabsPage from "../../../Components/Others/Tabs";

export function GrupoCreate() {

    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erros, setErros] = useState({ erro: true, index: 0, erroNome: "" })
    const navigate = useNavigate();

    const data: IGrupo = {
        id: 0,
        descricao: "",
        comissao: 0,
        percentualDesconto: 0,
        tipo: 0,
        ativaPesagemGrupo: false,
        descontoMaximo: 0,
        ativaControleDeLotesAcabados: false,
        fatorReferenciaGrupo: 0,
        ativaControleLotesDrogaria: false,
        codigoGrupoLp: "",
        grupoEnsaios: []
    };

    let arrayTab: any = [];
    arrayTab.push(<GrupoCreateGeral erros={erros} />)
    arrayTab.push(<GrupoCreateEnsaio />)

    async function submit() {

        data.descricao = GrupoGeral.descricao;
        data.comissao = GrupoGeral.comissao;
        data.percentualDesconto = GrupoGeral.percentualDesconto;
        data.tipo = GrupoGeral.tipo;
        data.ativaPesagemGrupo = GrupoGeral.ativaPesagemGrupo;
        data.descontoMaximo = GrupoGeral.descontoMaximo;
        data.ativaControleDeLotesAcabados = GrupoGeral.ativaControleDeLotesAcabados;
        data.fatorReferenciaGrupo = GrupoGeral.fatorReferenciaGrupo;
        data.ativaControleLotesDrogaria = GrupoGeral.ativaControleLotesDrogaria;
        data.codigoGrupoLp = GrupoGeral.codigoGrupoLp;
        data.grupoEnsaios = gruposEnsaios;

        if (!ValidString(data.descricao, 1)) {
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(data.percentualDesconto, 2)) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const resp = await postFormAll("AdicionarGrupo", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/grupo");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
            }, 2000)
        }
    }

    function ValidNumber(numero: number, index: number) {
        if (numero < 0) {
            setErros({ erro: true, index: index, erroNome: "Campo obrigatório !" })
            return false;
        } else {
            return true;
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

    return (
        <>
            <HeaderMainContent title="ADICIONAR GRUPO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesGrupo.length} titles={itemsHandlesGrupo} />

                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="grupo" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Grupo adicionado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}
