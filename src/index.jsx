import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import './index.css';
import App from './App';
import store from './redux/store';
import i18n from 'i18n';
import { createRoot } from 'react-dom/client';
import AuthProvider from 'providers/AuthenticationProvider';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'theme/createEmotionCache';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from 'reportWebVitals';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const cache = createEmotionCache();
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <AuthProvider>
              <CssBaseline />
              <App />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AuthProvider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </I18nextProvider>
  </QueryClientProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
reportWebVitals();
