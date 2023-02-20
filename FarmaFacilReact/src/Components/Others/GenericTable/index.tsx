import { DeleteButton, TableCustom, TrCustom } from "./styles";
import { NotePencil, Trash } from "phosphor-react";

interface Props {
    data: any[];
    header: string[];
    onDelete?: (index: number) => void;
    onEdit?: (object: any) => void;
    deleteButton?: boolean;
    editButton?: boolean
}

export function GenericTable({ data = [], header, onDelete, deleteButton = true, editButton = false, onEdit }: Props) {
    function OnClickDelete(index: number) {
        if (onDelete) {
            onDelete(index);
        }
    }

    function OnclickEdit(object: any) {
        if (onEdit) {
            onEdit(object)
        }
    }

    return (
        <TableCustom>
            <thead>
                <TrCustom>
                    {header.map((head, index) => (
                        <th key={index}>{head[0].toUpperCase() + head.substring(1)}</th>
                    ))}
                    {deleteButton &&
                        <th className="col-1">Excluir</th>
                    }
                    {editButton &&
                        <th className="col-1">Editar</th>
                    }
                </TrCustom>
            </thead>
            <tbody>
                {data.map((data, index) => (
                    <TrCustom key={index}>
                        {header.map((header, index) => (
                            <td key={index}>{data[header]}</td>
                        ))}
                        {deleteButton &&
                            <td className="col-1">
                                <DeleteButton onClick={() => OnClickDelete(index)}><Trash size={20} color="#cf0209" /></DeleteButton>
                            </td>
                        }
                        {editButton &&
                            <td className="col-1">
                                <DeleteButton onClick={() => OnclickEdit(data)} ><NotePencil size={20} color="#cf0209" /></DeleteButton>
                            </td>
                        }
                    </TrCustom>
                ))}
            </tbody>
        </TableCustom>
    );
}