import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

const isProduct = !__DEV__;
const resources = {
  en: {
    translation: require('./src/languages/translations/en'),
  },
  vi: {translation: require('./src/languages/translations/vi')},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false,
  },
  saveMissing: !isProduct,
});

export default i18next;
