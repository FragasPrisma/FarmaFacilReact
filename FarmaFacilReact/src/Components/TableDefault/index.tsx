import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { ActionsButtonsDefault } from '../ActionsButtonsDefault';

interface Props {
    data: any[];
    header: string[];
}

export function TableDefault({ data, header }: Props) {
    const [bodyList, setbodyList] = useState([]);

    return (
        <Table>
            <thead>
                <tr>
                    {
                        header.map((head, index) =>
                            <th key={index}>{head}</th>
                        )
                    }
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((data, index) => (
                        <tr key={index}>
                            {
                                header.map((header, index) => (
                                    <td key={index}>{data[header]}</td>
                                ))
                            }
                            <td>
                                <ActionsButtonsDefault></ActionsButtonsDefault>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}
