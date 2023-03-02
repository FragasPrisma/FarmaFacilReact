import { HeaderMainContent } from "../../../Components/Headers/HeaderMainContent";
import { Container } from "../styles";
import { TabFarmacia } from "./TabFarmacia";
import "../ArquivoConfig";
import { itemsHandles, itemsHandlesChildrenAcabado, itemsHandlesChildrenGeral, itemsHandlesChildrenManipulacao } from "../../../Enum/ItemsParametro";
import TabsParametro from "../../../Components/Others/TabsParametro";
import TabsEmpresa from "../../../Components/Others/TabsEmpresa";
import { ButtonConfirm } from "../../../Components/Buttons/ButtonConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessModal } from "../../../Components/Modals/SuccessModal";
import { FailModal } from "../../../Components/Modals/FailModal";
import { LabelObrigatorio } from "../../../Components/Others/LabelMensagemObrigatorio";
import { Farmacia } from "../../../Interfaces/Empresa/IFarmacia";
import { IEmpresa } from "../../../Interfaces/Empresa/IEmpresa";
import { getAll, postFormAll } from "../../../Services/Api";
import { ButtonCancel } from "../../../Components/Buttons/ButtonCancel";

export function EmpresaCreate() {
    const navigate = useNavigate();
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const [isOpenFail, setIsOpenFail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState({ erro: true, index: 0, erroNome: "" })

    const [errorRequest, setErrorRequest] = useState("");

    const [empresas ,setEmpresas] = useState([] as IEmpresa[]);

    let componentsOfTabsGeral: any = [];
    let componentsOfTabsManipulacao: any = [];
    let componentsOfTabsAcabado: any = [];
    let componentsOfTabsMain: any[] = [];

    let titlesMainsOfTabs: string[] = [];
    titlesMainsOfTabs.push(...itemsHandles);
    let quantidadeItemsTabs = titlesMainsOfTabs.length;

    let tabChildrenGeral = itemsHandlesChildrenGeral;
    let quantidadeItemsChildGeral = tabChildrenGeral.length;
    let titlesGeralOfTabs: string[] = [];
    titlesGeralOfTabs.push(...itemsHandlesChildrenGeral);

    let tabChildrenManipulacao = itemsHandlesChildrenManipulacao;
    let quantidadeItemsChildManipulacao = tabChildrenManipulacao.length;
    let titlesGeralOfTabsManipulacao: string[] = [];
    titlesGeralOfTabsManipulacao.push(...itemsHandlesChildrenManipulacao);

    let tabChildrenAcabado = itemsHandlesChildrenAcabado;
    let quantidadeItensChildAcabado = tabChildrenAcabado.length;
    let titlesAcabadoOfTabs: string[] = [];
    titlesAcabadoOfTabs.push(...itemsHandlesChildrenAcabado);

    let titles: string[][] = [];

    titles.push(
        titlesGeralOfTabs,
        titlesGeralOfTabsManipulacao,
        titlesAcabadoOfTabs
    )

    componentsOfTabsGeral.push(
        <TabFarmacia erros={{
            erro: false,
            erroNome: "",
            index: 0
        }} />
        //<TabImpressao />,
        //<TabCuspomFiscal />,
        // <TabConvenios />,
        // <TabCartoes />,
        // <TabNfe />,
        // <TabNFSe />,
        // <TabGeral />,
        // <TabIntegracaoWeb />,
        // <TabPrisma5Loader />,
        // <TabPrismaSync />,
        // <TabSiproquim />,
        // <TabGestaoEntrega />
    );

    componentsOfTabsManipulacao.push(
        // <TabGeralManipulacao />,
        // <TabOpcaoManipulacao />,
        // <TabImpressaoManipulacao />
    )
    componentsOfTabsAcabado.push(
        // <TabAcabado />
    )

    componentsOfTabsMain.push(
        componentsOfTabsGeral
    )

    // componentsOfTabsMain.push(
    //     componentsOfTabsManipulacao
    // )

    // componentsOfTabsMain.push(
    //     componentsOfTabsAcabado
    // )

    useEffect(() => {
        const loadDataEmpresa = async () => {
            const request = await getAll("ListaFornecedor");
            setEmpresas(request.data)
        }
        loadDataEmpresa()
    }, [])

    function ValidString(text: string, index: number) {
        if (!text.trim()) {
            setError({ erro: true, erroNome: "Campo de preenchimento obrigatório.", index: index })
            return false
        }

        return true;
    }

    async function submit() {

        let erroCpfCnpj = false;
        setError({ erro: false, erroNome: "", index: 0 })
        setIsLoading(true);



        let data: IEmpresa = {
            Farmacia: Farmacia
        }

        const resp = await postFormAll("AdicionarEmpresa", data);

        if (resp.status == 200) {
            setIsOpenSuccess(true);
            setTimeout(() => {
                navigate("/empresa");
            }, 2000)
        } else {
            setIsOpenFail(true);
            setIsLoading(false);
            setTimeout(() => {
                setIsOpenFail(false);
                setErrorRequest(resp.request.response)
            }, 2000)
        }
    }

    return (
        <>
            <HeaderMainContent title="Incluir Empresa" IncludeButton={false} ReturnButton={true} to="empresa" />
            <div className="form-group">
                <TabsEmpresa
                    titlesMain={titlesMainsOfTabs}
                    Childrens={componentsOfTabsMain}
                    titles={titles}
                />
                <LabelObrigatorio />
                {errorRequest && <p className="text-danger">{errorRequest}</p>}
                <div className="row">
                    <div className="col-6 mt-2">
                        <ButtonConfirm onCLick={submit} isLoading={isLoading} />
                        <ButtonCancel to="empresa" />
                    </div>
                </div>
            </div>
            <SuccessModal show={isOpenSuccess} />
            <FailModal show={isOpenFail} onClose={() => setIsOpenFail(false)} />
        </>
    )
}