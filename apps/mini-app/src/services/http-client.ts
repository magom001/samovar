import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { API_URL } from "./constants";

export const anonymousHttpClient = axios.create({ baseURL: API_URL });
export const authenticatedHttpClient = axios.create({ baseURL: API_URL });

interface AccessTokenPayload {
  accessToken: string;
}

class TelegramAuthInterceptor {
  private tokenPromise?: Promise<AccessTokenPayload>;
  private token?: string;

  onRequest = async (config: InternalAxiosRequestConfig) => {
    if (!this.token) {
      const { accessToken } = await this.getTelegramToken();
      this.token = accessToken;
      console.debug(
        "[TelegramAuthInterceptor][onRequest] received accessToken"
      );
    }

    config.headers.Authorization = `Bearer ${this.token}`;
    return config;
  };

  onRejectedResponse = (error: AxiosError) => {
    if (error.response?.status === 401 && error.config) {
      console.debug(
        "[TelegramAuthInterceptor][onRejectedResponse] received 401"
      );
      this.token = undefined;

      return authenticatedHttpClient(error.config);
    }

    throw error;
  };

  getTelegramToken(): Promise<AccessTokenPayload> {
    if (!this.tokenPromise) {
      console.debug(
        "[TelegramAuthInterceptor][getTelegramToken] requesting JWT token"
      );
      this.tokenPromise = anonymousHttpClient
        .post<AccessTokenPayload>("/api/v1/auth/login/telegram", {
          initData: window.Telegram.WebApp.initData,
        })
        .then((response) => response.data)
        .finally(() => {
          this.tokenPromise = undefined;
        });
    }

    return this.tokenPromise;
  }
}

const telegramAuthInterceptor = new TelegramAuthInterceptor();

authenticatedHttpClient.interceptors.request.use(
  telegramAuthInterceptor.onRequest
);
authenticatedHttpClient.interceptors.response.use(
  undefined,
  telegramAuthInterceptor.onRejectedResponse
);
