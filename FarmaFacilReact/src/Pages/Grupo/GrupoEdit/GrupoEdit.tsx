import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { useState, useEffect } from "react";
import { GetId, postFormAll } from "../../../Services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { IGrupo } from "../IGrupo";
import { GrupoEditEnsaio, gruposEnsaios , gruposEnsaiosDelete } from "./GrupoEditEnsaio";
import { itemsHandlesGrupo } from "../../../Enum/itensGrupo"
import { GrupoEditGeral, GrupoGeral } from "./GrupoEditGeral"
import TabsPage from "../../../Components/Tabs";

export function GrupoEdit() {

    const [idGrupo, setId] = useState(-1);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [erros, setErros] = useState({ erro: true, index: 0, erroNome: "" })
    const [grupoModel,setGrupoModel] = useState({} as IGrupo)
    const navigate = useNavigate();

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function Init() {

            const response = await GetId("RetornaGrupoPorId", idParams);
            setGrupoModel(response.data)
            setId(response.data.id);
        }

        Init()
    }, [])

    let arrayTab: any = [];
    {
        grupoModel.id > 0 &&
            arrayTab.push(<GrupoEditGeral erros={erros} GrupoModel={grupoModel}/>)
            arrayTab.push(<GrupoEditEnsaio EnsaiosGrupo={grupoModel.grupoEnsaios} />)
    }

    async function submit() {

        grupoModel.descricao = GrupoGeral.descricao;
        grupoModel.comissao = GrupoGeral.comissao;
        grupoModel.percentualDesconto = GrupoGeral.percentualDesconto;
        grupoModel.tipo = GrupoGeral.tipo;
        grupoModel.ativaPesagemGrupo = GrupoGeral.ativaPesagemGrupo;
        grupoModel.descontoMaximo = GrupoGeral.descontoMaximo;
        grupoModel.ativaControleDeLotesAcabados = GrupoGeral.ativaControleDeLotesAcabados;
        grupoModel.fatorReferenciaGrupo = GrupoGeral.fatorReferenciaGrupo;
        grupoModel.ativaControleLotesDrogaria = GrupoGeral.ativaControleLotesDrogaria;
        grupoModel.codigoGrupoLp = GrupoGeral.codigoGrupoLp;
        grupoModel.grupoEnsaios = gruposEnsaios;

        if (!ValidString(grupoModel.descricao, 1)) {
            setIsLoading(false);
            return;
        }

        if (!ValidNumber(grupoModel.percentualDesconto, 2)) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const resp = await postFormAll("EditarGrupo", grupoModel);

        if (resp.status == 200) {

            if(gruposEnsaiosDelete.length > 0){
                const response = await postFormAll("ExcluirListaGrupoEnsaio", gruposEnsaiosDelete);
            }

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
            <HeaderMainContent title="EDITAR GRUPO" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">
                {grupoModel.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={itemsHandlesGrupo.length} titles={itemsHandlesGrupo} />
                }
                <div className="row">
                    <div className="col-6">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="grupo" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Grupo editado com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}
