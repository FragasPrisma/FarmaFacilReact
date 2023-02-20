import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { IBanner } from "../../Interfaces/Banner/IBanner";
import { InverterDate } from "../../helper/InverterDate";
import { useTranslation } from "react-i18next";

export function Banner() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([] as IBanner[]);
    const { t } = useTranslation();

    useEffect(() => {

        const loadDataTable = async () => {

            const response = await getAll(`ListaPaginacaoBanner/${pagina}`);
            setQtdPagina(response.data.total);

            response.data.listGroup.map((x: IBanner) => {

                x.dataFim = InverterDate(x.dataFim)
                x.dataInicio = InverterDate(x.dataInicio)
            })

            setData(response.data.listGroup);
        }

        loadDataTable()
    }, [pagina]);

    return (
        <>
            <HeaderMainContent title={t('banner.banner')} IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text={t('banner.banner')}
                data={data}
                filter={"descricao"}
                headerTable={["id", "descricao", "posicao", "dataInicio", "dataFim"]}
                headerTableView={[t('banner.header.id'), t('banner.header.descricao'), t('banner.header.posicao'), t('banner.header.dataInicio'), t('banner.header.dataFim')]}
            />
            <Paginations pagina={pagina} qtdPagina={qtdPagina} Reload={(paginaAtual) => setPagina(paginaAtual)} />
        </>
    );
}