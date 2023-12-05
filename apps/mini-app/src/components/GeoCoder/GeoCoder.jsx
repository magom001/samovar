import { useEffect } from 'react';
import { marker, Control, Marker } from 'leaflet';
import { useMap } from 'react-leaflet';
import icon from './MarkerIcon';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

export function GeoCoder() {
  const map = useMap();

  useEffect(() => {
    const geocoder = Control.Geocoder.nominatim();

    Control.geocoder({
      position: 'topright',
      placeholder: 'Search...',
      defaultMarkGeocode: false,
      query: '',
      geocoder,
    })
    .on('markgeocode', (e) => {
      // Clear all markers
      map.eachLayer(layer => {
        if (layer instanceof Marker) {
          layer.remove();
        }
      });
      // Get position
      const latlng = e.geocode.center;
      // Create mark
      marker(latlng, { icon }).addTo(map).bindPopup(e.geocode.name).openPopup();
      // Fit it in bounds of the map
      map.fitBounds(e.geocode.bbox);
    })
    .addTo(map);
  }, [map]);

  return null;
}
