import { DeleteButton, TableCustom, TrCustom } from "./styles";
import { Trash } from "phosphor-react";

interface Props {
    data: any[];
    header: string[];
    onDelete?: (index: number) => void;
    deleteButton: boolean;
}

export function GenericTable({ data = [], header, onDelete, deleteButton = true}: Props) {
    function OnClickDelete(index: number) {
        if (onDelete) {
            onDelete(index);
        }
    }

    return (
        <TableCustom>
            <thead>
                <TrCustom>
                    {header.map((head, index) => (
                        <th key={index}>{head[0].toUpperCase() + head.substring(1)}</th>
                    ))}
                </TrCustom>
            </thead>
            <tbody>
                {data.map((data, index) => (
                    <TrCustom key={index}>
                        {header.map((header, index) => (
                            <td key={index}>{data[header]}</td>
                        ))}
                        { deleteButton &&
                            <td>
                                <DeleteButton onClick={() => OnClickDelete(index)}><Trash size={20} color="#cf0209" /></DeleteButton>
                            </td>
                         }
                    </TrCustom>
                ))}
            </tbody>
        </TableCustom>
    );
}