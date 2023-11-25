import { CssBaseline } from '@samovar/ui/CssBaseline';
import { LocalizationProvider } from '@samovar/ui/LocalizationProvider';
import { createTheme } from '@samovar/ui/styles';
import { ThemeProvider } from '@samovar/ui/styles/ThemeProvider';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import i18nBuilder from './i18n/Builder';
import { router } from './routes/Root';

/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param name - The name of the cookie
 * @returns string       The cookie value
 */
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
}

/**
 * Try to resolve user's language.
 * Give preference to a saved cookie value.
 *
 * @returns string
 */
function getUserLang(): string {
  const lang = getCookie('lang');

  return lang ?? window.Telegram.WebApp?.initDataUnsafe?.user?.language_code ?? 'en';
}

i18nBuilder({
  lng: getUserLang(),
})
  .catch((err: Error) => {
    console.error(err);
    throw err;
  })
  .finally(() => {
    if (i18next.language) {
      import(`dayjs/locale/${i18next.language}.js`);
    }
  });

const uiTheme = createTheme({
  palette: {
    mode: window.Telegram.WebApp.colorScheme ?? 'light',
  },
});

const queryClient = new QueryClient();

function App() {
  const { t } = useTranslation(['common']);
  return (
    <ThemeProvider theme={uiTheme}>
      <LocalizationProvider
        adapterLocale={i18next.language}
        localeText={{
          okButtonLabel: t('common:Ok'),
          cancelButtonLabel: t('common:Cancel'),
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <CssBaseline />
            <RouterProvider router={router} />
          </Suspense>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
