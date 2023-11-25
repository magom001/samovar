import type { UserProfile } from '@samovar/models';
import type { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import { authenticatedHttpClient } from '../../services/http-client';
import { SearchResultProfileItem } from '../../features/SearchResultList';

function GetUserProfilesByUserId(): Promise<AxiosResponse<UserProfile[]>> {
  return authenticatedHttpClient.get('api/v1/user/profiles');
}

export function Component() {
  const result = useQuery('profiles', GetUserProfilesByUserId, {
    enabled: Boolean(window.Telegram.WebApp.initData),
  });
  console.log('profiles result', result);
  return (
    <main>
      {result.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Profiles:</div>
          {result.data?.data.map((profile) => <SearchResultProfileItem key={profile.id} profile={profile} />)}
        </>
      )}
    </main>
  );
}

Component.displayName = 'Search';

// {result.data?.data.map(profile => <SearchResultProfileItem key={profile.id} profile={profile}/>)}
