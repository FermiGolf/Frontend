// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';

const resources = {
  en: { translation: enTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set the default language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
