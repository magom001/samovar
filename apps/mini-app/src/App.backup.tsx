import type { Telegram } from "@twa-dev/types";
import { Icon } from "leaflet";
import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./App.css";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const musicians = [
  {
    name: "Miles Davis",
    instruments: ["trumpet", "flugelhorn", "keyboards", "synthesizer"],
    location: [51.5325, -0.06],
  },
  {
    name: "Herbie Hancock",
    instruments: ["piano", "keyboards"],
    location: [51.5188, -0.13],
  },
  {
    name: "Chick Corea",
    instruments: ["piano", "keyboards"],
    location: [51.5228, -0.09],
  },
];

// interface WebAppUser {
//   firstName: string;
//   lastName: string;
//   id: number;
//   languageCode: string;
//   username: string;
// }

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
      <p>{t("common:test")}</p>
      <p>{t("error:Unexpected error occurred")}</p>
      <p>{t("common:y_other", { count: 123 })}</p>
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
  const icon = new Icon({
    iconUrl:
      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    iconSize: [50, 50],
    className: "custom-avatar",
  });

  return (
    <div className="App">
      <MapContainer
        center={[51.517, -0.11]}
        maxZoom={19}
        minZoom={10}
        scrollWheelZoom={false}
        zoom={13}
        zoomControl={false}
      >
        <Suspense fallback={null}>
          <Toolbox />
        </Suspense>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {musicians.map((m) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- dev only
          <Marker icon={icon} key={m.name} position={m.location as any}>
            <Popup>
              <h3>My name is {m.name}</h3>
              <p>I play</p>
              <ul>
                {m.instruments.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
