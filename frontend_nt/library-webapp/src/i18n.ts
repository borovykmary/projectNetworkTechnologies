import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/en.json";
import translationUA from "./locales/ua.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ua: {
    translation: translationUA,
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: "en",
  resources,
});

i18n.changeLanguage("ua");
export default i18n;
