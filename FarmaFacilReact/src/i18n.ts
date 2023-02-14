import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from '../src/locales/pt.json';
import es from '../src/locales/es.json';

const resources = {
    pt,
    es
}

i18n
  .use(initReactI18next)
  .init({
    resources:resources,
    lng:navigator.language,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
