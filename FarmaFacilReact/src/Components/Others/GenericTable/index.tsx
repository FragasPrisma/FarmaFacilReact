import { TableCustom, TrCustom } from "./styles";

interface Props {
    data: any[];
    header: string[];
}

export function GenericTable({ data = [], header }: Props) {
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
                    </TrCustom>
                ))}
            </tbody>
        </TableCustom>
    );
}