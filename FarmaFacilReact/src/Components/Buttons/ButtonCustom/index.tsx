import { ButtonCustom } from "./styles";

interface IData {
    text: string;
    onCLick: () => void;
    width: number;
    height: number;
}

export function ButtonCustomIncluir({ text, onCLick, width, height }: IData) {
    return (
        <>
            <ButtonCustom onClick={onCLick} style={{ width: width + "rem", height: height + "rem" }}>
                {text}
            </ButtonCustom>
        </>
    );
}