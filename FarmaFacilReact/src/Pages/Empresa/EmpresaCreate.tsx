import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { Container } from "./styles";
import { TabFarmacia } from "./TabFarmacia";
import "./ArquivoConfig";
import { itemsHandles, itemsHandlesChildrenAcabado, itemsHandlesChildrenGeral, itemsHandlesChildrenManipulacao } from "../../Enum/ItemsParametro";
import TabsParametro from "../../Components/Others/TabsParametro";
import TabsEmpresa from "../../Components/Others/TabsEmpresa";

export function EmpresaCreate() {
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
        <TabFarmacia />
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

    return (
        <>
            <HeaderMainContent title="Incluir Empresa" IncludeButton={false} ReturnButton={true} to="empresa" />
            <TabsEmpresa
                titlesMain={titlesMainsOfTabs}
                Childrens={componentsOfTabsMain}
                titles={titles}
            />
        </>
    )
}