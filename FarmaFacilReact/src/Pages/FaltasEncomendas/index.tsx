import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";
import { SearchContentScreens } from "../../Components/Others/SearchContentScreens";
import { useTranslation } from "react-i18next";
import { ModalGeneric } from "../../Components/Modals/ModalGeneric";
import { useState } from "react";
import { IFaltasEncomendas } from "../../Interfaces/FaltasEncomendas/IFaltasEncomendas";
import { getAll } from "../../Services/Api";

export function FaltasEncomendas() {

    const { t } = useTranslation();

    const [faltasEncomendas, setFaltasEncomendas] = useState({} as IFaltasEncomendas);
    const [openModal, setOpenModal] = useState(false);
    const [descricao, setDescricao] = useState("");

    function closeModal() {
        setOpenModal(false)
    }

    async function ConcluirFaltaEncomenda(id: string) {
        const request = await getAll(`RetornaFaltasEncomendasPorId/${id}`);

        if (request.status == 200) {
            setDescricao(request.data.produto.descricao)
            faltasEncomendas.id = request.data.id
            faltasEncomendas.produtoId = request.data.produtoId
            faltasEncomendas.grupoId = request.data.grupoId
            faltasEncomendas.empresaId = request.data.empresaId
            faltasEncomendas.clienteId = request.data.clienteId
            faltasEncomendas.vendedorId = request.data.vendedorId
            faltasEncomendas.dataCadastro = request.data.dataCadastro
            faltasEncomendas.observacao = request.data.observacao
            faltasEncomendas.previsaoDeEntrega = request.data.previsaoDeEntrega
            faltasEncomendas.quantidade = request.data.quantidade
            faltasEncomendas.status = 2
            faltasEncomendas.telefone = request.data.telefone
            faltasEncomendas.tipo = request.data.tipo

            setOpenModal(true)
        }
    }

    return (
        <>
            <HeaderMainContent title="Faltas Encomendas" IncludeButton={true} ReturnButton={false} />
            <SearchContentScreens
                text="Faltas Encomendas"
                headerTable={["id", "produtoDescricao"]}
                headerTableView={["Id", "Produto"]}
                urlSearch={`ListaPaginacaoFaltasEncomendas`}
                iconOptions={true}
                itensExtraButton={[{ title: "Marcar produto como concluído", path: "/faltasencomendas/concluido/" }]}
                openModal={true}
                openModalFunction={(id) => ConcluirFaltaEncomenda(id)}
            />
            <ModalGeneric
                textSucces="Faltas/Encomendas concluído com"
                object={faltasEncomendas}
                textInformationModal={`Marcar o produto ${faltasEncomendas.grupoId} - ${faltasEncomendas.produtoId} - "${descricao}" como concluído?`}
                url="ConcluirFaltasEncomendas"
                openModal={openModal}
                onClose={closeModal}
                textError="Ocorreu algum erro ao concluir a Falta/Encomenda, tente novamente mais tarde."
            />
        </>
    );
}