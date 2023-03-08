import { CurvaAbc } from "../Enum/CurvaAbc";
import { StatusCompra } from "../Enum/StatusCompra";
import { TipoCompra } from "../Enum/TipoCompra";

export function getTipoCompraString(tipoCompra: number): string {
    switch (tipoCompra) {
        case TipoCompra.VENDA:
            return 'Venda';
        case TipoCompra.DEMANDA:
            return 'Demanda';
        case TipoCompra.ESTOQUE_MINIMO:
            return 'Estoque Mínimo';
        case TipoCompra.ESTOQUE_MAXIMO:
            return 'Estoque Máximo';
        case TipoCompra.CONSUMO:
            return 'Consumo';
        case TipoCompra.ENCOMENDA_FALTAS:
            return 'Encomenda/Faltas';
        default:
            return '';
    }
}

export function getCurvaAbcString(curvaAbc: number): string {
    switch (curvaAbc) {
        case CurvaAbc.GERAL:
            return 'Geral';
        case CurvaAbc.GERAL:
            return 'A';
        case CurvaAbc.GERAL:
            return 'B';
        case CurvaAbc.GERAL:
            return 'C';
        default:
            return '';
    }
}

export function getStatusCompraString(statusCompra: number): string {
    switch (statusCompra) {
        case StatusCompra.TODOS:
            return 'Todos';
        case StatusCompra.EMABERTO:
            return 'Em Aberto';
        case StatusCompra.PARCIAL:
            return 'Parcial';
        case StatusCompra.COMPLETO:
            return 'Completo';
        case StatusCompra.CANCELADO:
            return 'Cancelado';
        default:
            return '';
    }
}
