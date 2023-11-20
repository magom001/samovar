import { List } from '@samovar/ui/List';
import type { UserData } from '@samovar/models';
import { SearchResultItem } from './SearchResultItem';

export interface SearchResultListType {
  users: UserData[];
}

export function SearchResultList(result: SearchResultListType) {
  if (result.users.length) {
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
