import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import guTranslation from './locales/gu.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  gu: {
    translation: guTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'gu'],
    interpolation: {
      escapeValue: false, // React already escapes values safely
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'garvi_lang',
      caches: ['localStorage'],
    },
  });

export default i18n;

