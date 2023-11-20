import type { InitOptions } from 'i18next';
import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LazyImportPlugin from './BackendPlugin';

export default function i18nBuilder(options?: InitOptions) {
  return use(LazyImportPlugin)
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      keySeparator: ' ',
      ns: ['common'],
      defaultNS: 'common',
      missingKeyHandler(lng, ns, key, fallbackValue) {
        console.error('missing key', lng, ns, key, fallbackValue);
      },
      ...options,
    });
}
