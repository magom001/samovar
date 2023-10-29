import { RouterProvider, createBrowserRouter } from "react-router-dom";
import i18nBuilder from "./i18n/Builder";
import { Root } from "./routes/Root";
import { About } from "./routes/About";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
