import { Typography } from '@samovar/ui/Typography';
import { ListItem } from '@samovar/ui/ListItem';
import { ListItemButton } from '@samovar/ui/ListItemButton';
import { ListItemText } from '@samovar/ui/ListItemText';
import type { UserProfile } from '@samovar/models';

export interface SearchResultProfileItemType {
  profile: UserProfile;
}

export function SearchResultProfileItem(props: SearchResultProfileItemType) {
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href="#">
        <ListItemText
          primary={props.profile.type}
          secondary={
            <Typography color="text.primary" component="span" sx={{ display: 'inline' }} variant="body2">
              {`${props.profile.latitude} x ${props.profile.longitude}`}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
