import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import App from './App/App';
import store from '@store/ReduxStore';
import global_en from '@translations/en/global.json';
import global_pl from '@translations/pl/global.json';

i18next.init({

  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: { global: global_en },
    pl: { global: global_pl },
  },

});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <Provider store={store}>

    <React.StrictMode>

      <I18nextProvider i18n={i18next}>

        <App />

      </I18nextProvider>

    </React.StrictMode>

  </Provider>,

);
