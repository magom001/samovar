import type { UserData } from "@samovar/models";
import { SearchResultList } from "../../features/SearchResultList";

export function Component() {

  const users: UserData[] = [
    {
      id: '123-11312-123-123-1231',
      telegramId: 123123123123,
      telegramUsername: 'pacino',
      data: {
        firstName: 'Al',
        lastName: 'Pacino'
      }
    },
    {
      id: '321-323123-32123-1123',
      telegramId: 43234234,
      telegramUsername: 'iglesias',
      data: {
        firstName: 'Julio José',
        lastName: 'Iglesias de la Cueva'
      }
    }
  ];

  return (
    <SearchResultList users={users}/>
  );
}

Component.displayName = "Profile";
