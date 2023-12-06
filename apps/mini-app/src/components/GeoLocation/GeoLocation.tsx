import { Box } from '@samovar/ui/Box';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useMyLocation } from '../../services/ip-geo-location.service';
import { GeoCoder } from '../GeoCoder';
import { MapCenterMarker } from './MapCenterMarker';

interface GeoLocationProps {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  sx?: ComponentProps<typeof Box>['sx'];
}

export function GeoLocation({ value, onChange, sx }: GeoLocationProps) {
  const q = useMyLocation();

  const lat = value?.[0] ?? q.data?.data?.latitude ?? 51.505;
  const lng = value?.[1] ?? q.data?.data?.longitude ?? -0.09;

  useEffect(() => {
    if (!value) {
      onChange?.([lat, lng]);
    }
  }, [lat, lng, value, onChange]);

  return (
    <Box sx={sx}>
      <MapContainer center={[lat, lng]} style={{ height: '100%', width: '100%' }} zoom={7}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterMarker onChange={onChange} />
        <GeoCoder onChange={onChange} />
      </MapContainer>
    </Box>
  );
}
