import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "ui/CssBaseline";
import { createTheme } from "ui/styles";
import { ThemeProvider } from "ui/styles/ThemeProvider";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import i18nBuilder from "./i18n/Builder";
import { router } from "./routes/Root";

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
    return parts.pop()?.split(";").shift();
  }
}

function getUserLang(): string | undefined {
  const lang = getCookie("lang");

  return (
    lang ?? window.Telegram.WebApp?.initDataUnsafe?.user?.language_code ?? "en"
  );
}

i18nBuilder({
  lng: getUserLang(),
}).catch((err: Error) => {
  console.error(err);
  throw err;
});

const uiTheme = createTheme({
  palette: {
    mode: window.Telegram.WebApp.colorScheme ?? "light",
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={uiTheme}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <CssBaseline />
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
