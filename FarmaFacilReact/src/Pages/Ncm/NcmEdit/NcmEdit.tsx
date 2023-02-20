import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { FailModal } from "../../../Components/Modals/FailModal";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import TabsPage from "../../../Components/Others/Tabs";
import { itemsHandlesNcm } from "../../../Enum/ItemsNcm";
import { getAll, GetId, postFormAll } from "../../../Services/Api";
import { IEstado } from "../../../Interfaces/Estado/IEstado";
import { INcmGeral, NcmGeral } from "../../../Interfaces/Ncm/INcmGeral";
import { INcmPorEstado } from "../../../Interfaces/Ncm/INcmPorEstado";
import { ITributo } from "../../../Interfaces/Tributo/ITributo";
import { NcmEditGeral } from "./NcmEditGeral";
import { NcmEditPorEstado, ncmPorEstadoExcluir } from "./NcmEditPorEstado";
import { Ncm } from "../../../Interfaces/Ncm/INcm";
import { ncmPorEstado } from "../NcmEdit/NcmEditPorEstado";

export function NcmEdit() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErros] = useState({ erro: true, index: 0, erroNome: "" })
    const [listaNcmPorEstado, setListaNcmPorEstado] = useState([] as INcmPorEstado[]);
    const [listaEstados, setListaEstados] = useState([] as IEstado[]);
    const [listaTributosCst, setListaTributosCst] = useState([] as ITributo[]);
    const [listaTributosCsosn, setListaTributosCsosn] = useState([] as ITributo[]);
    const [dataNcm, setDataNcm] = useState({} as INcmGeral);
    const [ncmId, setNcmId] = useState(0);

    const { id } = useParams();
    let idParams = !id ? "0" : id.toString();

    useEffect(() => {

        async function ListEstados() {
            const response = await getAll("ListaEstado");
            setListaEstados(response.data)
        }

        async function ListTributos() {
            const response = await getAll("ListaTributo");
            setListaTributosCst(response.data.filter((tributo: any) => tributo.tipoTributo == 0))
            setListaTributosCsosn(response.data.filter((tributo: any) => tributo.tipoTributo == 1))
        }

        async function Init() {
            const response = await GetId("RetornaNcmPorId", idParams);
            if (response.status == 200) {
                setNcmId(response.data.id)
                setDataNcm(response.data)
                setListaNcmPorEstado(response.data.ncmEstados);
            }
        }

        ListEstados()
        ListTributos()
        Init()
    }, [])

    let arrayTab: any = [];
    const titles = itemsHandlesNcm;

    {
        dataNcm.id > 0 &&

            arrayTab.unshift(
                <NcmEditGeral
                    NcmGeralModel={dataNcm}
                />
            );

        arrayTab.push(
            <NcmEditPorEstado
                NcmPorEstado={listaNcmPorEstado}
                ListaTributosCst={listaTributosCst}
                ListaTributosCsosn={listaTributosCsosn}
                ListaEstados={listaEstados}
            />
        );
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

    async function submit() {
        console.log("Entrou")
        console.log(NcmGeral)
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

        console.log("Chegou")

        Ncm.id = ncmId;
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

        const resp = await postFormAll("EditarNcm", Ncm);

        console.log(ncmPorEstadoExcluir)

        if (resp.status == 200) {
            if (ncmPorEstadoExcluir.length > 0){
                const respostaDelete = await postFormAll("ExcluirListaNcmEstado", ncmPorEstadoExcluir)
            }
            
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

    return (
        <>
            <HeaderMainContent title="EDITAR NCM" IncludeButton={false} ReturnButton={false} />
            <div className="form-group">

                {dataNcm.id > 0 &&
                    <TabsPage Childrens={arrayTab} TabsQtd={titles.length} titles={titles} />
                }
                <div className="row">
                    <div className="col-6 mt-2">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="ncm" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} textCustom="Ncm editada com " />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    );
}