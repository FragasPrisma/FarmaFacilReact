import { Table } from "react-bootstrap";

export function TableHelp() {
    return (
        <>
            <Table striped bordered hover size="sm">
                <tbody>
                    <tr>
                        <td>[ACRESCIMO]</td>
                        <td>Valor do Acréscimo;</td>
                    </tr>
                    <tr>
                        <td>[DESCONTO]</td>
                        <td>Valor do Desconto;</td>
                    </tr>
                    <tr>
                        <td>[FORMULAS]</td>
                        <td>Lista de Fórmulas SEM a informação da Previsão de Entrega;</td>
                    </tr>
                    <tr>
                        <td>[FORMULASCOMPLETA]</td>
                        <td>Listade Fórmulas COM detalhamento dos itens da formula e SEM a informação da Previsão de Entrega;</td>
                    </tr>
                    <tr>
                        <td>[FORMULASCOMPLETADESCONTO]</td>
                        <td>Listade Fórmulas COM detalhamento dos itens da formula COM a informação do DESCONTO. Mas, SEM a informação da Previsão de Entrega;</td>
                    </tr>
                    <tr>
                        <td>[FORMULASENTREGADESCONTO]</td>
                        <td>Lista de Fórmulas COM a informação da Previsão de Entrega. E, COM a informação do DESCONTO;</td>
                    </tr>
                    <tr>
                        <td>[NOMEATENDENTE]</td>
                        <td>Nome do Atendente/Vendedor;</td>
                    </tr>
                    <tr>
                        <td>[NOMECLIENTE]</td>
                        <td>Nome do Cliente;</td>
                    </tr>
                    <tr>
                        <td>[ORCAMENTO]</td>
                        <td>Número do Orçamento;</td>
                    </tr>
                    <tr>
                        <td>[TAXAENTREGA]</td>
                        <td>Valor da Taxa de Entrega;</td>
                    </tr>
                    <tr>
                        <td>[TOTAL]</td>
                        <td>Valor Total da Venda;</td>
                    </tr>
                    <tr>
                        <td>[VENDA]</td>
                        <td>Número da Venda.</td>
                    </tr>
                    <tr>
                        <td>[VENDAENDERECO]</td>
                        <td>Endereço do cliente informado na Venda.</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}