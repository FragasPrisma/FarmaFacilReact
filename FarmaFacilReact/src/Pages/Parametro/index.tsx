import { ChangeEvent, useState } from "react";
import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import TabsParametro from "../../Components/Others/TabsParametro";
import { itemsHandles, itemsHandlesChildrenGeral,itemsHandlesChildrenManipulacao,itemsHandlesChildrenAcabado } from "../../Enum/ItemsParametro";
import { TabAcabado } from "./TabAcabado";
import { TabCartoes } from "./TabCartoes";
import { TabConvenios } from "./TabConvenios";
import { TabCuspomFiscal } from "./TabCupomFiscal";
import { TabFarmacia } from "./TabFarmacia";
import { TabGeral } from "./TabGeral";
import { TabGeralManipulacao } from "./TabGeralManipulacao";
import { TabImpressao } from "./TabImpressao";
import { TabIntegracaoWeb } from "./TabIntegracaoWeb";
import { TabNfe } from "./TabNfe";
import { TabNFSe } from "./TabNfse";

export function Parametro() {

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
  let titlesAcabadoOfTabs:string[]=[];
  titlesAcabadoOfTabs.push(...itemsHandlesChildrenAcabado);

  let titles: string[][] = [];

  titles.push(
    titlesGeralOfTabs,
    titlesGeralOfTabsManipulacao,
    titlesAcabadoOfTabs
  )

  componentsOfTabsGeral.push(
    <TabFarmacia />,
    <TabImpressao />,
    <TabCuspomFiscal />,
    <TabConvenios />,
    <TabCartoes />,
    <TabNfe />,
    <TabNFSe/>,
    <TabGeral />,
    <TabIntegracaoWeb />
  );

  componentsOfTabsManipulacao.push(
    <TabGeralManipulacao/>,
    <TabGeralManipulacao/>,
    <TabGeralManipulacao/>
  )
  componentsOfTabsAcabado.push(
    <TabAcabado/>
  )

  componentsOfTabsMain.push(
    componentsOfTabsGeral
  )

  componentsOfTabsMain.push(
    componentsOfTabsManipulacao
  )

  componentsOfTabsMain.push(
    componentsOfTabsAcabado
  )
  return (
    <>
      <HeaderMainContent
        title="Parametro"
        IncludeButton={true}
        ReturnButton={false}
      />

      <TabsParametro
        titlesMain={titlesMainsOfTabs}
        Childrens={componentsOfTabsMain}
        titles={titles}

      />

      <div className="row">
        <div className="col-6">
          <ButtonConfirm />
            <ButtonCancel to="fornecedor" />
        </div>
      </div>
    </>
  );
}
