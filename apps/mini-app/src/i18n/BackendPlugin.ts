import type { BackendModule } from 'i18next';

const LazyImportPlugin: BackendModule = {
  type: 'backend',
  init() {
    // Noop
  },
  read(language, namespace, callback) {
    console.log('reading', namespace, language);
    import(/* webpackChunkName: "i18n-[request]" */ `./locales/${language}/${namespace}.json`)
      .then((obj: object) => {
        callback(null, obj);
      })
      .catch((err: Error) => {
        console.error(err);
        callback(err, {});
      });
  },
  save() {
    // Noop
  },
  create() {
    // Noop
  },
};

export default LazyImportPlugin;
