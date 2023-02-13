import { DotsThreeVertical } from "phosphor-react";
import { Dropdown } from "react-bootstrap";
import { ItensButtonExtra } from "../../../Interfaces/ItensButtonExtra/ItensButtonExtra";
import { DropdownCustom } from "./styles";

interface IData {
    itens: ItensButtonExtra[];
    id: string;
    openModal?: boolean;
    openModalFunction?: (id:string) => void
}

export function CustomDropDownExtra({ itens, id, openModal = false, openModalFunction }: IData) {

    function OpenModal(id : string) {
        if(openModalFunction){
            openModalFunction(id)
        }
    }

    return (
        <Dropdown>
            <DropdownCustom split variant="" id="">
                <DotsThreeVertical size={20} color="#cf0209" />
            </DropdownCustom>
            <Dropdown.Menu>
                {itens.map((x, index) =>
                    <>
                        {openModal ?
                            <Dropdown.Item key={index}
                                onClick={() => OpenModal(id)}>
                                {x.title}
                            </Dropdown.Item>
                            :
                            <Dropdown.Item key={index} href={x.path + id} > {x.title}</Dropdown.Item>
                        }
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown >
    );
}