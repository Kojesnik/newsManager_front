import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translation_ru from './translations/ru/translation.json';
import translation_en from './translations/en/translation.json';

const fallbackLng = ['en']; 
const availableLanguages = ['en', 'ru'];

i18n
  .use(Backend)

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    },
    resources: {
        en: {
            translation: translation_en 
        },
        ru: {
            translation: translation_ru
        },
    },
  });

export default i18n;