import { useQuery } from 'react-query';
import { ipGeoLocationHttpClient } from './http-client';

interface IpGeoLocationResponse {
  ipVersion: number;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  timeZone: string;
  zipCode: string;
  cityName: string;
  regionName: string;
  isProxy: boolean;
  continent: string;
  continentCode: string;
}
export function GetMyLocation() {
  return ipGeoLocationHttpClient.get<IpGeoLocationResponse>('/api/json/');
}

export const useMyLocation = () => {
  return useQuery('my-location', GetMyLocation, { suspense: true, refetchOnWindowFocus: false });
};
