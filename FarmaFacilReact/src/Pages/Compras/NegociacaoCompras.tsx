import { HeaderMainContent } from "../../Components/Headers/HeaderMainContent";

export function NegociacaoCompras() {
    return (
        <>
            <HeaderMainContent title="Negociação de Compra" IncludeButton={false} ReturnButton={true} to="compras/cotacaoCompras/1" />
        </>
    )
}