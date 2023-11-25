import { List } from '@samovar/ui/List';
import type { UserData, UserProfile } from '@samovar/models';
import { SearchResultItem } from './SearchResultItem';

export interface SearchResultListType {
  users?: UserData[];
  profiles?: UserProfile[];
}

export function SearchResultList(result: SearchResultListType) {
  if (result.users?.length) {
    return (
      <List>
        {result.users.map((user) => (
          <SearchResultItem key={user.id} user={user} />
        ))}
      </List>
    );
  }

  return <p>Empty list</p>;
}
