import type { UserProfile, UserProfileRequest } from "@samovar/models";
import type { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import type { SelectChangeEvent } from "@samovar/ui/Select";
import { authenticatedHttpClient } from "../../services/http-client";
import { SearchResultProfileList } from "../../features/SearchResultList";
import SearchForm from "../../features/SearchForm";

function GetUserProfilesByLocation(data: UserProfileRequest): Promise<AxiosResponse<UserProfile[]>> {
  return authenticatedHttpClient.post('api/v1/user/profiles/search', data);
}

const lat = 50.08814256438981;
const long = 14.427471847302524;

export function Component() {
  const [dist, setDist] = useState('');

  const handleDist = (event: SelectChangeEvent) => {
      setDist(event.target.value);
  };

  const result = useQuery(['profiles', dist], () => GetUserProfilesByLocation({lat, long, dist: Number(dist)}), {
    enabled: Boolean(window.Telegram.WebApp.initData),
  });
  
  console.log('profiles result', dist, result);
  return (
    <main>
      <SearchForm disabled={result.isLoading} dist={dist} handleDist={handleDist}/>
    {result.isLoading ? (
        <div>Loading...</div>
      ) : (
        <SearchResultProfileList profiles={result.data?.data}/>
      )}
    </main>
  );
}

Component.displayName = 'Search';