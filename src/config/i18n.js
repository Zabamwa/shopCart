import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEN from "../translations/en.json";
import translationsPL from "../translations/pl.json";

const locale = localStorage.getItem("@Locale");
i18n.use(initReactI18next).init({
  debug: true,
  lng: locale,
  fallbackLng: "pl",
  resources: {
    en: {
      translation: translationsEN,
    },
    pl: {
      translation: translationsPL,
    },
  },
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
  },
});

export default i18n;
