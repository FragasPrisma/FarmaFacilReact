import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
<<<<<<< Updated upstream
import { useEffect, useState, } from "react";
import { getAll } from "../../Services/Api";
import Paginations from "../../Components/Others/Pagination";
import { IBanner } from "../../Interfaces/Banner/IBanner";
import { InverterDate } from "../../helper/InverterDate";

export function Banner() {
    const [pagina, setPagina] = useState(1);
    const [qtdPagina, setQtdPagina] = useState(0);
    const [data, setData] = useState([] as IBanner []);

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

=======
import { useTranslation } from "react-i18next";

export function Banner() {
    
    const { t } = useTranslation();

>>>>>>> Stashed changes
    return (
        <>
            <HeaderMainContent title="Banner" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
<<<<<<< Updated upstream
                text="Banner"
                data={data}
                filter={"descricao"}
                headerTable={["id", "descricao", "posicao", "dataInicio", "dataFim"]}
                headerTableView={["ID", "Descrição","Posição","Data início","Data fim"]}
=======
                text={t('banner.banner')}
                headerTable={["posicao", "descricao"]}
                headerTableView={[t('banner.header.posicao'), t('banner.header.descricao')]}
                urlSearch="ListaPaginacaoBanner"
>>>>>>> Stashed changes
            />
        </>
    );
}