import { BackendModule } from "i18next";

const LazyImportPlugin: BackendModule = {
  type: "backend",
  init: function () {},
  read: function (language, namespace, callback) {
    console.log("reading", namespace, language);
    import(
      /* webpackChunkName: "i18n-[request]" */ `./locales/${language}/${namespace}.json`
    ).then((obj) => {
      callback(null, obj);
    });
  },
  save: function () {},
  create: function () {},
};

export default LazyImportPlugin;
