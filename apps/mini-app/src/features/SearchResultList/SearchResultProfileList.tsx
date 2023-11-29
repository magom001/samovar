import { List } from '@samovar/ui/List';
import type { UserProfile } from '@samovar/models';
import { SearchResultProfileItem } from './SearchResultProfileItem';

export interface SearchResultProfileListType {
  profiles?: UserProfile[];
}

export function SearchResultProfileList(result: SearchResultProfileListType) {
  if (result.profiles?.length) {
    return (
      <List style={{ minHeight: '100vh', overflow: 'auto' }}>
        {result.profiles.map((profile) => (
          <SearchResultProfileItem key={profile.id} profile={profile} />
        ))}
      </List>
    );
  }

  return <p>Empty list</p>;
}
