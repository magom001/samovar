import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import type { ComponentProps, FC } from "react";

export * from "@mui/material/BottomNavigationAction";

export const BottomNavigationAction: FC<
  ComponentProps<typeof MuiBottomNavigationAction> & { to: string }
> = MuiBottomNavigationAction;
