import { BottomNavigation } from "@samovar/ui/BottomNavigation";
import { BottomNavigationAction } from "@samovar/ui/BottomNavigationAction";
import { Icon } from "@samovar/ui/Icon";
import { Paper } from "@samovar/ui/Paper";
import { useTranslation } from "react-i18next";
import {
  Link,
  Outlet,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        lazy: () => import("../Main"),
      },
      {
        path: "/search",
        lazy: () => import("../Search"),
      },
      {
        path: "/profile",
        lazy: () => import("../Profile"),
      },
    ],
  },
]);

const bottomNavigationStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
};

export function Root() {
  const { t } = useTranslation(["common"]);
  const location = useLocation();

  return (
    <main>
      <Outlet />
      <Paper elevation={3} sx={bottomNavigationStyle}>
        <BottomNavigation showLabels value={location.pathname}>
          <BottomNavigationAction
            LinkComponent={Link}
            icon={<Icon>home</Icon>}
            label={t("common:home")}
            to="/"
            value="/"
          />
          <BottomNavigationAction
            LinkComponent={Link}
            icon={<Icon>search</Icon>}
            label={t("common:search")}
            to="/search"
            value="/search"
          />
          <BottomNavigationAction
            LinkComponent={Link}
            icon={<Icon>person</Icon>}
            label={t("common:profile")}
            to="/profile"
            value="/profile"
          />
        </BottomNavigation>
      </Paper>
    </main>
  );
}
