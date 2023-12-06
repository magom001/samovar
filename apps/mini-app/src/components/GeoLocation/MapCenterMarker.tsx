import { Marker, useMap, useMapEvents } from 'react-leaflet';
import { useState } from 'react';

interface MapCenterMarkerProps {
  onChange?: (value: [number, number]) => void;
}

export function MapCenterMarker(props: MapCenterMarkerProps) {
  const map = useMap();
  const [position, setPosition] = useState(map.getCenter());

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      props.onChange?.([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} />;
}
