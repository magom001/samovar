import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMapEvents } from "react-leaflet";
import "./App.css";

// interface WebAppUser {
//   firstName: string;
//   lastName: string;
//   id: number;
//   languageCode: string;
//   username: string;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- dev only
function Toolbox() {
  useEffect(() => {
    try {
      console.log("env", process.env.NODE_ENV);
      window.Telegram.WebApp.ready();
    } catch (err) {
      console.error(err);
    }
  }, []);

  // const [userData, setUserData] = useState<WebAppUser | undefined>();
  // const [err, setErr] = useState<Error | undefined>();

  // useEffect(() => {
  //   fetch("/api/v1/auth/whoami", {
  //     method: "POST",
  //     headers: {
  //       "TMA-InitData": window.Telegram.WebApp.initData,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data: WebAppInitData) => {
  //       setUserData(data.user as unknown as WebAppUser);
  //     })
  //     .catch((err) => {
  //       setErr(err);
  //     });
  // }, []);

  const map = useMapEvents({
    load: () => {
      console.log("map loaded");
    },
    resize: () => {
      console.log("resize");
    },
    dragend: () => {
      console.log("dragend");
      const bounds = map.getBounds();
      console.log("bounds", bounds.getNorthEast(), bounds.getSouthWest());
    },
    zoomend: () => {
      const bounds = map.getBounds();
      console.log("bounds", bounds.getNorthEast(), bounds.getSouthWest());
      console.log("zoomend");
    },
  });

  const { t, i18n } = useTranslation(["common", "error"]);

  return (
    <div className="toolbox">
      <h1>{t("common:filters")}</h1>
      <p className="break-all">
        {JSON.stringify(window.Telegram.WebApp.initDataUnsafe)}
      </p>
      <button
        onClick={() => {
          document.cookie = `lang=en; max-age=31536000;`;
          i18n
            .changeLanguage("en")
            .then(() => null)
            .catch(console.error);
        }}
        type="button"
      >
        Switch lang
      </button>
    </div>
  );
}

function App() {
  return <div />;
}

export default App;
