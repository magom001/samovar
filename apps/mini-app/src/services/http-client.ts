import axios from 'axios';
import { API_URL } from './constants';
import { TelegramAuthInterceptor } from './interceptors';

export const authenticatedHttpClient = axios.create({ baseURL: API_URL });
export const ipGeoLocationHttpClient = axios.create({ baseURL: 'https://freeipapi.com' });

const telegramAuthInterceptor = new TelegramAuthInterceptor(authenticatedHttpClient);

authenticatedHttpClient.interceptors.request.use(telegramAuthInterceptor.onRequest);
authenticatedHttpClient.interceptors.response.use(undefined, telegramAuthInterceptor.onRejectedResponse);
