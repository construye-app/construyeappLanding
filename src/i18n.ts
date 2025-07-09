import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './db.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: es.es,
      },
      en: {
        translation: es.en,
      },
    },
    lng: 'es', // Español por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;