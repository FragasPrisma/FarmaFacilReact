import { TabsCustom, TabCustom, DivCustom } from "./styles";

interface IData {
  Childrens: any[];
  titles: string[];
  TabsQtd: number;
}

function TabsPage({ Childrens, TabsQtd, titles }: IData) {

  let arrayTabs = [];

  for (var i = 0; i < TabsQtd; i++) {
    arrayTabs.push(i);
  }

  return (
    <>
      <DivCustom>
        <TabsCustom
          defaultActiveKey={titles[0]}
          transition={true}
          id="noanim-tab-example"
          className="nav-tabs"
        >
          {arrayTabs.map((item) => (
            <TabCustom
              transition={true}
              className=".nav-item"
              key={item}
              eventKey={titles[item]}
              title={titles[item]}
            >
              {Childrens[item]}
            </TabCustom>
          ))}
        </TabsCustom>
      </DivCustom>
    </>
  );
}

export default TabsPage;