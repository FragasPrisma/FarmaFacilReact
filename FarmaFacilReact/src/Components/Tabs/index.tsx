import { TabsCustom, TabCustom, DivCustom } from "./styles";

interface IData {
  Childrens?: any[];
  TabsQtd: number;
  titles: string[];
  ChildTabs?: string[];
}

function TabsPage({ Childrens, TabsQtd, titles, ChildTabs }: IData) {
  let arrayTabs = [];

  for (var i = 0; i < TabsQtd; i++) {
    arrayTabs.push(i);
  }

  return (
    <>
      {ChildTabs ? (
        <>
          <DivCustom>
            <TabsCustom
              defaultActiveKey={titles[0]}
              transition={false}
              id="noanim-tab-example"
              className="nav-tabs"
            >
              {arrayTabs.map((item) => (
                <TabCustom
                  className=".nav-item"
                  key={item}
                  eventKey={titles[item]}
                  title={titles[item]}
                >
                  
                </TabCustom>
              ))}
            </TabsCustom>
          </DivCustom>
        </>
      ) : (
        <DivCustom>
          <TabsCustom
            defaultActiveKey={titles[0]}
            transition={false}
            id="noanim-tab-example"
            className="nav-tabs"
          >
            {arrayTabs.map((item) => (
              <TabCustom
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
      )}
    </>
  );
}

export default TabsPage;
