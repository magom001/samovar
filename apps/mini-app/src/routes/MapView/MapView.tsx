import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function MapView() {
  const icon = new Icon({
    iconUrl:
      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    iconSize: [50, 50],
    className: "custom-avatar",
  });

  return (
    <MapContainer
      center={[51.517, -0.11]}
      maxZoom={19}
      minZoom={10}
      preferCanvas
      scrollWheelZoom={false}
      zoom={13}
      zoomControl={false}
    >
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
  );
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
