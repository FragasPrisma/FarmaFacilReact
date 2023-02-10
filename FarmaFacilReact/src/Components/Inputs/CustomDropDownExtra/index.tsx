import { DotsThreeVertical } from "phosphor-react";
import { Dropdown } from "react-bootstrap";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";
import { DropdownCustom } from "./styles";

interface IData {
    itens:  ItensButtonExtra[]
    id:string
}

export function CustomDropDownExtra({ itens, id }: IData) {
    return (
        <Dropdown>
            <DropdownCustom split variant="" id="">
                <DotsThreeVertical size={20} color="#cf0209" />
            </DropdownCustom>
            <Dropdown.Menu>
                {itens.map((x, index) =>
                    <Dropdown.Item key={index} href={x.path + id}>{x.title}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}