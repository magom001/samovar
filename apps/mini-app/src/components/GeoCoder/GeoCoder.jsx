import { useEffect } from 'react';
import { marker, Control, Marker } from 'leaflet';
import { useMap } from 'react-leaflet';
import icon from './MarkerIcon';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

function removeAllMarkers(map) {
  map.eachLayer(layer => {
    if (layer instanceof Marker) {
      layer.remove();
    }
  });
}

export function GeoCoder({onChange}) {
  const map = useMap();

  useEffect(() => {
    const geocoder = Control.Geocoder.nominatim();

    const geo = Control.geocoder({
      position: 'topright',
      placeholder: 'Search...',
      defaultMarkGeocode: false,
      query: '',
      geocoder,
    })
    .on('markgeocode', (e) => {
      // Clear all markers
      removeAllMarkers(map);
      // Get position
      const latlng = e.geocode.center;
      // Create mark
      marker(latlng, { icon }).addTo(map).bindPopup(e.geocode.name).openPopup();
      // Fit it in bounds of the map
      map.fitBounds(e.geocode.bbox);
      // Call listeners ouside about selection
      onChange && onChange([latlng.lat, latlng.lng]);
    })
    .addTo(map);

    return () => {
      // Clear all markers
      removeAllMarkers(map);
      // Remove geocoder from map
      geo.remove();
    };
  }, [map, onChange]);

  return null;
}
