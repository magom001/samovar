import { Avatar } from "@samovar/ui/Avatar";
import { Typography } from "@samovar/ui/Typography";
import { ListItem } from "@samovar/ui/ListItem";
import { ListItemAvatar } from "@samovar/ui/ListItemAvatar";
import { ListItemButton } from "@samovar/ui/ListItemButton";
import { ListItemText } from "@samovar/ui/ListItemText";
import type { UserData } from "@samovar/models";

export interface SearchResultItemType {
  user: UserData;
}

function getFullName(user: UserData) {
  return `${user.data?.firstName || ''} ${user.data?.lastName || ''}`.trim();
}

export function SearchResultItem(props: SearchResultItemType) {
  const fullName = getFullName(props.user);
  return (
    <ListItem disablePadding>
      <ListItemButton component="a" href={`https://t.me/${props.user.telegramUsername}`}>
        <ListItemAvatar>
          <Avatar alt={`${fullName}`} src={props.user.data?.avatarUrl} />
        </ListItemAvatar>
        <ListItemText primary={fullName} secondary={
          <>
          <Typography
            color="text.primary"
            component="span"
            sx={{ display: 'inline' }}
            variant="body2"
          >
            Musitian
          </Typography>
          {" — I'll be in your neighborhood doing errands this…"}
        </>
        } />
      </ListItemButton>
    </ListItem>
  );
}
