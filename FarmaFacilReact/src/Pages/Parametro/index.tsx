import { ChangeEvent, useState } from "react";
import { ButtonCancel } from "../../Components/Buttons/ButtonCancel";
import { ButtonConfirm } from "../../Components/Buttons/ButtonConfirm";
import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { CustomInput } from "../../Components/Inputs/CustomInput";
import TabsPage from "../../Components/Tabs";
import { itemsHandles, itemsHandlesChildren } from "../../Enum/ItemsParametro";
import { Container, ContainerItems } from "./styles";
import { TabCartoes } from "./TabCartoes";
import { TabConvenios } from "./TabConvenios";
import { TabCuspomFiscal } from "./TabCupomFiscal";
import { TabFarmacia } from "./TabFarmacia";
import { TabImpressao } from "./TabImpressao";
import { TabNfe } from "./TabNfe";

export function Parametro() {
  let componentsOfTabs: any = [];

  let titlesMainsOfTabs: string[] = [];
  titlesMainsOfTabs.push(...itemsHandles);
  let quantidadeItemsTabs = titlesMainsOfTabs.length;

  let tabChildren: any = [];
  tabChildren.push(...itemsHandlesChildren);
  let quantidadeItemsChildTabs = tabChildren.length;

  componentsOfTabs.push(
    <TabFarmacia />,
    <TabImpressao />,
    <TabCuspomFiscal />,
    <TabConvenios />,
    <TabCartoes />,
    <TabNfe />
  );

  return (
    <>
      <HeaderMainContent
        title="Parametro"
        IncludeButton={true}
        ReturnButton={false}
      />

      <TabsPage
        ChildTabs={tabChildren}
        TabsQtd={quantidadeItemsTabs}
        titles={titlesMainsOfTabs}
      />

      <TabsPage
        Childrens={componentsOfTabs}
        TabsQtd={quantidadeItemsChildTabs}
        titles={tabChildren}
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
