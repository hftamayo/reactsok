import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import translationEN from "../public/locales/en/translation.json";
import translationSP from "../public/locales/sp/translation.json";
//import translationFR from '../public/locales/fr/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  sp: {
    translation: translationSP,
  },
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
