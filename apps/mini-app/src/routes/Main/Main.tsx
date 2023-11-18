import { useQuery } from "react-query";
import type { AxiosResponse } from "axios";
import { authenticatedHttpClient } from "../../services/http-client";

function GetWhoAmI(): Promise<AxiosResponse<{ telegramUsername: string }>> {
  return authenticatedHttpClient.get("api/v1/auth/whoami");
}

export function Component() {
  const result = useQuery("whoami", GetWhoAmI, {
    enabled: false, // Boolean(window.Telegram.WebApp.initData),
  });
  console.log("whoami result", result);
  return (
    <main>
      {result.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>Your telegram username: {result.data?.data.telegramUsername}</div>
      )}
    </main>
  );
}

Component.displayName = "Main";
