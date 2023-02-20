import { TabsCustom, TabCustom, DivCustom } from "./styles";

interface IData {
    Childrens: any[][];
    titles: string[][];
    titlesMain: string[];
}

function TabsEmpresa({ Childrens, titles ,titlesMain}: IData) {

    return (
        <>
            <DivCustom>
                <TabsCustom
                    defaultActiveKey={titlesMain[0]}
                    transition={false}
                    id="noanim-tab-example"
                    className="nav-tabs"
                >
                    {Childrens.map((item, index) => (
                        <TabCustom
                            className=".nav-item"
                            key={index}
                            eventKey={titlesMain[index]}
                            title={titlesMain[index]}
                        >
                            <DivCustom>
                                <TabsCustom
                                    defaultActiveKey={0}
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="nav-tabs"
                                >
                                    {item.map((itens, i) => (
                                        <TabCustom
                                            className=".nav-item"
                                            key={i}
                                            eventKey={i}
                                            title={titles[index][i]}
                                        >
                                            {item[i]}
                                        </TabCustom>
                                    ))}
                                </TabsCustom>
                            </DivCustom>
                        </TabCustom>
                    ))}
                </TabsCustom>
            </DivCustom>
        </>
    );
}

export default TabsEmpresa;