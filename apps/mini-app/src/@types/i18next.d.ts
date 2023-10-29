// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import common from "../i18n/locales/en/common.json";
import error from "../i18n/locales/en/error.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "common";
    // custom resources type
    resources: {
      common: typeof common;
      error: typeof error;
    };
    // other
  }
}
