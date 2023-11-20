import { Button } from '@samovar/ui/Button';
import { SwipeableDrawer } from '@samovar/ui/SwipeableDrawer';
import type { LatLngTuple } from 'leaflet';
import { Icon } from 'leaflet';
import { useReducer } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const swipeableStyle = {
  sx: {
    height: 'calc(100% - 64px)',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
} as const;

export function Component() {
  const icon = new Icon({
    iconUrl:
      'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
    iconSize: [50, 50],
    className: 'custom-avatar',
  });

  const [open, toggleOpen] = useReducer((x) => !x, false);

  return (
    <>
      <MapContainer
        center={[51.517, -0.11]}
        maxZoom={19}
        minZoom={10}
        preferCanvas
        scrollWheelZoom={false}
        zoom={13}
        // zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {musicians.map((m) => (
          <Marker attribution={m.id} icon={icon} key={m.name} position={m.location}>
            <Popup>
              <h3>My name is {m.name}</h3>
              <Button onClick={toggleOpen}>See profile</Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <SwipeableDrawer PaperProps={swipeableStyle} anchor="bottom" onClose={toggleOpen} onOpen={toggleOpen} open={open}>
        <Button draggable>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <div
          onTouchEnd={(e) => {
            const el: HTMLDivElement = e.target as HTMLDivElement;
            el.removeAttribute('data-x');
            el.style.transition = 'all 0.5s ease-in-out';
            el.style.transform = 'translateX(0)';
          }}
          onTouchMove={(e) => {
            const el: HTMLDivElement = e.target as HTMLDivElement;
            const deltaX = e.touches[0].clientX - parseInt(el.dataset.x as string, 10);
            el.style.transform = `translateX(${deltaX}px)`;
          }}
          onTouchStart={(e) => {
            const el: HTMLDivElement = e.target as HTMLDivElement;
            el.dataset.x = e.touches[0].clientX.toString();
            console.log('touch start', e.target);
            el.style.transition = 'none';
          }}
        >
          <h1>XXXX</h1>
        </div>
      </SwipeableDrawer>
    </>
  );
}

const musicians = [
  {
    id: '1',
    name: 'Miles Davis',
    instruments: ['trumpet', 'flugelhorn', 'keyboards', 'synthesizer'],
    location: [51.5325, -0.06] as LatLngTuple,
  },
  {
    id: '2',
    name: 'Herbie Hancock',
    instruments: ['piano', 'keyboards'],
    location: [51.5188, -0.13] as LatLngTuple,
  },
  {
    id: '3',
    name: 'Chick Corea',
    instruments: ['piano', 'keyboards'],
    location: [51.5228, -0.09] as LatLngTuple,
  },
];
