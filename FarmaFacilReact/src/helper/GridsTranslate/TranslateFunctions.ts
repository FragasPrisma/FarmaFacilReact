import { ptBR, esES, enUS } from '@mui/material/locale';
import { createTheme} from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/IRootState';
import { translateEsESGrid } from "./TranslateEsESGrid";
import { translatePtBRGrid } from "./TranslatePtBRGrid";

export function setTheme() {
    const idioma = useSelector((state: RootState) => state.Language.idioma);

    if (idioma == "pt") {
        return createTheme(
            ptBR,
        );
    } else if (idioma == "es") {
        return createTheme (
            esES,
        );
    } else {
        return createTheme(
            enUS
        );
    }
}

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