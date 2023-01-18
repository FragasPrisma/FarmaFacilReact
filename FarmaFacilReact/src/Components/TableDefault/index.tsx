import Table from 'react-bootstrap/Table';
import { useState } from "react";

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
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
}
