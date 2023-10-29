import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LazyImportPlugin from "./BackendPlugin";

export default function i18nBuilder(options?: InitOptions) {
  i18n
    .use(LazyImportPlugin)
    .use(initReactI18next)
    .init({
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
      keySeparator: " ",
      ns: ["common"],
      defaultNS: "common",
      // @ts-ignore
      missingKeyHandler: function (lng, ns, key, fallbackValue) {
        console.error("missing key", lng, ns, key, fallbackValue);
      },
      ...options,
    });
}
