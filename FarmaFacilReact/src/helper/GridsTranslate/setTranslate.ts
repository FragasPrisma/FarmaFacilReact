import { useSelector } from "react-redux";
import { RootState } from "../../store/IRootState";
import { translateEsESGrid } from "./TranslateEsESGrid";
import { translatePtBRGrid } from "./TranslatePtBRGrid";
//import { translateEnUSGrid } from "./TranslateEnUSGrid";

export function setTranslate() {
    const idioma = useSelector((state: RootState) => state.Language.idioma);

    if (idioma == "pt") {
        return translatePtBRGrid;
    } else if (idioma == "es") {
        return translateEsESGrid;
    } else {
        return;
    }
}